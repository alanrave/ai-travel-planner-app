import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from './../../constants/Colors';
export default function SearchPlace() {
    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'Search'
        })
    },[])
  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      onFail={error=>console.warn('Places API Error')}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      
      query={{
        key:process.env.EXPO_GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
    />
    </View>
  )
}
/*import { Colors } from '@/constants/Colors';
import { EXPO_PUBLIC_GOOGLE_MAP_API_KEY } from '@env';
import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from '../../context/CreateTripContext';

const SearchPlace = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, [navigation]);

  useEffect(() => {
    console.log("tripData",tripData)
  }, [tripData]);


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Search Your Destination</Text>

        <GooglePlacesAutocomplete
          placeholder='Search Place'
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data, details);
            setTripData({
              ...tripData,
              locationInfo: {
                name: data.description,
                coordinate: details?.geometry.location,
                photoRef: details?.photos[0].photo_reference,
                url:details?.url
              },
            });
            router.push('create-trip/Select-Traveler')
          }}
          query={{
            key: EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              backgroundColor: Colors.white,
              borderWidth:1,
              borderRadius:15,
              marginTop:25,
              
            },
            
          }}
        />     
    </View>
  );
}

export default SearchPlace;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 85,
    padding: 25,
    height: '100%',
  },
  
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign:'center',
    marginTop:10
  },
});*/
