import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from './../../constants/Colors';
export default function ReviewTrip() {
  const navigation=useNavigation();
   const router = useRouter();
  const {tripData,setTripData}=useContext(CreateTripContext);
   const onContinue = () => {
    // Navigate to next screen or generate trip
    router.push('');
  };
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:''
    })
  })
  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}>Review your trip</Text>
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:20
        }}>
          Before generating your trip , please review your selection
        </Text>
        <View style={{
          marginTop:40,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Text style={{
          fontSize:30
        }}>📍</Text>
        <View>
        <Text style={{
          fontFamily:'outfit',
          fontSize:20,
          color:Colors.GRAY
        }}>
           Destination
        </Text>
        <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>
           {tripData?.destination}
        </Text>
      </View>
     </View>
       <View style={{
          marginTop:25,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Text style={{
          fontSize:30
        }}>📅</Text>
        <View>
        <Text style={{
          fontFamily:'outfit',
          fontSize:20,
          color:Colors.GRAY
        }}>
           Travel Date
        </Text>
        <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>
           From:{tripData?.dateSelection?.formattedDates?.departure}
        </Text>
        <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>To:{tripData?.dateSelection?.formattedDates?.return}</Text>
         <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>({tripData?.dateSelection?.duration} days)</Text>
      </View>
     </View>
      <View style={{
          marginTop:25,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Text style={{
          fontSize:30
        }}>🚌</Text>
        <View>
        <Text style={{
          fontFamily:'outfit',
          fontSize:20,
          color:Colors.GRAY
        }}>
           Who's Travelling
        </Text>
         <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>{tripData?.travellerCount?.people}</Text>
      </View>
     </View>
      <View style={{
          marginTop:25,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Text style={{
          fontSize:30
        }}>💸</Text>
        <View>
        <Text style={{
          fontFamily:'outfit',
          fontSize:20,
          color:Colors.GRAY
        }}>
           Budget
        </Text>
         <Text style={{
          fontFaily:'outfit-medium',
          fontSize:20
        }}>{tripData?.budget?.title}</Text>
      </View>
     </View>
     <TouchableOpacity
     onPress={()=>router.replace('/create-trip/generate-trip')}
             style={{
              padding:15,
              backgroundColor:Colors.PRIMARY,
              borderRadius:15,
              marginTop:40
             }} >
             <Text style={{
              textAlign:'center',
              color:Colors.WHITE,
              fontFamily:'outfit-medium',
              fontSize:20
             }}>Build My Trip</Text>
           </TouchableOpacity>
    </View>
    </View>
  )
}