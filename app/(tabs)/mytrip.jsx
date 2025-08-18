import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import UserTripList from './../../components/MyTrips/UserTripList';
import { auth, db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const userEmail = user?.email;

  useEffect(() => {
    if (user) {
      GetMyTrip();
    }
  }, [user]);

  const GetMyTrip = async () => {
    setLoading(true);
    setUserTrips([]);
    try {
      const q = query(
        collection(db, 'UserTrips'), 
        where('userEmail', '==', userEmail)
      );
      const querySnapshot = await getDocs(q);
      const trips = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        trips.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Sort trips by creation date (newest first)
      const sortedTrips = trips.sort((a, b) => {
        // First try to sort by createdAt if available
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        
        // Fallback to docId (timestamp) if createdAt is not available
        if (a.docId && b.docId) {
          return parseInt(b.docId) - parseInt(a.docId);
        }
        
        // Final fallback: try to parse tripData for startDate
        try {
          const tripDataA = JSON.parse(a.tripData);
          const tripDataB = JSON.parse(b.tripData);
          
          if (tripDataA.startDate && tripDataB.startDate) {
            return new Date(tripDataB.startDate) - new Date(tripDataA.startDate);
          }
        } catch (error) {
          console.log('Error parsing trip data for sorting:', error);
        }
        
        return 0; // Keep original order if no sorting criteria available
      });
      
      setUserTrips(sortedTrips);
      console.log('Sorted trips:', sortedTrips);
      
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrip = () => {
    router.push('/create-trip/search-place');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Trip</Text>
          <TouchableOpacity onPress={handleAddTrip} style={styles.addButton}>
            <Ionicons name="add-circle" size={50} color="black" />
          </TouchableOpacity>
        </View>
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        )}
        
        {userTrips?.length === 0 ? 
          <StartNewTripCard /> 
          : 
          <UserTripList userTrips={userTrips} />
        }
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 100, // Extra padding at bottom for proper scrolling
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
  },
  addButton: {
    padding: 5, // Add some padding for better touch area
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 50,
  },
});