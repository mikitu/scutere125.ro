import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { useFeaturedScooters, useLatestScooters } from '../../hooks/useScooters';
import { useFavorites } from '../../hooks/useFavorites';
import { Scooter } from '../../lib/scooter-adapter';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 3) / 2; // 2 cards visible
const CARD_SPACING = spacing.lg;

// Helmet Icon Component
function HelmetIcon({ size = 40 }: { size?: number }) {
  return (
    <Image
      source={require('../../../assets/casca.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Use React Query hooks
  const { data: featuredScooters = [], isLoading: featuredLoading, refetch: refetchFeatured } = useFeaturedScooters();
  const { data: latestScooters = [], isLoading: latestLoading, refetch: refetchLatest } = useLatestScooters();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [refreshing, setRefreshing] = useState(false);

  const loading = featuredLoading || latestLoading;

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchFeatured(), refetchLatest()]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const handleScooterPress = (scooter: Scooter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/scooter/${scooter.slug}`);
  };

  const handleSeeAll = (section: 'featured' | 'latest') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/all-scooters?section=${section}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Header with Logo */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.logoContainer}>
            <HelmetIcon size={40} />
            <MaskedView
              maskElement={
                <Text style={styles.logoText}>Scutere125</Text>
              }
            >
              <LinearGradient
                colors={['#e63946', '#f4a261']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
              >
                <Text style={[styles.logoText, { opacity: 0 }]}>Scutere125</Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text style={styles.headerSubtitle}>Descoperă scuterul potrivit pentru tine</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : (
          <>
            {/* Popular Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Populare</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
              >
                {featuredScooters.map((scooter, index) => (
                  <ScooterCard
                    key={scooter.id}
                    scooter={scooter}
                    index={index}
                    isFavorite={isFavorite(scooter.id)}
                    onToggleFavorite={() => handleToggleFavorite(scooter)}
                    onPress={() => handleScooterPress(scooter)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* New Arrivals Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Noutăți</Text>
                <TouchableOpacity onPress={() => handleSeeAll('latest')}>
                  <Text style={styles.seeAllButton}>Vezi toate</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
              >
                {latestScooters.map((scooter, index) => (
                  <ScooterCard
                    key={scooter.id}
                    scooter={scooter}
                    index={index}
                    isFavorite={isFavorite(scooter.id)}
                    onToggleFavorite={() => handleToggleFavorite(scooter)}
                    onPress={() => handleScooterPress(scooter)}
                    isNew
                  />
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

interface ScooterCardProps {
  scooter: Scooter;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
  isNew?: boolean;
}

function ScooterCard({ scooter, index, isFavorite, onToggleFavorite, onPress, isNew = false }: ScooterCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.cardWrapper, index === 0 && styles.firstCard]}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.cardImageContainer}>
          {scooter.image ? (
            <Image
              source={{ uri: scooter.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.placeholderText}>🏍️</Text>
            </View>
          )}
          {scooter.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{scooter.badge}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {scooter.name}
          </Text>
          <Text style={styles.cardCategory}>
            {scooter.category} • {scooter.cc}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{scooter.price}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.xxxl,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl * 3,
  },

  // Header with Logo
  header: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    ...typography.largeTitle,
    color: colors.text,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  gradientContainer: {
    paddingVertical: 2,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxxl,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    ...typography.subheadline,
    color: colors.text,
    marginRight: spacing.xs / 2,
  },
  statLabel: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },
  statDivider: {
    ...typography.subheadline,
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
  },

  // Section
  section: {
    marginBottom: spacing.xxxl * 1.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.title1,
    color: colors.text,
    fontWeight: '600',
  },
  seeAllButton: {
    ...typography.body,
    color: colors.accent,
  },

  // Horizontal Scroll
  horizontalScroll: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
  },

  // Card
  cardWrapper: {
    marginRight: CARD_SPACING,
  },
  firstCard: {
    marginLeft: 0,
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
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
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
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardTitle: {
    ...typography.headline,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  cardCategory: {
    ...typography.subheadline,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    ...typography.title3,
    color: colors.text,
    fontWeight: '600',
  },
  cardRating: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },
});

