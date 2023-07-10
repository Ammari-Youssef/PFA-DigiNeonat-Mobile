import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardPage() {
  const navigation = useNavigation();

  const pages = [
    { title: 'Fiche d\'allaitement journalière', screen: 'fiche_allaitement', icon: require("../assets/Allaitement.png") },
    { title: 'Fiche journalière de mise à jour du patient', screen: 'fiche_misea_jour_patient', icon: require('../assets/update2.png') },
    { title: 'Fiche de surveillance D.A.C', screen: 'fiche_surveillance_d_a_c', icon: require('../assets/dac.png') },
    { title: 'Fiche journalière de surveillance', screen: 'fiche_surveillance', icon: require('../assets/surveillance.png') },
    { title: 'Fiche des mesures', screen: 'fiche_mesure', icon: require('../assets/mesure.png') },

    // Add more pages as needed
  ];

  const handlePagePress = (screen) => {
    navigation.navigate('FileList', { page: screen });
    // navigation.navigate(screen );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('../assets/Hopital.jpg')} style={styles.img} />
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
    img: {
      width: 200,
      height: 200,
      alignItems: "center"
    },
  }
);