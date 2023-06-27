import { StyleSheet } from 'react-native'
import { ScrollView, View } from "react-native";
import Drogues from "./Drogues";
import ATBSection from "./ATBSection";
import { ATBs } from "./ATBSection";
import { DroguesData } from "./Drogues";

const DroguesATBs = () => {
    return {
        ATBs: ATBs,
        Drogue: DroguesData
    }
}

export default function MidSection() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Drogues></Drogues>
                <ATBSection></ATBSection>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});

export { DroguesATBs as medData };