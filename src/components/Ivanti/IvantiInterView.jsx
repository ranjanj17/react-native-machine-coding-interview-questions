import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData = await response.json();
      setData((prev) => [...prev, ...newData]);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const loadMoreData = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image 
          source={{ uri: item.download_url }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <Text style={styles.authorText}>
          {item.author}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop: 40, 
  },
  item: {
    display: "flex",
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 8,
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  }
});