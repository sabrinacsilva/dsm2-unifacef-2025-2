import { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Modal, Pressable, ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IMAGES = [
  { id: '1', uri: 'https://picsum.photos/seed/a/600/600' },
  { id: '2', uri: 'https://picsum.photos/seed/b/600/600' },
  { id: '3', uri: 'https://picsum.photos/seed/c/600/600' },
];

export default function GalleryScreen({ navigation }) {
  const [preview, setPreview] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  // Ícone no topo (headerRight)
  navigation.setOptions({
    headerTitle: 'Galeria',
    headerRight: () => <Ionicons name="camera" size={24} color="#7C3AED" />, // roxinho leve
  });

  function renderItem({ item }) {
    const isLoading = loadingId === item.id;
    return (
      <Pressable
        onPress={() => setPreview(item.uri)}
        style={styles.card}
      >
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        )}
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          onLoadStart={() => setLoadingId(item.id)}
          onLoadEnd={() => setLoadingId(null)}
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={IMAGES}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Preview em tela cheia simples */}
      <Modal visible={!!preview} transparent animationType="fade" onRequestClose={() => setPreview(null)}>
        <View style={styles.modalBg}>
          <Pressable style={styles.closeBtn} onPress={() => setPreview(null)}>
            <Ionicons name="close" size={28} />
          </Pressable>
          <Image source={{ uri: preview }} style={styles.preview} />
          <Text style={styles.hint}>Toque no X para fechar</Text>
        </View>
      </Modal>
    </View>
  );
}

const GAP = 12;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  row: { gap: GAP, paddingHorizontal: GAP },
  listContent: { paddingVertical: GAP },
  card: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  image: { width: '100%', height: '100%' },
  loader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  preview: { width: '100%', height: undefined, aspectRatio: 1, borderRadius: 12 },
  closeBtn: { position: 'absolute', top: 40, right: 20, padding: 8, backgroundColor: 'white', borderRadius: 999 },
  hint: { color: '#DDD', marginTop: 8 }
});
