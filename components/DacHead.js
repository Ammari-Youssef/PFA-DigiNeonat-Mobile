import { Text, TextInput, View, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
export default function DacHead(props) {

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [n_salle, setNSalle] = useState();
    const [n_fiche, setNFiche] = useState()
    const [n_lit, setNLit] = useState()
    const [diagnostic, setDiagnostic] = useState()

    const [fullName, setFullName] = useState()
    const [age, setAge] = useState()
    const [dateHospitalisation, setDateHospitalisation] = useState(new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))

    const [idPatient, setIdPatient] = useState()
    const [etablissmenet, setEtablissement] = useState()
    const [service, setService] = useState()
    const [n_admission, setNAdmission] = useState()

    useEffect(() => {


        props.sendIPValue(idPatient)
        props.sendEtablissementValue(etablissmenet)
        props.sendServiceValue(service)
        props.sendNAdmissionValue(n_admission)
        props.sendfullNameValue(fullName)
        props.sendAgeValue(age)
        props.sendDateValue(dateHospitalisation)
        props.sendYearValue(year)
        props.sendMonthValue(month)
        props.sendNSalleValue(n_salle)
        props.sendNLitValue(n_lit)
        props.sendDiagnosticValue(diagnostic)
        props.sendNFicheValue(n_fiche)


    }, [dateHospitalisation, idPatient, month, n_admission, n_lit, n_salle, diagnostic, n_fiche, age, service, etablissmenet, fullName]);

    useEffect(() => {

        //GEt Patient mothername
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:4430/api/matients/${idPatient}`);
                const data = response.data;
                console.log("data dyali " ,data);
                setAge(data.age);
                setFullName(data.nom);
            } catch (error) {
                // console.error('Error retrieving data:', error);
                // console.error('Error response data:', error.response.data);
                // console.error('Error status data:', error.response.status);
                Toast.show({
                    type: 'info',
                    text1: 'Veuillez entrer les données',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            }
        };

        fetchData();
    }, [idPatient]);

    const handleDateChange = (text) => {


        // Remove any non-digit characters from the input
        const cleanedText = text.replace(/\D/g, '');

        // Extract day, month, and year from the cleaned input
        const day = cleanedText.slice(0, 2);
        const month = cleanedText.slice(2, 4);
        const year = cleanedText.slice(4, 8);

        // Format the date as "jj/mm/aaaa"
        const formattedDate = `${day}/${month}/${year}`;

        setDateHospitalisation(formattedDate);
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
            setMonth();
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
                    <Text style={styles.label}>IP:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => setIdPatient(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Ètablissement:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => setEtablissement(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Service:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => setService(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° d'admission:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={(text) => setNAdmission(text)}
                    />
                </View>
            </View>

            {/* Second Form */}
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nom et Prénom:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => setFullName(text)}
                        value={fullName}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Age:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={(text) => setAge(text)}
                        value={age}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date d'hospitalisation:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="jj/mm/aaaa"
                        value={dateHospitalisation}
                        onChangeText={handleDateChange}
                        maxLength={10}
                        keyboardType="numeric"
                    />
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
                        onChangeText={(text) => handleMonthChange(text)}
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
                        onChangeText={(text) => handleYearChange(text)}
                        value={year}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° de salle:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={(text) => setNSalle(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>N° de lit:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={(text) => setNLit(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Diagnostic:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={(text) => setDiagnostic(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Fiche n°:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={(text) => setNFiche(text)}
                    />
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