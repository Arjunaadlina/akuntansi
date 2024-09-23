import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useDataContext } from "../store/data";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const width = Dimensions.get("window").width

export default function BuBes() {
  const { data, addPicker, picker, deletePicker } = useDataContext();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPickerName, setNewPickerName] = useState("");
  const [inputError, setInputError] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPickerId, setSelectedPickerId] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setInputError("");
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleDeletePicker = (pickerId) => {
    toggleDeleteModal();
    setSelectedPickerId(pickerId);
  };

  const confirmDeletePicker = () => {
    deletePicker(selectedPickerId);
    toggleDeleteModal();
  };

  const handleAddPicker = async () => {
    if (!newPickerName.trim()) {
      setInputError("Nama Akun tidak boleh kosong");
    } else {
      try {
        addPicker({
          id: new Date().toString() + Math.random().toString(),
          picker : newPickerName,
        })
        // Close the modal and reset the input
        toggleModal();
        setNewPickerName("");
      } catch (error) {
        console.error('Error storing picker:', error);
      }
    }
  };

  const handleButtonPress = (selectedAkun) => {
    const filteredItems = data.filter(
      (data) =>
        data.jurnal.akunDebit === selectedAkun ||
        data.jurnal.akunKredit === selectedAkun
    );

    // Navigate to the new page and pass the filtered items
    navigation.navigate("BuBesDetail", { filteredItems, selectedAkun });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleButtonPress(item.picker)}
      onLongPress={() => handleDeletePicker(item.id)}
    >
      <Text style={styles.text}>{item.picker}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        {picker.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.noAccountText}>Tidak ada akun yang tersedia</Text>
            <Text style={styles.noAccountText}>Klik tombol + untuk menambahkan akun</Text>
          </View>
        ) : (
          <FlatList
            data={picker}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
              gap: width * 0.04,
            }}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: width * 0.04 }}
            showsVerticalScrollIndicator={false}
          />
        )}
        <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={[styles.add, { marginBottom: width * 0.04 }]}
            onPress={toggleModal}
          >
            <FontAwesome5 name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for adding a new picker */}
      <Modal
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Akun Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Akun"
              value={newPickerName}
              onChangeText={(text) => setNewPickerName(text)}
            />
            {inputError ? (
              <Text style={styles.errorText}>{inputError}</Text>
            ) : null}
            <TouchableOpacity
              title="Tambah"
              onPress={handleAddPicker}
              style={{backgroundColor:"#104e5b", padding : 8, width : width * 0.6, justifyContent : 'center', alignItems : 'center', borderRadius : 12}}
            >
              <Text style={{color : 'white', fontWeight : 'bold'}}>
                Tambah
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* modal delete */}
      <Modal
        isVisible={isDeleteModalVisible}
        onBackdropPress={toggleDeleteModal}
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Konfirmasi Hapus Akun</Text>
            <Text>Anda yakin ingin menghapus akun ini?</Text>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 16, gap : 24}}>
              <TouchableOpacity
                style={{paddingHorizontal : 16, paddingVertical : 8, borderWidth :1, borderRadius : 8}}
                onPress={toggleDeleteModal}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "red", paddingHorizontal : 16, paddingVertical : 8, borderRadius : 8 }}
                onPress={confirmDeletePicker}
              >
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
  },
  button: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  text: {
    fontSize: width * 0.04,
  },
  add:{
    backgroundColor: "#104e5b",
    borderRadius: 12,
    padding: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width : width*0.8,
    backgroundColor: "#fff",
    padding: width * 0.04,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: width * 0.04,
    marginBottom: width * 0.04,
  },
  input: {
    width : width * 0.6,
    height: width * 0.11,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: width * 0.04,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: width * 0.04,
  },
  noAccountText: {
    fontSize: width * 0.04,
    textAlign: "center",
  },
});
