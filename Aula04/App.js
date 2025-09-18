// App.js
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/* ============================
   Helper: Alert que funciona no Web
============================ */
const showAlert = (title, msg, buttons) => {
  if (Platform.OS === 'web') {
    // Simula o Alert nativo
    const ok = window.confirm(`${title}\n\n${msg}`);
    // Se existir botão "não-cancelar", chame-o ao confirmar
    if (ok && buttons && buttons.length) {
      const def = buttons.find((b) => b.style !== 'cancel') ?? buttons[0];
      def?.onPress?.();
    }
  } else {
    Alert.alert(title, msg, buttons);
  }
};

/* ============================
   Tema (Contexto)
============================ */
const lightColors = {
  bg: '#f5f5f5',
  text: '#333',
  textMuted: '#555',
  title: '#2f2f2f',
  cardBg: '#fff',
  border: '#e3e3e3',
  headerBg: '#1E88E5',
  headerText: '#fff',
  btnPrimary: '#1E88E5',
  btnSecondary: '#43A047',
  btnDanger: '#E53935',
  inputBg: '#fff',
  inputBorder: '#ddd',
};

const darkColors = {
  bg: '#0f1115',
  text: '#eaeaea',
  textMuted: '#c9c9c9',
  title: '#ffffff',
  cardBg: '#171a21',
  border: '#262a33',
  headerBg: '#0d47a1',
  headerText: '#fff',
  btnPrimary: '#1565c0',
  btnSecondary: '#2e7d32',
  btnDanger: '#b71c1c',
  inputBg: '#0f1115',
  inputBorder: '#2a2f3a',
};

const ThemeContext = React.createContext(null);

const makeStyles = (c) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.bg,
      padding: 16,
    },
    scroll: { width: '100%' },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color: c.title,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      textAlign: 'center',
    },
    welcome: {
      fontSize: 16,
      marginBottom: 20,
      color: c.text,
      fontStyle: 'italic',
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    description: {
      fontSize: 16,
      color: c.textMuted,
      marginBottom: 20,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    card: {
      width: '88%',
      backgroundColor: c.cardBg,
      padding: 20,
      borderRadius: 14,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: c.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: Platform.OS === 'web' ? 0.06 : 0.15,
      shadowRadius: 6,
      elevation: 4,
      alignSelf: 'center',
    },
    cardTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 10, color: c.text },
    cardText: { fontSize: 16, color: c.textMuted },
    btn: {
      width: '88%',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 6,
    },
    btnPrimary: { backgroundColor: c.btnPrimary },
    btnSecondary: { backgroundColor: c.btnSecondary },
    btnDanger: { backgroundColor: c.btnDanger },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: c.inputBorder,
      borderRadius: 10,
      padding: 12,
      marginTop: 6,
      color: c.text,
      backgroundColor: c.inputBg,
    },
    headerRightText: { color: c.headerText, fontSize: 16 },
  });

/* ============================
   Botão reutilizável
============================ */
const AppButton = ({ title, onPress, variant = 'primary' }) => {
  const { styles } = React.useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'danger' && styles.btnDanger,
        pressed && { opacity: 0.85, transform: [{ scale: 0.995 }] },
      ]}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

/* ============================
   Telas
============================ */
function HomeScreen({ navigation }) {
  const { styles } = React.useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>TELA INICIAL</Text>
        <Text style={styles.welcome}>👋 Bem-vindo ao aplicativo!</Text>

        <AppButton
          title="Ir para Detalhes"
          onPress={() => navigation.navigate('Detalhes')}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ navigation }) {
  const { styles } = React.useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.scroll}>
        <View style={[styles.container, { justifyContent: 'flex-start', paddingTop: 24 }]}>
          <Text style={styles.title}>TELA DE DETALHES</Text>
          <Text style={styles.description}>Aqui estão algumas informações do usuário fictício:</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
}

function PerfilScreen({ navigation }) {
  const { styles } = React.useContext(ThemeContext);
  const [user, setUser] = React.useState({
    nome: 'Maria Laura',
    idade: '21',
    email: 'marialaura@email.com',
    cidade: 'Franca - SP',
  });

  React.useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@user');
      if (saved) setUser(JSON.parse(saved));
    })();
  }, []);

  const handleLogout = () =>
    showAlert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          // Limparia tokens/estado de login aqui, se existisse.
          navigation.reset({
            index: 0,
            routes: [{ name: 'Início' }],
          });
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.scroll}>
        <View style={[styles.container, { justifyContent: 'flex-start', paddingTop: 24 }]}>
          <Text style={styles.title}>TELA DE PERFIL</Text>
          <Text style={styles.welcome}>😎 Aqui é o seu perfil, aproveite!</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>👤 Nome:</Text>
            <Text style={styles.cardText}>{user.nome}</Text>

            <Text style={styles.cardTitle}>🎂 Idade:</Text>
            <Text style={styles.cardText}>{user.idade} anos</Text>

            <Text style={styles.cardTitle}>📧 Email:</Text>
            <Text style={styles.cardText}>{user.email}</Text>

            <Text style={styles.cardTitle}>📍 Cidade:</Text>
            <Text style={styles.cardText}>{user.cidade}</Text>
          </View>

          <AppButton
            title="Editar perfil"
            onPress={() => navigation.navigate('EditarPerfil', { user })}
          />
          <AppButton title="Sair" onPress={handleLogout} variant="danger" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EditarPerfilScreen({ route, navigation }) {
  const { styles } = React.useContext(ThemeContext);
  const initial = route.params?.user ?? {
    nome: '',
    idade: '',
    email: '',
    cidade: '',
  };
  const [form, setForm] = React.useState(initial);

  const onChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const salvar = async () => {
    if (!form.nome.trim() || !form.email.trim()) {
      showAlert('Campos obrigatórios', 'Preencha ao menos Nome e Email.');
      return;
    }
    await AsyncStorage.setItem('@user', JSON.stringify(form));
    showAlert('Pronto!', 'Dados salvos com sucesso.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.scroll}>
        <View style={[styles.container, { justifyContent: 'flex-start', paddingTop: 24 }]}>
          <Text style={styles.title}>EDITAR PERFIL</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome</Text>
            <TextInput style={styles.input} value={form.nome} onChangeText={(t) => onChange('nome', t)} />

            <Text style={styles.cardTitle}>Idade</Text>
            <TextInput
              style={styles.input}
              value={form.idade}
              onChangeText={(t) => onChange('idade', t)}
              keyboardType="number-pad"
            />

            <Text style={styles.cardTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(t) => onChange('email', t)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.cardTitle}>Cidade</Text>
            <TextInput style={styles.input} value={form.cidade} onChangeText={(t) => onChange('cidade', t)} />
          </View>

          <AppButton title="Salvar" onPress={salvar} />
          <AppButton title="Cancelar" onPress={() => navigation.goBack()} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ============================
   App (Provider + Navigator)
============================ */
export default function App() {
  const [isDark, setIsDark] = React.useState(false);
  const colors = isDark ? darkColors : lightColors;
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ isDark, colors, styles, toggleTheme }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBg}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.headerBg },
            headerTintColor: colors.headerText,
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <ThemeToggle />
            ),
          }}
        >
          <Stack.Screen name="Início" component={HomeScreen} options={{ title: 'Início' }} />
          <Stack.Screen name="Detalhes" component={DetailsScreen} options={{ title: 'Detalhes' }} />
          <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Meu Perfil' }} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ title: 'Editar Perfil' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

/* ============================
   Botão de alternância de tema
============================ */
function ThemeToggle() {
  const { isDark, toggleTheme, styles } = React.useContext(ThemeContext);
  return (
    <Pressable onPress={toggleTheme} hitSlop={10} style={{ paddingHorizontal: 6, paddingVertical: 4 }}>
      <Text style={styles.headerRightText}>{isDark ? '☀️' : '🌙'}</Text>
    </Pressable>
  );
}
