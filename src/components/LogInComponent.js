import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const LogInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    if (!email || !password) {
        console.log("I am here")
        alert(`Error: Please enter both Email and Password`)
      return;
    }
    console.log("Logged in with:", email);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Log In</Text>
      
      <TextInput 
        placeholder="Email" 
        style={styles.input}
        value={email} 
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)} 
      />
      
      <TextInput 
        placeholder="Password" 
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)} 
      />

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '90%',        
    maxWidth: 400, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default LogInComponent;