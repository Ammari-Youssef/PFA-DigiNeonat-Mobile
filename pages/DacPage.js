import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DacHead from '../components/DacHead'
import DacTable from '../components/DacTable';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';



export default function DacPage() {
    const [loading, setLoading] = useState(false)
    //Varibles du head
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [n_salle, setNSalle] = useState();
    const [n_fiche, setNFiche] = useState()
    const [n_lit, setNLit] = useState()
    const [diagnostic, setDiagnostic] = useState()

    const [fullName, setFullName] = useState()
    const [age, setAge] = useState()
    const [dateHospitalisation, setDateHospitalisation] = useState()

    const [idPatient, setIdPatient] = useState()
    const [etablissmenet, setEtablissement] = useState()
    const [service, setService] = useState()
    const [n_admission, setNAdmission] = useState()

    // variables du tableau
    const [tableData, setTableData] = useState();

    const handleTableDataChange = (data) => {
        setTableData(data);
        // console.log(data)
        console.log('ma data ', tableData)
    };


    const save = () => {

        setLoading(true)

        setTimeout(() => {
            setLoading(false);
            //     // Alert.alert('Success', 'Insertion de la fiche réussie', [{ text: "ok", onPress: () => console.log('OK Pressed') }]);


            Toast.show({
                type: 'info',
                text1: 'Insertion reussie',
                position: 'top',
                visibilityTime: 3000,
            });
        }, 2000);
    }

    const saveData2 = () => {
        // Format the tableData to match the API structure
        const formattedData = tableData.map((rowData) => ({
            heureFicheDAC: rowData[0]||'8:00',
            glymie: parseFloat(rowData[1]),
            glycosurie:parseFloat( rowData[2]),
            acetonurie:parseFloat( rowData[3]),
            ip: parseInt(idPatient),
            nFiche: parseInt(n_fiche),
        }));

        // // console.log("payload",formattedData)
        // formattedData.forEach((data) => {
        //     console.log('heureFicheDAC:', data.heureFicheDAC);
        // });
        // Make the POST request to the endpoint
        axios
            .post('https://localhost:4430/api/fiche_surveillance_d_a_c_tables', formattedData)
            .then((response) => {
                console.log('Data saved successfully:', response.data);
                // Perform any additional actions after saving the data
            })
            .catch((error) => {
            
                console.error('Error saving data:', error);
                console.log('Error response:', error.response);
                console.log('Error message:', error.message);
                console.log('Error config:', error.config)
                // Handle the error as needed
            });
    };

    const saveData = () => {
        if (!month ||
            !year ||
            !n_salle ||
            !n_fiche ||
            !n_lit ||
            !diagnostic ||
            !fullName ||
            !age ||
            !dateHospitalisation ||
            !idPatient ||
            !etablissmenet ||
            !service ||
            !n_admission
        ) {
            // Display an error message to the user
            Toast.show({
                type: 'info',
                text1: 'Veuillez inserer tous les champs necessaires',
                position: 'bottom',
                visibilityTime: 3000,
            });
            return;
        }
        const data = {
            ip: parseInt(idPatient),
            etablissement: etablissmenet,
            service: service,
            nAdmission: parseInt(n_admission),
            nomPrenom: fullName,
            age: parseInt(age),
            dateFicheDACDHosipitalisation: dateHospitalisation,
            mois: parseInt(month),
            annee: parseInt(year),
            nSalle: parseInt(n_salle),
            nLit: parseInt(n_lit),
            diagnostic: diagnostic,
            nFiche: parseInt(n_fiche)
        };
        console.log('heureFicheDAC:', data.heureFicheDAC); // Add this line


        axios.post('https://localhost:4430/api/fiche_surveillance_d_a_cs', data)
            .then(response => {
                console.log('Data saved successfully');
                // Perform any other actions after successful data submission
                Toast.show({
                    type: 'info',
                    text1: 'Insertion réussis',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            })
            .catch(error => {
                console.error('Error saving data:', error);
                console.error('Error response:', error.response);
                // Handle any API errors or network issues
            });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <DacHead
                    sendIPValue={(v) => setIdPatient(v)}
                    sendEtablissementValue={(v) => setEtablissement(v)}
                    sendServiceValue={(v) => setService(v)}
                    sendNAdmissionValue={(v) => setNAdmission(v)}
                    sendfullNameValue={(v) => setFullName(v)}
                    sendAgeValue={(v) => setAge(v)}
                    sendDateValue={(v) => setDateHospitalisation(v)}
                    sendYearValue={(v) => setYear(v)}
                    sendMonthValue={(v) => setMonth(v)}
                    sendNSalleValue={(v) => setNSalle(v)}
                    sendNLitValue={(v) => setNLit(v)}
                    sendDiagnosticValue={(v) => setDiagnostic(v)}
                    sendNFicheValue={(v) => setNFiche(v)}

                />
                <DacTable onTableDataChange={handleTableDataChange} />
                <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />

                <View>
                    <Button
                        onPress={saveData2}
                        title="Enregistrer"
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        backgroundColor: 'cyan',
        borderRadius: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spinnerText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});