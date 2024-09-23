
import {  Dimensions, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { DataProvider } from './store/data';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDataContext } from './store/data';

import Home from './screens/Home';
import Detail from './screens/Detail';
import Chart from './screens/Chart';
import Jurnal from './screens/Jurnal';
import Edit from './screens/Edit';
import Add from './screens/Add';
import BuBes from './screens/BuBes';
import BuBesDetail from './screens/BuBesDetail';
import User from './screens/User';
import Welcome from './screens/Welcome';


const width = Dimensions.get('window').width
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ScreensOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#104e5b',
          height : width * 0.19,
          borderTopLeftRadius : width * 0.04,
          borderTopRightRadius : width * 0.04
        },
        tabBarActiveTintColor: '#f1ba79',
        tabBarLabel: () => null,
      })}
    >
      <BottomTabs.Screen
        name="HomePage"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={width * 0.0718} color={color} />
          ),
        }}
        
      />
      <BottomTabs.Screen
        name="ChartPage"
        component={Chart}
        options={{
          title: 'Chart',
          headerStyle: {
            backgroundColor: '#d7ead7',
          },
          headerTitleStyle: {
            color: '#104e5b',
            fontWeight : 'bold',
            fontSize : width * 0.046
          },
          tabBarIcon: ({ color, }) => (
            <FontAwesome5 name="chart-bar" size={width * 0.0718} color={color} />
          ),
      }}
      />
      <BottomTabs.Screen
        name="Add"
        component={Add}
        options={{
          title: 'Tambah Catatan',
          headerStyle: {
            backgroundColor: '#d7ead7',
          },
          headerTitleStyle: {
            color: '#104e5b',
            fontWeight : 'bold',
            fontSize : width * 0.046
          },
          tabBarIcon: ({ color, }) => (
            <FontAwesome5 name="plus-circle" size={width * 0.0718} color={color} />
          ),
      }}
      />
      <BottomTabs.Screen
        name="BuBes"
        component={BuBes}
        options={{
          title: 'Buku Besar',
          headerStyle: {
            backgroundColor: '#d7ead7',
          },
          headerTitleStyle: {
            color: '#104e5b',
            fontWeight : 'bold',
            fontSize : width * 0.046
          },
          tabBarIcon: ({ color, }) => (
            <FontAwesome5 name="book" size={width * 0.0718} color={color} />
          ),
      }}
      />
      <BottomTabs.Screen
        name="User"
        component={User}
        options={{
          title: 'User',
          headerStyle: {
            backgroundColor: '#d7ead7',
          },
          headerTitleStyle: {
            color: '#104e5b',
            fontWeight : 'bold',
            fontSize : width * 0.046
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={width * 0.0718} color={color} />
          ),
        }}
        
      />
    </BottomTabs.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();
export default function Main() {
  return (
    <DataProvider>
    <App />
  </DataProvider>
  );
}

function App() {
  const {isFirstTime , cekInstall} = useDataContext()

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfFirstTime();
  }, [isFirstTime]);

  const checkIfFirstTime = async () => {
    try {
      const isFirstTimeValue = await AsyncStorage.getItem('@first_time');
      if (isFirstTimeValue !== null) {
        cekInstall()
      }
    } catch (error) {
      console.error('Error checking first time:', error);
    }finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; 
  }

  return (
    <>
      <StatusBar backgroundColor='#d7ead7' barStyle='dark-content'/>
      <NavigationContainer>
        {
          isFirstTime? (
            <Stack.Navigator>
            <Stack.Screen name="Welcome"
              component={Welcome}
              options={{
                headerShown : false,
              }}
            />
            </Stack.Navigator>
            
          ) : (
            <Stack.Navigator>
            <Stack.Screen
            name="screens"
            component={ScreensOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name='Detail'
            component={Detail}
            options={{
              title: 'Catatan',
              animation: 'none',
              headerStyle: {
                backgroundColor: '#d7ead7', 
              },
              headerTintColor : '#104e5b'
            }}
          />
          <Stack.Screen 
            name='Jurnal'
            component={Jurnal}
            options={{
              animation : 'none',
              headerStyle: {
                backgroundColor: '#d7ead7', 
              },
              headerTintColor : '#104e5b'
            }}
          />
          <Stack.Screen 
            name='BuBesDetail'
            component={BuBesDetail}
            options={{
              animation : 'none',
              headerStyle: {
                backgroundColor: '#d7ead7', 
              },
              headerTintColor : '#104e5b'
            }}
          />
          <Stack.Screen name="Edit" component={Edit} 
            options={{
              animation : 'none',
              headerStyle: {
                backgroundColor: '#d7ead7', 
              },
              headerTintColor : '#104e5b'
            }}
          />
          </Stack.Navigator>
          )
        }
        </NavigationContainer>
    </>
  );
}