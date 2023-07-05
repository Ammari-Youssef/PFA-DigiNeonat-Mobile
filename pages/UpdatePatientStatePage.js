import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native';
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
    const [DAEDC, setDAEDC] = useState("")
    const [rx, setRx] = useState('')
    const [Traitement, setTraitment] = useState("")
    const [Evolution, setEvolution] = useState("")
    const [DurantLaGarde, setDurantlaGarde] = useState("")

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

                console.log(mother)
                console.log(NNe)
                console.log(Hospitalise)

            })
            .catch(error => {
                console.error('Error retrieving data:', error);
                Toast.show({
                    type: 'info',
                    text1: 'Veuillez entrer l\'IP du patient',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            });
    }, [idPatient, NNe, mother, Hospitalise]);











    const handleInputChange = (index, value) => {
        setData((prevData) =>
            prevData.map((item, i) => (i === index ? { ...item, input: value } : item))
        );
        // console.log(data)
    };

    const renderRows = () => {
        return data.map((item, index) => (
            <Row
                key={index}
                data={[
                    <Text style={styles.headerCell}>{item.header}</Text>,
                    item.input === '' ? (
                        <TextInput

                            style={item.header === 'Evolution' || item.header === 'Traitement' || item.header === 'Plan Rx' || item.header === 'Durant la garde' ? [styles.cell, styles.multilineCell] : styles.cell} 
                            placeholder={item.input}
                            value={item.header === 'N-Né' ? NNe : item.header === 'Mère' ? mother : item.header === 'Hospitalisé pour :' ? Hospitalise : ''}

                            multiline={item.header === 'Evolution' || item.header === 'Traitement' || item.header === 'Plan Rx' || item.header === 'Durant la garde'}

                            // value={item.input}
                            onChangeText={(text) => handleInputChange(index, text)}
                        />
                    ) : (
                        <TextInput
                            style={styles.cell}
                            multiline={item.header === 'Evolution' || item.header === 'Traitement' || item.header === 'Plan Rx' || item.header === 'Durant la garde'}

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



    const storeData = () => {
        if (
            idPatient !== null ||
            coverage !== null ||
            gender !== null ||
            provenance !== null ||
            date !== null ||
            mother !== null ||
            NNe !== null ||
            Hospitalise !== null ||
            DAEDC !== null ||
            rx !== null ||
            Traitement !== null ||
            Evolution !== null ||
            DurantLaGarde !== null
        ) {
            Toast.show({
                type: 'info',
                text1: 'Un ou plusieurs champs sont vides .Réessayez ',
                position: 'bottom',
                visibilityTime: 3000,
            });
            return;
}

        setLoading(true);

        const payloadUpdate = {
            dateFicheMiseaJourPatient: date,
            ip: parseInt(idPatient),
            couvertureSanitaire: coverage,
            sexe: gender,
            villeProvenance: provenance
        };

        const payloadUpdateTable = {
            nomNne: data[0].input || NNe,
            prenomMere: data[1].input,
            motifDhospitalisation: data[2].input,
            daeDcRetenu: data[3].input,
            planRx: data[4].input,
            traitement: data[5].input,
            evolution: data[6].input,
            durantLaGarde: data[7].input,
            ip: parseInt(idPatient),
            dateFicheMiseaJourPatient:date
        };

        console.log("table", payloadUpdateTable)
        console.log("form", payloadUpdate)

        axios
            .all([
                axios.post('https://localhost:4430/api/fiche_misea_jour_patients', payloadUpdate),
                axios.post('https://localhost:4430/api/fiche_misea_jour_patient_tables', payloadUpdateTable)
                // axios.put() modifier la table matient plutard
            ])
            .then(axios.spread((updateResponse, tableResponse) => {
                console.log('Data stored:', updateResponse.data);
                console.log('Data saved:', tableResponse.data);
                // Perform any other actions after successful storage

                setLoading(false);
                Toast.show({
                    type: 'info',
                    text1: 'Insertion et modifications réussis',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            }))
            .catch(error => {
                console.error('Error storing/saving data:', error);
                console.log('Response Data:', error.response.data);
                console.log('Response Status:', error.response.status);
                // Perform error handling or show an error message to the user

                setLoading(false);
                Toast.show({
                    type: 'info',
                    text1: 'Erreur lors de l\'insertion ou de l\'enregistrement des données',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            });


    };



    return (
        <ScrollView>
            <UpdatePatientStateHead
                sendDateValue={(v) => setDate(v)}
                sendIPValue={(v) => setIdPatient(v)}
                sendCoverageValue={(v) => setCoverage(v)}
                sendGenderValue={(v) => setGender(v)}
                sendProvenanceValue={(v) => setProvenance(v)}
            />
            {/* {date} {coverage} {idPatient} {gender} {provenance} */}

            <Table style={styles.table}>
                {renderRows()}
            </Table>

            <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />
            <Toast ref={(ref) => Toast.setRef(ref)} />

            <Button
                title="Enregistrer"
                onPress={storeData}
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
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1
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