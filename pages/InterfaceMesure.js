import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ATBSection from '../components/ATBSection';
import Drogues from '../components/Drogues';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MidSection from '../components/MedSection';
import GeneralInformation from '../components/GeneralInformation';
import SoinSection from '../components/SoinSection';
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fw5 from 'react-native-vector-icons/FontAwesome5'
import SendButton from '../components/SendButton';

const Tab = createBottomTabNavigator();



export default function App() {
  return (
    
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Informations') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Drogues et ATB') {
              iconName = focused ? 'medkit-sharp' : 'medkit-outline';
            } else if (route.name === "Terminer") {
              iconName = focused ? 'md-send' : 'md-send-outline';
            }
            else {
              return <Fw5 name="syringe" size={size} color={color} />;
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray'
        })
        }
      >
        <Tab.Screen name="Informations" component={GeneralInformation} />
        <Tab.Screen name="Soin de routine" component={SoinSection} />
        <Tab.Screen name="Drogues et ATB" component={MidSection} />
        <Tab.Screen name="Terminer" component={SendButton} />
      </Tab.Navigator>
    
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
