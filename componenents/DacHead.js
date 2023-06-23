import { Text, TextInput, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'

export default function DacHead() {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [date, setDate] = useState('');

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

    const handleMonthChange = (text) => {
        // Remove any non-digit characters from the input
        const cleanedText = text.replace(/\D/g, '');

        // Convert the cleaned input to a number
        const monthValue = parseInt(cleanedText, 10);

        if (monthValue >= 1 && monthValue <= 12) {
            // Valid month input
            setMonth(cleanedText);
        } else {
            // Invalid month input, clear the value or display an error message
            setMonth('');
        }
    };
    const handleYearChange = (text) => {
    
        setYear(text)
    };
    
   
    return (
        <View style={styles.container}>
            {/* First Form */}
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nom et Prénom:</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Age:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date d'hospitalisation:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="jj/mm/aaaa"
                        value={date}
                        onChangeText={handleDateChange}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Second Form */}
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Ètablissement:</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Service:</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° d'admission:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>IP:</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
            </View>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Third Form */}
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Mois:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={text => handleMonthChange(text)}
                        value={month}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Année:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={text => handleYearChange(text)}
                        value={year}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° de salle:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° de lit:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Diagnostic:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Fiche n°:</Text>
                    <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
                </View>
            </View>

            {/* Image */}
            <Image source={require('../assets/chulogo.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 20,
    },
    image: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 50,
        height: 50,
    },
});