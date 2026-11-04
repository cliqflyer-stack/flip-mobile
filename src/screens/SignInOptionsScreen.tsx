import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import {
  AppHeader,
  Button,
  CalloutCard,
  ScreenWrapper,
} from '../components/ui';

interface SignInOptionsScreenProps {
  onBack: () => void;
  onContinueWithFacebook: () => void;
  onContinueWithGoogle: () => void;
  onContinueWithApple: () => void;
  onContinueWithEmail: () => void;
  onNotNow: () => void;
  onCreateAccount: () => void;
}

export const SignInOptionsScreen: React.FC<SignInOptionsScreenProps> = ({
  onBack,
  onContinueWithFacebook,
  onContinueWithGoogle,
  onContinueWithApple,
  onContinueWithEmail,
  onNotNow,
  onCreateAccount,
}) => {
  return (
    <ScreenWrapper>
      {/* Top Branding (flip + YOUR EVERYDAY ADVANTAGE) + Nav back to Welcome */}
      <AppHeader onBack={onBack} backLabel="Welcome" rightAction="none" />

      {/* Main Heading */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Good to see you again.</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitleText}>
        Sign in to keep your favourite deals, shopping lists and clever finds together.
      </Text>

      {/* Info Callout Card with Bookmark Ribbon Icon */}
      <CalloutCard
        iconName="bookmark-outline"
        title="Your savings, all in one place."
        subtitle="Pick up right where you left off."
        style={styles.callout}
      />

      {/* Social & Email Buttons Stack */}
      <View style={styles.buttonsStack}>
        <Button
          label="Continue with Facebook"
          variant="social"
          socialType="facebook"
          onPress={onContinueWithFacebook}
        />

        <Button
          label="Continue with Google"
          variant="social"
          socialType="google"
          onPress={onContinueWithGoogle}
        />

        <Button
          label="Continue with Apple"
          variant="social"
          socialType="apple"
          onPress={onContinueWithApple}
        />

        <Button
          label="Continue with email"
          variant="social"
          socialType="email"
          onPress={onContinueWithEmail}
        />
      </View>

      {/* Not now link */}
      <View style={styles.notNowContainer}>
        <Button
          label="Not now"
          variant="text"
          onPress={onNotNow}
          textStyle={styles.notNowText}
        />
      </View>

      {/* Legal terms disclaimer */}
      <Text style={styles.termsText}>
        By continuing, you agree to our{' '}
        <Text style={styles.linkText}>Terms</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy.</Text>
      </Text>

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
    marginBottom: spacing.md,
  },
  callout: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  buttonsStack: {
    gap: 4,
  },
  notNowContainer: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  notNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  termsText: {
    fontSize: 10.5,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: spacing.sm,
    color: '#697773',
  },
  linkText: {
    color: colors.primaryDark,
    textDecorationLine: 'underline',
    fontWeight: '600',
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
