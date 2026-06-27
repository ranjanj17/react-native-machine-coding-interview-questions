import { useState } from "react";
import { View, Pressable, Text, FlatList, StyleSheet } from "react-native";

const RenderItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const renderOrder = ({ item }) => {
    return (
      <View style={styles.orderCard} key={item.id}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={styles.orderTotal}>₹{item.total}</Text>
        </View>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.card} key={item.id}>
      <Pressable onPress={() => setOpen(prev => !prev)}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
          <Text style={styles.expandIcon}>{open ? '▲' : '▼'}</Text>
        </View>
      </Pressable>

      {open && (
        <View style={styles.ordersContainer}>
          <FlatList
            data={item.orders}
            renderItem={renderOrder}
            keyExtractor={(order) => order.id}
          />
        </View>
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
  },
  phone: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  expandIcon: {
    fontSize: 18,
    color: "#bdc3c7",
  },
  ordersContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  orderCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#34495e",
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#27ae60",
  },
  orderStatus: {
    fontSize: 13,
    color: "#e67e22",
    fontWeight: "500",
  },
});