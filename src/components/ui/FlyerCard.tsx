import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme';

export interface FlyerDeal {
  title: string;
  price: string;
}

export interface FlyerCardProps {
  storeName: string;
  storeInitial: string;
  storeLogoBg: string;
  storeLogoColor?: string;
  badgeText?: string;
  badgeVariant?: 'lime' | 'dark';
  flyerSubtitle: string;
  imageSource: ImageSourcePropType;
  imageHeight?: number;
  deals?: FlyerDeal[];
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;
}

export const FlyerCard: React.FC<FlyerCardProps> = ({
  storeName,
  storeInitial,
  storeLogoBg,
  storeLogoColor = '#FFFFFF',
  badgeText,
  badgeVariant = 'lime',
  flyerSubtitle,
  imageSource,
  imageHeight = 200,
  deals = [],
  isFavorite: controlledFavorite,
  onToggleFavorite,
  onPress,
}) => {
  const [internalFavorite, setInternalFavorite] = useState(false);
  const isFav = controlledFavorite !== undefined ? controlledFavorite : internalFavorite;

  const handleFavoritePress = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    } else {
      setInternalFavorite((prev) => !prev);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.95 : 1}
      onPress={onPress}
      style={styles.cardContainer}
    >
      {/* Store Header */}
      <View style={styles.headerRow}>
        {/* Store Logo Circle */}
        <View style={[styles.storeLogoCircle, { backgroundColor: storeLogoBg }]}>
          <Text style={[styles.storeLogoText, { color: storeLogoColor }]}>
            {storeInitial}
          </Text>
        </View>

        {/* Store Meta */}
        <View style={styles.metaContainer}>
          <View style={styles.storeNameRow}>
            <Text style={styles.storeNameText}>{storeName}</Text>
            {badgeText && (
              <View
                style={[
                  styles.badgePill,
                  badgeVariant === 'dark' ? styles.badgeDark : styles.badgeLime,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    badgeVariant === 'dark' ? styles.badgeTextDark : styles.badgeTextLime,
                  ]}
                >
                  {badgeText}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitleText}>{flyerSubtitle}</Text>
        </View>

        {/* Heart Favorite Button */}
        <TouchableOpacity
          onPress={handleFavoritePress}
          activeOpacity={0.7}
          style={styles.favoriteButton}
          accessibilityLabel={`Favorite ${storeName}`}
        >
          <Feather
            name={isFav ? 'heart' : 'heart'}
            size={20}
            color={isFav ? colors.error : colors.primaryDark}
            style={isFav ? styles.filledHeart : undefined}
          />
        </TouchableOpacity>
      </View>

      {/* Flyer Image Container */}
      <View style={[styles.imageWrapper, { height: imageHeight }]}>
        <Image
          source={imageSource}
          style={styles.flyerImage}
          resizeMode="cover"
        />
      </View>

      {/* Deal Strip (Chips) */}
      {deals.length > 0 && (
        <View style={styles.dealsStrip}>
          {deals.map((deal, index) => (
            <View key={index} style={styles.dealChip}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealPrice}>{deal.price}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  storeLogoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeLogoText: {
    fontSize: 16,
    fontWeight: '800',
  },
  metaContainer: {
    flex: 1,
    marginLeft: 10,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  badgePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.full,
  },
  badgeLime: {
    backgroundColor: colors.accentLime,
  },
  badgeDark: {
    backgroundColor: colors.primaryDark,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  badgeTextLime: {
    color: colors.primaryDark,
  },
  badgeTextDark: {
    color: colors.accentLime,
  },
  subtitleText: {
    fontSize: 11,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledHeart: {
    // For visual toggle
  },
  imageWrapper: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
  },
  flyerImage: {
    width: '100%',
    height: '100%',
  },
  dealsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: colors.surfaceWhite,
  },
  dealChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.dealChipBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dealTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandRed,
  },
  dealPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryDark,
  },
});
