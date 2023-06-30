import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import AllaitementHead from '../components/AllaitementHead'


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

  

  const [qty, setQty] = useState();

  const handleQtyChange = (text) => {
    setQty(text);
  };

  const getQuantityValue = (v) => {
    setQty(v)
  };

  const getContainerStyle = (item) => {
    if (item.quantite != '' && item.quantite != qty) {
      return styles.qtyInputRed;
    }
    if (item.quantite == qty) return styles.qtyInputGreen;
    else
      return styles.qtyInputDefault;
  };

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
              setData((prevData) =>
                prevData.map((prevItem) =>
                  prevItem.id === item.id ? { ...prevItem, quantite: text } : prevItem
                )
              );
            }}
          />,
          <Picker
            style={[styles.picker ,]}
            selectedValue={item.residus}
            onValueChange={(value) => {
              setData((prevData) =>
                prevData.map((prevItem) =>
                  prevItem.id === item.id ? { ...prevItem, residus: value } : prevItem
                )
              );
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

  const renderHeader = () => (
    <Row
      data={['Heure', 'Quantité en cc', 'Résidus']}
      style={styles.head}
      textStyle={styles.headText}
    />
  );

  return (
    <ScrollView style={styles.container}>

      <AllaitementHead sendRecQuantityValue={(value) => getQuantityValue(value)} />
      <View style={styles.container}>
        {/* Table */}
        <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
          {renderHeader()}
          {data.map((item) => renderItem({ item }))}
        </Table>

        {/* Save Button */}
        <Button
          title="Enregistrer"
          onPress={() => {
            // Save logic
          }}
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
    flex:1
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
