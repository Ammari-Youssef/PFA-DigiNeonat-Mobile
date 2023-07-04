import { View, Text, StyleSheet, Button,ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import DacHead from '../components/DacHead'
import DacTable from '../components/DacTable';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';



export default function DacPage() {
const [loading , setLoading] = useState(false)

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

    return (
        <ScrollView>
        <View style={styles.container}>
            <DacHead />
            <DacTable />
                <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />

            <View>
                <Button
                    onPress={save}
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