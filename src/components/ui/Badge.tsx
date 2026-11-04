import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, radii } from '../../theme';

interface ChipProps {
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({ label, style, textStyle }) => {
  return (
    <View style={[styles.chipContainer, style]}>
      <Text style={[styles.chipText, textStyle]}>{label}</Text>
    </View>
  );
};

interface IconBadgeProps {
  iconName: string;
  iconType?: 'feather' | 'ionicons' | 'materialCommunity';
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  iconColor?: string;
  shape?: 'circle' | 'squircle';
  style?: ViewStyle;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  iconName,
  iconType = 'ionicons',
  size = 48,
  iconSize = 22,
  backgroundColor = colors.accentLime,
  iconColor = colors.primaryDark,
  shape = 'circle',
  style,
}) => {
  const borderRadius = shape === 'circle' ? size / 2 : radii.lg;

  const renderIcon = () => {
    switch (iconType) {
      case 'feather':
        return <Feather name={iconName as any} size={iconSize} color={iconColor} />;
      case 'materialCommunity':
        return <MaterialCommunityIcons name={iconName as any} size={iconSize} color={iconColor} />;
      default:
        return <Ionicons name={iconName as any} size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View
      style={[
        styles.iconBadge,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      {renderIcon()}
    </View>
  );
};

interface HeroStickerProps {
  style?: ViewStyle;
}

export const HeroSticker: React.FC<HeroStickerProps> = ({ style }) => {
  return (
    <View style={[styles.heroSticker, style]}>
      <Text style={styles.heroStickerMore}>more</Text>
      <Text style={styles.heroStickerLess}>for less.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: colors.accentLime,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  iconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSticker: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  heroStickerMore: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primaryDark,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  heroStickerLess: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primaryDark,
    marginTop: 1,
  },
});
