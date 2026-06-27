import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList, Pressable, Modal } from 'react-native';
import RenderItem from "./RenderItem.jsx";

const customers = [
    {
        id: "c1",
        name: "Aarav Sharma",
        phone: "9876543210",
        orders: [
            {
                id: "o1",
                title: "Burger Combo",
                status: "Preparing",
                total: 299,
                items: [
                    { id: "i1", name: "Cheese Burger", quantity: 1, price: 149 },
                    { id: "i2", name: "Fries", quantity: 1, price: 80 },
                    { id: "i3", name: "Cold Coffee", quantity: 1, price: 70 }
                ]
            },
            {
                id: "o2",
                title: "Pizza Meal",
                status: "Delivered",
                total: 399,
                items: [
                    { id: "i4", name: "Margherita Pizza", quantity: 1, price: 299 },
                    { id: "i5", name: "Garlic Bread", quantity: 1, price: 100 }
                ]
            }
        ]
    },
    {
        id: "c2",
        name: "Meera Nair",
        phone: "9988776655",
        orders: [
            {
                id: "o3",
                title: "South Indian Breakfast",
                status: "Out for Delivery",
                total: 180,
                items: [
                    { id: "i6", name: "Masala Dosa", quantity: 1, price: 120 },
                    { id: "i7", name: "Filter Coffee", quantity: 1, price: 60 }
                ]
            }
        ]
    },
    {
        id: "c3",
        name: "Kabir Malhotra",
        phone: "9012345678",
        orders: [
            {
                id: "o4",
                title: "Biryani Order",
                status: "Delivered",
                total: 260,
                items: [
                    { id: "i8", name: "Chicken Biryani", quantity: 1, price: 220 },
                    { id: "i9", name: "Raita", quantity: 1, price: 40 }
                ]
            }
        ]
    }
];

export default function Customers() {
    const [isClicked, setIsClicked] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <RenderItem item={item} />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title={"Click to Open Customers"} onPress={() => setIsClicked((prev) => !prev)} color="#4A90E2" />
            </View>
            {isClicked &&
                <Modal animationType="slide" transparent={true} visible={isClicked}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Customer List</Text>
                            <FlatList
                                data={customers}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                style={styles.flatList}
                            />
                            <View style={styles.closeButtonContainer}>
                                <Button
                                    color={"#E24A4A"}
                                    title={"Close Modal"}
                                    onPress={() => setIsClicked((prev) => !prev)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f7fa',
        padding: 16,
    },
    buttonContainer: {
        marginVertical: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 40,
        height: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    flatList: {
        marginBottom: 16,
    },
    closeButtonContainer: {
        borderRadius: 8,
        height: 50,
        width: 150,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});