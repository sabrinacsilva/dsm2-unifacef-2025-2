import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import MeusCompromissos from "./screens/MeusCompromissos";
import CompromissosEquipe from "./screens/CompromissosEquipe";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="MeusCompromissos" component={MeusCompromissos} />
        <Stack.Screen
          name="CompromissosEquipe"
          component={CompromissosEquipe}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
