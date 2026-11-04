import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { MapStore } from '../../data/mapStoresData';
import { colors } from '../../theme';

interface StoreDetailPreviewSheetProps {
  store: MapStore;
  onClose: () => void;
  onViewFlyer: (store: MapStore) => void;
  onDirections?: (store: MapStore) => void;
}

export const StoreDetailPreviewSheet: React.FC<StoreDetailPreviewSheetProps> = ({
  store,
  onClose,
  onViewFlyer,
  onDirections,
}) => {
  return (
    <View style={styles.sheetContainer}>
      {/* Top Grabber */}
      <View style={styles.grabberContainer}>
        <View style={styles.grabberBar} />
      </View>

      {/* Store Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.storeMetaGroup}>
          <View
            style={[
              styles.storeLogoCircle,
              { backgroundColor: store.logoBg },
            ]}
          >
            <Text
              style={[
                styles.storeInitial,
                { color: store.logoColor || '#FFFFFF' },
              ]}
            >
              {store.initial}
            </Text>
          </View>

          <View style={styles.storeTitleGroup}>
            <View style={styles.storeBadgeRow}>
              <Text style={styles.storeName}>{store.name}</Text>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryText}>{store.category}</Text>
              </View>
            </View>
            <Text style={styles.distanceSubtext}>
              {store.distance} away · Markham
            </Text>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          activeOpacity={0.7}
          accessibilityLabel="Close store details"
        >
          <Feather name="x" size={18} color={colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Address & Hours */}
      <View style={styles.infoRow}>
        <Feather name="map-pin" size={14} color={colors.textMutedDark} style={styles.infoIcon} />
        <Text style={styles.addressText} numberOfLines={1}>
          {store.address}
        </Text>
        <TouchableOpacity
          onPress={() => onDirections?.(store)}
          activeOpacity={0.7}
          style={styles.directionsButton}
        >
          <Ionicons name="navigate-outline" size={13} color="#075E50" />
          <Text style={styles.directionsText}>Directions</Text>
        </TouchableOpacity>
      </View>

      {/* Flyer Feature Card */}
      <View style={styles.flyerCard}>
        <Image
          source={store.flyer.thumbnail}
          style={styles.flyerThumbnail}
          resizeMode="cover"
        />

        <View style={styles.flyerInfo}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>THIS WEEK'S FLYER</Text>
          </View>
          <Text style={styles.flyerTitle} numberOfLines={2}>
            {store.flyer.title}
          </Text>
          <Text style={styles.flyerDates}>{store.flyer.validDates}</Text>

          <View style={styles.dealsCounterRow}>
            <Ionicons name="pricetag" size={12} color="#075E50" />
            <Text style={styles.dealsCountText}>{store.flyer.dealCount} deals inside</Text>
          </View>
        </View>
      </View>

      {/* Primary Action Button */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => onViewFlyer(store)}
        activeOpacity={0.88}
        accessibilityLabel={`View flyer & deals for ${store.name}`}
      >
        <Text style={styles.ctaButtonText}>View flyer & deals →</Text>
      </TouchableOpacity>

      {/* Disclaimer */}
      <Text style={styles.disclaimerText}>
        Sample flyer · Demo offers, not live prices
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  grabberContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  grabberBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDE2DD',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 12,
  },
  storeMetaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeInitial: {
    fontSize: 16,
    fontWeight: '800',
  },
  storeTitleGroup: {
    flex: 1,
  },
  storeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: -0.3,
  },
  categoryPill: {
    backgroundColor: '#EBF4F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#075E50',
  },
  distanceSubtext: {
    fontSize: 13,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F2F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 14,
  },
  infoIcon: {
    marginRight: 6,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    color: colors.textMutedDark,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#EBF4F0',
    borderRadius: 6,
  },
  directionsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#075E50',
  },
  flyerCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F6F2',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECEAE2',
  },
  flyerThumbnail: {
    width: 64,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  flyerInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F0EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#075E50',
    letterSpacing: 0.5,
  },
  flyerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 4,
    lineHeight: 18,
  },
  flyerDates: {
    fontSize: 11.5,
    color: colors.textMutedDark,
    marginBottom: 6,
  },
  dealsCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealsCountText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#075E50',
  },
  ctaButton: {
    backgroundColor: '#075E50',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#075E50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#8C938E',
    textAlign: 'center',
    marginTop: 2,
  },
});
