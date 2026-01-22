import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, shadows } from '../../constants/theme';
import { useFavorites } from '../../hooks/useFavorites';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 3) / 2;

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favorites, loading, removeFavorite } = useFavorites();

  const handleScooterPress = (slug: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/scooter/${slug}`);
  };

  const handleRemoveFavorite = async (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await removeFavorite(id);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const isEmpty = favorites.length === 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 100 }]}
    >
      {isEmpty ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="heart-outline"
              size={64}
              color={colors.textSecondary}
            />
          </View>
          <Text style={styles.emptyTitle}>Nicio scuteră salvată</Text>
          <Text style={styles.emptyDescription}>
            Apasă pe ❤️ pentru a salva{'\n'}scuterele tale preferate
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/search')}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color={colors.background} />
            <Text style={styles.emptyButtonText}>Explorează Catalogul</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.favoritesList}>
          <Text style={styles.title}>Favorite ({favorites.length})</Text>
          <View style={styles.grid}>
            {favorites.map((scooter) => (
              <TouchableOpacity
                key={scooter.id}
                style={styles.card}
                onPress={() => handleScooterPress(scooter.slug)}
                activeOpacity={0.7}
              >
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
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleRemoveFavorite(scooter.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteIcon}>❤️</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {scooter.name}
                  </Text>
                  <Text style={styles.cardCategory}>{scooter.category}</Text>
                  <Text style={styles.cardPrice}>{scooter.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl * 3,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    ...typography.title3,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.card,
  },
  emptyButtonText: {
    ...typography.headline,
    color: colors.background,
    fontWeight: '600',
  },
  favoritesList: {
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
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
    height: CARD_WIDTH * 0.75,
    backgroundColor: colors.systemGray5,
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
    fontSize: 48,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  cardCategory: {
    ...typography.subheadline,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardPrice: {
    ...typography.callout,
    color: colors.accent,
    fontWeight: '600',
  },
});

