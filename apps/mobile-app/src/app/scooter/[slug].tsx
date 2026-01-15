import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, shadows } from '../../constants/theme';
import { getScooterBySlug } from '../../lib/strapi';
import { adaptStrapiScooter, Scooter } from '../../lib/scooter-adapter';

const { width, height } = Dimensions.get('window');

export default function ScooterDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [scooter, setScooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadScooter();
  }, [slug]);

  const loadScooter = async () => {
    try {
      setLoading(true);
      const data = await getScooterBySlug(slug);
      setScooter(data);
    } catch (error) {
      console.error('Error loading scooter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const toggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!scooter) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>Scuterul nu a fost găsit</Text>
      </View>
    );
  }

  const adaptedScooter = adaptStrapiScooter(scooter);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          {adaptedScooter.image ? (
            <Image
              source={{ uri: adaptedScooter.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <Text style={styles.heroPlaceholderText}>🏍️</Text>
            </View>
          )}
          
          {/* Header Buttons */}
          <View style={[styles.headerButtons, { top: insets.top + spacing.md }]}>
            <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
              <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          {/* Badge */}
          {adaptedScooter.badge && (
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{adaptedScooter.badge}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Price */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{adaptedScooter.name}</Text>
            <Text style={styles.category}>
              {adaptedScooter.category} • {adaptedScooter.cc}
            </Text>
            <Text style={styles.price}>{adaptedScooter.price}</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descriere</Text>
            <Text style={styles.description}>{scooter.attributes.description}</Text>
          </View>

          {/* Specs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specificații</Text>
            <View style={styles.specsGrid}>
              <SpecItem icon="speedometer-outline" label="Motor" value={scooter.attributes.engine} />
              <SpecItem icon="flash-outline" label="Putere" value={scooter.attributes.power} />
              <SpecItem icon="water-outline" label="Consum" value={scooter.attributes.consumption} />
              <SpecItem icon="barbell-outline" label="Greutate" value={scooter.attributes.weight} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SpecItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.specItem}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPlaceholderText: {
    fontSize: 120,
  },
  headerButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  heroBadge: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  heroBadgeText: {
    ...typography.subheadline,
    color: colors.text,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  titleSection: {
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  price: {
    ...typography.title1,
    color: colors.accent,
    fontWeight: '700',
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.title2,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  specsGrid: {
    gap: spacing.md,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray6,
    padding: spacing.lg,
    borderRadius: 12,
    gap: spacing.md,
  },
  specLabel: {
    ...typography.subheadline,
    color: colors.textSecondary,
    flex: 1,
  },
  specValue: {
    ...typography.subheadline,
    color: colors.text,
    fontWeight: '600',
  },
});

