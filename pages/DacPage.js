import { View, Text, StyleSheet ,Button } from 'react-native'
import React, { useState, useRef } from 'react'
import DacHead from '../componenents/DacHead'
import { SafeAreaView, ScrollView } from 'react-native-web';
import DacTable from '../componenents/DacTable';

export default function DacPage() {


    return (

        <View style={styles.container}>
            <DacHead />
            <DacTable/>
            <Button
                // onPress={save()}
                title="Enregistrer"
                color="blue"
                accessibilityLabel="Learn more about this purple button"
                style={styles.btn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    btn:{
        marginTop:2,
    }
});