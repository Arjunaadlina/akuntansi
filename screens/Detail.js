import { Text, View, FlatList, StyleSheet, Pressable, Dimensions } from "react-native";
import { useDataContext } from "../store/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width

export default function Detail() {
    const { data } = useDataContext();
    const navigation = useNavigation()

    const handleEditItem = (item) => {
        navigation.navigate('Edit', { item });
    };

    return (
        <View style={styles.container}>
            {data.length > 0 ? (
                <View style={{ marginBottom: 56, marginTop : 24 }}>
                    <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const formattedUang = parseInt(item.uang).toLocaleString("id-ID");
                        return (
                        <View
                            style={{
                            flex: 1,
                            borderRadius: 12,
                            overflow: "hidden",
                            shadowColor: "#dddddd",
                            marginBottom: 8,
                            }}
                        >
                            <Pressable
                            android_ripple={{ color: "#dddddd" }}
                            style={styles.containerItems}
                            onPress = {()=> handleEditItem(item)}
                            >
                            <View
                                style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                }}
                            >
                            <Text style={styles.textAkun}>{item.keterangan}</Text>
                            
                            </View>
                            <Text style={styles.textKet}>{item.tanggalDibuat}</Text>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                                {item.info === 'Kredit' ? (
                                <Text
                                    style={[styles.textUang, { color: "#B31B1B" }]}
                                >
                                    - Rp. {formattedUang}
                                </Text>
                                ) : (
                                <Text
                                    style={[styles.textUang, { color: "#104e5b" }]}
                                >
                                    Rp. {formattedUang}
                                </Text>
                                )}
                                {item.info === 'Kredit' ? (
                                <FontAwesome5
                                    name="arrow-circle-up"
                                    size={20}
                                    color={"#B31B1B"}
                                />
                                ) : (
                                <FontAwesome5
                                    name="arrow-circle-down"
                                    size={20}
                                    color={"#104e5b"}
                                />
                                )}
                            </View>
                            </Pressable>
                        </View>
                        );
                    }}
                    />
                </View>
            ) : (
                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                    <Text>Tidak Ada Catatan</Text>
                </View>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f0f1",
        paddingHorizontal: width * 0.04,
    },
    textTitle: {
        color: "#104e5b",
        fontSize: width * 0.04,
        fontWeight: "900",
        marginVertical: width * 0.04,
    },
    containerItems: {
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 12,
        borderRadius: 12,
    },
    textAkun: {
        color: "#104e5b",
        fontWeight: "bold",
    },
    textKet: {
        color: "#104e5b",
        fontWeight: "400",
        opacity: 0.4,
    },
    textUang: {
        fontWeight: "bold",
        marginLeft: 8,
    },
    });
