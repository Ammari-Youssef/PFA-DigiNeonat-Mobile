import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView ,Button} from 'react-native';
import { Table, Row } from 'react-native-table-component';

const DacTable = (props) => {
    const [tableData, setTableData] = useState([
        ['08:00', '', '', ''],
        // ['09:00', '', '', ''],
        // ['10:00', '', '', ''],
        // ['11:00', '', '', ''],
        // ['12:00', '', '', ''],
        // ['13:00', '', '', ''],
        // ['14:00', '', '', ''],
        // ['15:00', '', '', ''],
        // ['16:00', '', '', ''],
        // ['17:00', '', '', ''],
        // ['18:00', '', '', ''],
        // ['19:00', '', '', ''],
        // ['20:00', '', '', ''],
        // ['21:00', '', '', ''],
        // ['22:00', '', '', ''],
        // ['23:00', '', '', ''],
        // ['24:00', '', '', ''],
        // ['1:00', '', '', ''],
        // ['2:00', '', '', ''],
        // ['3:00', '', '', ''],
        // ['4:00', '', '', ''],
        // ['5:00', '', '', ''],
        // ['6:00', '', '', ''],
        ['7:00', '', '', ''],
    ]);

    const tableHeaders = ['Heure', 'Glyémie', 'Glycosurie', 'Acétonurie'];

    const handleCellChange = (rowIndex, columnIndex, text) => {
        const newData = [...tableData];
        newData[rowIndex][columnIndex] = text;
        setTableData(newData);
        props.onTableDataChange(newData); // Call the callback function with updated tableData
    };

    const renderCell = (data, rowIndex, columnIndex) => (
        <TextInput
            style={styles.input}
            value={data}
            onChangeText={(text) => handleCellChange(rowIndex, columnIndex, text)}
        />
    );

    return (
        <SafeAreaView>
            <Table borderStyle={styles.tableBorder}>
                <Row data={tableHeaders} style={styles.tableHeader} textStyle={styles.headerText} />
                {tableData.map((rowData, rowIndex) => (
                    <Row
                        key={rowIndex}
                        data={rowData.map((cellData, columnIndex) =>
                            columnIndex === 0 ? cellData : renderCell(cellData, rowIndex, columnIndex )
                        )}
                        style={styles.tableRow}
                        textStyle={styles.rowText}
                    />
                ))}
            </Table>
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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

export default DacTable;
