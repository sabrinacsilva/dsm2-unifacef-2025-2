import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Início</Text>

      <View style={styles.actions}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle" size={20} />
          <Text style={styles.btnText}>Perfil</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate('Galeria')}>
          <Ionicons name="images" size={20} color="white" />
          <Text style={[styles.btnText, styles.btnTextPrimary]}>Abrir Galeria</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#FFFFFF' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  actions: { gap: 12 },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F4F4F5', paddingVertical: 14, paddingHorizontal: 16,
    borderRadius: 12, borderWidth: 1, borderColor: '#E4E4E7'
  },
  btnPrimary: { backgroundColor: '#7C3AED', borderColor: '#7C3AED' },
  btnText: { fontSize: 16, fontWeight: '600' },
  btnTextPrimary: { color: 'white' }
});
