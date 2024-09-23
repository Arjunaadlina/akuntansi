import { Image, StyleSheet, Text, View, Dimensions, } from 'react-native';
import { useDataContext } from '../../../store/data';
const image = require("../../../assets/images/hero4.jpg");
const width = Dimensions.get("window").width

export default function Head({ formattedTotal}){
    const {name} = useDataContext()
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image}/>
            </View>
            <View style={styles.containerAbsolute}>
                <View style={styles.moneyContainer}>
                    <View style={{alignItems : 'flex-end'}}>
                        <Text style={{color : '#fff', fontSize : width * 0.029}}>Hallo, {name} !</Text>
                    </View>
                    <Text style={styles.textHalo}>Total saldo anda</Text>
                    <Text style={styles.textUang}>Rp {formattedTotal}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : width * 0.6,
        position: 'relative',
    },
    imageContainer : {
        height : width * 0.46,
    },
    image : {
        width: '100%', // Use '100%' to fill the container width
        height: '100%', // Use '100%' to fill the container height
    },
    containerAbsolute:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal : width * 0.04,
    },
    moneyContainer : {
        backgroundColor: '#104e5b',
        height: width * 0.3,
        borderRadius : width * 0.04,
        padding : width * 0.04,
        elevation : 20,
        shadowColor : '#104e5b'
    },
    textHalo : {
        color : '#fff',
        fontSize : width * 0.025
    },
    textUang : {
        color : '#fff',
        fontSize : width * 0.065,
        fontWeight : 'bold'
    }
})