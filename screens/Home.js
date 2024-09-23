import { View, StyleSheet } from "react-native";
import Head from "../components/Home/header/Head";
import Body from "../components/Home/body/Body";
import { useDataContext } from "../store/data";

function Home() {
  const { data, deleteItem } = useDataContext();

  const uangMasuk = data.reduce((sum, item) => {
    if (item.info === 'Debit') {
      return sum + parseInt(item.uang, 10);
    }
    return sum;
  }, 0);

  const formattedUangMasuk = uangMasuk.toLocaleString("id-ID");

  const uangKeluar = data.reduce((sum, item) => {
    if (item.info === 'Kredit') {
      return sum + parseInt(item.uang, 10);
    }
    return sum;
  }, 0);

  const formattedUangKeluar = uangKeluar.toLocaleString("id-ID");

  const total = uangMasuk - uangKeluar;
  const formattedTotal = total.toLocaleString("id-ID");

  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      <Head datas={data} formattedTotal={formattedTotal} />
      <Body
        formattedUangMasuk={formattedUangMasuk}
        formattedUangKeluar={formattedUangKeluar}
        DATA={data}
        uangMasuk={uangMasuk}
        uangKeluar={uangKeluar}
        onDelete={(itemId) => deleteItem(itemId)}
      />
    </View>

  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0f1",
  },
});
