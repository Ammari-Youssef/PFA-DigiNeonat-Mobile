import { StyleSheet, Text, View, ScrollView } from 'react-native';
import InformationSection from './InformationSection';

import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';


const sectionStorage = { "phototherapie": "CONVENTIONNELLE" };
export default function SoinSection() {
    const [phototherapie, setPhototherapie] = useState("CONVENTIONNELLE");
    const handleChangePhototherapie = value => {
        sectionStorage["phototherapie"] = value;
        setPhototherapie(value);
    }
    const labels1 = ["Table chauffante", "CVS", "Oxygenothérapie (l/min)", "Position demi-assise",
        "SNG", "IPP (mg/j)",
    ];
    const labels2 = ["Tobrex", "Soin de l'ombilic (3x/j)", "Konakion (2mg/semaine)", "Fer (EN IM ou PO)",
        "Vitamins",
    ];
    return (
        <ScrollView>
            <View style={styles.container}>
                <InformationSection sectionStorage={sectionStorage} labels={labels1} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 12
                }}>Phototherapie: </Text>
                <Picker
                    selectedValue={phototherapie}
                    // style={styles.picker}
                    onValueChange={handleChangePhototherapie}
                >
                    <Picker.Item label="CONVENTIONNELLE" value="CONVENTIONNELLE" />
                    <Picker.Item label="LED" value="LED" />
                    <Picker.Item label="CONTINU" value="CONTINU" />
                    <Picker.Item label="DISCONTINU" value="DISCONTINU" />
                </Picker>
                <InformationSection sectionStorage={sectionStorage} labels={labels2} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
});

export { sectionStorage as SoinData };