import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../theme';
import {
  AppHeader,
  Button,
  Input,
  CalloutCard,
  ScreenWrapper,
} from '../components/ui';

interface EmailSignInScreenProps {
  onBack: () => void;
  onSignIn: (data: { email: string }) => void;
  onForgotPassword: () => void;
  onUseAnotherMethod: () => void;
  onCreateAccount: () => void;
}

export const EmailSignInScreen: React.FC<EmailSignInScreenProps> = ({
  onBack,
  onSignIn,
  onForgotPassword,
  onUseAnotherMethod,
  onCreateAccount,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenWrapper>
      {/* Top Branding (flip + YOUR EVERYDAY ADVANTAGE) + Nav back to Sign-in options */}
      <AppHeader onBack={onBack} backLabel="Sign-in options" rightAction="none" />

      {/* Screen Title */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Sign in with email</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitleText}>
        Your next great find is waiting. Let's get you back to your savings.
      </Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={onForgotPassword}
          activeOpacity={0.7}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Sign In Button */}
      <View style={styles.actionSection}>
        <Button
          label="Sign in"
          showArrow
          arrowPosition="left"
          variant="primary"
          style={styles.signInButton}
          onPress={() => onSignIn({ email })}
        />

        {/* Use another sign-in method link */}
        <Button
          label="Use another sign-in method"
          variant="text"
          onPress={onUseAnotherMethod}
          textStyle={styles.useAnotherMethodText}
        />
      </View>

      {/* Bottom Info Banner */}
      <CalloutCard
        iconName="bookmark-outline"
        title="Your favourites are waiting."
        subtitle="Saved items and shopping lists will be right here."
        style={styles.callout}
      />

      {/* Bottom Create Account Link */}
      <View style={styles.bottomLinkContainer}>
        <Text style={styles.bottomPrompt}>
          New to flip?{' '}
          <Text style={styles.createAccountLink} onPress={onCreateAccount}>
            Create an account
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    color: colors.primaryDark,
    letterSpacing: -0.4,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.primaryDark,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  formContainer: {
    gap: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  actionSection: {
    marginTop: spacing.md,
    gap: 6,
  },
  signInButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  useAnotherMethodText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  callout: {
    marginTop: spacing.xl,
  },
  bottomLinkContainer: {
    marginTop: spacing['3xl'],
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  bottomPrompt: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primaryDark,
  },
  createAccountLink: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
