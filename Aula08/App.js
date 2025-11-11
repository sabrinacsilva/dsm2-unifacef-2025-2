import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  async function abrirCamera() {
    if (Platform.OS === 'web') {
      Alert.alert('Atenção', 'Câmera no Web é limitada. Teste no Expo Go no celular.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImagem(result.assets[0].uri);
  }

  async function abrirGaleria() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImagem(result.assets[0].uri);
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* “Faixa” decorativa no topo */}
      <View style={styles.topAccent} />

      <View style={styles.card}>
        <Text style={styles.title}>Perfil do Usuário</Text>

        {/* Avatar com anel e sombra */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing}>
            <Image
              source={
                imagem
                  ? { uri: imagem }
                  : { uri: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4' }
              }
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Botões */}
        <View style={styles.btnGroup}>
          <Pressable
            onPress={abrirCamera}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            style={({ pressed }) => [
              styles.button,
              styles.buttonPrimary,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>📷 Tirar foto</Text>
          </Pressable>

          <Pressable
            onPress={abrirGaleria}
            android_ripple={{ color: 'rgba(37,99,235,0.15)' }}
            style={({ pressed }) => [
              styles.button,
              styles.buttonSecondary,
              pressed && styles.buttonPressedLight,
            ]}
          >
            <Text style={[styles.buttonText, styles.buttonTextDark]}>🖼️ Escolher da galeria</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 140,
    backgroundColor: '#2563EB', // azul
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  card: {
    width: '88%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 22,
    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // sombra Android
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
    color: '#0F172A',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    padding: 6,
    backgroundColor: '#E8EEF8',
    alignItems: 'center',
    justifyContent: 'center',
    // sutil brilho
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: '#E5E7EB',
  },
  btnGroup: {
    marginTop: 4,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
  },
  buttonSecondary: {
    backgroundColor: '#E9F0FF',
    borderWidth: 1,
    borderColor: '#C9DAFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  buttonTextDark: {
    color: '#1E293B',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  buttonPressedLight: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
});
