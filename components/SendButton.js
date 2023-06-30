import { Button, View, Text } from "react-native";
import { medData } from "./MedSection";
import { SoinData } from "./SoinSection";
import { GeneralInformationData } from "./GeneralInformation";

export default function SendButton() {
    const send = () => {
        const med = medData();
        const fichier = { ...med, Soins: SoinData, GeneralInformation: GeneralInformationData };
        console.log(fichier);
        const backendURL = 'http://192.168.1.8/save'; // change when the server is hosted
        // Implement sending to backend logic
        fetch(backendURL, {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                fichier 
            ),
            })
    }
    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            gap: 20
        }}>
            <Text>Confirmer les modifications?</Text>
            <Button onPress={send} title="Envoyer" />
        </View>
    )
}