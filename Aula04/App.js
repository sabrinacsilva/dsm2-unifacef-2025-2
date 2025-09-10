// App.js
import * as React from 'react';
import { View, Text, StyleSheet, Alert, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Helper para alert funcionar também no navegador (Expo Web)
const showAlert = (title, msg, buttons) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${msg}`);
    if (buttons && buttons.length) {
      const def = buttons.find(b => b.style !== 'cancel');
      def?.onPress?.();
    }
  } else {
    Alert.alert(title, msg, buttons);
  }
};

// Botão customizado
const AppButton = ({ title, onPress, variant = 'primary' }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.btn,
      variant === 'primary' && styles.btnPrimary,
      variant === 'secondary' && styles.btnSecondary,
      variant === 'danger' && styles.btnDanger,
      pressed && { opacity: 0.8 },
    ]}
  >
    <Text style={styles.btnText}>{title}</Text>
  </Pressable>
);

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TELA INICIAL</Text>
      <Text style={styles.welcome}>👋 Bem-vindo ao aplicativo!</Text>

      <AppButton
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes')}
        variant="primary"
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TELA DE DETALHES</Text>
      <Text style={styles.description}>
        Aqui estão algumas informações do usuário fictício:
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Nome:</Text>
        <Text style={styles.cardText}>Maria Laura</Text>

        <Text style={styles.cardTitle}>🎂 Idade:</Text>
        <Text style={styles.cardText}>21 anos</Text>

        <Text style={styles.cardTitle}>📧 Email:</Text>
        <Text style={styles.cardText}>marialaura@email.com</Text>

        <Text style={styles.cardTitle}>📍 Cidade:</Text>
        <Text style={styles.cardText}>Franca - SP</Text>
      </View>

      <AppButton title="Ir para Perfil" onPress={() => navigation.navigate('Perfil')} />
      <AppButton
        title="Voltar para Início"
        onPress={() => navigation.navigate('Início')}
        variant="secondary"
      />
    </View>
  );
}

function PerfilScreen({ navigation }) {

  const handleLogout = () =>
    showAlert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          // aqui você poderia limpar AsyncStorage/token se usasse login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Início' }], // volta pra tela inicial limpando a pilha
          });
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TELA DE PERFIL</Text>
      <Text style={styles.welcome}>😎 Aqui é o seu perfil, aproveite!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Nome:</Text>
        <Text style={styles.cardText}>Maria Laura</Text>

        <Text style={styles.cardTitle}>🎂 Idade:</Text>
        <Text style={styles.cardText}>21 anos</Text>

        <Text style={styles.cardTitle}>📧 Email:</Text>
        <Text style={styles.cardText}>marialaura@email.com</Text>

        <Text style={styles.cardTitle}>📍 Cidade:</Text>
        <Text style={styles.cardText}>Franca - SP</Text>
      </View>

      <AppButton title="Sair" onPress={handleLogout} variant="danger" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Detalhes" component={DetailsScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Meu Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#a9a9a9', textTransform: 'uppercase' },
  welcome: { fontSize: 16, marginBottom: 20, color: '#333', fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 20 },
  description: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center', paddingHorizontal: 20 },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 10, color: '#333' },
  cardText: { fontSize: 16, color: '#555' },
  btn: { width: '85%', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  btnPrimary: { backgroundColor: '#1E88E5' },
  btnSecondary: { backgroundColor: '#43A047' },
  btnDanger: { backgroundColor: '#E53935' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
