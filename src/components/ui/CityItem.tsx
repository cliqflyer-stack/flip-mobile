import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, radii } from '../../theme';

export interface CityData {
  id: string;
  name: string;
  description: string;
  selected?: boolean;
}

interface CityListCardProps {
  cities: CityData[];
  selectedId: string;
  onSelectCity: (id: string) => void;
}

export const CityListCard: React.FC<CityListCardProps> = ({
  cities,
  selectedId,
  onSelectCity,
}) => {
  return (
    <View style={styles.cardContainer}>
      {cities.map((city, index) => {
        const isSelected = city.id === selectedId;
        const isLast = index === cities.length - 1;

        return (
          <React.Fragment key={city.id}>
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => onSelectCity(city.id)}
              activeOpacity={0.7}
            >
              {/* Location Pin Icon in Soft Sage Box */}
              <View style={styles.iconBox}>
                <Ionicons name="location-outline" size={22} color={colors.primaryDark} />
              </View>

              {/* City Details */}
              <View style={styles.textContainer}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityDesc}>{city.description}</Text>
              </View>

              {/* Trailing checkmark or chevron */}
              <View style={styles.trailingContainer}>
                {isSelected ? (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                ) : (
                  <Feather name="chevron-right" size={20} color={colors.primaryDark} />
                )}
              </View>
            </TouchableOpacity>

            {!isLast && <View style={styles.separator} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E5DF',
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.sageContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  cityDesc: {
    fontSize: 13,
    color: '#6B7C74',
    fontWeight: '400',
  },
  trailingContainer: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F3EF',
    marginLeft: 62,
  },
});
