import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function LabelInputField({ field, sectionStorage }) {
    if (!sectionStorage[field]) sectionStorage[field] = "";
    return (
        <View>
            <Text style={styles.label}>{field}</Text>
            <TextInput style={styles.input} onChangeText={text => sectionStorage[field] = text} />
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
    label: {
        color: "gray"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    }
});
