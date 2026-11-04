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
import { colors, spacing } from '../../theme';

export interface DealTicketProps {
  productImage: ImageSourcePropType;
  storeDistance: string;
  title: string;
  details: string;
  price: string;
  isAdded?: boolean;
  onAdd?: () => void;
  onPress?: () => void;
}

export const DealTicket: React.FC<DealTicketProps> = ({
  productImage,
  storeDistance,
  title,
  details,
  price,
  isAdded: controlledAdded,
  onAdd,
  onPress,
}) => {
  const [internalAdded, setInternalAdded] = useState(false);
  const isSelected = controlledAdded !== undefined ? controlledAdded : internalAdded;

  const handleAddPress = () => {
    if (onAdd) {
      onAdd();
    } else {
      setInternalAdded((prev) => !prev);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Left ticket notch */}
      <View style={styles.leftNotch} />
      {/* Right ticket notch */}
      <View style={styles.rightNotch} />

      <TouchableOpacity
        activeOpacity={onPress ? 0.9 : 1}
        onPress={onPress}
        style={styles.innerContent}
      >
        {/* Product image container */}
        <View style={styles.productImageWrapper}>
          <Image
            source={productImage}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Offer Details */}
        <View style={styles.offerDetails}>
          <Text style={styles.storeDistanceText} numberOfLines={1}>
            {storeDistance}
          </Text>
          <Text style={styles.productTitleText} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.productDetailsText} numberOfLines={1}>
            {details}
          </Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>

        {/* Action Button (plus-circle) */}
        <TouchableOpacity
          onPress={handleAddPress}
          activeOpacity={0.7}
          style={styles.actionButton}
          accessibilityLabel={`Add ${title}`}
        >
          <Feather
            name={isSelected ? 'check-circle' : 'plus-circle'}
            size={24}
            color={isSelected ? colors.primary : colors.primaryDark}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 20,
    marginBottom: spacing.md,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  leftNotch: {
    position: 'absolute',
    left: -5,
    top: '50%',
    marginTop: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  rightNotch: {
    position: 'absolute',
    right: -5,
    top: '50%',
    marginTop: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  productImageWrapper: {
    width: 68,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 68,
    height: 72,
  },
  offerDetails: {
    flex: 1,
    gap: 2,
  },
  storeDistanceText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  productTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
    lineHeight: 18,
  },
  productDetailsText: {
    fontSize: 11,
    color: colors.textMutedDark,
    lineHeight: 15,
  },
  priceText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryDark,
    marginTop: 2,
  },
  actionButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
