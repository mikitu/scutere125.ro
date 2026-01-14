import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Ellipse, Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = spacing.lg;

// Mock data - replace with real data later
const popularScooters = [
  { id: 1, name: 'Honda PCX 125', category: 'Urban', cc: '125cc', price: '€3,499', image: '🏍️', rating: 4.8 },
  { id: 2, name: 'Yamaha NMAX 125', category: 'Urban', cc: '125cc', price: '€3,200', image: '🏍️', rating: 4.7 },
  { id: 3, name: 'Piaggio Medley 125', category: 'Urban', cc: '125cc', price: '€3,799', image: '🏍️', rating: 4.6 },
];

const newScooters = [
  { id: 4, name: 'Keeway Vieste 125', category: 'Sport', cc: '125cc', price: '€3,150', image: '🏍️', badge: 'Nou' },
  { id: 5, name: 'Siliv ViăiCity Motard', category: 'Smart', cc: '125cc', price: '€3,150', image: '🏍️', badge: 'Nou' },
  { id: 6, name: 'Aprilia SR GT 125', category: 'Sport', cc: '125cc', price: '€4,299', image: '🏍️', badge: 'Nou' },
];

// Helmet Icon Component
function HelmetIcon({ size = 40 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <SvgLinearGradient id="helmet-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#CCCCCC" stopOpacity="0.1" />
        </SvgLinearGradient>
      </Defs>

      {/* Helmet body */}
      <Ellipse cx="60" cy="65" rx="35" ry="40" fill="#E8E8E8" />
      <Ellipse cx="60" cy="65" rx="35" ry="40" fill="url(#helmet-gradient)" />

      {/* Red top stripe */}
      <Path d="M 30 45 Q 60 35 90 45 Q 90 50 60 42 Q 30 50 30 45 Z" fill="#E63946" />

      {/* Black middle stripe */}
      <Path d="M 28 55 Q 60 48 92 55 Q 92 58 60 52 Q 28 58 28 55 Z" fill="#1A1A1A" />

      {/* Red bottom stripe */}
      <Path d="M 26 65 Q 60 60 94 65 Q 94 68 60 63 Q 26 68 26 65 Z" fill="#E63946" />

      {/* Visor (dark tinted) */}
      <Ellipse cx="60" cy="60" rx="25" ry="18" fill="#1A1A1A" opacity="0.9" />

      {/* Visor highlight */}
      <Ellipse cx="55" cy="55" rx="8" ry="5" fill="#4A4A4A" opacity="0.6" />

      {/* Chin guard */}
      <Path d="M 35 85 Q 60 95 85 85 L 80 90 Q 60 98 40 90 Z" fill="#E8E8E8" />
      <Path d="M 35 85 Q 60 95 85 85 L 80 90 Q 60 98 40 90 Z" fill="url(#helmet-gradient)" />

      {/* Air vents */}
      <Ellipse cx="45" cy="70" rx="2" ry="4" fill="#1A1A1A" opacity="0.5" />
      <Ellipse cx="75" cy="70" rx="2" ry="4" fill="#1A1A1A" opacity="0.5" />
    </Svg>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo */}
        <View style={styles.header}>
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

        {/* Inline Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>50+</Text>
            <Text style={styles.statLabel}>modele</Text>
          </View>
          <Text style={styles.statDivider}>•</Text>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15+</Text>
            <Text style={styles.statLabel}>branduri</Text>
          </View>
          <Text style={styles.statDivider}>•</Text>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>★ 4.8</Text>
          </View>
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Populare</Text>
            <TouchableOpacity>
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
            {popularScooters.map((scooter, index) => (
              <ScooterCard key={scooter.id} scooter={scooter} index={index} />
            ))}
          </ScrollView>
        </View>

        {/* New Arrivals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Noutăți</Text>
            <TouchableOpacity>
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
            {newScooters.map((scooter, index) => (
              <ScooterCard key={scooter.id} scooter={scooter} index={index} isNew />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

function ScooterCard({ scooter, index, isNew = false }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFavorite, setIsFavorite] = React.useState(false);

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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.cardWrapper, index === 0 && styles.firstCard]}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.cardImageContainer}>
          <Text style={styles.cardImagePlaceholder}>{scooter.image}</Text>
          {isNew && scooter.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{scooter.badge}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
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
            {scooter.rating && (
              <Text style={styles.cardRating}>★ {scooter.rating}</Text>
            )}
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
  cardImagePlaceholder: {
    fontSize: 100,
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

