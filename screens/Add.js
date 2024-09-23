import  { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useDataContext } from '../store/data';
import { formatDateString } from '../utils/formattedDate';
import ErrModal from '../components/Home/body/ErrModal';

const width = Dimensions.get("window").width

const Add = ({ navigation }) => {
  const { addItem, picker } = useDataContext();

  const [item, setItem] = useState({
    id :'',
    keterangan: '',
    uang: '',
    tanggalDibuat: '',
    tanggal: '',
    bulan: '',
    tahun: '',
    info: 'Debit',
    jurnal : {
          akunDebit: '', 
          akunKredit: '', 
    }
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddItem = async () => {
    try {
      setLoading(true); // Set loading to true when starting the operation

      const currentDate = new Date();
      const formattedDate = formatDateString(currentDate);
      const formattedDay = currentDate.getDate().toString().padStart(2, '0');
      const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const formattedYear = currentDate.getFullYear().toString();

      if (item.keterangan === '' || item.uang === '' || item.jurnal.akunDebit === '' || item.jurnal.akunKredit === '') {
        setModalVisible(true);
        return; // Stop further execution
      }

      addItem({
        ...item,
        id :  new Date().toString() + Math.random().toString(),
        uang: item.uang,
        tanggalDibuat: formattedDate,
        tanggal: formattedDay,
        bulan: formattedMonth,
        tahun: formattedYear,
      });

      setItem((prevItem) => ({
        ...prevItem,
        id : '',
        keterangan: '',
        uang: '',
        tanggalDibuat: '',
        tanggal: '',
        bulan: '',
        tahun: '',
        info: 'Debit',
        jurnal: {
          akunDebit: '',
          akunKredit: '',
        }
      }));

      setModalVisible(false);
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Error adding item:', error);
      // Handle error as needed
    } finally {
      setLoading(false); // Set loading to false after the operation completes (either success or failure)
    }
  };
  

  return (
    <View style={styles.container}>
      <ErrModal isVisible={modalVisible} onClose={() => setModalVisible(false)}/>
      <View style={styles.containerTitle}>
        <Text style={[styles.subTitle,{fontSize : width *0.04}]}>Penerimaan Kas</Text>
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
      <View style={[styles.containerTitle, {marginTop : width *0.04}]}>
        <Text style={[styles.subTitle,{fontSize : width *0.04}]}>Jurnal</Text>
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
            onValueChange={(value) => setItem((prevJurnal) => ({ ...prevJurnal, jurnal : {akunDebit: value }}))}
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
      {loading && <ActivityIndicator size="large" color='#104e5b' />}
      <TouchableOpacity onPress={handleAddItem} style={styles.button}>
        <Text style={styles.addTitle}>Tambahkan</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Add;

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
      height : width * 0.09,
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
        height : width *0.12,
        marginBottom : width *0.04,
        borderRadius : 12,
        paddingHorizontal : 12,
    },
    picker : {
        borderWidth : 1,
        borderRadius : 12,
        height : width *0.12,
        flex : 1,
        justifyContent : 'center'
    },
    subTitle : {
        color: '#104e5b',
        marginBottom : 8,
        fontWeight : 'bold'
    },
    button :{
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
      height : width *0.12,
      minWidth : 130,
      marginBottom : width *0.04,
      borderRadius : 12,
      paddingHorizontal : 12,
      justifyContent : 'center'
  }
})