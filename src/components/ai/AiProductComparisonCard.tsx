import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { AiProductComparison } from '../../data/aiAssistantData';
import { colors } from '../../theme';

interface AiProductComparisonCardProps {
  product: AiProductComparison;
  onViewFlyer: (flyerId: string) => void;
  onAddToCart?: (product: AiProductComparison) => void;
}

export const AiProductComparisonCard: React.FC<AiProductComparisonCardProps> = ({
  product,
  onViewFlyer,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const handleAddToggle = () => {
    setIsAdded(!isAdded);
    if (!isAdded && onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Product Hero Info */}
      <View style={styles.productRow}>
        <View style={styles.imageBox}>
          <Image
            source={product.packshotImage}
            style={styles.packshotImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.productMeta}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.packageSizeText}>{product.packageSize}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceCurrency}>$</Text>
            <Text style={styles.priceValue}>{product.lowestPrice.toFixed(2)}</Text>
            <Text style={styles.priceCode}>{product.currency}</Text>
            <View style={styles.lowestBadge}>
              <Text style={styles.lowestBadgeText}>Lowest</Text>
            </View>
          </View>
        </View>

        {/* Add CTA */}
        <TouchableOpacity
          onPress={handleAddToggle}
          activeOpacity={0.8}
          style={[styles.addButton, isAdded && styles.addButtonActive]}
          accessibilityLabel={isAdded ? 'Added to list' : 'Add to list'}
        >
          {isAdded ? (
            <Feather name="check" size={16} color="#FFFFFF" />
          ) : (
            <Feather name="plus" size={16} color={colors.primaryDark} />
          )}
          <Text style={[styles.addText, isAdded && styles.addTextActive]}>
            {isAdded ? 'Added' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selected Best Offer Box */}
      <View style={styles.bestOfferBox}>
        <View style={styles.bestOfferHeader}>
          <View style={styles.checkCircle}>
            <Feather name="check" size={11} color="#075E50" />
          </View>
          <Text style={styles.bestOfferStore}>
            {product.bestOffer.storeName} · Markham · {product.bestOffer.distance}
          </Text>
        </View>

        <View style={styles.bestOfferSubRow}>
          <Text style={styles.flyerDatesText}>
            Flyer: {product.bestOffer.flyerDates}
          </Text>
          <Text style={styles.guaranteeText}>Best price match</Text>
        </View>
      </View>

      {/* Alternative Store Offers Toggle */}
      {product.alternatives && product.alternatives.length > 0 && (
        <View style={styles.alternativesSection}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowAlternatives(!showAlternatives)}
            style={styles.alternativesToggle}
          >
            <Text style={styles.alternativesToggleText}>
              {showAlternatives ? 'Hide alternatives' : `Compare ${product.alternatives.length + 1} stores`}
            </Text>
            <Feather
              name={showAlternatives ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={colors.textMutedDark}
            />
          </TouchableOpacity>

          {showAlternatives && (
            <View style={styles.alternativesList}>
              {product.alternatives.map((alt, index) => (
                <View key={index} style={styles.altRow}>
                  <View style={styles.altStoreMeta}>
                    <Ionicons name="storefront-outline" size={13} color={colors.textMutedDark} />
                    <Text style={styles.altStoreName}>{alt.storeName}</Text>
                    <Text style={styles.altDistance}>({alt.distance})</Text>
                  </View>
                  <Text style={styles.altPrice}>
                    ${alt.price.toFixed(2)} {alt.currency}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Footer Navigation Action */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          onPress={() => onViewFlyer(product.flyerId)}
          activeOpacity={0.7}
          style={styles.viewFlyerLink}
        >
          <Feather name="book-open" size={13} color="#075E50" />
          <Text style={styles.viewFlyerText}>View source flyer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowAlternatives(!showAlternatives)}
          activeOpacity={0.7}
          style={styles.quickCompareLink}
        >
          <Text style={styles.quickCompareText}>Compare 3 →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECEAE2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F8F8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginRight: 12,
  },
  packshotImage: {
    width: '100%',
    height: '100%',
  },
  productMeta: {
    flex: 1,
    marginRight: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: 18,
  },
  packageSizeText: {
    fontSize: 12,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
    gap: 2,
  },
  priceCurrency: {
    fontSize: 13,
    fontWeight: '700',
    color: '#075E50',
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#075E50',
    letterSpacing: -0.3,
  },
  priceCode: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMutedDark,
    marginLeft: 2,
  },
  lowestBadge: {
    backgroundColor: '#EAF7EE',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginLeft: 6,
  },
  lowestBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#075E50',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4EE',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
    gap: 4,
  },
  addButtonActive: {
    backgroundColor: '#075E50',
  },
  addText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  addTextActive: {
    color: '#FFFFFF',
  },
  bestOfferBox: {
    backgroundColor: '#F4F9F5',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DFEFE4',
    marginBottom: 8,
  },
  bestOfferHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D8F36A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestOfferStore: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  bestOfferSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingLeft: 22,
  },
  flyerDatesText: {
    fontSize: 11,
    color: colors.textMutedDark,
  },
  guaranteeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#075E50',
  },
  alternativesSection: {
    marginBottom: 8,
  },
  alternativesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  alternativesToggleText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textMutedDark,
  },
  alternativesList: {
    backgroundColor: '#FAFAF7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 4,
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  altStoreMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  altStoreName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
  altDistance: {
    fontSize: 11,
    color: colors.textMutedDark,
  },
  altPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDark,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F2EE',
    paddingTop: 10,
    marginTop: 4,
  },
  viewFlyerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewFlyerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#075E50',
  },
  quickCompareText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMutedDark,
  },
  quickCompareLink: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
