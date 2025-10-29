import React, { useCallback, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
  useColorScheme,
} from "react-native";

const rawProdutos = [
  { id: "1", nome: "Camiseta Básica", preco: 59.9, categoria: "Vestuário" },
  { id: "2", nome: "Calça Jeans", preco: 179.9, categoria: "Vestuário" },
  { id: "3", nome: 'Notebook 15"', preco: 3499.0, categoria: "Eletrônicos" },
  { id: "4", nome: "Smartphone X", preco: 2299.99, categoria: "Eletrônicos" },
  { id: "5", nome: "Cafeteira 110V", preco: 249.0, categoria: "Casa" },
  { id: "6", nome: "Air Fryer 4L", preco: 399.9, categoria: "Casa" },
  { id: "7", nome: "Tênis Runner", preco: 289.9, categoria: "Calçados" },
  { id: "8", nome: "Chinelo Slide", preco: 69.9, categoria: "Calçados" },
];

const categoryColors = {
  Eletrônicos: { bg: "#eef2ff", border: "#dbe3ff", text: "#3b5bfd" },
  Vestuário: { bg: "#f0fdf4", border: "#ddf7e2", text: "#15803d" },
  Casa: { bg: "#fff7ed", border: "#ffebd6", text: "#c2410c" },
  Calçados: { bg: "#f5f3ff", border: "#e7e3ff", text: "#6d28d9" },
};

const formatBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default function App() {
  const produtos = useMemo(() => rawProdutos, []);
  const keyExtractor = useCallback((item) => item.id, []);

  const renderItem = useCallback(({ item }) => {
    const cat = categoryColors[item.categoria] || {
      bg: "#eef2ff",
      border: "#dbe3ff",
      text: "#3b5bfd",
    };
    return (
      <Pressable style={({ pressed }) => [styles.card, { transform: [{ scale: pressed ? 0.99 : 1 }] }]} android_ripple={{ color: "#00000010" }}>
        <View style={styles.cardHeader}>
          <Text style={styles.nome}>{item.nome}</Text>
          <View style={[styles.categoriaPill, { backgroundColor: cat.bg, borderColor: cat.border }]}>
            <Text style={[styles.categoriaTexto, { color: cat.text }]}>{item.categoria}</Text>
          </View>
        </View>
        <Text style={styles.preco}>{formatBRL(item.preco)}</Text>
      </Pressable>
    );
  }, []);

  const ItemSeparator = useCallback(() => <View style={{ height: 10 }} />, []);
  const ListHeader = useCallback(() => (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.titulo}>CATALOGO DE PRODUTOS</Text>
    </View>
  ), [produtos.length]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={produtos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBE9FF", // 💙 azul-bebê
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitulo: {
    fontSize: 14,
    color: "#334155",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  nome: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  categoriaPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoriaTexto: {
    fontSize: 12,
    fontWeight: "600",
  },
  preco: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
    marginTop: 2,
  },
});
