import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* import RegisterScreen from '../screens/Register'; */
import SignInScreen from '../screens/SignIn';
/* import Home from '../screens/Home';
import Inicio from '../screens/Inicio'; */
import Initial from '../screens/Initial';
import Inicio from '../screens/Inicio';
import Envios from '../screens/Envios';
import Home from '../screens/Home'
import Sucesso from '../screens/Sucesso'
/* import Perfil from '../screens/Perfil'
import Sucesso from '../screens/Sucesso'
import Admin from '../screens/Admin'
import Envios from '../screens/Envios' */

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Envios" component={Envios} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sucesso" component={Sucesso} />
        {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
