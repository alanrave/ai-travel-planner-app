import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './../../constants/Colors';
export default function StartNewTripCard() {
  const router=useRouter();
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:25
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium',
        textAlign:'center'
      }}>
       No trips planned yet.
      </Text>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        gap:25
      }}>
        Let's take you on a trip !
      </Text>
      <TouchableOpacity
      onPress={()=>router.push('/create-trip/search-place')}
      style={{
          padding:10,
          backgroundColor:Colors.PRIMARY,
          borderRadius:15,
          paddingHorizontal:30
      }}>
        <Text style={{
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:17
        }}>
            Start a new trip
        </Text>
        </TouchableOpacity>
    </View>
  )
}