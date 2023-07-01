import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpdatePatientStateHead from '../components/UpdatePatientStateHead';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';

export default function UpdatePatientStatePage() {

    const [mother, setMother] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4430/api/matient')
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    const firstRow = data[0];
                    setMother(firstRow.motherName);
                }

            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    }, []);

    const [data, setData] = useState([
        { header: 'N-Né', input: 'Genéreé par dossier' },
        { header: 'Mère', input: 'Genéreé par dossier' },
        { header: 'Hospitalisé pour :', input: 'Genéreé par dossier' },
        { header: 'DAE et/ou Dc retenu', input: '' },
        { header: 'Sur plan Rx', input: 'Genéreé par dossier' },
        { header: 'Traitement', input: '' },
        { header: 'Evolution', input: '' },
        { header: 'Durant la garde', input: '' },
    ]);

    const handleInputChange = (index, value) => {
        setData((prevData) =>
            prevData.map((item, i) => (i === index ? { ...item, input: value } : item))
        );
    };

    const renderRows = () => {
        return data.map((item, index) => (
            <Row
                key={index}
                data={[
                    <Text style={styles.headerCell}>{item.header}</Text>,
                    item.input === '' ? (
                        <TextInput
                            style={[styles.cell, styles.multilineCell]}
                            placeholder={item.input}
                            multiline
                            // value={item.input}
                            onChangeText={(text) => handleInputChange(index, text)}
                        />
                    ) : (
                        <TextInput
                            style={styles.cell}
                                placeholder={item.input}
                            // value={item.input}
                            onChangeText={(text) => handleInputChange(index, text)}
                        />
                    ),
                ]}
                style={styles.row}
                textStyle={styles.text}
            />
        ));
    };

    const handleSave = () => {
        // Logic to save the data
        console.log(data);
    };

    return (
        <ScrollView>
        <UpdatePatientStateHead/>
            <Table style={styles.table}>
                {renderRows()}
            </Table>

            <Button
                title="Enregistrer"
                onPress={handleSave}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    table: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    row: {
        flexDirection: 'row',
    },
    headerCell: {
        flex: 1,
        padding: 10,
        backgroundColor: 'lightgray',
        fontWeight:'bold',
        textAlign: 'center',
        borderWidth:1
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    button: {
        margin: 10,
        backgroundColor: 'cyan',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    multilineCell: {
        height: 80,
        textAlignVertical: 'top',
    },
});