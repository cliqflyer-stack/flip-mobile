import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Product } from '../../data/flyerData';
import { colors, radii, spacing } from '../../theme';
import { Button } from '../ui/Button';

interface ProductBottomSheetProps {
  product: Product | null;
  onClose: () => void;
  onAddToList?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

export const ProductBottomSheet: React.FC<ProductBottomSheetProps> = ({
  product,
  onClose,
  onAddToList,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const discountPercent =
    product.regularPrice > 0
      ? Math.max(0, Math.round((1 - product.offerPrice / product.regularPrice) * 100))
      : 0;

  const handleFavoritePress = () => {
    setIsFavorite((prev) => !prev);
    onToggleFavorite?.(product);
  };

  const handleAddPress = () => {
    setIsAdded(true);
    onAddToList?.(product);
  };

  return (
    <Modal
      transparent
      visible={Boolean(product)}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheetContainer} onPress={(e) => e.stopPropagation()}>
          {/* Top Drag Handle */}
          <View style={styles.handleBar} />

          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.titleMeta}>
              <Text style={styles.categoryBrandText}>
                {product.brand.toUpperCase()} · {product.category.toUpperCase()}
              </Text>
              <Text style={styles.productTitleText} numberOfLines={2}>
                {product.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={styles.closeButton}
              accessibilityLabel="Close product details"
            >
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Product Info Row */}
          <View style={styles.bodyRow}>
            {/* Product Image Card */}
            <View style={styles.imageCard}>
              <Image
                source={product.image}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>

            {/* Description & Price Column */}
            <View style={styles.detailsColumn}>
              <Text style={styles.descriptionText} numberOfLines={3}>
                {product.description}
              </Text>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text style={styles.offerPriceText}>
                  ${product.offerPrice.toFixed(2)}
                </Text>
                <Text style={styles.regularPriceText}>
                  ${product.regularPrice.toFixed(2)}
                </Text>
                {discountPercent > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>
                      {discountPercent}% OFF
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Actions Footer */}
          <View style={styles.actionsFooter}>
            <View style={styles.addToListWrapper}>
              <Button
                label={isAdded ? 'Added to list ✓' : 'Add to shopping list'}
                variant="primary"
                onPress={handleAddPress}
                style={isAdded ? styles.addedButton : undefined}
              />
            </View>

            {/* Favorite Heart CTA */}
            <TouchableOpacity
              onPress={handleFavoritePress}
              activeOpacity={0.7}
              style={[
                styles.favoriteButton,
                isFavorite && styles.favoriteButtonActive,
              ]}
              accessibilityLabel="Add to favourites"
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? colors.brandRed : colors.primaryDark}
              />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: colors.surfaceWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDE3DA',
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleMeta: {
    flex: 1,
    marginRight: 12,
  },
  categoryBrandText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  productTitleText: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.primaryDark,
    lineHeight: 24,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  imageCard: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsColumn: {
    flex: 1,
    gap: 8,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  offerPriceText: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
  },
  regularPriceText: {
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.dealChipBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
  },
  discountBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.brandRed,
  },
  actionsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addToListWrapper: {
    flex: 1,
  },
  addedButton: {
    backgroundColor: colors.primaryDark,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceWhite,
  },
  favoriteButtonActive: {
    borderColor: colors.dealChipBg,
    backgroundColor: colors.dealChipBg,
  },
});
