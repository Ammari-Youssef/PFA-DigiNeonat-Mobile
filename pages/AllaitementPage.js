import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import AllaitementHead from '../components/AllaitementHead'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { Toast } from 'react-native-toast-message/lib/src/Toast';



import axios, { Axios } from 'axios';

export default function AllaitementPage() {
  const [data, setData] = useState([
    { id: '1', heure: '08:00', quantite: '', residus: 'oui' },
    { id: '2', heure: '11:00', quantite: '', residus: 'oui' },
    { id: '3', heure: '14:00', quantite: '', residus: 'oui' },
    { id: '4', heure: '17:00', quantite: '', residus: 'oui' },
    { id: '5', heure: '20:00', quantite: '', residus: 'oui' },
    { id: '6', heure: '23:00', quantite: '', residus: 'oui' },
    { id: '7', heure: '02:00', quantite: '', residus: 'oui' },
    { id: '8', heure: '05:00', quantite: '', residus: 'oui' },
  ]);
  
  const [weight, setWeight] = useState();
  const [idPatient, setIdPatient] = useState();
  const [date, setDate] = useState();
  const [prematurity, setPrematurity] = useState();
  const [mother, setMother] = useState();
  //Quantité recomandé
  const [qty, setQty] = useState();
  const [loading, setLoading] = useState(false);
  

  



  //conserver données meme si on quitte la page
  const saveFormData = async (data) => {
    try {
      await AsyncStorage.setItem('atted', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };
  //Conserver les données meme quitter la page
  const handleFormUpdate = (updatedData) => {
    setData(updatedData);
    saveFormData(updatedData);
  };
  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('atted');
      if (savedData) {
        setData(JSON.parse(savedData));
        console.log('Form data loaded successfully');
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  useEffect(() => {
    loadFormData();
  }, []);



  //Style du tableau
  const getContainerStyle = (item) => {
    if (item.quantite != '' && item.quantite != qty) {
      return styles.qtyInputRed;
    }
    if (item.quantite == qty) return styles.qtyInputGreen;
    else
      return styles.qtyInputDefault;
  };


  //fonction qui montre les lignes 
  const renderItem = ({ item }) => {
    const containerStyle = getContainerStyle(item);

    return (
      <Row
        style={containerStyle}
        key={item.id}
        data={[
          item.heure,
          <TextInput
            style={[styles.input, containerStyle]}
            keyboardType="numeric"
            placeholder="Quantité en cc"
            value={item.quantite}
            onChangeText={(text) => {
              const updatedData = data.map((prevItem) =>
                prevItem.id === item.id ? { ...prevItem, quantite: text } : prevItem
              );
              setData(updatedData);
              handleFormUpdate(updatedData); // Save the updated data
            }}
          />,
          <Picker
            style={[styles.picker,containerStyle]}
            selectedValue={item.residus}
            onValueChange={(value) => {
              const updatedData = data.map((prevItem) =>
                prevItem.id === item.id ? { ...prevItem, residus: value } : prevItem
              );
              setData(updatedData);
              handleFormUpdate(updatedData); // Save the updated data
            }}
          >
            <Picker.Item label="Oui" value="yes" />
            <Picker.Item label="Non" value="no" />
          </Picker>,
        ]}
        textStyle={styles.column}
      />








    );
  };
//Fonction affiche l'entete du tableau
  const renderHeader = () => (
    <Row
      data={['Heure', 'Quantité en cc', 'Résidus']}
      style={styles.head}
      textStyle={styles.headText}
    />
  );


  
  const handleFormSubmit = () => {
    const payloadFicheAllaitmentData = {
      dateFicheAllaitement: date,
      ip: parseInt(idPatient),
      prenomMere: mother,
      prematurity: prematurity,
      poids: parseFloat(weight),
      recommandedQuantity: qty
    };

    const postFicheAllaitements = axios.post('https://localhost:4430/api/fiche_allaitements', payloadFicheAllaitmentData);

    const postFicheAllaitementTables = data.map(row => {
      const payload = {
        ip: parseInt(idPatient),
        heureFicheAllaitement: row.heure,
        givenQuantity: parseFloat(row.quantite),
        residu: row.residus,
        dateFicheAllaitement:date
      };
      return axios.post('https://localhost:4430/api/fiche_allaitement_tables', payload);
    });

    Promise.all([postFicheAllaitements, ...postFicheAllaitementTables])
      .then(responses => {
        console.log('Form data and table data submitted successfully');
        // Handle the responses here
        const [ficheAllaitementsResponse, ...ficheAllaitementTablesResponses] = responses;
        // Show success message or perform any other actions
        Toast.show({
          type: 'info',
          text1: 'Les donneeés de la fiche sont bien insérées',
          position: 'bottom',
          visibilityTime: 3000,
        });
      })
      .catch(error => {
        console.error('Error submitting form data and table data:', error);
        // Show an error message to the user
        Toast.show({
          type: 'info',
          text1: 'erreur est survenu',
          position: 'top',
          visibilityTime: 3000,
        });
        // Show error message or perform any other actions
      });
  };


  const save = () => {

    setLoading(true)

    setTimeout(() => {
      setLoading(false);
      //     // Alert.alert('Success', 'Insertion de la fiche réussie', [{ text: "ok", onPress: () => console.log('OK Pressed') }]);


      Toast.show({
        type: 'info',
        text1: 'Insertion reussie',
        position: 'top',
        visibilityTime: 3000,
      });
    }, 2000);
  }

  return (
    <ScrollView style={styles.container}>

      <AllaitementHead
        sendRecQuantityValue={(value) => setQty(value)}
        sendWeightValue={(value) => setWeight(value)}
        sendIPValue={(value) => setIdPatient(value)}
        sendDateValue={(value) => setDate(value)}
        sendPrematurityValue={(value) => setPrematurity(value)}
        sendMotherValue={(value) => setMother(value)}
      />
      {/* {date} {mother} {idPatient} {qty} {prematurity} , {weight} */}

      <View style={styles.container}>
        {/* Table */}
        <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
          {renderHeader()}
          {data.map((item) => renderItem({ item }))}
        </Table>
        <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        {/* Save Button */}
        <Button
          title="Enregistrer"
          onPress={handleFormSubmit}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    // paddingTop: 30,
    backgroundColor: 'white',
  },
  head: {
    height: 40,
    backgroundColor: 'grey',
  },
  headText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  column: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontWeight: '500',
    flex: 1
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontWeight: '500',
  },
  qtyInputDefault: {
    backgroundColor: 'white',
  },
  qtyInputRed: {
    backgroundColor: 'red',
  },
  qtyInputGreen: {
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'cyan',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
