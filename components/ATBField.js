import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

function ATBField({ name, ATBs, index }) {
    let storage;
    // const storage = ATBs[index] ? ATBs[index]
    //     : {
    //         "name": name,
    //         poso: "",
    //         dose: "",
    //         days: "",
    //     };
    if (ATBs[index]) {
        storage = ATBs[index];
    } else {
        storage = {
            name,
            poso: "",
            dose: "",
            days: "",
        };
        ATBs.push(storage);
    }

    function addToStorage(key, value) {
        storage[key] = value;
    }

    return (
        <View style={styles.mainContainer}>
            {name ? <Text style={styles.atb_label}>{name}:</Text> :
                <TextInput style={styles.atb_input} placeholder="Entrer le nom de medicament"
                    onChangeText={(text) => addToStorage("name", text)} />}
            <View style={styles.subContainer}>
                <TextInput style={styles.atb_input} placeholder="Saisissez ici"
                    onChangeText={(text) => addToStorage("pose", text)} />
                <Text style={styles.atb_label}>mg/kg/j =</Text>
                <TextInput style={styles.atb_input} placeholder="Saisissez ici"
                    onChangeText={(text) => addToStorage("dose", text)}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput style={[styles.atb_input, styles.atb_input_small]} placeholder="Saisissez ici"
                    onChangeText={(text) => addToStorage("days", text)}
                />
                <Text style={styles.atb_label}>J</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        display: 'flex',
        flexDirection: "column",
        flex: 1,
        gap: 20,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
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
        paddingHorizontal: 5,
        paddingVertical: 2,
        flexGrow: 1
        // fontSize: 16,
    },
    atb_input_small: {
        flexGrow: 0
    },
    atbTitle: {
        fontSize: 20,
        marginRight: 10,
        fontWeight: 'bold',
    },
});

export default ATBField;