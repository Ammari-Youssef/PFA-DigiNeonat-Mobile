import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons , FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export default function LoginForm(props) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

  const authenticate = async () => {
    try {
      const response = await axios.post('https://localhost:4430/auth', {
        email: email,
        password: password
      });

      // Handle the response
      console.log(response.data); // Access the response data
      console.log(response.status); // Access the response status code

      if (response.status === 200) {
        props.handleLogin()
      }

    } catch (error) {
      // Handle errors
      console.error(error);
      
    }
  };

    const handleLogin = () => {
      // Perform login logic here
      

      // if (email.trim() !== '' && password.trim() !== '') {
      props.handleLogin();
      // }

      // authenticate()
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        {/* email */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="doctor" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nom de l'utilisateur"
            onChangeText={(text) => setEmail(text)}
            value={email}
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
