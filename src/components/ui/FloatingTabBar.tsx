import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export type TabKey = 'explore' | 'list' | 'history' | 'account';

interface TabItemConfig {
  key: TabKey;
  label: string;
  iconType: 'feather' | 'materialCommunity';
  iconName: string;
}

const TABS: TabItemConfig[] = [
  { key: 'explore', label: 'Explore', iconType: 'feather', iconName: 'compass' },
  { key: 'list', label: 'List', iconType: 'materialCommunity', iconName: 'format-list-checks' },
  { key: 'history', label: 'History', iconType: 'materialCommunity', iconName: 'history' },
  { key: 'account', label: 'Account', iconType: 'feather', iconName: 'user' },
];

interface FloatingTabBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
}

export const FloatingTabBar: React.FC<FloatingTabBarProps> = ({
  activeTab = 'explore',
  onTabPress,
}) => {
  return (
    <View style={styles.dockContainer} pointerEvents="box-none">
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          const color = isActive ? colors.primary : colors.textMutedDark;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabPress?.(tab.key)}
              activeOpacity={0.8}
              style={styles.tabButton}
              accessibilityLabel={`${tab.label} tab`}
            >
              {tab.iconType === 'feather' ? (
                <Feather name={tab.iconName as any} size={20} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name={tab.iconName as any}
                  size={20}
                  color={color}
                />
              )}
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>
              {isActive ? (
                <View style={styles.activeMarker} />
              ) : (
                <View style={styles.markerPlaceholder} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.tabBarBg,
    borderRadius: 500,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 320,
    maxWidth: '90%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(220, 225, 220, 0.7)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(10px)' } as any) : {}),
  },
  tabButton: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: colors.primary,
  },
  tabLabelInactive: {
    fontWeight: '400',
    color: colors.textMutedDark,
  },
  activeMarker: {
    width: 18,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.accentLime,
    marginTop: 1,
  },
  markerPlaceholder: {
    width: 18,
    height: 3,
    marginTop: 1,
  },
});
