import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, shadows } from '../constants/theme';
import { Scooter } from '../lib/scooter-adapter';
import { useFavorites } from '../hooks/useFavorites';
import { useAllScooters, useFeaturedScooters, useLatestScooters } from '../hooks/useScooters';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 3) / 2;

export default function AllScootersScreen() {
  const { section, category, manufacturer, title: customTitle } = useLocalSearchParams<{
    section?: string;
    category?: string;
    manufacturer?: string;
    title?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Use React Query hooks based on section
  const {
    data: allScootersData,
    isLoading: allLoading,
    refetch: refetchAll
  } = useAllScooters(100);

  const {
    data: featuredData,
    isLoading: featuredLoading,
    refetch: refetchFeatured
  } = useFeaturedScooters();

  const {
    data: latestData,
    isLoading: latestLoading,
    refetch: refetchLatest
  } = useLatestScooters(20);

  // Determine which data to use based on section
  const rawScooters = section === 'featured'
    ? featuredData
    : section === 'latest'
    ? latestData
    : allScootersData;

  const loading = section === 'featured'
    ? featuredLoading
    : section === 'latest'
    ? latestLoading
    : allLoading;

  // Filter scooters based on category and manufacturer
  const scooters = React.useMemo(() => {
    if (!rawScooters) return [];

    let filtered = rawScooters;

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(scooter =>
        scooter.categories?.some(cat => cat.slug === category)
      );
    }

    // Filter by manufacturer if provided
    if (manufacturer) {
      filtered = filtered.filter(scooter =>
        scooter.manufacturer === manufacturer
      );
    }

    return filtered;
  }, [rawScooters, category, manufacturer]);

  const handleRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);

    if (section === 'featured') {
      await refetchFeatured();
    } else if (section === 'latest') {
      await refetchLatest();
    } else {
      await refetchAll();
    }

    setRefreshing(false);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleScooterPress = (scooter: Scooter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/scooter/${scooter.slug}`);
  };

  const handleToggleFavorite = async (scooter: Scooter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await toggleFavorite({
      id: scooter.id,
      slug: scooter.slug,
      name: scooter.name,
      image: scooter.image,
      price: scooter.price,
      category: scooter.category,
      manufacturer: scooter.manufacturer,
    });
  };

  const getTitle = () => {
    if (customTitle) return customTitle;
    if (section === 'featured') return 'Scutere Populare';
    if (section === 'latest') return 'Noutăți';
    return 'Toate Scuterele';
  };

  const renderScooter = ({ item }: { item: Scooter }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleScooterPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardImageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderText}>🏍️</Text>
          </View>
        )}
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.favoriteIcon}>{isFavorite(item.id) ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardCategory}>
          {item.category} • {item.cc}
        </Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getTitle()}</Text>
          <View style={styles.backButton} />
        </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : (
        <FlatList
          data={scooters}
          renderItem={renderScooter}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + spacing.xl }
          ]}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray6,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.title2,
    color: colors.text,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.systemGray6,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.1,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.systemGray5,
  },
  placeholderText: {
    fontSize: 60,
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  badgeText: {
    ...typography.caption1,
    color: colors.text,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    ...typography.subheadline,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  cardCategory: {
    ...typography.caption1,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardPrice: {
    ...typography.subheadline,
    color: colors.accent,
    fontWeight: '700',
  },
});

