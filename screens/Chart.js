import { LineChart } from "react-native-chart-kit";
import { View, Dimensions, Text } from "react-native";
import { useDataContext } from "../store/data";

export default function Chart() {
  const { data } = useDataContext();

  if (data.length === 0) {
    return (
      <View style={{flex :1, justifyContent : 'center', alignItems : 'center', padding : 16}}>
        <Text style={{fontWeight : 'bold'}}>Isi data terlebih dahulu</Text>
      </View>
    );
  }
  // Menggabungkan data berdasarkan bulan
  const monthlyData = data.reduce((accumulator, entry) => {
    const monthYear = `${entry.bulan} ${entry.tahun}`;
    const transactionType = entry.info; // Assuming 'info' property indicates the transaction type
    const amount = parseInt(entry.uang, 10);
  
    // Update the net amount based on transaction type
    const netAmount = transactionType === 'Debit' ? amount : -amount;
  
    if (!accumulator[monthYear]) {
      accumulator[monthYear] = netAmount;
    } else {
      accumulator[monthYear] += netAmount;
    }
  
    return accumulator;
  }, {});
  
  const modifiedData = Object.entries(monthlyData).reduce((accumulator, [monthYear, value]) => {
    let modifiedValue = value;

    // Jika nilai >= 10, dibagi 10
    if (value >= 10) {
      modifiedValue /= 10;
    }

    // Jika nilai >= 100, dibagi 100
    if (value >= 100) {
      modifiedValue /= 100;
    }

    // Jika nilai >= 1000, dibagi 1000
    if (value >= 1000) {
      modifiedValue / 1000;
    }

    // Set nilai menjadi 0 jika kurang dari 0
    modifiedValue = Math.max(modifiedValue, 0);

    // Masukkan hasil modifikasi ke dalam objek akumulator
    accumulator[monthYear] = modifiedValue;

    return accumulator;
  }, {});

  // Membuat array labels dan datasets untuk chart
  const chartData = {
    labels: Object.keys(modifiedData), // Gunakan bulan sebagai label
    datasets: [
      {
        data: ['0',Object.values(modifiedData)], // Gunakan uangMasuk - uangKeluar sebagai data
      },
    ],
  };

  const formatYLabel = (value) => {
    if (Math.abs(value) >= 1000) {
      return `${parseInt(value / 1000).toFixed(0)}k`;
    }
    return `${parseInt(value).toFixed(0)}`;
  };

  return (
    <View style={{flex :1, padding : 16}}>
    <Text style={{fontWeight : 'bold', color: '#104e5b', fontSize : 16}}>Tahun ini</Text>
      <View style={{ flex: 1, alignItems: 'center', marginTop :30,}}>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width}
          height={300}
          yAxisSuffix="k"
          yAxisInterval={3}
          chartConfig={{
            backgroundGradientFrom: "#f4f0f1",
            backgroundGradientTo: "#f4f0f1",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(16, 78, 91, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(16, 78, 91, ${opacity})`,
            style: {
              borderRadius: 16,
              marginTop: 20,
            },
            formatYLabel: formatYLabel,
          }}
          bezier
        />
      </View>
    </View>
  );
}