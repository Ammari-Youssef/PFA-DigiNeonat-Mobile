import { View, Text, TextInput, Picker, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
// import MySQLService from '../services/MySQLServices';

export default function AllaitementHead(props) {

    const [date, setDate] = useState(new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
    const [weight, setWeight] = useState(0)
    const [isPrematureAterme, setPrematureAterme] = useState("aterme")
    const [quantite, setQuantite] = useState(0)
    const [motherName, setMotherName] = useState("mom");


    const handleDateChange = (text) => {
        // Validate and format the date input as needed
        // For simplicity, let's assume the input format is always "jj/mm/aaaa"

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



    const handlePrematurityChange = (value) => {
        setPrematureAterme(value);
    };


    const calculateQuantite = (poids, premature) => {
        let factor = premature === "premature" ? 12 : 8;
        return poids * 180 / factor;
    }
    //Données du dossier 

    // useEffect(() => {
    //     connection.connect((err) => {
    //         if (err) {
    //             console.error('Error connecting to MySQL:', err);
    //         } else {
    //             console.log('Connected to MySQL!');

    //             // Retrieve data from the table
    //             connection.query('SELECT motherName FROM patientrecords', (err, results) => {
    //                 if (err) {
    //                     console.error('Error executing query:', err);
    //                 } else {
    //                     console.log('Query results:', results);

    //                     // Set the retrieved data in the state
    //                     if (results.length > 0) {
    //                         setMotherName(results[0].motherName);
    //                     }
    //                 }
    //             });
    //         }
    //     });

    //     // Cleanup the connection when component unmounts
    //     return () => {
    //         connection.end();
    //     };
    // }, []);

    //

    return (
        <View style={styles.formContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Date:
                    <TextInput
                        style={styles.input}
                        placeholder="jj/mm/aaaa"
                        onChangeText={(text) => handleDateChange(text)}
                        value={date}
                    />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Né du madame: {motherName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Premature / Aterme:
                    <Picker
                        style={styles.picker}
                        selectedValue={isPrematureAterme}
                        onValueChange={(itemValue) => {
                            setPrematureAterme(itemValue);
                            setQuantite(calculateQuantite(weight, itemValue));
                            props.sendRecQuantityValue(calculateQuantite(weight, itemValue));
                        }}
                    >
                        <Picker.Item label="Prématuré" value="premature" />
                        <Picker.Item label="À terme" value="aterme" />
                    </Picker>
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Poids en kg:
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => {
                            setWeight(text);
                            setQuantite(calculateQuantite(text, isPrematureAterme));
                            props.sendRecQuantityValue(calculateQuantite(text, isPrematureAterme));
                        }}
                    />
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Quantité en cc: {quantite}</Text>
            </View>
        </View>
    )
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
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 0,
        marginBottom: 10,
        marginLeft: 10,

    },
    label: {
        marginBottom: 5,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 2,
        marginBottom: 10,
        marginLeft: 10,
    },

});
