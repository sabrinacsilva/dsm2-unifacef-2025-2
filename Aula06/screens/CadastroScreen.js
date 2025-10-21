import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const [erros, setErros] = useState({});

  const validar = () => {
    let valid = true;
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'Digite seu nome completo';
      valid = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      novosErros.email = 'Digite um e-mail válido';
      valid = false;
    }

    if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
      valid = false;
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
      valid = false;
    }

    if (!/^\d+$/.test(telefone)) {
      novosErros.telefone = 'O telefone deve conter apenas números';
      valid = false;
    }

    setErros(novosErros);
    return valid;
  };

  const handleCadastro = () => {
    if (validar()) {
      navigation.navigate('Resultado', {
        nome,
        email,
        telefone,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Formulário de Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#999"  
        value={nome}
        onChangeText={setNome}
      />
      {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"  
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"  
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#999"  
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      {erros.confirmarSenha && <Text style={styles.erro}>{erros.confirmarSenha}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#999"  
        keyboardType="numeric"
        value={telefone}
        onChangeText={setTelefone}
      />
      {erros.telefone && <Text style={styles.erro}>{erros.telefone}</Text>}

      {/* Botão com cor personalizada */}
      <Button title="CADASTRAR" onPress={handleCadastro} color="#d400ff" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase', // deixa o texto em MAIÚSCULO
    letterSpacing: 1.5,         // espaçamento entre letras
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },

  erro: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
});
