import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { SelectTravelesList } from '../../constants/Options';
export default function Traveles() {
  const router=useRouter();
  const navigation=useNavigation();
  const [selectedTraveler,setSelectedTraveler]=useState();
    useEffect(()=>{
      navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
      })
    },[])
  return (
    <View style={{
          padding:25,
          paddingTop:55,
          backgroundColor:Colors.WHITE,
          height:'100%',
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'outfit-bold',
        paddingTop:30
      }}>Who's Going?
      </Text>

      <View style={{marginTop:10}}>

      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:25,
        paddingTop:10
      }}>
        Choose Your Traveles
      </Text>
      
      <FlatList 
      data={SelectTravelesList}
      renderItem ={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>setSelectedTraveler(item.title)}
        style={{
          marginVertical:10
        }}>
            <OptionCard option={item} selectedTraveler={selectedTraveler}/>
        </TouchableOpacity>
      )}
      />
      
      </View>
    </View>
  )
}