import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { getCategories, getBrands } from '../../lib/strapi';

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
  const [categories, setCategories] = useState<Array<{ id: number; name: string; displayName: string; slug: string; icon: string; count: number }>>([]);
  const [brands, setBrands] = useState<Array<{ name: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesData, brandsData] = await Promise.all([
        getCategories(),
        getBrands(),
      ]);
      setCategories(categoriesData.map(cat => ({
        ...cat,
        icon: categoryIcons[cat.name] || cat.icon || '🏍️',
      })));
      setBrands(brandsData);
    } catch (error) {
      console.error('Error loading search data:', error);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Categories */}
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

        {/* Brands */}
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

