import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState, useRef } from 'react'
import DacHead from '../components/DacHead'
import { SafeAreaView, ScrollView } from 'react-native-web';
import DacTable from '../components/DacTable';

export default function DacPage() {


    return (

        <View style={styles.container}>
            <DacHead />
            <DacTable />
            <Button
                // onPress={save()}
                title="Enregistrer"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});