import {  Text, SafeAreaView } from 'react-native'
import React , {useState} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


export default function table2() {
    const [tableData, setTableData] = useState([
        ['8h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['9h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['10h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['11h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['12h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['13h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['14h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['15h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['16h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['17h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['18h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['19h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['20h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['21h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['22h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['23h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['24h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['1h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['2h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['3h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['4h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['5h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
        ['6h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
       
        ['7h', <TextInput style={styles.input} />, <TextInput style={styles.input} />, <TextInput style={styles.input} />],
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
