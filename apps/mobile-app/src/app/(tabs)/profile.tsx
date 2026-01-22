import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Setări', 'Ecranul de setări va fi disponibil în curând!');
  };

  const handleAbout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Despre Scutere125',
      'Versiune: 1.0.0\n\nCatalogul complet de scutere 125cc din România.\n\n© 2026 Scutere125.ro',
      [{ text: 'OK' }]
    );
  };

  const handleComingSoon = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      '🚀 Coming Soon',
      'Această funcționalitate va fi disponibilă în curând!\n\nRămâi conectat pentru actualizări.',
      [{ text: 'OK' }]
    );
  };

  const menuSections = [
    {
      title: 'Cont',
      items: [
        {
          icon: 'person-outline',
          title: 'Contul Meu',
          subtitle: 'Login & Profil',
          comingSoon: true,
          onPress: handleComingSoon,
        },
        {
          icon: 'notifications-outline',
          title: 'Notificări',
          subtitle: 'Gestionează alertele',
          comingSoon: true,
          onPress: handleComingSoon,
        },
      ],
    },
    {
      title: 'Activitate',
      items: [
        {
          icon: 'bar-chart-outline',
          title: 'Statistici',
          subtitle: 'Activitatea ta',
          comingSoon: true,
          onPress: handleComingSoon,
        },
        {
          icon: 'time-outline',
          title: 'Istoric',
          subtitle: 'Scutere vizualizate',
          comingSoon: true,
          onPress: handleComingSoon,
        },
      ],
    },
    {
      title: 'Aplicație',
      items: [
        {
          icon: 'settings-outline',
          title: 'Setări',
          subtitle: 'Preferințe aplicație',
          onPress: handleSettings,
        },
        {
          icon: 'information-circle-outline',
          title: 'Despre',
          subtitle: 'Versiune 1.0.0',
          onPress: handleAbout,
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons
            name="person-circle"
            size={80}
            color={colors.textSecondary}
          />
        </View>
        <Text style={styles.userName}>Bine ai venit!</Text>
        <Text style={styles.userEmail}>Explorează catalogul de scutere</Text>
      </View>

      {/* Coming Soon Banner */}
      <View style={styles.comingSoonBanner}>
        <View style={styles.bannerIcon}>
          <Text style={styles.bannerEmoji}>🚀</Text>
        </View>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Lansare în curând!</Text>
          <Text style={styles.bannerText}>
            Funcții noi: Cont personal, Statistici, Notificări și multe altele
          </Text>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuSection}>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.menuItemWrapper}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    itemIndex === 0 && styles.menuItemFirst,
                    itemIndex === section.items.length - 1 && styles.menuItemLast,
                    item.comingSoon && styles.menuItemDisabled,
                  ]}
                  activeOpacity={item.comingSoon ? 1 : 0.7}
                  onPress={item.onPress}
                  disabled={item.comingSoon}
                >
                  <View style={styles.menuIconContainer}>
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={item.comingSoon ? colors.textTertiary : colors.accent}
                    />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={[
                      styles.menuTitle,
                      item.comingSoon && styles.menuTitleDisabled,
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.comingSoon ? (
                    <View style={styles.comingSoonBadge}>
                      <Text style={styles.comingSoonText}>Soon</Text>
                    </View>
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color={colors.textTertiary}
                    />
                  )}
                </TouchableOpacity>
                {item.comingSoon && (
                  <BlurView intensity={20} style={styles.blurOverlay} tint="dark" />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
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

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  userName: {
    ...typography.title3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },

  // Coming Soon Banner
  comingSoonBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 69, 58, 0.3)',
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 69, 58, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  bannerEmoji: {
    fontSize: 24,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.headline,
    color: colors.accent,
    marginBottom: spacing.xs / 2,
  },
  bannerText: {
    ...typography.subheadline,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // Section
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontSize: 13,
    letterSpacing: 0.5,
  },

  // Menu Section
  menuSection: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItemWrapper: {
    position: 'relative',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.systemGray6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.systemGray5,
  },
  menuItemFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuItemDisabled: {
    opacity: 0.6,
  },
  menuIconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...typography.body,
    color: colors.text,
    marginBottom: 2,
  },
  menuTitleDisabled: {
    color: colors.textSecondary,
  },
  menuSubtitle: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },
  comingSoonBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    ...typography.caption2,
    color: colors.background,
    fontWeight: '600',
    fontSize: 11,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 0,
  },
});

