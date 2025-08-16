import { Link, useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { SelectTravelesList } from '../../constants/options';
import { CreateTripContext } from './../../context/CreateTripContext';
export default function Traveles() {
  const router=useRouter();
  const navigation=useNavigation();
  const [selectedTraveler,setSelectedTraveler]=useState();
  const {tripData,setTripData}=useContext(CreateTripContext);
    useEffect(()=>{
      navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
      })
    },[])
    useEffect(()=>{
        setTripData({...tripData,
            travellerCount:selectedTraveler
        })
    },[selectedTraveler])
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
        onPress={()=>setSelectedTraveler(item)}
        style={{
          marginVertical:10
        }}>
            <OptionCard option={item} selectedTraveler={selectedTraveler}/>
        </TouchableOpacity>
      )}
      />
      </View>
    
      <TouchableOpacity style={{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        marginTop:20
      }}>
      <Link href="/create-trip/select_tareekh" asChild>
      <Text style={{
        width:'100%',
        textAlign:'center',
        color:Colors.WHITE,
        fontFamily:'outfit-medium',
        fontSize:20
      }}>
        Continue
      </Text>
      </Link>
      </TouchableOpacity>
    </View>
  )
}