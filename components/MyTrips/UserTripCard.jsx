import { useRouter } from 'expo-router';
import moment from 'moment';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './../../constants/Colors';

const UserTripCard = ({ trip }) => {
  const router = useRouter();
  
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
  const tripData = formatData(trip?.tripData);
  const photoRef = tripData?.locationInfo?.photoRef;
  
  const imageUrl = photoRef && apiKey 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

  const handleTripPress = () => {
    router.push({
      pathname: '/trip-details',
      params: { trip: JSON.stringify(trip) }
    });
  };

  return (
    <TouchableOpacity style={styles.flexContainer} onPress={handleTripPress}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
      ) : (
        <Image 
          source={require('./../../assets/images/travel_back.jpeg')} 
          style={styles.image} 
        />
      )}
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.paragraph}>
          {tripData?.destination || tripData?.locationInfo?.name}
        </Text>
        <Text style={styles.smallPara}>
          {moment(tripData?.startDate).format("DD MMM YYYY")}
        </Text>
        <Text style={styles.smallPara}>
          Travelling: {tripData?.traveler?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY || '#f5f5f5',
    borderRadius: 15,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
});