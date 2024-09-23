import { View, Text, ImageBackground, Pressable, Dimensions } from "react-native"
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDataContext } from "../store/data";


const width = Dimensions.get('window').width

export default function Welcome({route}){
    const {isFirstTime , cekInstall} = useDataContext()
    const navigation = useNavigation()
    const handleContinue = async () => {
        try {
          await AsyncStorage.setItem('@first_time', 'false');
          cekInstall()
          navigation.navigate('screens')
        } catch (error) {
          console.error('Error setting first time:', error);
        }
      };
    const data = [
        {
            image : require('../assets/images/card3.jpeg'),
        },
        {
            image : require('../assets/images/card4.jpeg'),
        },
        {
            image : require('../assets/images/card2.jpeg'),
        },
        {
            image : require('../assets/images/card1.jpeg'),
            last : true
        },
    ]
    return(
        <View style={{flex : 1,  backgroundColor : '#d7ead7'}}>

            <View style={{flex : 1,justifyContent : 'flex-end', alignItems : 'center',}}>
            </View>
            <Carousel
                data = {data}
                containerCustomStyle ={{overflow : 'visible'}}
                firstItem={0}
                inactiveSlideOpacity={0.75}
                inactiveSlideScale={0.77}
                sliderWidth={width + 8}
                itemWidth={width * 0.64}
                slideStyle={{display:'flex', alignItems :'center'}}
                renderItem={({item})=> (
                    <View style={{height : width + 8, justifyContent : 'center', alignItems : 'center'}}>
                        <View style={{ borderRadius : 20, overflow : 'hidden'}}>
                        <ImageBackground source={item.image} style={{width : width * 0.64, height : width + 8, padding : width*0.04, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                            {
                                item.last === true ? (
                                    <View style={{flex :1, justifyContent : 'flex-end'}}>
                                        <View style={{backgroundColor : '#104e5b', width : width*0.3, borderRadius : width*0.04, overflow : 'hidden'}}>
                                            <Pressable
                                                android_ripple={{color : '#fff'}}
                                                style={{height : width*0.11, justifyContent : 'center', alignItems : 'center'}}
                                                onPress={handleContinue}
                                            >
                                                <Text style={{color : '#fff', fontWeight : 'bold', fontSize : width*0.04}}>Mulai</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                ) : null
                            }
                        </ImageBackground>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}