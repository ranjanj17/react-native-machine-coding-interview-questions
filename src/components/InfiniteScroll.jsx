import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfiniteScroll = () => {
    const limit = 10; 
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const cachedData = await AsyncStorage.getItem('infiniteData');
            if (cachedData && page === 1) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            const response = await fetch(
                `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
            );

            const result = await response.json();

            setData(prev => {
                const updated = [...prev, ...result.products];
                AsyncStorage.setItem('infiniteData', JSON.stringify(updated));
                return updated;
            });

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handlePage = () => {
        if (!loading) {
            setPage(prev => prev + 1);
        }
    };

    const renderItems = (item) => (
        <View style={styles.item}>
            <Text style={styles.titleText} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={5}>
                {item.description}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => renderItems(item)}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                onEndReached={handlePage}
                onEndReachedThreshold={0.5}
                contentContainerStyle={styles.listContent}
                maxToRenderPerBatch={10}
                windowSize={5}
                getItemLayout={(data,index)=> ({
                    length:100,
                    offset : (102)*index,
                    index
                })}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color="#000" /> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listContent: {
        alignItems: "center",
        paddingVertical: 20,
    },
    item: {
        height: 200,
        width: "90%",
        justifyContent: 'center',
        alignItems: "center",
        padding: 15,
        marginBottom: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
    }
});

export default InfiniteScroll;