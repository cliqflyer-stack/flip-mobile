import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';
import { IconBadge } from './Badge';

interface CalloutCardProps {
  iconName: string;
  iconType?: 'feather' | 'ionicons' | 'materialCommunity';
  title: string;
  subtitle: string;
  style?: ViewStyle;
}

export const CalloutCard: React.FC<CalloutCardProps> = ({
  iconName,
  iconType = 'ionicons',
  title,
  subtitle,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <IconBadge
        iconName={iconName}
        iconType={iconType}
        size={50}
        iconSize={22}
        backgroundColor={colors.accentLime}
        iconColor={colors.primaryDark}
        shape="circle"
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

interface HintBannerProps {
  iconName: string;
  text: string;
  style?: ViewStyle;
}

export const HintBanner: React.FC<HintBannerProps> = ({
  iconName,
  text,
  style,
}) => {
  return (
    <View style={[styles.hintContainer, style]}>
      <IconBadge
        iconName={iconName}
        iconType="ionicons"
        size={24}
        iconSize={13}
        backgroundColor="transparent"
        iconColor={colors.textSecondary}
        shape="circle"
      />
      <Text style={styles.hintText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sageContainer,
    borderRadius: 22,
    padding: 16,
    marginVertical: 12,
  },
  icon: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: 20,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6B7C74',
    lineHeight: 18,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 2,
  },
  hintText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
    marginLeft: 6,
    lineHeight: 16,
  },
});
