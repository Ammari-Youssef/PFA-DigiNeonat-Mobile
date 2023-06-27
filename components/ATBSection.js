import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import ATBField from './ATBField';

export const ATBs = [];

function ATBSection() {
    const [fields, setFields] = useState(["Triaxon/Kefotax", "Axymicine", "Genta/Amiklin", "Tienam", "Ciproxine"]);

    function addField() {
        const newFields = [...fields];
        newFields.push('');
        setFields(newFields);
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>ATBs</Text>
            {fields.map((field, index) =>
            (
                <ATBField name={field} key={index} ATBs={ATBs} index={index} />
            ))
            }
            <Button title='Add +' onPress={() => addField()}></Button>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 15
    },
    atb_row: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    atb_label: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    atb_input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        flex: 1,
    },
    atbTitle: {
        fontSize: 20,
        marginRight: 10,
        fontWeight: 'bold',
    },
});

export default ATBSection;