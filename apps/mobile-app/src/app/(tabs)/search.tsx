import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { useCategories, useBrands, useAllScooters } from '../../hooks/useScooters';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 3) / 2;

// Icon mapping for categories
const categoryIcons: Record<string, string> = {
  sport: '🏍️',
  retro: '🛵',
  touring: '🏁',
  urban: '🌆',
  premium: '⭐',
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  // Use React Query hooks
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: brandsData, isLoading: brandsLoading } = useBrands();
  const { data: allScooters, isLoading: scootersLoading } = useAllScooters(100);

  const categories = useMemo(() => {
    return categoriesData?.map(cat => ({
      ...cat,
      icon: categoryIcons[cat.name] || cat.icon || '🏍️',
    })) || [];
  }, [categoriesData]);

  const brands = brandsData || [];

  // Filter scooters based on search query
  const filteredScooters = useMemo(() => {
    if (!searchQuery.trim() || !allScooters) return [];

    const query = searchQuery.toLowerCase().trim();
    return allScooters.filter(scooter =>
      scooter.name.toLowerCase().includes(query) ||
      scooter.manufacturer.toLowerCase().includes(query) ||
      scooter.category.toLowerCase().includes(query)
    ).slice(0, 20); // Limit to 20 results
  }, [searchQuery, allScooters]);

  const loading = categoriesLoading || brandsLoading || scootersLoading;

  const handleCategoryPress = (category: typeof categories[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/all-scooters',
      params: {
        category: category.slug,
        title: `Scutere ${category.displayName}`,
      },
    });
  };

  const handleBrandPress = (brand: typeof brands[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/all-scooters',
      params: {
        manufacturer: brand.name,
        title: `Scutere ${brand.name}`,
      },
    });
  };

  const handleScooterPress = (slug: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/scooter/${slug}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 100 }]}
      >
        {/* iOS-style Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color={colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Caută model, brand..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* Search Results */}
        {searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Rezultate ({filteredScooters.length})
            </Text>
            {filteredScooters.length > 0 ? (
              <View style={styles.resultsGrid}>
                {filteredScooters.map((scooter) => (
                  <TouchableOpacity
                    key={scooter.id}
                    style={styles.resultCard}
                    onPress={() => handleScooterPress(scooter.slug)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.resultImageContainer}>
                      {scooter.image ? (
                        <Image
                          source={{ uri: scooter.image }}
                          style={styles.resultImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.resultImagePlaceholder}>
                          <Text style={styles.placeholderText}>🏍️</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.resultContent}>
                      <Text style={styles.resultTitle} numberOfLines={1}>
                        {scooter.name}
                      </Text>
                      <Text style={styles.resultCategory}>{scooter.category}</Text>
                      <Text style={styles.resultPrice}>{scooter.price}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsIcon}>🔍</Text>
                <Text style={styles.noResultsText}>
                  Nu am găsit scutere pentru "{searchQuery}"
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Categories */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorii</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  activeOpacity={0.7}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.displayName}</Text>
                  <Text style={styles.categoryCount}>{category.count} modele</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Brands */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Branduri</Text>
            <View style={styles.brandList}>
              {brands.map((brand, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.brandRow}
                  activeOpacity={0.7}
                  onPress={() => handleBrandPress(brand)}
                >
                  <View style={styles.brandInfo}>
                    <Text style={styles.brandName}>{brand.name}</Text>
                    <Text style={styles.brandModels}>{brand.count} modele</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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

  // Search Bar
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray5,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: 0,
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.sm,
  },

  // Section
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.title3,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  // Search Results
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  resultCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.systemGray6,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  resultImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.75,
    backgroundColor: colors.systemGray5,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.systemGray5,
  },
  placeholderText: {
    fontSize: 48,
  },
  resultContent: {
    padding: spacing.md,
  },
  resultTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  resultCategory: {
    ...typography.subheadline,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultPrice: {
    ...typography.callout,
    color: colors.accent,
    fontWeight: '600',
  },
  noResults: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  noResultsText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.systemGray6,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.card,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  categoryName: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  categoryCount: {
    ...typography.caption1,
    color: colors.textSecondary,
  },

  // Brands
  brandList: {
    paddingHorizontal: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  brandModels: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },
});

