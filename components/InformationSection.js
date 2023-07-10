import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LabelInputField from './LabeledInputField';

/**
 * 
 * @param {Array} labels 
 * @returns 
 */

export default function InformationSection({ sectionStorage, labels }) {
    return (
        <View style={styles.container}>
            {
                labels.map((label, index) => (
                    <LabelInputField key={index} field={label} sectionStorage={sectionStorage}></LabelInputField>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        borderWidth: 1,
        borderColor: "blue",
        padding: 15,
        borderRadius: 15
    }
});
