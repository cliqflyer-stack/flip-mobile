import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BasketSummary } from '../../data/aiAssistantData';

interface AiBasketCardProps {
  basket: BasketSummary;
  onAddAllToList: () => void;
  onSaveToHistory?: () => void;
}

export const AiBasketCard: React.FC<AiBasketCardProps> = ({
  basket,
  onAddAllToList,
  onSaveToHistory,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="cart" size={18} color="#D8F36A" />
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={styles.title}>Your basket, sorted.</Text>
          <Text style={styles.subtitle}>
            {basket.itemCount} items · {basket.storesCount} stores
          </Text>
        </View>
      </View>

      {/* Itemized List */}
      <View style={styles.itemsListContainer}>
        {basket.items.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <View style={styles.itemMeta}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemStore}>{item.storeName}</Text>
            </View>
            <Text style={styles.itemPrice}>
              ${item.price.toFixed(2)} {basket.currency}
            </Text>
          </View>
        ))}
      </View>

      {/* Total Section */}
      <View style={styles.totalRow}>
        <View>
          <Text style={styles.totalLabel}>Estimated total</Text>
          <Text style={styles.totalDisclaimer}>
            Excl. taxes & bottle deposits
          </Text>
        </View>
        <Text style={styles.totalAmount}>
          ${basket.totalPrice.toFixed(2)} {basket.currency}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsGroup}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onAddAllToList}
          activeOpacity={0.88}
          accessibilityLabel="Add all items to shopping list"
        >
          <Feather name="check-circle" size={16} color="#D8F36A" style={styles.btnIcon} />
          <Text style={styles.primaryBtnText}>
            Add all {basket.itemCount} to shopping list
          </Text>
        </TouchableOpacity>

        {onSaveToHistory && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={onSaveToHistory}
            activeOpacity={0.8}
            accessibilityLabel="Save picks to history"
          >
            <Feather name="bookmark" size={15} color="#075E50" style={styles.btnIcon} />
            <Text style={styles.secondaryBtnText}>
              Save {basket.itemCount} picks to history
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#D8F36A',
    borderRadius: 20,
    padding: 18,
    marginVertical: 14,
    shadowColor: '#075E50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#075E50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#075E50',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A4D43',
    marginTop: 2,
  },
  itemsListContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(7, 94, 80, 0.08)',
  },
  itemMeta: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#075E50',
  },
  itemStore: {
    fontSize: 10.5,
    color: '#1A4D43',
  },
  itemPrice: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#075E50',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#075E50',
  },
  totalDisclaimer: {
    fontSize: 10,
    color: '#245C51',
    marginTop: 2,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#075E50',
    letterSpacing: -0.5,
  },
  actionsGroup: {
    gap: 8,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#075E50',
    paddingVertical: 13,
    borderRadius: 24,
    shadowColor: '#075E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  btnIcon: {
    marginRight: 6,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#D8F36A',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 11,
    borderRadius: 24,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#075E50',
  },
});
