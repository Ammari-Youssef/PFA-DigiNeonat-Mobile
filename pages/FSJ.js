import { View, StyleSheet, Button, ScrollView } from 'react-native'
import FSJHead from '../components/FSJHead'
import FSJTable from '../components/FSJTable';
import { sectionStorage } from '../components/FSJTable'

function save(){
    console.log(sectionStorage);
}


export default function DacPage() {
    return (
        <ScrollView>
        <View style={styles.container}>
            <FSJHead />
            <FSJTable />
            <Button
                    onPress={save}
                    title="Enregistrer"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    accessibilityLabel="Learn more about this purple button"
                />
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});