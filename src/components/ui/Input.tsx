import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  isPassword = false,
  containerStyle,
  style,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Ionicons name={leftIcon as any} size={20} color={colors.primaryDark} />
          </View>
        )}

        <TextInput
          style={[styles.input, leftIcon ? styles.inputWithLeftIcon : null, style]}
          placeholderTextColor="#8A9A90"
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.rightIconButton}
            onPress={() => setIsSecure(!isSecure)}
            activeOpacity={0.7}
            accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
          >
            <Feather
              name={isSecure ? 'eye' : 'eye-off'}
              size={20}
              color={colors.primaryDark}
            />
          </TouchableOpacity>
        )}
      </View>

      {helperText && !error ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    backgroundColor: colors.surfaceWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E5DF',
    paddingHorizontal: 16,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '500',
    color: colors.primaryDark,
    paddingVertical: 0,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.sm,
  },
  leftIconContainer: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    color: '#73857C',
    marginTop: 6,
    marginLeft: 2,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 6,
    marginLeft: 2,
  },
});
