import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

const width = Dimensions.get("window").width

export default function NewPage({ route }) {
  const { filteredItems, selectedAkun } = route.params;

  // Calculate the net amount for selectedAkun
  const netAmount = filteredItems.reduce((acc, item) => {
    if (item.jurnal.akunDebit === selectedAkun) {
      return acc + parseInt(item.uang);
    } else if (item.jurnal.akunKredit === selectedAkun) {
      return acc - parseInt(item.uang) ;
    }
    return acc;
  }, 0);

  const renderItem = ({ item }) => {
    if (item.jurnal.akunDebit === selectedAkun || item.jurnal.akunKredit === selectedAkun) {
      return (
        <View style={{ marginTop: 12, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' }}>
          <View style={{  justifyContent: "space-between" }}>
            <Text>{item.keterangan}</Text>
            <Text style={{ color: item.jurnal.akunDebit === selectedAkun ? "#104e5b" : "#B31B1B" }}>
              Rp {parseInt(item.uang).toLocaleString("id-ID")}
            </Text>
          </View>
          <Text>{item.tanggalDibuat}</Text>
        </View>
      );
    } else {
      return null;
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: width * 0.04 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.mainTitle}>Buku Besar {selectedAkun}</Text>
        </View>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        <Text style={styles.mainTitle}>Total :  <Text style={{color : netAmount >= 0 ? '#104e5b' : "#B31B1B"}}>Rp {netAmount.toLocaleString("id-ID")}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0f1",
    padding: width * 0.04,
  },
  mainTitle: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});
