import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-web';

export default function UpdatePatientStatePage() {
    const [date, setDate] = useState('');
    const [coverage, setCoverage] = useState('');
    const [gender, setGender] = useState('');
    const [provenance, setProvenance] = useState('');

    const handleDateChange = (text) => {


        // Remove any non-digit characters from the input
        const cleanedText = text.replace(/\D/g, '');

        // Extract day, month, and year from the cleaned input
        const day = cleanedText.slice(0, 2);
        const month = cleanedText.slice(2, 4);
        const year = cleanedText.slice(4, 8);

        // Format the date as "jj/mm/aaaa"
        const formattedDate = `${day}/${month}/${year}`;

        setDate(formattedDate);
    };

    const handleCoverageChange = (value) => {
        setCoverage(value);
    };

    const handleGenderChange = (value) => {
        setGender(value);
    };

    const handleProvenanceChange = (text) => {
        setProvenance(text);
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="jj/mm/aaaa"
                    value={date}
                    onChangeText={handleDateChange}
                    maxLength={10}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>IP:</Text>
                <Text style={styles.text}>(Généré par le dossier)</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Couverture médicale:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={coverage}
                    onValueChange={handleCoverageChange}
                >
                    <Picker.Item label="RADEEO" value="radeeo" />
                    <Picker.Item label="ONE/CMSS" value="one/cmss" />
                    <Picker.Item label="CNOPS" value="cnops" />
                    <Picker.Item label="CNSS" value="cnss" />
                    <Picker.Item label="AMO" value="amo" />
                    <Picker.Item label="FAR" value="far" />
                    <Picker.Item label="Assurance privé" value="private_assurance" />
                </Picker>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Sexe:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={handleGenderChange}
                >
                    <Picker.Item label="Masculin" value="male" />
                    <Picker.Item label="Féminin" value="female" />
                    <Picker.Item label="Ambiguë" value="other" />
                </Picker>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Provenance:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Généré du Dossier (Backend)"
                    value={provenance}
                    onChangeText={handleProvenanceChange}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    formContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 150,
        textAlign: 'left',
        marginLeft: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        flex: 1,
        marginLeft: 10,
    },
});
