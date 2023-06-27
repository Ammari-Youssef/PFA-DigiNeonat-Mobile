import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LabelInputField from './LabeledInputField';
import InformationSection from './InformationSection';


const sectionStorage = {};
export default function GeneralInformation() {
    const labels = ["Date", "Particularité", "Identité", "IP", "Age", "Sexe",
        "Terme", "Poids", "MH", "DRB", "SAP", "Debit", "CC/Min", "SJ10%", "CC/24h", "CA++", "K+", "NA+",
        "Primen"
    ];
    return (
        <ScrollView>
            <View style={styles.container}>
                <InformationSection sectionStorage={sectionStorage} labels={labels} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
});

export { sectionStorage as GeneralInformationData };