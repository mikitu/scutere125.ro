import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tab bar icons - SF Symbols for iOS, Ionicons for Android
function TabBarIcon({ focused, name, ioniconsName }: { focused: boolean; name: string; ioniconsName?: string }) {
  if (Platform.OS === 'android') {
    return (
      <Ionicons
        name={ioniconsName as any}
        size={24}
        color={focused ? '#FF453A' : '#8E8E93'}
      />
    );
  }

  return (
    <SymbolView
      name={name}
      size={28}
      type="hierarchical"
      tintColor={focused ? '#FF453A' : '#8E8E93'}
      animationSpec={{
        effect: {
          type: focused ? 'bounce' : 'scale',
        },
        repeating: false,
      }}
      fallback={<></>}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF453A',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          },
          android: {
            position: 'absolute',
            backgroundColor: '#1c1c1e',
            borderTopWidth: 1,
            borderTopColor: '#2c2c2e',
            elevation: 0,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        }),
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={60} tint="dark" style={{ flex: 1 }} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acasă',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="house.fill"
              ioniconsName={focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Caută',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="magnifyingglass"
              ioniconsName={focused ? 'search' : 'search-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? 'heart.fill' : 'heart'}
              ioniconsName={focused ? 'heart' : 'heart-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? 'person.fill' : 'person'}
              ioniconsName={focused ? 'person' : 'person-outline'}
            />
          ),
        }}
      />
    </Tabs>
  );
}



