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
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors as themeColors, spacing, typography, shadows } from '../../constants/theme';
import { getScooterBySlug, getImageUrls, StrapiScooterColor } from '../../lib/strapi';
import { adaptStrapiScooter, Scooter } from '../../lib/scooter-adapter';

const { width, height } = Dimensions.get('window');

export default function ScooterDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [scooter, setScooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
        <ActivityIndicator size="large" color={themeColors.accent} />
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

  // Get gallery images
  const galleryImages = getImageUrls(scooter.attributes.gallery);
  const displayImages = galleryImages.length > 0 ? galleryImages : (adaptedScooter.image ? [adaptedScooter.image] : []);

  // Get scooter colors
  const scooterColors = scooter.attributes.colors?.data || [];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Gallery */}
          <View style={styles.heroContainer}>
            <FlatList
              data={displayImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setSelectedImageIndex(index);
              }}
              renderItem={({ item }) => (
                item ? (
                  <Image
                    source={{ uri: item }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.heroPlaceholder}>
                    <Text style={styles.heroPlaceholderText}>🏍️</Text>
                  </View>
                )
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            {/* Header Buttons */}
            <View style={[styles.headerButtons, { top: insets.top + spacing.md }]}>
              <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color={themeColors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
                <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </View>

            {/* Gallery Indicator */}
            {displayImages.length > 1 && (
              <View style={styles.galleryIndicator}>
                {displayImages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicatorDot,
                      index === selectedImageIndex && styles.indicatorDotActive,
                    ]}
                  />
                ))}
              </View>
            )}

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

            {/* Colors */}
            {scooterColors.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Culori disponibile</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.colorsContainer}>
                    {scooterColors.map((color: StrapiScooterColor) => (
                      <TouchableOpacity
                        key={color.id}
                        style={styles.colorItem}
                        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                      >
                        {color.attributes.hex ? (
                          <View
                            style={[
                              styles.colorCircle,
                              { backgroundColor: color.attributes.hex },
                            ]}
                          />
                        ) : (
                          <View style={[styles.colorCircle, styles.colorCirclePlaceholder]}>
                            <Text style={styles.colorCircleText}>?</Text>
                          </View>
                        )}
                        <Text style={styles.colorName} numberOfLines={1}>
                          {color.attributes.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

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
    </>
  );
}

function SpecItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.specItem}>
      <Ionicons name={icon} size={20} color={themeColors.accent} />
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: themeColors.textSecondary,
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
    width: width,
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: themeColors.systemGray5,
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
    zIndex: 10,
  },
  galleryIndicator: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorDotActive: {
    backgroundColor: themeColors.accent,
    width: 20,
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
    backgroundColor: themeColors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  heroBadgeText: {
    ...typography.subheadline,
    color: themeColors.text,
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
    color: themeColors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.body,
    color: themeColors.textSecondary,
    marginBottom: spacing.md,
  },
  price: {
    ...typography.title1,
    color: themeColors.accent,
    fontWeight: '700',
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.title2,
    color: themeColors.text,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.body,
    color: themeColors.textSecondary,
    lineHeight: 24,
  },
  specsGrid: {
    gap: spacing.md,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.systemGray6,
    padding: spacing.lg,
    borderRadius: 12,
    gap: spacing.md,
  },
  specLabel: {
    ...typography.subheadline,
    color: themeColors.textSecondary,
    flex: 1,
  },
  specValue: {
    ...typography.subheadline,
    color: themeColors.text,
    fontWeight: '600',
  },
  colorsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  colorItem: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 70,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: themeColors.systemGray5,
    ...shadows.card,
  },
  colorCirclePlaceholder: {
    backgroundColor: themeColors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleText: {
    ...typography.body,
    color: themeColors.textSecondary,
  },
  colorName: {
    ...typography.caption1,
    color: themeColors.textSecondary,
    textAlign: 'center',
  },
});

