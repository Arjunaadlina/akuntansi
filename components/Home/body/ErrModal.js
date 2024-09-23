import { Text, View, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons';

const width = Dimensions.get("window").width

export default function ErrModal({isVisible, onClose}){
    return(
        <Modal 
            isVisible={isVisible} 
            onBackdropPress={onClose} 
            animationIn={"zoomIn"} 
            animationOut={"zoomOut"}
            style={styles.modal}
            useNativeDriver={true} 
        >
            <View style={styles.containerModal}>
                <View style={{flexDirection : 'row', gap : 12, justifyContent : 'center', alignItems : 'center'}}>
                    <FontAwesome5 name="exclamation-triangle" size={20} color='#B80000'/>
                    <Text style={styles.title}>Error !</Text>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center', marginTop : 12}}>
                    <Text style={styles.text}>Harap Periksa Input Anda,</Text>
                    <Text style={styles.text}>Pastikan Semua Terisi !</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal : {
        alignItems : 'center'
    },
    containerModal :{
        height : width*0.45,
        width : width*0.7,
        backgroundColor : '#fff',
        borderRadius : 20,
        padding : 16,
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        fontWeight : 'bold',
        fontSize : width*0.05,
        color : '#B80000'
    },
    text : {
        fontWeight : '600',
        fontSize : width * 0.04,
        color : '#FF8080'
    }
});