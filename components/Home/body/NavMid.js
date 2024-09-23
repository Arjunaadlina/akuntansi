import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';

const width = Dimensions.get("window").width

export default function NavMid({icon, title, navigate}){
    return(
        <TouchableOpacity style={styles.iconRectangle} onPress={() => navigate()}>
            <FontAwesome5 name={icon} size={25} color='#104e5b'/>
            <Text style={styles.miniTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconRectangle : {
        height : width *0.13,
        width : width *0.13,
        justifyContent : 'center',
        alignItems : 'center',
    },
    miniTitle : {
        fontSize : 10
    },
})