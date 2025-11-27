import { View, Text, FlatList, StyleSheet } from "react-native";

export default function MeusCompromissos() {
  const dados = [
    { id: "1", hora: "09h30", desc: "Reunião “Daily”" },
    { id: "2", hora: "14h00", desc: "Reunião com cliente Carros & Carros" },
    { id: "3", hora: "16h30", desc: "Prazo Final Projeto X" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>(Eu)</Text>
      <Text style={styles.sub}>Sabrina Costa Silva</Text>
      <Text style={styles.sub}>SI - 6º semestre</Text>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.hora}: {item.desc}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sub: {
    fontSize: 16,
  },
  item: {
    fontSize: 18,
    marginTop: 20,
  },
});
