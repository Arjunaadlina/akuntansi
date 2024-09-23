// Edit.js
import  { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useDataContext } from '../store/data';
import { Picker } from '@react-native-picker/picker';
import ErrModal from '../components/Home/body/ErrModal';
const width = Dimensions.get("window").width
const Edit = ({ route, navigation }) => {
const { updateItemCtx, deleteItemCtx, picker } = useDataContext();

const [item, setItem] = useState({
    id: route.params?.item?.id ,
    keterangan: route.params?.item?.keterangan ,
    uang: route.params?.item?.uang,
    info: route.params?.item?.info,
    jurnal: {
        akunDebit: route.params?.item?.jurnal?.akunDebit,
        akunKredit: route.params?.item?.jurnal?.akunKredit,
    },
    tanggalDibuat: route.params?.item?.tanggalDibuat || '', // Modify this line
    tanggal: route.params?.item?.tanggal || '', // Modify this line
    bulan: route.params?.item?.bulan || '', // Modify this line
    tahun: route.params?.item?.tahun || '', 
});

const [modalVisible, setModalVisible] = useState(false);

const handleEditItem = async () => {
    try {
      if (item.keterangan === '' || item.uang === '' || item.jurnal.akunDebit === '' || item.jurnal.akunKredit === '') {
        setModalVisible(true);
        return; // Stop further execution if input is not valid
      }
      updateItemCtx({
        ...item
      })
      // After updating, you can navigate back to the original page or close the modal
      setModalVisible(false);
      navigation.goBack(); // You can use navigation.navigate('OriginalPage') if needed
    } catch (error) {
      console.error('Error editing item:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  const handleDeleteItem = async () => {
    try {
      // Use the updated deleteItem function
      deleteItemCtx(item.id)
      // After deleting, you can navigate back to the original page or close the modal
      setModalVisible(false);
      navigation.goBack(); // You can use navigation.navigate('OriginalPage') if needed
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  

  return (
    <View style={styles.container}>
        <ErrModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
        <View style={styles.containerTitle}>
            <Text style={[styles.subTitle, { fontSize: width *0.04 }]}>Penerimaan Kas</Text>
        </View>
        <Text style={styles.subTitle}>Keterangan</Text>
        <TextInput
            placeholder="Masukkan Keterangan"
            value={item.keterangan}
            onChangeText={(text) => setItem((prevItem) => ({ ...prevItem, keterangan: text }))}
            style={styles.input}
            cursorColor="#104e5b"
        />
        <Text style={styles.subTitle}>Uang</Text>
        <View style={styles.containerInPik}>
            <TextInput
            placeholder={`Masukkan ${item.info}`}
            keyboardType="numeric"
            value={item.uang}
            onChangeText={(text) => {
                setItem((prevItem) => ({
                ...prevItem,
                uang: text,
                }));
            }}
            style={styles.input}
            cursorColor="#104e5b"
            />
            <View style={styles.picker}>
            <Picker
                dropdownIconRippleColor="#000"
                mode="dropdown"
                selectedValue={item.info}
                onValueChange={(value) => setItem((prevItem) => ({ ...prevItem, info: value }))}
            >
                <Picker.Item label="Debit" value="Debit" />
                <Picker.Item label="Kredit" value="Kredit" />
            </Picker>
            </View>
        </View>

        <View>
            <View style={[styles.containerTitle, { marginTop: width *0.04 }]}>
            <Text style={[styles.subTitle, { fontSize: width *0.04 }]}>Jurnal</Text>
            </View>
            <Text style={styles.subTitle}>Debit</Text>
            <View style={styles.containerInPik}>
            <View style={styles.colJurnal}>
                <Text>{item.uang}</Text>
            </View>
            <View style={styles.picker}>
                <Picker
                dropdownIconRippleColor="#000"
                mode="dropdown"
                selectedValue={item.jurnal.akunDebit}
                onValueChange={(value) => setItem((prevJurnal) => ({ ...prevJurnal, jurnal: { akunDebit: value } }))}
                >
                <Picker.Item label='Pilih Akun' value='' color='#9a9'/>
                {picker.map((item, index) => (
                    <Picker.Item key={index} label={item.picker} value={item.picker} />
                ))}
            </Picker>
            </View>
            </View>

            <Text style={styles.subTitle}>Kredit</Text>
            <View style={styles.containerInPik}>
            <View style={styles.colJurnal}>
                <Text>{item.uang}</Text>
            </View>
            <View style={styles.picker}>
                <Picker
                dropdownIconRippleColor="#000"
                mode="dropdown"
                selectedValue={item.jurnal.akunKredit}
                onValueChange={(value) => setItem((prevJurnal) => ({
                    ...prevJurnal,
                    jurnal: { ...prevJurnal.jurnal, akunKredit: value }
                }))}
                >
                <Picker.Item label='Pilih Akun' value='' color='#9a9'/>
                {picker.map((item, index) => (
                    <Picker.Item key={index} label={item.picker} value={item.picker} />
                ))}
            </Picker>
            </View>
            </View>
        </View>

        <View style={{flexDirection: 'row-reverse', justifyContent : 'center',alignItems : 'center', gap : 12,}}>
        <TouchableOpacity onPress={handleEditItem} style={styles.button}>
            <Text style={styles.addTitle}>Edit</Text>
        </TouchableOpacity>

        {/* Button to delete the item */}
        <TouchableOpacity onPress={handleDeleteItem} style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}>
            <Text style={[styles.addTitle, {color : '#fff'}]}>Delete</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

export default Edit;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : width *0.04,
        backgroundColor : '#f4f0f1'
    },
    title : {
        fontWeight : 'bold',
        fontSize : width *0.04
    },
    containerTitle : {
      height : width * 0.1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    containerInPik :{
        flexDirection : 'row',
        gap : 12,
        justifyContent : 'center'
    },
    input : {
        borderWidth : 1,
        height : width * 0.12,
        marginBottom : width *0.04,
        borderRadius : 12,
        paddingHorizontal : 12,
    },
    picker : {
        borderWidth : 1,
        borderRadius : 12,
        height : width * 0.12,
        flex : 1,
        justifyContent : 'center'
    },
    subTitle : {
        color: '#104e5b',
        marginBottom : 8,
        fontWeight : 'bold'
    },
    button :{
        flex :1,
        backgroundColor : '#f1ba79',
        height : width * 0.11,
        marginTop : width *0.04,
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : width *0.04
    },
    addTitle : {
        color: '#104e5b',
        fontWeight : 'bold',
        fontSize : width *0.04
    },
    colJurnal : {
      backgroundColor : '#dadada',
      height : width * 0.12,
      minWidth : width * 0.4,
      marginBottom : width *0.04,
      borderRadius : 12,
      paddingHorizontal : 12,
      justifyContent : 'center'
  }
})