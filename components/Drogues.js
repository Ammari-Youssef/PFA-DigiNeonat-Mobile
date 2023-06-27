import { StyleSheet, Text, View } from 'react-native';
import InformationSection from './InformationSection';


const sectionStorage = {};
export default function Drogues() {
    const labels = ["Dobutamine", "Adrénaline", "Dopamine", "NORADRE", "Autres"];
    return (
        <View>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Drogues</Text>
            <InformationSection sectionStorage={sectionStorage} labels={labels} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { sectionStorage as DroguesData };