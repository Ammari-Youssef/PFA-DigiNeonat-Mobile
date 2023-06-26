import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons , FontAwesome} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function LoginForm(props) {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = () => {
      // Perform login logic here
      

      // if (username.trim() !== '' && password.trim() !== '') {
      props.handleLogin();
      // }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        {/* username */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="doctor" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nom de l'utilisateur"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>

        {/* password */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        
      </View>
    );
  };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 8,
    width: '100%',
    borderRadius: 8,
    
  },
  button: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }, inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    
  },
  input: {
    flex: 1,
    height: 40,
  },
});
