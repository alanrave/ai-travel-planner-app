/*import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlightDetails } from '../../components/TripDetails';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { Colors } from '../../constants/Colors';

const Index = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  const formatData = (data) => {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    if (trip) {
      const parsedTrip = formatData(trip);
      setTripDetails(parsedTrip);
      console.log('Parsed trip details:', parsedTrip);
    }
  }, [trip]);

  if (!tripDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  // Extract trip data from different possible structures
  const tripData = formatData(tripDetails?.tripData);
  const tripPlan = tripDetails?.tripPlan;
  
  // Get image reference
  const photoRef = tripData?.locationInfo?.photoRef;
  const imageUrl = photoRef && apiKey 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

  // Extract trip information with fallbacks
  const destination = tripPlan?.travel_plan?.destination || 
                     tripData?.locationInfo?.name || 
                     'Unknown Destination';
  
  const flights = tripPlan?.trip?.flights || tripDetails?.flights || [];
  const hotels = tripPlan?.trip?.hotels || tripDetails?.hotels || [];
  const itinerary = tripPlan?.trip?.itinerary || tripDetails?.itinerary || {};
  
  // Date handling
  const startDate = tripData?.startDate;
  const endDate = tripData?.endDate;
  const travelerInfo = tripData?.traveler?.title || 'Traveler information not available';

  return (
    <ScrollView style={styles.scrollView}>
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
      
      <View style={styles.container}>
        <Text style={styles.title}>{destination}</Text>
        
        {startDate && endDate && (
          <View style={styles.flexBox}>
            <Text style={styles.smallPara}>
              {moment(startDate).format("DD MMM YYYY")}
            </Text>
            <Text style={styles.smallPara}>
              - {moment(endDate).format("DD MMM YYYY")}
            </Text>
          </View>
        )}
        
        <Text style={styles.smallPara}>
          🚌 {travelerInfo}
        </Text>

        
          <FlightDetails flightData={tripDetails?.tripPlan?.trip?.flights} />
    
        {hotels.length > 0 && (
          <HotelList hotelList={hotels} />
        )}
        {Object.keys(itinerary).length > 0 && (
          <PlannedTrip tripDetails={{ tripData: { itinerary } }} />
        )}
      </View>
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 330,
  },
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    minHeight: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    marginBottom: 10,
  },
  smallPara: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
  },
});*/
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { Colors } from '../../constants/Colors';
import FlightDetails from './../../components/TripDetails/FlightDetails';
import HotelDetails from './../../components/TripDetails/HotelDetails';
const Index = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  const formatData = (data) => {
    try {
      if (!data) return null;
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    if (trip) {
      const parsedTrip = formatData(trip);
      setTripDetails(parsedTrip);
      console.log('Parsed trip details:', parsedTrip);
    }
  }, [trip]);

  if (!tripDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  // ✅ Always parse tripData & tripPlan safely
  const tripData = formatData(tripDetails?.tripData);
  const tripPlan = formatData(tripDetails?.tripPlan);

  // Get image reference
  const photoRef = tripData?.locationInfo?.photoRef;
  const imageUrl = photoRef && apiKey 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

  // Extract trip information with fallbacks
  const destination = tripPlan?.trip?.destination || 
                      tripData?.locationInfo?.name || 
                      'Unknown Destination';
  
  const flights = tripPlan?.trip?.flights || [];
  const hotels = tripPlan?.trip?.hotels || [];
  const itinerary = tripPlan?.trip?.itinerary || {};

  // Date handling
  const startDate = tripData?.startDate;
  const endDate = tripData?.endDate;
  const travelerInfo = tripData?.traveler?.title || 'Traveler information not available';

  return (
    <ScrollView style={styles.scrollView}>
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
      
      <View style={styles.container}>
        <Text style={styles.title}>{destination}</Text>
        
        {startDate && endDate && (
          <View style={styles.flexBox}>
            <Text style={styles.smallPara}>
              {moment(startDate).format("DD MMM YYYY")}
            </Text>
            <Text style={styles.smallPara}>
              - {moment(endDate).format("DD MMM YYYY")}
            </Text>
          </View>
        )}
        
        <Text style={styles.smallPara}>
          🚌 {travelerInfo}
        </Text>

        {/* Flight Info */}
        <FlightDetails flightData={flights} />
    
        {/* Hotel List */}
        {hotels.length > 0 && (
          <HotelDetails hotelList={hotels} />
        )}
        
        {/* Trip Daily Plan */}
        {Object.keys(itinerary).length > 0 && (
          <PlannedTrip tripDetails={{ tripData: { itinerary } }} />
        )}
      </View>
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 330,
  },
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    minHeight: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    marginBottom: 10,
  },
  smallPara: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
  },
});
