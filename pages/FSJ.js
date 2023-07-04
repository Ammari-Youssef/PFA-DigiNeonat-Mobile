import { View, StyleSheet, Button, ScrollView } from 'react-native'
import FSJHead from '../components/FSJHead'
import FSJTable from '../components/FSJTable';
import { sectionStorage } from '../components/FSJTable'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';




export default function DacPage() {
    const [loading, setLoading] = useState(false);

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
            <FSJHead />
            <FSJTable />
                <Spinner visible={loading} textContent={'loading...'} textStyle={styles.spinnerText} />
                <Toast ref={(ref) => Toast.setRef(ref)} />
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