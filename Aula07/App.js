import React, { useCallback, useMemo, useState, memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  useWindowDimensions,
  Platform,
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
  Vestuário:   { bg: "#f0fdf4", border: "#ddf7e2", text: "#15803d" },
  Casa:        { bg: "#fff7ed", border: "#ffebd6", text: "#c2410c" },
  Calçados:    { bg: "#f5f3ff", border: "#e7e3ff", text: "#6d28d9" },
};

const formatBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

// ——— responsividade simples por largura
const useScale = () => {
  const { width } = useWindowDimensions();
  const base = 375; // referência
  const scale = Math.max(0.85, Math.min(1.25, width / base));
  const ms = (n) => Math.round(n * scale);
  return { ms };
};

// ——— Item do produto (memoizado)
const ProductCard = memo(function ProductCard({ item, ms }) {
  const cat = categoryColors[item.categoria] || {
    bg: "#eef2ff", border: "#dbe3ff", text: "#3b5bfd",
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { padding: ms(14), borderRadius: ms(14), transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
      android_ripple={{ color: "#00000010" }}
    >
      <View style={[styles.cardHeader, { marginBottom: ms(6) }]}>
        <Text style={[styles.nome, { fontSize: ms(16) }]} numberOfLines={1}>
          {item.nome}
        </Text>
        <View
          style={[
            styles.categoriaPill,
            { paddingHorizontal: ms(10), paddingVertical: ms(4), borderRadius: 999,
              backgroundColor: cat.bg, borderColor: cat.border, borderWidth: 1 },
          ]}
        >
          <Text style={[styles.categoriaTexto, { fontSize: ms(12), color: cat.text }]}>
            {item.categoria}
          </Text>
        </View>
      </View>
      <Text style={[styles.preco, { fontSize: ms(16) }]}>{formatBRL(item.preco)}</Text>
    </Pressable>
  );
});

// ——— Header da seção (memoizado)
const SectionHeader = memo(function SectionHeader({ title, ms }) {
  return (
    <View style={[styles.sectionHeader, { paddingHorizontal: ms(12), paddingVertical: ms(8) }]}>
      <Text style={[styles.sectionTitle, { fontSize: ms(13) }]}>{title}</Text>
    </View>
  );
});

export default function App() {
  const [query, setQuery] = useState("");
  const { ms } = useScale();

  // 1) memoiza dados base
  const produtos = useMemo(() => rawProdutos, []);

  // 2) filtro por nome (case/acento-insensitive)
  const normalize = (s) =>
    (s || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

  const filtrados = useMemo(() => {
    const q = normalize(query);
    if (!q) return produtos;
    return produtos.filter((p) => normalize(p.nome).includes(q));
  }, [produtos, query]);

  // 3) agrupamento por categoria para SectionList
  const sections = useMemo(() => {
    const map = new Map();
    for (const p of filtrados) {
      if (!map.has(p.categoria)) map.set(p.categoria, []);
      map.get(p.categoria).push(p);
    }
    return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
  }, [filtrados]);

  // 4) callbacks memoizados
  const renderItem = useCallback(
    ({ item }) => <ProductCard item={item} ms={ms} />,
    [ms]
  );

  const renderSectionHeader = useCallback(
    ({ section }) => <SectionHeader title={section.title} ms={ms} />,
    [ms]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#CBE9FF" }]}>
      <StatusBar barStyle="dark-content" />

      {/* Campo de busca */}
      <View style={{ paddingHorizontal: ms(16), paddingTop: ms(12), paddingBottom: ms(8) }}>
        <Text style={[styles.titulo, { fontSize: ms(22) }]}>CATÁLOGO DE PRODUTOS</Text>
        <TextInput
          placeholder="Buscar por nome..."
          placeholderTextColor="#64748B"
          value={query}
          onChangeText={setQuery}
          style={{
            marginTop: ms(10),
            height: ms(44),
            borderRadius: ms(10),
            paddingHorizontal: ms(12),
            fontSize: ms(14),
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#94A3B8",
          }}
          clearButtonMode={Platform.OS === "ios" ? "while-editing" : "never"}
        />
      </View>

      {/* Lista agrupada por categoria */}
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        contentContainerStyle={{ paddingHorizontal: ms(16), paddingBottom: ms(32) }}
        ItemSeparatorComponent={() => <View style={{ height: ms(10) }} />}
        SectionSeparatorComponent={() => <View style={{ height: ms(8) }} />}
        initialNumToRender={12}
        windowSize={8}
        maxToRenderPerBatch={20}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={() => (
          <View style={{ padding: ms(16) }}>
            <Text style={{ color: "#334155", fontSize: ms(14) }}>
              Nenhum produto encontrado.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titulo: { fontWeight: "700", color: "#0F172A" },
  card: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  nome: { flex: 1, fontWeight: "600", color: "#0F172A" },
  categoriaPill: { },
  categoriaTexto: { fontWeight: "600" },
  preco: { fontWeight: "700", color: "#059669", marginTop: 2 },
  sectionHeader: {
    backgroundColor: "#E2E8F0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBD5E1",
  },
  sectionTitle: {
    color: "#0F172A",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
