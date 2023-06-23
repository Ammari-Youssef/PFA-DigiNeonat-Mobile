import { View, Text, TextInput, StyleSheet, Table, Row } from 'react-native'
import React, { useState, useRef } from 'react'
import DacHead from '../componenents/DacHead'
import { SafeAreaView, ScrollView } from 'react-native-web';
import DacTable from '../componenents/DacTable';

export default function DacPage() {


    return (

        <View style={styles.container}>
            <DacHead />
            <DacTable/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});