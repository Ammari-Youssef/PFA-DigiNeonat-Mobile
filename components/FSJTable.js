import {  Text, SafeAreaView } from 'react-native'
import React , {useState} from 'react';
import { Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const sectionStorage = {};

function handleChange(text, key, index){
    sectionStorage[key][index] = text
}


export default function FSJTable() {
    const labels = ['T','FC','FR','SaO2','TA','Dextro','Poids','Peau','Diurése','Vomissement','Selles',
        'Convulsions','Apnées','PC','Perimétre ombilical','Quantité de glucose en g/24h','CC de lait /24h','ATB en g/24h'];

    const tableHeaders = ['', '8h', '11h', '15h', '19h','22h','00h','3h','5h','8h'];
    const releventVals = tableHeaders.slice(1);
    const widthArr = tableHeaders.map((e) => e ? 75 : 150)

    function createTableData(){
        return labels.map((value) => {
            if (!sectionStorage[value]) sectionStorage[value] = releventVals.map((e) => "");
            console.log(sectionStorage[value]);
            const row = [value, ...releventVals.map((e, index) => <TextInput  defaultValue={sectionStorage[value][index]} 
                        style={styles.input} multiline={true} numberOfLines={1}
                        onChangeText={(text) => handleChange(text, value, index)}
                                                 />)
            ]
            // const row = sectionStorage[value];
            return row
        });
    }

    function clearTableData(){
        for (const key in sectionStorage) {
            delete sectionStorage[key]
        }
        setReRender({});
    }
    console.log("called");
    const tableData = createTableData();
    const [rerender, setReRender] = useState("")

  return (
    <SafeAreaView >
        <ScrollView horizontal={true}>
            <Table borderStyle={styles.tableBorder}>
              <Row widthArr={widthArr} data={tableHeaders} style={styles.tableHeader} textStyle={styles.headerText} />
              <Rows widthArr={widthArr} data={tableData} style={styles.tableRow} textStyle={styles.rowText} />
            </Table>
        </ScrollView>
        <Button
            onPress={clearTableData}
            title="Effacer"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            /> 
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
        height: 60,
        overflow: "visible"
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

export {sectionStorage};
