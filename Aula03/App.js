// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Aula 03 - DSM2</Text>
      <Text style={styles.subtitle}>
        Projeto modificado com novo texto e estilo!
      </Text>
      <Text style={styles.footer}>Aluno: Sabrina Costa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd', // azul claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#1565c0',
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
});
