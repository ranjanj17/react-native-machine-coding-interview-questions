import {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

export default function App() {

  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${input}`);
      const data = await response.json();
      setData((prev)=>{
        return [...prev,...data.products];
      })
    }
    catch (err) {}
  }

  useEffect(()=> {
    let timer ;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      fetchData();
    },300)

    return () => {
      clearTimeout(timer)
    }
  },[input])

  const handleTextChange = (text) => {
    setInput(text);
    if(!text) {
      setData([]);
    }
  }

  const highlightText = (text,query) => {
    if(!query) return <Text style={styles.text}>{text}</Text>;

    const parts = text.split(query);

    return (
      <Text style={styles.text}> 
      {
        parts.map((part,index)=>(
          <Text key={index}>
            {part}
            {index !== parts.length-1 && (
              <Text style={styles.highlight}>
                {query}
              </Text>
            )}
          </Text>
        ))
      }
      </Text>
    )
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      
      <TextInput
        value={input}
        style={styles.input}
        placeholder="Search products..."
        placeholderTextColor="#888"
        onChangeText={(text)=>handleTextChange(text)}
      />

      <View style={styles.list}>
        {data.map((item,index)=>(
          <View key={index} style={styles.card}>
            {highlightText(item.description,input)}
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },

  list: {
    gap: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  highlight: {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  }
});