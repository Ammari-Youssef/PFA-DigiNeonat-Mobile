import { Button, View, Text } from "react-native";
import { medData } from "./MedSection";
import { SoinData } from "./SoinSection";
import { GeneralInformationData } from "./GeneralInformation";

export default function SendButton() {
    const send = () => {
        const med = medData();
        const fichier = { ...med, Soins: SoinData, GeneralInformation: GeneralInformationData };
        console.log(fichier);
        const backendURL = 'https://localhost:4430/api/fms'; // change when the server is hosted
        // Implement sending to backend logic
        fetch(backendURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODg0ODMzNjksImV4cCI6MTY4ODg0MzM2OSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBleGFtcGxlLmNvbSJ9.AGbdYxhB-HjwiCupfESGBVPAd_dlQL3rV77-ZpFc4e51rRUYbklWHV6zw0cJuZD30rT25y45rapmQ7FNr0b8l5APe77EMIR5p-e8-gOFjXEaI3KhDeM5wt7Vf9r7skzG_llzGOKTRAkNT5f76HPNbAC2E30L16TsiqUkvS1nfoJQGGY9Gd1Qi3_cwCVVddlzg4R44zZ4csxcra2K_6sNSxLllE5kec_Phw2amu2qYiu7TDCuChhwvHCjlNVKZXhv6dPjOMLmpwyJOCMYrnWMnxHZbFipzhTTX5AFVKx7pZyAvRbnK9NUVcytcJJkkkhRLdRpJkSWJ7s0TB5g65NhGQ',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                fichier 
            ),
            }).catch((e) => console.log(e.message));
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