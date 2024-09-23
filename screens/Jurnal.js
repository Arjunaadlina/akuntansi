import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDataContext } from "../store/data";

export default function Jurnal(){
    const {data} = useDataContext()
    return(
        <View style={styles.container}>
        <View style={styles.containerJurnalList}>
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{fontWeight : 'bold', fontSize : 16}}>Jurnal</Text>
            </View>
            {data.length > 0 ? (
                    <FlatList 
                        data={data}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> (
                                <View>
                                <Text style={styles.tanggal}>{item.tanggalDibuat}</Text>
                                <View style={styles.containerMoney}>
                                    <Text style={styles.akunDebit}>{item.jurnal.akunDebit}</Text>
                                    <Text style={styles.akunDebit}>Rp {parseInt(item.uang).toLocaleString("id-ID")}</Text>
                                </View>
                                <View style={styles.containerMoney}>
                                    <Text style={styles.akunKredit}>{item.jurnal.akunKredit}</Text>
                                    <Text style={styles.akunKredit}>Rp {parseInt(item.uang).toLocaleString("id-ID")}</Text>
                                </View>
                            </View>
                        )}
                    />
            ) : 
            (
                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                    <Text>Tidak Tersedia Jurnal</Text>
                </View>
            )
            }
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#f4f0f1',
        padding : 16
    },
    containerJurnalList : {
        backgroundColor : '#fff',
        padding : 12,
        borderRadius : 12,
        flex : 1
    },
    containerMoney : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    tanggal : {
        fontSize : 12,
        color : '#aaa',
        marginTop : 12
    },
    akunDebit : {
        color : "#104e5b",
        fontWeight : '700'
    },
    akunKredit : {
        color : "#B31B1B",
        fontWeight : '700'
    }
})