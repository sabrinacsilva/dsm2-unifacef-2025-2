import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Inicio({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.titulo}>PROVA - FAUTO 1</Text>
      <Text style={styles.nome}>SABRINA COSTA SILVA</Text>

      <View style={{ marginTop: 16, width: 240 }}>
        <View style={{ marginBottom: 8 }}>
          <Button title="Imagem da Internet" onPress={() => navigation.navigate('Internet')} />
        </View>
        <View style={{ marginBottom: 8 }}>
          <Button title="Imagem Local" onPress={() => navigation.navigate('Local')} />
        </View>
        <Button title="Ícones em Linha" onPress={() => navigation.navigate('Icones')} />
      </View>
    </View>
  );
}

function Internet({ navigation }) {
  return (
    <View style={[styles.center, { backgroundColor: 'rgba(77, 126, 205, 1)deded' }]}>
      <Image
        source={{ uri: 'https://picsum.photos/600/360' }}
        style={{ width: 300, height: 180, borderRadius: 8, marginBottom: 12 }}
      />
      <Button title="Voltar" onPress={() => navigation.navigate('Inicio')} />
    </View>
  );
}

function Local() {
  return (
    <View style={[styles.center, { backgroundColor: '#FFF9C4' }]}>
      <Image
        source={require('./assets/imagens.png')}
        style={{ width: 260, height: 260, borderRadius: 8 }}
        resizeMode="contain"
      />
    </View>
  );
}
function Icones() {
  return (
    <View style={[styles.center, { backgroundColor: '#F8BBD0' }]}>
     <View style={styles.linha}>
        <Text style={{ fontSize: 60 }}>📚</Text>
        <Text style={{ fontSize: 60 }}>🔔</Text>
        <Text style={{ fontSize: 60 }}>🐶</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'Início' }} />
        <Stack.Screen name="Internet" component={Internet} options={{ title: 'Imagem da Internet' }} />
        <Stack.Screen name="Local" component={Local} options={{ title: 'Imagem Local' }} />
        <Stack.Screen name="Icones" component={Icones} options={{ title: 'Ícones' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: '700' },
  nome: { marginTop: 6, fontSize: 16, opacity: 0.8 },
  linha: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
