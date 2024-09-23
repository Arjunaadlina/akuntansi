// DataContext.js
import { createContext, useState, useContext,useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [picker, setPicker] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [name, setName] = useState('Username')
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('data');
        const storedPicker = await AsyncStorage.getItem('picker');
        const storedName = await AsyncStorage.getItem('name');

        if (storedData) {
          setData(JSON.parse(storedData));
        }

        if (storedPicker) {
          setPicker(JSON.parse(storedPicker));
        }

        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }finally {
        setLoading(false);
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    };
    loadData();
  }, []);

  const saveItemToStorage = async (updateData) => {
    try {
      // const currentData = JSON.stringify(data);
      await AsyncStorage.setItem('data', JSON.stringify(updateData));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const savePickerToStorage = async (updatePicker) => {
    try {
      // const currentPicker = JSON.stringify(picker);
      await AsyncStorage.setItem('picker', JSON.stringify(updatePicker));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const saveNameToStorage = async (updatedName) => {
    try {
      await AsyncStorage.setItem('name', updatedName);
    } catch (error) {
      console.error('Error saving name to AsyncStorage:', error);
    }
  };

  // Function to add data
  const addItem = (newItem) => {
    setData((prevData) => {
      const updatedData = [newItem, ...prevData];
      saveItemToStorage(updatedData, data);
      return updatedData;
    });
  };

  // Function to add to the picker
  const addPicker = (newPicker) => {
    setPicker((prevPicker) => {
      const updatedPicker = [newPicker, ...prevPicker];
      savePickerToStorage(updatedPicker, picker);
      return updatedPicker;
    });
  }

  const inputNama = (text)=> {
    setName(text)
    saveNameToStorage(text);
  }

  // Function to delete an item
  const deleteItemCtx = (itemId) => {
    setData((prevData) => { 
      const updatedData = prevData.filter((item) => item.id !== itemId)
      saveItemToStorage(updatedData, data);
      return updatedData
    });
  };

  const deletePicker = (pickerItemId) => {
    setPicker((prevPicker) => {
      const updatedPicker = prevPicker.filter((item) => item.id !== pickerItemId);
      savePickerToStorage(updatedPicker, picker);
      return updatedPicker;
    });
  };

  // Function to update an item
  const updateItemCtx = (updatedItem) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      saveItemToStorage(updatedData, data);
      return updatedData;
    });
  };

  const cekInstall = ()=> setIsFirstTime(false)

  // The value prop contains the data and functions you want to provide
  const value = {
    addItem,
    data,
    picker,
    deleteItemCtx,
    addPicker,
    updateItemCtx,
    inputNama,
    name,
    cekInstall,
    isFirstTime,
    deletePicker
  };


  return (
    <DataContext.Provider value={value}>
      {loading? (
        // Display a loading indicator here, for example:
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight : 'bold', color : '#104e5b', marginTop : 8}}>Mengambil Data</Text>
          <ActivityIndicator size="large" color='#104e5b' />
        </View>
      ) : ( 
        children
      )
      }
    </DataContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useDataContext = () => {
  return useContext(DataContext);
};
