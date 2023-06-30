import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React , {useState , } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'

import { Card, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Dashboard() {
    const navigation = useNavigation();

  const pages = [
    { title: 'Fiche d\'allaitement journalière', screen: 'Allaitement' , icon: require("../assets/Allaitement.png") },
    { title: 'Fiche journalière de mise à jour du patient', screen: 'Update' , icon: require('../assets/update.png') }, 
    { title: 'Fiche journalière de surveillance', screen: 'FSJ' , icon: require('../assets/surveillance.png') },
    { title: 'Fiche de surveillance D.A.C', screen: 'DAC' , icon: require('../assets/dac.png') },
    { title: 'Fiche des mesures', screen: 'Mesure' , icon: require('../assets/mesure.png') },
    
    // Add more pages as needed
  ];
    
  const handlePagePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView  >
      <View style={styles.container}>
      <Image source={require('../assets/Hopital.jpg')} style={styles.img}/>
    <Text>Bienvenue que voulez vous remplir ?</Text>

      <View style={{ flex: 1, padding: 16 }}>
        {pages.map((page, index) => (
          <TouchableOpacity key={index} onPress={() => handlePagePress(page.screen)}>
            <Card key={index} style={{ marginBottom: 16 }}>
              <Card.Cover source={page.icon} />
              <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="file-document" size={24} color="black" />
                <Title style={{ marginLeft: 8 }}>{page.title}</Title>
              </Card.Content>
            </Card>
         </TouchableOpacity>
        ))}
      </View>
      </View>
      
    </ScrollView>

  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    titre: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 32,
    },
    img: {
      width: 200,
      height: 200,
      alignItems:"center"
    },
    card: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 8,
      padding: 16,
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
    },
    icon: {
      width: 64,
      height: 64,
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },

  }
)