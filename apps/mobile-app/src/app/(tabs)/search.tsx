import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

const categories = [
  { id: 1, name: 'Sport', icon: '🏍️', count: 12 },
  { id: 2, name: 'Retro', icon: '🛵', count: 8 },
  { id: 3, name: 'Touring', icon: '🏁', count: 15 },
  { id: 4, name: 'Urban', icon: '🌆', count: 20 },
];

const brands = [
  { id: 1, name: 'Honda', models: 12 },
  { id: 2, name: 'Yamaha', models: 10 },
  { id: 3, name: 'Piaggio', models: 8 },
  { id: 4, name: 'Kymco', models: 7 },
  { id: 5, name: 'SYM', models: 6 },
  { id: 6, name: 'Aprilia', models: 5 },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
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

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorii</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.7}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} modele</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Branduri</Text>
          <View style={styles.brandList}>
            {brands.map((brand) => (
              <TouchableOpacity key={brand.id} style={styles.brandRow} activeOpacity={0.7}>
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{brand.name}</Text>
                  <Text style={styles.brandModels}>{brand.models} modele</Text>
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

  // Search Bar
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
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

