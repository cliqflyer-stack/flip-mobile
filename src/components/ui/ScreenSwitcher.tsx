import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, radii, spacing } from '../../theme';

export type ScreenId =
  | 'welcome'
  | 'neighborhood'
  | 'create_account'
  | 'sign_in_options'
  | 'email_sign_in'
  | 'forgot_password'
  | 'explore'
  | 'store_flyer'
  | 'map'
  | 'ai';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; label: string }[] = [
  { id: 'welcome', label: '1. Welcome' },
  { id: 'neighborhood', label: '2. Location' },
  { id: 'create_account', label: '3. Create' },
  { id: 'sign_in_options', label: '4. Options' },
  { id: 'email_sign_in', label: '5. Email' },
  { id: 'forgot_password', label: '6. Reset' },
  { id: 'explore', label: '7. Explore' },
  { id: 'store_flyer', label: '8. Store Flyer' },
  { id: 'map', label: '9. Map' },
  { id: 'ai', label: '10. AI Concierge' },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const activeLabel = SCREENS.find((s) => s.id === currentScreen)?.label || currentScreen;

  if (collapsed) {
    return (
      <View style={styles.collapsedWrap}>
        <TouchableOpacity
          onPress={() => setCollapsed(false)}
          activeOpacity={0.8}
          style={styles.collapsedPill}
          accessibilityLabel="Expand screen switcher"
        >
          <View style={styles.collapsedBadge}>
            <Text style={styles.collapsedDot}>●</Text>
            <Text style={styles.collapsedText}>{activeLabel}</Text>
          </View>
          <Text style={styles.collapsedAction}>Tap to switch ▾</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleGroup}>
          <Text style={styles.titleDot}>●</Text>
          <Text style={styles.titleText}>UI Showcase</Text>
          <View style={styles.badgeWrap}>
            <Text style={styles.countBadge}>{SCREENS.length} Screens</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setCollapsed(true)}
          activeOpacity={0.7}
          style={styles.hideButton}
          accessibilityLabel="Hide screen switcher"
        >
          <Text style={styles.hideButtonText}>Hide bar ▴</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.floatingBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {SCREENS.map((s) => {
            const isActive = s.id === currentScreen;
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => onSelectScreen(s.id)}
                activeOpacity={0.8}
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    zIndex: 999,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginBottom: 4,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleDot: {
    fontSize: 8,
    color: '#10B981', // Live green dot
  },
  titleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
    letterSpacing: 0.2,
  },
  badgeWrap: {
    backgroundColor: colors.sageContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.full,
  },
  countBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  hideButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  hideButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMutedDark,
  },
  floatingBar: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: radii.full,
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: colors.textInverse,
  },
  collapsedWrap: {
    position: 'absolute',
    top: 4,
    alignSelf: 'center',
    zIndex: 9999,
  },
  collapsedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  collapsedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  collapsedDot: {
    fontSize: 8,
    color: '#10B981',
  },
  collapsedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  collapsedAction: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
});
