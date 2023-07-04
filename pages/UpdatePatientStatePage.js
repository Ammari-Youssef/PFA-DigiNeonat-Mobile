import { View, Text, StyleSheet, TextInput, Button, ScrollView,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpdatePatientStateHead from '../components/UpdatePatientStateHead';
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export default function UpdatePatientStatePage() {

    const [loading, setLoading] = useState(false);

    const [idPatient, setIdPatient] = useState();
    const [coverage, setCoverage] = useState('');
    const [gender, setGender] = useState('');
    const [provenance, setProvenance] = useState('');
    const [date, setDate] = useState();

    const [mother, setMother] = useState('');
    const [NNe, setNNE] = useState('');
    const [Hospitalise, setHospitalise] = useState('');
    const [DAEDC , setDAEDC] = useState("")
    const [rx , setRx] = useState('')
    const [Traitement , setTraitment] = useState("")
    const [Evolution , setEvolution] = useState("")
    const [DurantLaGarde , setDurantlaGarde] = useState("")
    
    const [data, setData] = useState([
        { header: 'N-Né', input: NNe },
        { header: 'Mère', input: mother },
        { header: 'Hospitalisé pour :', input: Hospitalise },
        { header: 'DAE et/ou Dc retenu', input: DAEDC },
        { header: 'Sur plan Rx', input: rx },
        { header: 'Traitement', input: Traitement },
        { header: 'Evolution', input: Evolution },
        { header: 'Durant la garde', input: DurantLaGarde },
    ]);
    
    useEffect(() => {
        axios.get(`https://localhost:4430/api/matients/${idPatient}`)
            .then(response => {
   
                setMother(response.data.prenomMere)
                setNNE(response.data.nom)
                setHospitalise(response.data.motifDhospitalisation)
                

            })
            .catch(error => {
                console.error('Error retrieving data:', error);
                Toast.show({
                    type: 'info',
                    text1: 'erreur de recuperation du données est survenu',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            });
    }, [idPatient,NNe,mother,Hospitalise]);

    // useEffect(() => {
    //     if (idPatient.trim() === '') {
    //         setGender('valeur n\'existe pas');
    //         setProvenance('valeur n\'existe pas');
    //         setCoverage('valeur n\'existe pas');
    //         return;
    //     }
    //     //Get Patient data
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://localhost:4430/api/matients/${idPatient}`);
              
    //             console.log(response.data)
                
    //             setNNE(response.data.nom);
    //             setMother(response.data.prenomMere);
    //             setProvenance(response.data.motifDhospitalisation);


    //         } catch (error) {
    //             console.error('Error retrieving data:', error);
    //             Toast.show({
    //                 type: 'info',
    //                 text1: 'erreur est survenu',
    //                 position: 'bottom',
    //                 visibilityTime: 3000,
    //             });
    //         }
    //     };

    //     fetchData();
    // }, [idPatient]);


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

    const showAlert = (title, message) => {
        Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false });
    };
    const handleSave = () => {

        setLoading(true)
        
        setTimeout(() => {
            setLoading(false);
        //     // Alert.alert('Success', 'Insertion de la fiche réussie', [{ text: "ok", onPress: () => console.log('OK Pressed') }]);

            
        Toast.show({
            type: 'info',
            text1: 'Insertion reussie',
            position: 'bottom',
            visibilityTime: 3000,
        });
        }, 2000);


        // setLoading(false)
        // Logic to save the data
        // console.log(data);
        // const requestData = {
        //     date: date,
        //     coverage: coverage,
        //     sexe: gender,
        //     provenance: provenance,
           
        // };

        // const TableData = {
        //     NNE: NNe,
        //     mere: mother,
        //     motifDhospitalisation: Hospitalise,
        //     daedc: DAEDC,
        //     rx: rx,
        //     Traitement: Traitement,
        //     evolution: Evolution,
        //     durantLagarde: DurantLaGarde,
        // }

        // axios
        //     .post('https://localhost:4430/api/FicheMiseaJour', requestData)
        //     .then(response => {
        //         console.log('Data saved successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error saving data:', error);
        //     });
        // axios
        //     .post('https://localhost:4430/api/FicheMiseaJourTable', TableData)
        //     .then(response => {
        //         console.log('Data saved successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error saving data:', error);
        //     });


    };

    return (
        <ScrollView>
        <UpdatePatientStateHead
            sendDateValue={(v)=>setDate(v)}
            sendIPValue={(v)=>setIdPatient(v)}
            sendCoverageValue={(v)=>setCoverage(v)}
            sendGenderValue={(v)=>setGender(v)}
            sendProvenanceValue={(v)=>setProvenance(v)}
        />
        {/* {date} {coverage} {idPatient} {gender} {provenance} */}

            <Table style={styles.table}>
                {renderRows()}
            </Table>
            
            <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />
            <Toast ref={(ref) => Toast.setRef(ref)} />
           
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
    spinnerText: {
        color: '#ffffff', // Set the color of the spinner text
        fontSize: 16, // Set the font size of the spinner text
        fontWeight: 'bold', // Set the font weight of the spinner text
    },
});