import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../constants/theme';

interface ScooterLogoProps {
  size?: number;
  color?: string;
}

export function ScooterLogo({ size = 120, color = colors.primary }: ScooterLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Roată spate */}
        <Circle cx="30" cy="85" r="15" stroke={color} strokeWidth="3" fill="none" />
        <Circle cx="30" cy="85" r="3" fill={color} />
        
        {/* Roată față */}
        <Circle cx="90" cy="85" r="15" stroke={color} strokeWidth="3" fill="none" />
        <Circle cx="90" cy="85" r="3" fill={color} />
        
        {/* Cadru scuter */}
        <Path
          d="M 30 85 L 45 85 L 50 70 L 55 70 L 60 50 L 75 50 L 80 65 L 90 85"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Ghidon */}
        <Path
          d="M 75 50 L 75 35 M 70 35 L 80 35"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Șa */}
        <Path
          d="M 50 70 L 50 60 L 65 60"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Detalii 125cc */}
        <Circle cx="60" cy="60" r="8" stroke={color} strokeWidth="2" fill="none" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

