import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const DEVICE_ID_KEY = '@scutere125_device_id';

/**
 * Generate a unique device ID
 */
function generateDeviceId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const platform = Platform.OS;
  return `${platform}-${timestamp}-${random}`;
}

/**
 * Get or create device ID
 * This ID persists across app sessions and is used to identify the device
 */
export async function getDeviceId(): Promise<string> {
  try {
    // Try to get existing device ID
    let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
      // Generate new device ID
      deviceId = generateDeviceId();
      await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  } catch (error) {
    console.error('Error getting device ID:', error);
    // Fallback to a temporary ID if storage fails
    return generateDeviceId();
  }
}

/**
 * Get device info for analytics/debugging
 */
export async function getDeviceInfo() {
  try {
    const deviceId = await getDeviceId();

    return {
      deviceId,
      platform: Platform.OS,
      platformVersion: Platform.Version?.toString() || 'unknown',
      appVersion: Constants.expoConfig?.version || '1.0.0',
      appName: Constants.expoConfig?.name || 'Scutere125',
    };
  } catch (error) {
    console.error('Error getting device info:', error);
    return {
      deviceId: await getDeviceId(),
      platform: Platform.OS,
    };
  }
}

