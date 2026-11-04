import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing, radii } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'social' | 'outline' | 'text';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: string;
  showArrow?: boolean;
  arrowPosition?: 'left' | 'right';
  socialType?: 'facebook' | 'google' | 'apple' | 'email';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  iconName,
  showArrow = false,
  arrowPosition = 'left',
  socialType,
  loading = false,
  disabled = false,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isSocial = variant === 'social';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const renderSocialIcon = () => {
    switch (socialType) {
      case 'facebook':
        return (
          <View style={styles.socialIconContainer}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </View>
        );
      case 'google':
        return (
          <View style={styles.socialIconContainer}>
            <AntDesign name="google" size={20} color="#EA4335" />
          </View>
        );
      case 'apple':
        return (
          <View style={styles.socialIconContainer}>
            <Ionicons name="logo-apple" size={22} color="#000000" />
          </View>
        );
      case 'email':
        return (
          <View style={styles.socialIconContainer}>
            <Feather name="mail" size={20} color={colors.primaryDark} />
          </View>
        );
      default:
        return null;
    }
  };

  if (isText) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={[styles.textButton, style]}
      >
        <Text style={[styles.textButtonLabel, textStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isSocial && styles.social,
        isOutline && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.textInverse : colors.primary} />
      ) : (
        <View style={styles.contentRow}>
          {isSocial && renderSocialIcon()}

          {iconName && !isSocial && (
            <Ionicons
              name={iconName as any}
              size={18}
              color={isPrimary ? colors.textInverse : colors.primary}
              style={styles.leadingIcon}
            />
          )}

          {showArrow && arrowPosition === 'left' && (
            <Ionicons
              name="arrow-forward"
              size={18}
              color={isPrimary ? colors.textInverse : colors.primary}
              style={styles.leadingArrow}
            />
          )}

          <Text
            style={[
              styles.label,
              isPrimary && styles.labelPrimary,
              (isSecondary || isSocial || isOutline) && styles.labelSecondary,
              textStyle,
            ]}
          >
            {label}
          </Text>

          {showArrow && arrowPosition === 'right' && (
            <Ionicons
              name="arrow-forward"
              size={18}
              color={isPrimary ? colors.textInverse : colors.primary}
              style={styles.trailingArrow}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: '#075E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  secondary: {
    backgroundColor: colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#E0E5DF',
  },
  social: {
    backgroundColor: colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#E0E5DF',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  textButton: {
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  socialIconContainer: {
    position: 'absolute',
    left: 18,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadingIcon: {
    marginRight: spacing.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelPrimary: {
    color: colors.textInverse,
  },
  labelSecondary: {
    color: colors.primary,
  },
  leadingArrow: {
    marginRight: spacing.sm,
  },
  trailingArrow: {
    marginLeft: spacing.sm,
  },
});
