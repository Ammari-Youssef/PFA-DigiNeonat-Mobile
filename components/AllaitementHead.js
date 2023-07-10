import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
// import MySQLService from '../services/MySQLServices';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';



export default function AllaitementHead(props) {

    const [date, setDate] = useState(new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
    const [weight, setWeight] = useState(null)
    const [isPrematureAterme, setPrematureAterme] = useState("aterme")
    const [quantite, setQuantite] = useState(0)
    const [motherName, setMotherName] = useState("");
    const [idPatient, setIdPatient] = useState(props.data);
    const [data, setData] = useState()

    const route = useRoute();
    const {fileId,action} = route.params;
    

    useEffect(() => {

        props.sendRecQuantityValue(quantite)
        props.sendWeightValue(weight)
        props.sendPrematurityValue(isPrematureAterme)
        props.sendDateValue(date)
        props.sendIPValue(idPatient)
        props.sendMotherValue(motherName)

    }, [date, idPatient, quantite, weight, isPrematureAterme]);

    useEffect(() => {
        // if ( idPatient.trim("")) {
        //     setMotherName('nom maman n\'existe pas taper un autre ip');
        //     return;
        // }
        
        console.log('idPatient', idPatient)
        //GEt Patient mothername
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:4430/api/matients/${idPatient}`);
               


                const prenomMere = response.data.prenomMere;
                const poids = response.data.poidsNaiss;
                setMotherName(prenomMere);
                setWeight(poids);
            } catch (error) {
                console.error('Error retrieving data:', error);
              
                setMotherName(' maman de ce patient n\'existe pas ');

            }
        };

        fetchData();
    }, [idPatient]);

    // useEffect(()=>{
    //     const dwr = async ()=>{

    //         const response2 = await axios.get(`https://localhost:4430/api/fiche_allaitements?ip=${idPatient}`);
    //         const pd = response2.data.poids
    //         setWeight(pd)
    //     }
    // },weight)

useEffect(()=>{
    setIdPatient(fileId)
},[fileId])


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

    const handleFormSubmit = () => {
        // Create a payload object with the data to be saved
        // const format_date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

        // const payload = {
        //     dateFicheAllaitement: date,//format_date,
        //     ip: parseInt(idPatient),
        //     prenomMere: motherName,
        //     prematurity: isPrematureAterme,
        //     poids: parseFloat( weight),
        //     recommandedQuantity: quantite
        // };

        // console.log("Payload:", payload);
        // console.log("idPatient:", idPatient);
        // console.log("motherName:", motherName);
        // console.log("isPrematureAterme:", isPrematureAterme);
        // console.log("weight:", weight);
        // console.log("quantite:", quantite);

        // // Make a POST request to save the data
        // axios
        //     .post('https://localhost:4430/api/fiche_allaitements', payload)
        //     .then(response => {
        //         // Data saved successfully
        //         console.log('Data saved:', response.data);
        //         // Show a success message to the user
        //         Toast.show({
        //             type: 'info',
        //             text1: 'insertion du données de fiche est reussi',
        //             position: 'top',
        //             visibilityTime: 3000,
        //         });
        //     })
        //     .catch(error => {
        //         // Error occurred while saving data
        //         // console.error('Error saving data:', error);
        //         // console.log('Response Data:', error.response.data);
        //         // console.log('Response Status:', error.response.status);
        //         // Show an error message to the user
        //         Toast.show({
        //             type: 'info',
        //             text1: 'erreur est survenu',
        //             position: 'top',
        //             visibilityTime: 3000,
        //         });
        //     });
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
                <Text style={styles.label}>
                    IP:
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Identifiant du patient"
                    onChangeText={(text) => setIdPatient(text)}
                    value={idPatient}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Né du madame:  </Text>
                {motherName}
                {/* <TextInput
                    style={styles.input}
                    placeholder="Insérer nom maman"
                    onChangeText={(text) => setMotherName(text)}
                    value={motherName}
                /> */}

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
                            // props.sendRecQuantityValue(calculateQuantite(weight, itemValue));
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
                        // props.sendRecQuantityValue(calculateQuantite(text, isPrematureAterme));
                        value={weight}
                    }}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Quantité en cc par 3h: {quantite}</Text>
            </View>
            {/* <Button
                title="Enregistrer"
                onPress={handleFormSubmit}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            /> */}
            <Toast ref={(ref) => Toast.setRef(ref)} />

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
