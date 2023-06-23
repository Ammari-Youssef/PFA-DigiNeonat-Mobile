import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import LoginForm from '../componenents/Login'

export default function LoginPage(props) {
  const handleLogin = props.route.params.handleLogin;

  return (
    <View style={style.container}>
      <Text style={style.title}>Bienvenue Veuillez s'authentifier</Text>
      <Image source={require('../assets/chulogo.png')} style={style.img} />

      <LoginForm handleLogin={handleLogin} />
    </View>
  )


}

const style = StyleSheet.create(
  {
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
    img: {
      width: 200,
      height: 200
    }

  }
)
