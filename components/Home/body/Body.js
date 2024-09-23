import { View, StyleSheet,Text, Dimensions, FlatList, TouchableOpacity} from "react-native"
import KetMasukKeluar from "./KetMasukKeluar";
import Items from "./Items";
import { useNavigation } from "@react-navigation/native";
import NavMid from "./NavMid";

const width = Dimensions.get("window").width

const image = require('../../../assets/images/hero2.jpg')
const image2 = require('../../../assets/images/hero.jpg')

function Body({DATA, id, formattedUangMasuk, formattedUangKeluar, onPress}) {
    const data = DATA.slice(0, 4)
    const navigation = useNavigation()

    const handleEditItem = (item) => {
        navigation.navigate('Edit', { item });
      };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <NavMid icon="sticky-note" title="Catatan" navigate={()=>navigation.navigate('Detail')}/>
                <NavMid icon="newspaper" title="Jurnal" navigate={()=>navigation.navigate('Jurnal')}/>
                <NavMid icon="book" title="BuBes" navigate={()=>navigation.navigate('BuBes')}/>
            </View>
            <View style={styles.containerMasukKeluar}>
                <KetMasukKeluar image={image} keterangan='Pemasukan' formattedUang={formattedUangMasuk}/>
                <KetMasukKeluar image={image2} keterangan='Pengeluaran' formattedUang={formattedUangKeluar}/>
            </View>
            <View style={styles.containeRecent}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={styles.textTitle}>Aktifitas Terakhir</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Detail")}>
                        <Text style={styles.textTitle}>Semua</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 4 }}>
                    {data.length > 0 ? (
                        <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <Items
                                id={item.id}
                                tanggal={item.tanggal}
                                tahun={item.tahun}
                                keterangan={item.keterangan}
                                uang={item.uang}
                                bulan={item.bulan}
                                akun={item.akun}
                                info={item.info}
                                onPress={() => handleEditItem(item)}
                            />
                        )}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: 16,
                            gap: 16,
                        }}
                        />
                    ) : (
                        <View style={{height : width*0.2, alignItems : 'center', justifyContent : 'center'}}>
                            <Text>Tidak Ada Aktifitas Terakhir</Text>
                        </View>
                    )}
                    </View>
            </View>
        </View>
    );
}

export default Body

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : width * 0.04,
        marginTop : width * 0.03
    },
    iconContainer : {
        borderRadius : 12,
        backgroundColor : '#fff',
        height : width *0.15,
        paddingHorizontal : width * 0.04,
        marginBottom : width * 0.07,
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        elevation:1
    },
    containerMasukKeluar : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        gap : width * 0.03,
    },
    containeRecent:{
        marginTop : width * 0.06,
        marginBottom : width * 0.035,
    },
    textTitle : {
        color : '#104e5b',
        fontSize : width * 0.04,
        fontWeight : 'bold',
        marginBottom : width * 0.02,
    }
})