//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { useNavigation } from '@react-navigation/native';
//composants
import AllaitementPage from './pages/AllaitementPage';
import UpdatePatientStatePage from './pages/UpdatePatientStatePage';
import DacPage from './pages/DacPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import InterfaceMesure from './pages/InterfaceMesure';
import FSJ from './pages/FSJ';
import FileListPage from './pages/FileListPage';

import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
//Hooks
import { useState } from 'react';


const Stack = createStackNavigator();

function App() {

  const [isLoggedIn, setLoggedIn] = useState(true);
  // const navigation = useNavigation()

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardPage} options={{
              title: 'Annexes du patient',
              headerTitleAlign: 'center',

              headerLeft: () =>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={handleLogout}>
                    <Feather name="log-out" size={24} color="black" />
                  </TouchableOpacity>
                </View>,
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity >
                    <Avatar.Image size={24} source={require('./assets/avatar.png')} />
                  </TouchableOpacity>
                </View>
              )
            }} />

            <Stack.Screen name="fiche_misea_jour_patient" component={UpdatePatientStatePage} options={{ title: 'Fiche de la mise à jour du patient', }} />

            <Stack.Screen name="fiche_allaitement" component={AllaitementPage} options={{
              title: 'Fiche d\'allaitement journalière',
            }} />
            <Stack.Screen name="fiche_surveillance" component={FSJ} options={{ title: 'Fiche de surveillance journalière', }} />
            <Stack.Screen name="fiche_surveillance_d_a_c" component={DacPage} options={{ title: 'Fiche de surveillance D.A.C', }} />
            <Stack.Screen name="fiche_mesure" component={InterfaceMesure} options={{ title: 'Fiche des mesures', }} />
            <Stack.Screen name="FileList" component={FileListPage} options={{ title: 'List des fiches', }} />


          </>
        ) : (
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} initialParams={{ handleLogin }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
