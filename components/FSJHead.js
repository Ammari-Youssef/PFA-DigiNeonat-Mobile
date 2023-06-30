import { Text, TextInput, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'

export default function FSJHead() {

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
           
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Date :</Text>
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
                    <Text style={styles.label}>NN de Mme :</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
            </View>

            
            
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