import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';

// SF Symbols for tab bar icons with animation
function TabBarIcon({ focused, name }: { focused: boolean; name: string }) {
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
            height: 60,
            paddingBottom: 8,
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
            <TabBarIcon focused={focused} name="house.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Caută',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="magnifyingglass" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={focused ? 'heart.fill' : 'heart'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={focused ? 'person.fill' : 'person'} />
          ),
        }}
      />
    </Tabs>
  );
}



