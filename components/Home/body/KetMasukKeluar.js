import { View, StyleSheet,Text, Dimensions, Image, Pressable } from "react-native"

const width = Dimensions.get("window").width
function KetMasukKeluar({formattedUang, image, keterangan}) {
    return (
        <View style={styles.containerContent}>
            <View style={styles.containerImage}>
                <Image source={image} style={styles.image}/>
            </View>
            <Pressable style={styles.underImage} android_ripple={{color : '#fff', borderless : false}}>
                <View style={{flex : 1}}>
                    <Text style={styles.textKet}>{keterangan}</Text>
                    <Text style={styles.textUang}>Rp {formattedUang}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default KetMasukKeluar

const styles = StyleSheet.create({
    containerContent : {
        flex :1 ,
    },
    containerImage : {
        height : width * 0.23,
        width : '100%',
    },
    image : {
        width: '100%', // Use '100%' to fill the container width
        height: '100%',
        borderTopLeftRadius : width * 0.04,
        borderTopRightRadius : width * 0.04,
    },
    underImage : {
        backgroundColor : '#104e5b',
        padding : width * 0.03,
        borderTopLeftRadius : width * 0.03,
        borderTopRightRadius : width * 0.03,
        borderBottomLeftRadius : width * 0.04,
        borderBottomRightRadius : width * 0.04,
        marginTop : width * -0.025,
        flexDirection : 'row',
        alignItems : 'center',
    },
    textKet : {
        color : '#fff',
        fontSize : width * 0.023,
    },
    textUang : {
        color : '#fff',
        fontSize : width * 0.035,
        fontWeight : '700'
    }
})