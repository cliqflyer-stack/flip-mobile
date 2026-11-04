import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import {
  AppHeader,
  Button,
  Input,
  CalloutCard,
  ScreenWrapper,
} from '../components/ui';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSendResetLink: (email: string) => void;
  onBackToSignIn: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSendResetLink,
  onBackToSignIn,
}) => {
  const [email, setEmail] = useState('');

  return (
    <ScreenWrapper>
      {/* Top Branding (flip + YOUR EVERYDAY ADVANTAGE) + Nav back to Email sign-in */}
      <AppHeader onBack={onBack} backLabel="Email sign-in" rightAction="none" />

      {/* Screen Title */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>A fresh start.</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitleText}>
        Forgot your password? No worries. We'll help you get back to your account.
      </Text>

      {/* Hero Visual Card with Centered Mail Badge */}
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Ionicons name="mail-outline" size={28} color={colors.primaryDark} />
        </View>
        <Text style={styles.heroCardText}>
          Enter the email you use for <Text style={styles.boldBrand}>flip</Text>. We'll send you a link to reset your password.
        </Text>
      </View>

      {/* Form Field */}
      <View style={styles.formContainer}>
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Action Button */}
      <View style={styles.actionSection}>
        <Button
          label="Send reset link"
          showArrow
          arrowPosition="left"
          variant="primary"
          style={styles.sendButton}
          onPress={() => onSendResetLink(email)}
        />
      </View>

      {/* Info Notice Banner */}
      <CalloutCard
        iconName="mail-unread-outline"
        title="Keep an eye on your inbox."
        subtitle="Can't find the email? Check your spam or junk folder, too."
        style={styles.callout}
      />

      {/* Bottom Back to Sign In Link */}
      <View style={styles.bottomLinkContainer}>
        <Text style={styles.bottomPrompt}>
          Remember your password?{' '}
          <Text style={styles.backLink} onPress={onBackToSignIn}>
            Back to sign in
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
    marginBottom: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.sageContainer,
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  heroBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  heroCardText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.primaryDark,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  boldBrand: {
    fontWeight: '800',
  },
  formContainer: {
    marginTop: spacing.lg,
  },
  actionSection: {
    marginTop: spacing.lg,
  },
  sendButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
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
  backLink: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
