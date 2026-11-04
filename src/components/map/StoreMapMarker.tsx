import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MapStore } from '../../data/mapStoresData';
import { colors } from '../../theme';

interface StoreMapMarkerProps {
  store: MapStore;
  isSelected: boolean;
  onPress: (store: MapStore) => void;
}

export const StoreMapMarker: React.FC<StoreMapMarkerProps> = ({
  store,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(store)}
      style={[
        styles.markerContainer,
        {
          left: `${store.xPercent}%`,
          top: `${store.yPercent}%`,
        },
      ]}
      accessibilityLabel={`Store ${store.name}, ${store.distance}`}
    >
      <View
        style={[
          styles.markerBadge,
          isSelected && styles.markerBadgeSelected,
        ]}
      >
        <View
          style={[
            styles.storeLogoCircle,
            { backgroundColor: store.logoBg },
            isSelected && styles.storeLogoCircleSelected,
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

        <View style={styles.textWrap}>
          <Text
            style={[
              styles.storeNameText,
              isSelected && styles.storeNameTextSelected,
            ]}
            numberOfLines={1}
          >
            {store.name}
          </Text>
          <Text
            style={[
              styles.distanceText,
              isSelected && styles.distanceTextSelected,
            ]}
          >
            {store.distance}
          </Text>
        </View>
      </View>

      {/* Pointer triangle indicator */}
      <View
        style={[
          styles.trianglePointer,
          isSelected && styles.trianglePointerSelected,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 10,
  },
  markerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E6E2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    maxWidth: 160,
  },
  markerBadgeSelected: {
    backgroundColor: '#075E50',
    borderColor: '#D8F36A',
    borderWidth: 2,
    shadowColor: '#075E50',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  storeLogoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  storeLogoCircleSelected: {
    borderWidth: 1.5,
    borderColor: '#D8F36A',
  },
  storeInitial: {
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  textWrap: {
    flexShrink: 1,
  },
  storeNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  storeNameTextSelected: {
    color: '#FFFFFF',
  },
  distanceText: {
    fontSize: 9.5,
    color: colors.textMutedDark,
    fontWeight: '500',
  },
  distanceTextSelected: {
    color: '#D8F36A',
    fontWeight: '600',
  },
  trianglePointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -1,
  },
  trianglePointerSelected: {
    borderTopColor: '#075E50',
  },
});
