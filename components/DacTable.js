import {  Text, SafeAreaView } from 'react-native'
import React , {useState} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


export default function Dactable() {
    const [tableData, setTableData] = useState([
        ['8:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['9:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['10:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['11:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['12:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['13:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['14:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['15:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['16:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['17:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['18:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['19:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['20:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['21:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['22:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['23:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['24:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['1:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['2:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['3:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['4:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['5:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['6:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
       
        ['7:00', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
    ]);

    const tableHeaders = ['Heure', 'Glyémie', 'Glycosurie', 'Acétonurie'];

  return (
    <SafeAreaView >
          <Table borderStyle={styles.tableBorder}>
              <Row data={tableHeaders} style={styles.tableHeader} textStyle={styles.headerText} />
              <Rows data={tableData} style={styles.tableRow} textStyle={styles.rowText} />
          </Table>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: 'black',
    },
    tableHeader: {
        height: 40,
        backgroundColor: '#ccc',
    },
    headerText: {
        margin: 6,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        height: 40,
    },
    rowText: {
        margin: 6,
        textAlign: 'center',
    },
     input: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 5,
    },
});
