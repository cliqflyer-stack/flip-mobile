import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing } from '../../theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = true,
  contentContainerStyle,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
            {/* Home indicator bar spacer */}
            <View style={styles.homeIndicatorSpacer} />
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.staticContent, contentContainerStyle]}>
            {children}
            <View style={styles.homeIndicatorSpacer} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  staticContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  homeIndicatorSpacer: {
    height: 16,
  },
});
