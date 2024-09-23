import { View, Text, StyleSheet, Dimensions, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useDataContext } from "../store/data";

const width = Dimensions.get('window').width

export default function User(){
    const [isEditing, setIsEditing] = useState(false);
    
    const {name, inputNama} = useDataContext()

    const handleUsernamePress = () => {
      setIsEditing(true);
    };

  
    const handleUsernameBlur = () => {
      setIsEditing(false);
      // You can handle saving the updated username to your state or server here
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerUsername}>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={inputNama}
            onBlur={handleUsernameBlur}
            autoFocus={true}
          />
        ) : (
          <Pressable
            android_ripple={{ color: "#ddd" }}
            onPress={handleUsernamePress}
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: width * 0.04 }}
          >
            <Text style={styles.text}>{name}</Text>
          </Pressable>
        )}
      </View>
            <View style={styles.containerKelompok}>
                <Text style={[styles.text, {color : '#99BC85'}]}>
                    Aplikasi ini dibuat untuk UAS Akuntansi Smt 3,
                    menggunakan bahsa pemrograman javascript dan 
                    framework react native expo.
                </Text>
                <Text style={[styles.text,{color : '#99BC85'}]}>
                    Revice dikembangkan menggunakan metode Agile
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : width * 0.04
    },
    containerUsername : {
        height : width * 0.15,
        backgroundColor : '#fff',
        justifyContent : 'center',
        borderRadius : 12,
        elevation : 3,
        shadowColor : '#104e5b',
        marginTop : width * 0.04
    },
    text :{
        fontWeight : 'bold',
        color : '#104e5b',
        fontSize : width * 0.04
    },
    containerKelompok :{
        height : width * 0.5,
        backgroundColor : '#fff',
        justifyContent : 'center',
        paddingHorizontal : width * 0.04,
        borderRadius : 12,
        elevation : 3,
        shadowColor : '#104e5b',
        marginTop : width * 0.04
    },
    textInput: {
        height: "100%",
        fontSize: width * 0.04,
        fontWeight: "bold",
        color: "#104e5b",
        paddingHorizontal : width * 0.04
      },
})