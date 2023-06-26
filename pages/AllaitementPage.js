import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Picker, Animated, Button } from 'react-native';
import AllaitementHead from '../components/AllaitementHead'
import MySQLService from '../services/MySQLServices';
export default function AllaitementPage() {

  const [data, setData] = useState([
    { id: '1', heure: '08:00', quantite: '', residus: '' },
    { id: '2', heure: '11:00', quantite: '', residus: '' },
    { id: '3', heure: '14:00', quantite: '', residus: '' },
    { id: '4', heure: '17:00', quantite: '', residus: '' },
    { id: '5', heure: '20:00', quantite: '', residus: '' },
    { id: '6', heure: '23:00', quantite: '', residus: '' },
    { id: '7', heure: '02:00', quantite: '', residus: '' },
    { id: '8', heure: '05:00', quantite: '', residus: '' },
  ]);

  const [qty, setQty] = useState()


  const [focusedInputs, setFocusedInputs] = useState([]);

  const handleFocus = (index) => {
    setFocusedInputs((prevInputs) => [...prevInputs, index]);

  };

  const handleBlur = (index) => {
    setFocusedInputs((prevInputs) =>
      prevInputs.filter((inputIndex) => inputIndex !== index)
    );

  };



  //Fontion qui recupere la quantité de l'entête et passer comme props dans le composant enfant suffixé par Head
  const getQuantityValue = (v) => {
    setQty(v)
  };

  const getContainerStyle = (v) => {
    if (v == false) {
      return styles.qtyInputRed;
    } else if (v == true) {
      return styles.qtyInputGreen;
    } else {
      return styles.qtyInputDefault;
    }
  };


  const renderItem = ({ item, index }) => {
    const isFocused = focusedInputs.includes(index);
    const isQtyEqual = item.quantite == qty;

    const containerStyle = getContainerStyle(isQtyEqual);
    const inputStyle = [
      styles.column,
      styles.input,
      isFocused && containerStyle,

    ];


    return (
      <Animated.View style={[styles.row, isFocused && containerStyle]}>
        <Text style={styles.column}>{item.heure}</Text>
        <TextInput
          style={inputStyle}
          keyboardType="numeric"
          placeholder="Ècrivez la quantité"
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onChangeText={(text) =>
            setData((data) => {
              const newData = [...data];
              const itemIndex = newData.findIndex((i) => i.id === item.id);
              newData[itemIndex].quantite = text;
              return newData;
            })
          }
        />
        <Picker style={[styles.picker, isFocused && containerStyle]}>
          <Picker.Item label="Oui" value="yes" />
          <Picker.Item label="Non" value="no" />
        </Picker>
      </Animated.View>
    );
  };


  return (


    <View style={styles.container}>
      {/* Entete de la fiche  */}


      <AllaitementHead sendRecQuantityValue={(value) => getQuantityValue(value)} />

      {/* Tableau */}
      <View style={styles.row}>
        <Text style={styles.header}>Heure</Text>
        <Text style={styles.header}>Quantité en cc</Text>
        <Text style={styles.header}>Résidus ?</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Button
        // onPress={save()}
        title="Enregistrer"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "white"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,

  },
  header: {
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
    padding: 5,
  },
  column: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: '500'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontWeight: 500
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontWeight: 500

  },
  qtyInputDefault: {
    backgroundColor: 'white',
  },
  qtyInputRed: {
    backgroundColor: 'red',
    fontSize: "bold"
  },
  qtyInputGreen: {
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'cyan',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

