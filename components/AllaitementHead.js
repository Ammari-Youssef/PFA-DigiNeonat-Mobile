import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
// import MySQLService from '../services/MySQLServices';
import { ToastAndroid } from 'react-native';

export default function AllaitementHead(props) {

    const [date, setDate] = useState(new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
    const [weight, setWeight] = useState(0)
    const [isPrematureAterme, setPrematureAterme] = useState("aterme")
    const [quantite, setQuantite] = useState(0)
    const [motherName, setMotherName] = useState("");
    const[idPatient, setIdPatient] = useState('');
    const [data ,setData] = useState({})


    // useEffect(()=> fetchData,[])
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('https://localhost:4430/api/matient');
    //         const prenomMere = response.data.prenomMere;
    //         console.log(prenomMere);
    //         setMotherName(prenomMere)
    //     } catch (error) {
    //         console.error('Error retrieving data:', error);
    //         setMotherName("erzror")
    //     }
    // };

    // useEffect(() => {
    //     // Fetch the id_patient from the database or any other source
    //     axios.get(`https://localhost:4430/api/matients`)
    //     .then(res =>{
            
    //     })
    //     // and set it in the state
    //     const fetchedIdPatient = 'FETCHED_PATIENT_ID'; // Replace with the fetched patient ID
    //     setIdPatient(fetchedIdPatient);
    // }, []);

    // useEffect(() => {
    //     if (idPatient) {
    //         axios.get(`http://localhost:4430/api/matient/${idPatient}`)
    //             .then(response => {
    //                 const data = response.data;
    //                 setData(data); // Store the data in the state
    //                 if (data.length > 0) {
    //                     const firstRow = data[0];
    //                     setMother(firstRow.motherName);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error retrieving data:', error);
    //             });
    //     }
    // }, [idPatient]);

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



    return (
        <View style={styles.formContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Date:
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="jj/mm/aaaa"
                    onChangeText={(text) => handleDateChange(text)}
                    value={date}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Né du madame: {motherName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Premature / Aterme:
                </Text>
                <View style={styles.pickerContainer}>
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
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Poids en kg:
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    onChangeText={(text) => {
                        setWeight(text);
                        setQuantite(calculateQuantite(text, isPrematureAterme));
                        props.sendRecQuantityValue(calculateQuantite(text, isPrematureAterme));
                    }}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Quantité en cc par 3h: {quantite}</Text>
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
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        flex: 1,





    },
    label: {
        marginBottom: 5,
    },
    pickerContainer: {
        flex: 1,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 2,
        marginBottom: 10,
        marginLeft: 10,
        flex: 1
    },

});
