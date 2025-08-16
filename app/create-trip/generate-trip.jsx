/*import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { chatSession } from './../../configs/AIModal';
import { auth, db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import { AI_PROMPT } from './../../constants/options';

const GenerateTrip = () => {
  const user = auth.currentUser;
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateAiTrip();
  }, []);

  // Helper function to safely serialize tripData without circular references
  const serializeTripData = (data) => {
    try {
      // Create a clean object with only the necessary data
      const cleanTripData = {
        locationInfo: {
          name: data?.locationInfo?.name || data?.destination,
          photoRef: data?.locationInfo?.photoRef,
        },
        destination: data?.destination,
        totalNumOfDays: data?.dateSelection?.duration,
        traveler: {
          title: data?.travellerCount?.title,
          desc: data?.travellerCount?.desc,
          people: data?.travellerCount?.people
        },
        budget: {
          title: data?.budget?.title
        },
        startDate: data?.dateSelection?.startDate,
        endDate: data?.dateSelection?.endDate,
      };
      
      return JSON.stringify(cleanTripData);
    } catch (error) {
      console.warn('Failed to serialize trip data:', error);
      // Fallback: return a minimal representation
      return JSON.stringify({
        destination: data?.destination || 'Unknown',
        totalNumOfDays: data?.dateSelection?.duration || 0,
        traveler: { title: data?.travellerCount?.title || 'Unknown' },
        budget: { title: data?.budget?.title || 'Unknown' }
      });
    }
  };

  const generateAiTrip = async () => {
    try {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.destination || 'Unknown Location')
        .replace('{totalDay}', tripData?.dateSelection?.duration || 1)
        .replace('{totalNight}', (tripData?.dateSelection?.duration || 1) - 1)
        .replace('{traveler}', tripData?.travellerCount?.people || 'Solo Traveler')
        .replace('{budget}', tripData?.budget?.title || 'Moderate');

      console.log('FINAL_PROMPT', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // Parse the AI response
      const tripResponse = result.response.text();
      console.log('AI Response:', tripResponse);
      
      setLoading(false);

      // Save trip data to Firebase with safe serialization
      const docId = Date.now().toString();
      await setDoc(doc(db, 'UserTrips', docId), {  // Changed to 'UserTrips' to match query
        userEmail: user.email,
        tripPlan: tripResponse, // AI Generate Result
        tripData: serializeTripData(tripData), // Safely serialized user selection data
        docId: docId,
        createdAt: new Date().toISOString()
      });

      console.log('Trip saved successfully with ID:', docId);
      router.push('/(tabs)/mytrip');
      
    } catch (error) {
      console.error('Error generating trip:', error);
      setLoading(false);
      
      // Optional: Show user-friendly error message
      // You might want to add a state for error handling and display it in the UI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Wait .........</Text>
      <Text style={styles.paragraph}>We are working on generating your dream Trip</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./../../assets/images/plane.gif')} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
      <Text style={styles.paragraph}>Don't go back.</Text>
    </View>
  );
};

export default GenerateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 85,
    padding: 25,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 200,
  },
  paragraphGray: {
    fontFamily: 'Outfit',
    fontSize: 20,
    color: Colors.gray,
    textAlign: 'center',
  },
});*/
/*
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { chatSession } from './../../configs/AIModal';
import { auth, db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import { AI_PROMPT } from './../../constants/options';

const GenerateTrip = () => {
  const user = auth.currentUser;
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateAiTrip();
  }, []);

  // Helper function to safely serialize tripData without circular references
  const serializeTripData = (data) => {
    try {
      // Add debugging to see the actual structure
      console.log('Serializing data:', JSON.stringify(data, null, 2));
      
      // Create a clean object with only the necessary data
      const cleanTripData = {
        locationInfo: {
          name: data?.locationInfo?.name || data?.destination,
          // Try different possible paths for photo reference
          photoRef: data?.locationInfo?.photoRef || 
                   data?.locationInfo?.photo_reference ||
                   data?.photoRef ||
                   data?.photo_reference ||
                   data?.selectedPlace?.photoRef ||
                   data?.selectedPlace?.photo_reference,
        },
        destination: data?.destination,
        totalNumOfDays: data?.dateSelection?.duration,
        traveler: {
          title: data?.travellerCount?.title,
          desc: data?.travellerCount?.desc,
          people: data?.travellerCount?.people
        },
        budget: {
          title: data?.budget?.title
        },
        startDate: data?.dateSelection?.startDate,
        endDate: data?.dateSelection?.endDate,
      };
      
      console.log('Clean trip data with photo ref:', cleanTripData.locationInfo.photoRef);
      return JSON.stringify(cleanTripData);
    } catch (error) {
      console.warn('Failed to serialize trip data:', error);
      // Fallback: return a minimal representation
      return JSON.stringify({
        destination: data?.destination || 'Unknown',
        totalNumOfDays: data?.dateSelection?.duration || 0,
        traveler: { title: data?.travellerCount?.title || 'Unknown' },
        budget: { title: data?.budget?.title || 'Unknown' }
      });
    }
  };

  const generateAiTrip = async () => {
    try {
      setLoading(true);
      
      // Add this to see the actual structure
      console.log('Full tripData structure:', JSON.stringify(tripData, null, 2));
      
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.destination || 'Unknown Location')
        .replace('{totalDay}', tripData?.dateSelection?.duration || 1)
        .replace('{totalNight}', (tripData?.dateSelection?.duration || 1) - 1)
        .replace('{traveler}', tripData?.travellerCount?.people || 'Solo Traveler')
        .replace('{budget}', tripData?.budget?.title || 'Moderate');

      console.log('FINAL_PROMPT', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // Parse the AI response
      const tripResponse = result.response.text();
      console.log('AI Response:', tripResponse);
      
      setLoading(false);

      // Save trip data to Firebase with safe serialization
      const docId = Date.now().toString();
      await setDoc(doc(db, 'UserTrips', docId), {  // Changed to 'UserTrips' to match query
        userEmail: user.email,
        tripPlan: tripResponse, // AI Generate Result
        tripData: serializeTripData(tripData), // Safely serialized user selection data
        docId: docId,
        createdAt: new Date().toISOString()
      });

      console.log('Trip saved successfully with ID:', docId);
      router.push('/(tabs)/mytrip');
      
    } catch (error) {
      console.error('Error generating trip:', error);
      setLoading(false);
      
      // Optional: Show user-friendly error message
      // You might want to add a state for error handling and display it in the UI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Wait .........</Text>
      <Text style={styles.paragraph}>We are working on generating your dream Trip</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./../../assets/images/plane.gif')} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
      <Text style={styles.paragraph}>Don't go back.</Text>
    </View>
  );
};

export default GenerateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 85,
    padding: 25,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 200,
  },
  paragraphGray: {
    fontFamily: 'Outfit',
    fontSize: 20,
    color: Colors.gray,
    textAlign: 'center',
  },
});*/
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { chatSession } from './../../configs/AIModal';
import { auth, db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import { AI_PROMPT } from './../../constants/options';

const GenerateTrip = () => {
  const user = auth.currentUser;
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateAiTrip();
  }, []);

  // Helper function to safely serialize tripData without circular references
  const serializeTripData = (data) => {
    try {
      // Don't try to serialize the entire data object - it has circular references
      console.log('Serializing trip data safely...');
      
      // Safely extract only the data we need without circular references
      const locationInfo = data?.locationInfo || data?.selectedPlace;
      const photoRef = locationInfo?.photoRef || null;
      
      console.log('Location info:', {
        name: locationInfo?.name,
        photoRef: photoRef,
        placeId: locationInfo?.placeId
      });
      
      // Create a clean object with only the necessary primitive data
      const cleanTripData = {
        locationInfo: {
          name: locationInfo?.name || data?.destination || 'Unknown',
          photoRef: photoRef,
          placeId: locationInfo?.placeId || null,
          // Only include coordinates if they exist and are primitive values
          coordinates: locationInfo?.coordinates ? {
            latitude: locationInfo.coordinates.latitude || null,
            longitude: locationInfo.coordinates.longitude || null
          } : null,
        },
        destination: data?.destination || 'Unknown',
        totalNumOfDays: data?.dateSelection?.duration || 1,
        traveler: {
          title: data?.travellerCount?.title || 'Solo',
          desc: data?.travellerCount?.desc || '',
          people: data?.travellerCount?.people || '1'
        },
        budget: {
          title: data?.budget?.title || 'Moderate'
        },
        startDate: data?.dateSelection?.startDate || null,
        endDate: data?.dateSelection?.endDate || null,
      };
      
      console.log('Clean trip data created:', cleanTripData);
      console.log('Photo reference in final data:', cleanTripData.locationInfo.photoRef);
      
      return JSON.stringify(cleanTripData);
    } catch (error) {
      console.warn('Failed to serialize trip data:', error);
      // Fallback: return a minimal representation
      return JSON.stringify({
        locationInfo: {
          name: data?.destination || 'Unknown',
          photoRef: null,
          placeId: null,
          coordinates: null,
        },
        destination: data?.destination || 'Unknown',
        totalNumOfDays: 1,
        traveler: { title: 'Solo', desc: '', people: '1' },
        budget: { title: 'Moderate' },
        startDate: null,
        endDate: null,
      });
    }
  };

  const generateAiTrip = async () => {
    try {
      setLoading(true);
      
      // Don't try to log the entire tripData as it has circular references
      console.log('Starting trip generation...');
      console.log('Destination:', tripData?.destination);
      console.log('Duration:', tripData?.dateSelection?.duration);
      console.log('Traveller:', tripData?.travellerCount?.title);
      console.log('Budget:', tripData?.budget?.title);
      
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.destination || 'Unknown Location')
        .replace('{totalDay}', tripData?.dateSelection?.duration || 1)
        .replace('{totalNight}', (tripData?.dateSelection?.duration || 1) - 1)
        .replace('{traveler}', tripData?.travellerCount?.people || 'Solo Traveler')
        .replace('{budget}', tripData?.budget?.title || 'Moderate');

      console.log('FINAL_PROMPT', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // Parse the AI response
      const tripResponse = result.response.text();
      console.log('AI Response received, length:', tripResponse.length);
      
      setLoading(false);

      // Save trip data to Firebase with safe serialization
      const docId = Date.now().toString();
      const serializedTripData = serializeTripData(tripData);
      
      await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user.email,
        tripPlan: tripResponse, // AI Generate Result
        tripData: serializedTripData, // Safely serialized user selection data
        docId: docId,
        createdAt: new Date().toISOString()
      });

      console.log('Trip saved successfully with ID:', docId);
      router.push('/(tabs)/mytrip');
      
    } catch (error) {
      console.error('Error generating trip:', error.message);
      setLoading(false);
      
      // Optional: Show user-friendly error message
      // You might want to add a state for error handling and display it in the UI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Wait .........</Text>
      <Text style={styles.paragraph}>We are working on generating your dream Trip</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./../../assets/images/plane.gif')} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
      <Text style={styles.paragraph}>Don't go back.</Text>
    </View>
  );
};

export default GenerateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 85,
    padding: 25,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 200,
  },
  paragraphGray: {
    fontFamily: 'Outfit',
    fontSize: 20,
    color: Colors.gray,
    textAlign: 'center',
  },
});