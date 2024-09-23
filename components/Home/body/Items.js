import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Items({ id, keterangan, uang, info, onPress }) {
  const formattedUang = parseInt(uang).toLocaleString("id-ID");
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.moneyDetailContainer}
        android_ripple={{ color: "#eaeaea" }}
        onPress={onPress}
      >
        <Text style={[styles.textAkun, { color: "#104e5b" }]}>{keterangan}</Text>
        {info === 'Kredit' ? (
          <Text style={[styles.textUang, { color: "#B31B1B" }]}>
            - Rp. {formattedUang}
          </Text>
        ) : (
          <Text style={[styles.textUang, { color: "#104e5b" }]}>
            Rp. {formattedUang}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#aaa",
  },
  moneyDetailContainer: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  textAkun: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom :4
  },
  textUang: {
    fontSize: 14,
    fontWeight: "400",
  },
});
