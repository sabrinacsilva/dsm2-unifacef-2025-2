import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda do dia</Text>

      <Text style={styles.sub}>Sabrina Costa Silva</Text>
      <Text style={styles.sub}>SI - 6º semestre</Text>

      <View style={{ height: 20 }} />

      <Button
        title="Meus compromissos"
        onPress={() => navigation.navigate("MeusCompromissos")}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Compromissos da equipe"
        onPress={() => navigation.navigate("CompromissosEquipe")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  sub: {
    fontSize: 18,
  },
});
