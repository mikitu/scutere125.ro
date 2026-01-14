import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const menuSections = [
    {
      items: [
        { icon: 'settings-outline', title: 'Setări', subtitle: 'Preferințe aplicație' },
        { icon: 'notifications-outline', title: 'Notificări', subtitle: 'Gestionează alertele' },
      ],
    },
    {
      items: [
        { icon: 'bar-chart-outline', title: 'Statistici', subtitle: 'Activitatea ta' },
        { icon: 'heart-outline', title: 'Favorite', subtitle: 'Scuterele tale' },
      ],
    },
    {
      items: [
        { icon: 'help-circle-outline', title: 'Ajutor', subtitle: 'Suport și FAQ' },
        { icon: 'information-circle-outline', title: 'Despre', subtitle: 'Versiune 1.0.0' },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
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
        <Text style={styles.userName}>Scooter Enthusiast</Text>
        <Text style={styles.userEmail}>user@scutere125.ro</Text>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={[
                styles.menuItem,
                itemIndex === 0 && styles.menuItemFirst,
                itemIndex === section.items.length - 1 && styles.menuItemLast,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={colors.accent}
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.textTertiary}
              />
            </TouchableOpacity>
          ))}
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
    paddingTop: spacing.md,
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

  // Menu Section
  menuSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.systemGray6,
    borderRadius: 12,
    overflow: 'hidden',
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
  menuSubtitle: {
    ...typography.subheadline,
    color: colors.textSecondary,
  },
});

