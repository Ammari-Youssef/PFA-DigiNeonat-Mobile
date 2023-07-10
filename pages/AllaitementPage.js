import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import AllaitementHead from '../components/AllaitementHead'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRoute } from '@react-navigation/native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';



import axios, { Axios } from 'axios';

export default function AllaitementPage() {
  const [data, setData] = useState([
    { id: '1', heure: '08:00', quantite: '', residus: 'yes' },
    { id: '2', heure: '11:00', quantite: '', residus: 'yes' },
    { id: '3', heure: '14:00', quantite: '', residus: 'yes' },
    { id: '4', heure: '17:00', quantite: '', residus: 'yes' },
    { id: '5', heure: '20:00', quantite: '', residus: 'yes' },
    { id: '6', heure: '23:00', quantite: '', residus: 'yes' },
    { id: '7', heure: '02:00', quantite: '', residus: 'oui' },
    { id: '8', heure: '05:00', quantite: '', residus: 'oui' },
  ]);

  const [weight, setWeight] = useState(4);
  const [date, setDate] = useState();
  const [prematurity, setPrematurity] = useState();
  const [mother, setMother] = useState();
  //Quantité recomandé
  const [qty, setQty] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { fileId, action } = route.params;


  const [idPatient, setIdPatient] = useState(fileId);

  useEffect(() => {
    if (fileId , action == "read") {
      // Set the value of idPatient when fileId exists
      setIdPatient(fileId);
      console.log("fileid", fileId)
      sendDataToChild(idPatient)
    }
  }, [fileId, idPatient]);


  const sendDataToChild = (data) => {

    // Pass the data as prop to the child component
    return <AllaitementHead data={data} />;
  };

  // Perform actions based on the 'action' parameter
  useEffect(() => {
    if (action === 'read') {
      handleReadFile(fileId);
    
    }
  }, [action]);

  const handleReadFile = (id) => {
    // Logic for reading a file
    console.log(`Reading file with ID ${id}`);
    // Call any API requests or perform any necessary operations
    const endpoint1 = `https://localhost:4430/api/fiche_allaitments/${id}`;
    const endpoint2 = `https://localhost:4430/api/fiche_allaitement_tables/${id}`;

    axios.all([
      axios.get(endpoint1),
      axios.get(endpoint2)
    ])
      .then(axios.spread((response1, response2) => {
        const data1 = response1.data; // Data from endpoint1
        const data2 = response2.data; // Data from endpoint2
        sendDataToChild(data1)
        setQty(data1.recommandedQuantity);
     
        // setIdPatient(data1.idPatient);
   
        setDate(data1.date);
        setPrematurity(data1.prematurity);
        setMother(data1.mother);

        const updatedData = data.map(item => {
          const matchingData2 = data2.find(d => d.id === item.id);
          if (matchingData2) {
            return { ...item, quantite: matchingData2.givenQuantity };
          }
          return item;
        });

        setData(updatedData);

        console.log('Data from endpoint1:', data1);
        console.log('Data from endpoint2:', data2);
      }))
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  };

  const handleCreateFile = () => {
    // Logic for creating a file
    handleFormSubmit()
  };

  const handleEditFile = async (id , newData) => {
    // Logic for editing a file
    console.log(`Editing file with ID ${id}`);
    // Call any API requests or perform any necessary operations
    console.log('Creating a new file');
    // Call any API requests or perform any necessary operations
    const endpoint1 = `https://localhost:4430/api/fiche_allaitments/${id}`;
    const endpoint2 = `https://localhost:4430/api/fiche_allaitement_tables/${id}`;
    try {
      await axios.put(endpoint1, newData);
      await axios.put(endpoint2, newData);

      console.log('Page modified successfully');
    } catch (error) {
      console.error('Error modifying page:', error);
    }
  };

  // const fetchData = (fileId) => {
  //   async () => {
  //     try {
  //       const response = await axios.get(`https://localhost:4430/api/matients/${fileId}`);
  //       const donne = response.data;
  //       console.log("head data", donne)
  //       const prenomMere = response.data.prenomMere;
  //       setMotherName(prenomMere);
  //     } catch (error) {
  //       console.error('Error retrieving data:', error);
  //       setMotherName('Insèrer un ip valide ou changer nom de la maman');
  //     }
  //   };

  // };


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
    if(action =="read")
    loadFormData();
  }, []);



  //Style du tableau
  const getContainerStyle = (item) => {
    if (item.quantite != '' && item.quantite != qty) {
      return styles.qtyInputRed;
    }
    if (item.quantite == qty && qty!=0) return styles.qtyInputGreen;
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
            style={[styles.picker, containerStyle]}
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
    // if (weight != null || idPatient != null || date != null || prematurity != null || mother != null) {
    //   Toast.show({
    //     type: 'info',
    //     text1: 'Un ou plusieurs champs sont vides .Réessayez ',
    //     position: 'bottom',
    //     visibilityTime: 3000,
    //   });
    //   console.log(weight , prematurity , idPatient , qty ,mother ,mother  )
    //   return
    // }
    setLoading(true)
    const payloadFicheAllaitmentData = {
      date: date,
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
        date: date
      };
      return axios.post('https://localhost:4430/api/fiche_allaitement_tables', payload);
    });

    Promise.all([postFicheAllaitements, ...postFicheAllaitementTables])
      .then(responses => {
        console.log('Form data and table data submitted successfully');
        // Handle the responses here
        const [ficheAllaitementsResponse, ...ficheAllaitementTablesResponses] = responses;
        // Show success message or perform any other actions
        setLoading(false);
        Toast.show({
          type: 'info',
          text1: 'Les donneeés de la fiche sont bien insérées',
          position: 'bottom',
          visibilityTime: 3000,
        });
        

      })
      .catch(error => {
        console.error('Error submitting form data and table data:', error);
        console.error('Error response:', error.response.data);
        setLoading(false)
        // Show an error message to the user
        Toast.show({
          type: 'info',
          text1: 'Erreur est survenu',
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
        text1: 'Insertion et mise à jour reussie',
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
          disabled={action === 'read'}
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
    flex: 1
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
  spinnerText: {
    color: '#ffffff', // Set the color of the spinner text
    fontSize: 16, // Set the font size of the spinner text
    fontWeight: 'bold', // Set the font weight of the spinner text
  },
});
