import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { colors, typography, spacing, radii } from '../theme';
import {
  AppHeader,
  Button,
  Chip,
  HeroSticker,
  ScreenWrapper,
} from '../components/ui';

interface WelcomeScreenProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
  onContinueAsGuest: () => void;
}

const { width } = Dimensions.get('window');

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onCreateAccount,
  onSignIn,
  onContinueAsGuest,
}) => {
  return (
    <ScreenWrapper>
      {/* Branding Header with Bell notification */}
      <AppHeader rightAction="bell" onRightPress={() => {}} />

      {/* Main Hero Display Heading */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>A little flip.</Text>
        <Text style={styles.titleText}>A lot of savings.</Text>
      </View>

      {/* Hero Visual Card with High-Res Grocery Image & "more for less" Sticker */}
      <View style={styles.heroCardContainer}>
        <View style={styles.heroImageWrapper}>
          <Image
            source={require('../../assets/images/hero_grocery.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <HeroSticker style={styles.heroSticker} />
        </View>
      </View>

      {/* Description copy */}
      <Text style={styles.descriptionText}>
        Your neighbourhood deals, weekly flyers and a clever little shopping companion.
      </Text>

      {/* Feature Pills */}
      <View style={styles.chipsRow}>
        <Chip label="Find nearby" />
        <Chip label="Compare smarter" />
        <Chip label="Save your picks" />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button
          label="Create an account"
          showArrow
          arrowPosition="left"
          variant="primary"
          style={styles.primaryButton}
          onPress={onCreateAccount}
        />

        <Button
          label="Sign in"
          variant="secondary"
          style={styles.secondaryButton}
          onPress={onSignIn}
        />

        <Button
          label="Just browsing? Continue as guest"
          variant="text"
          style={styles.guestButton}
          textStyle={styles.guestButtonText}
          onPress={onContinueAsGuest}
        />
      </View>

      {/* Legal & Reference Footnote */}
      <Text style={styles.footnote}>
        By continuing, you agree to our Terms & Privacy Policy. Concept experience • all displayed offers are illustrative.
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    color: colors.primaryDark,
    letterSpacing: -0.4,
  },
  heroCardContainer: {
    backgroundColor: colors.sageContainer,
    borderRadius: 28,
    padding: 12,
    marginVertical: spacing.xs,
    height: 260,
  },
  heroImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroSticker: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.primaryDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.lg,
  },
  actionSection: {
    gap: 10,
    marginTop: spacing.xs,
  },
  primaryButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#D8DFD7',
  },
  guestButton: {
    paddingVertical: spacing.xs,
  },
  guestButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  footnote: {
    fontSize: 10.5,
    lineHeight: 15,
    color: '#697773',
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
});
