import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpdatePatientStateHead from '../components/UpdatePatientStateHead';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';


export default function UpdatePatientStatePage() {

    const [mother, setMother] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4430/api/docs')
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

    return (
        <View style={styles.container}>
            <UpdatePatientStateHead />
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>N-Né</Text>
                    <TextInput style={styles.cell} placeholder="Généré du Dossier (Backend)" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Mère</Text>
                    <Text style={styles.headerCell}>{mother}</Text>

                    {/* <TextInput style={styles.cell} placeholder="Généré du Dossier (Backend)" /> */}
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Hospitalisé pour :</Text>
                    <TextInput style={styles.cell} placeholder="Généré du Dossier (Backend)" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>DAE et/ou Dc retenu</Text>
                    <TextInput style={styles.cell} placeholder="à taper" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Sur plan Rx</Text>
                    <TextInput style={styles.cell} placeholder="Généré du Dossier (Backend)" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Traitement</Text>
                    <TextInput style={[styles.cell, styles.multilineCell]} placeholder="à taper" multiline />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Evolution</Text>
                    <TextInput style={styles.cell} placeholder="à taper" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Durant la garde</Text>
                    <TextInput style={[styles.cell, styles.multilineCell]} placeholder="à taper" multiline />
                </View>
            </View>

            <Button
                // onPress={save()}
                title="Enregistrer"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    table: {
        flex: 1,
        marginVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        padding: 10,
    },
    multilineCell: {
        height: 80,
        textAlignVertical: 'top',
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
