import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { AppHeader, Button, Input, ScreenWrapper } from '../components/ui';

interface CreateAccountScreenProps {
  onBack: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
  onNavigateToSignIn: () => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  onBack,
  onSubmit,
  onNavigateToSignIn,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenWrapper>
      {/* Top Branding (flip + YOUR EVERYDAY ADVANTAGE) + Nav back to Welcome */}
      <AppHeader onBack={onBack} backLabel="Welcome" rightAction="none" />

      {/* Screen Title */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Create an account</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitleText}>
        A little more you. Save your favourite deals and make every shop a smarter one.
      </Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Input
          label="Name"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          isPassword
          helperText="Use at least 8 characters."
        />
      </View>

      {/* Primary Action Button */}
      <View style={styles.actionSection}>
        <Button
          label="Create an account"
          showArrow
          arrowPosition="left"
          variant="primary"
          style={styles.createButton}
          onPress={() => onSubmit({ name, email })}
        />
      </View>

      {/* Legal terms disclaimer */}
      <Text style={styles.termsText}>
        By creating an account, you agree to our{' '}
        <Text style={styles.linkText}>Terms</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy.</Text>
      </Text>

      {/* Bottom Sign-In Link */}
      <View style={styles.bottomLinkContainer}>
        <Text style={styles.bottomPrompt}>
          Already have an account?{' '}
          <Text style={styles.signInLink} onPress={onNavigateToSignIn}>
            Sign in
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
  actionSection: {
    marginTop: spacing.xl,
  },
  createButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  termsText: {
    fontSize: 10.5,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 16,
    color: '#697773',
  },
  linkText: {
    color: colors.primaryDark,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomLinkContainer: {
    marginTop: spacing['4xl'],
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  bottomPrompt: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primaryDark,
  },
  signInLink: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
