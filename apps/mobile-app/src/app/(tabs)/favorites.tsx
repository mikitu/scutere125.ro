import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../constants/theme';

export default function FavoritesScreen() {
  const isEmpty = true; // TODO: Connect to actual favorites
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
    >
      {isEmpty ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="heart-outline"
              size={56}
              color={colors.textSecondary}
            />
          </View>
          <Text style={styles.emptyTitle}>Nicio scuter favorită</Text>
          <Text style={styles.emptyDescription}>
            Explorează catalogul și adaugă{'\n'}scuterele tale preferate aici
          </Text>
        </View>
      ) : (
        <View style={styles.favoritesList}>
          {/* TODO: Add favorites list */}
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
  },
  favoritesList: {
    padding: spacing.xl,
  },
});

