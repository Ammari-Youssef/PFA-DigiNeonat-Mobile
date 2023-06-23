//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//composants
import AllaitementPage from './pages/AllaitementPage';
import UpdatePatientStatePage from './pages/UpdatePatientStatePage';
import DacPage from './pages/DacPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

//Hooks
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

const Stack = createStackNavigator();

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

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

              headerLeft: null,
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => console.log('Avatar pressed')}>
                    <Avatar.Image size={24} source={require('./assets/avatar.png')} />
                  </TouchableOpacity>
                </View>
              )
            }} />

            <Stack.Screen name="Update" component={UpdatePatientStatePage} options={{ title: 'Fiche de la mise à jour du patient', }} />

            <Stack.Screen name="Allaitement" component={AllaitementPage} options={{
              title: 'Fiche d\'allaitement journalière',
            }} />
            <Stack.Screen name="DAC" component={DacPage} options={{ title: 'Fiche de surveillance D.A.C', }} />

          </>
        ) : (
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} initialParams={{ handleLogin }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
