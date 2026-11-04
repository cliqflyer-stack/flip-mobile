import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import {
  AppHeader,
  Button,
  Input,
  CityListCard,
  CityData,
  ScreenWrapper,
} from '../components/ui';

interface NeighborhoodScreenProps {
  onBack: () => void;
  onExplore: (cityName: string) => void;
}

const DEFAULT_CITIES: CityData[] = [
  {
    id: 'markham',
    name: 'Markham, ON',
    description: 'Selected • 10 km shopping radius',
  },
  {
    id: 'brantford',
    name: 'Brantford, ON',
    description: 'Explore offers in another city',
  },
];

export const NeighborhoodScreen: React.FC<NeighborhoodScreenProps> = ({
  onBack,
  onExplore,
}) => {
  const [selectedCityId, setSelectedCityId] = useState('markham');
  const [postalCode, setPostalCode] = useState('L3R 0G5');

  const selectedCity = DEFAULT_CITIES.find((c) => c.id === selectedCityId) || DEFAULT_CITIES[0];

  return (
    <ScreenWrapper>
      {/* Top Header with SET YOUR NEIGHBOURHOOD and More icon */}
      <AppHeader
        showLogo={false}
        onBack={onBack}
        title="SET YOUR NEIGHBOURHOOD"
        rightAction="more"
        onRightPress={() => {}}
      />

      {/* Main Heading */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Savings start</Text>
        <Text style={styles.titleText}>close to home.</Text>
      </View>

      {/* Prominent Lime Squircle Pin Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.squircleBadge}>
          <Ionicons name="location-outline" size={38} color={colors.primaryDark} />
        </View>
      </View>

      {/* Subtitle description */}
      <Text style={styles.descriptionText}>
        Choose a city to discover flyers and compare local offers. You can switch anytime.
      </Text>

      {/* "Use my current location" GPS Button */}
      <Button
        label="Use my current location"
        variant="secondary"
        iconName="locate-outline"
        onPress={() => {
          setSelectedCityId('markham');
          setPostalCode('L3R 0G5');
        }}
        style={styles.gpsButton}
        textStyle={styles.gpsButtonText}
      />

      {/* Postal Code Input Section */}
      <View style={styles.inputSection}>
        <Input
          label="Or enter a Canadian postal code"
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="e.g. L3R 0G5"
          leftIcon="location-outline"
          autoCapitalize="characters"
        />
      </View>

      {/* City Options List Card */}
      <CityListCard
        cities={DEFAULT_CITIES}
        selectedId={selectedCityId}
        onSelectCity={setSelectedCityId}
      />

      {/* Hint Note with info icon */}
      <View style={styles.hintContainer}>
        <Feather name="info" size={15} color="#73857C" style={styles.hintIcon} />
        <Text style={styles.hintText}>
          Demo neighbourhoods. Store markers are illustrative, not verified branch locations.
        </Text>
      </View>

      {/* Primary Action Button */}
      <View style={styles.actionSection}>
        <Button
          label={`Explore ${selectedCity.name.split(',')[0]}`}
          showArrow
          arrowPosition="left"
          variant="primary"
          style={styles.exploreButton}
          onPress={() => onExplore(selectedCity.name)}
        />
      </View>

      {/* Privacy Footnote */}
      <Text style={styles.footnote}>
        Location helps us sort nearby deals. Your precise location is never shared with stores.
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    color: colors.primaryDark,
    letterSpacing: -0.4,
  },
  badgeContainer: {
    marginVertical: spacing.sm,
  },
  squircleBadge: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    color: colors.primaryDark,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  gpsButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#D8DFD7',
    marginBottom: spacing.xs,
  },
  gpsButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  inputSection: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: spacing.lg,
    paddingHorizontal: 2,
  },
  hintIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  hintText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#73857C',
    flex: 1,
  },
  actionSection: {
    marginTop: spacing.xs,
  },
  exploreButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  footnote: {
    fontSize: 10.5,
    lineHeight: 15,
    color: '#697773',
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
});
