import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultadoScreen({ route, navigation }) {
  const { nome, email, telefone } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro Concluído!</Text>

      <Text style={styles.texto}>Nome: {nome}</Text>
      <Text style={styles.texto}>E-mail: {email}</Text>
      <Text style={styles.texto}>Telefone: {telefone}</Text>

      <Button title="Voltar ao início" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  texto: { fontSize: 18, marginBottom: 10 },
});
