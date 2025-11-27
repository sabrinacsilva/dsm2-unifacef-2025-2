
import { SectionList, StyleSheet, Text, View } from 'react-native';

const compromissos = [
  {
    title: '(Eu)',
    data: [
      { id: 1, description: '09h30: Reunião "Daily"' },
      {
        id: 2,
        description: '14h00: Reunião com cliente Carros & Carros',
      },
      { id: 3, description: '16h30: Prazo final Projeto X' },
    ],
  },
  {
    title: 'Jurema (chefe)',
    data: [
      { id: 4, description: '09h30: Reunião "Daily"' },
      { id: 5, description: '12h00: Almoço com a diretoria' },
      { id: 6, description: '15h00: Saída viagem' },
    ],
  },
  {
    title: 'Aderbal',
    data: [
      { id: 7, description: '09h30: Reunião "Daily"' },
      { id: 8, description: '13h30: Visita técnica Uni-FACEF' },
      { id: 9, description: '16h30: Prazo final Projeto X' },
    ],
  },
];

export default function CompromissosDaEquipe() {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.nome}>Sabrina Costa Silva</Text>
        <Text style={styles.nome}>SI - 6º semestre</Text>
      </View>

      <SectionList
        sections={compromissos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.descricao}>{item.description}</Text>
            </View>
          );
        }}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.title}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cabecalho: {
    marginBottom: 16,
    alignItems: 'center',
  },
  nome: {
    fontSize: 16,
  },
  header: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  horario: {
    width: 70,
    fontWeight: 'bold',
  },
  descricao: {
    flex: 1,
  },
});
