import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const PlannedTrip = ({ tripDetails, navigation }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [favoriteActivities, setFavoriteActivities] = useState(new Set());
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parse trip data
  useEffect(() => {
    if (tripDetails) {
      try {
        let parsedTripData = tripDetails;
        if (typeof tripDetails === 'string') {
          parsedTripData = JSON.parse(tripDetails);
        }
        const trip = parsedTripData.tripData || parsedTripData.trip || parsedTripData;
        setTripData(trip);
      } catch (error) {
        console.error('Error parsing trip data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [tripDetails]);

  // Helper: icon for activity
  const getActivityIcon = (activity) => {
    const name = (activity.activity || activity.title || activity.name || '').toLowerCase();
    if (name.includes('restaurant') || name.includes('food')) return 'restaurant-outline';
    if (name.includes('hotel') || name.includes('check')) return 'bed-outline';
    if (name.includes('flight') || name.includes('airport')) return 'airplane-outline';
    if (name.includes('shopping') || name.includes('market')) return 'bag-outline';
    if (name.includes('museum') || name.includes('palace') || name.includes('temple')) return 'camera-outline';
    if (name.includes('park') || name.includes('hill') || name.includes('tower')) return 'navigate-outline';
    return 'location-outline';
  };

  // Helper: color for activity
  const getActivityColor = (activity) => {
    const name = (activity.activity || activity.title || activity.name || '').toLowerCase();
    if (name.includes('restaurant') || name.includes('food')) return '#FF9800';
    if (name.includes('hotel') || name.includes('check')) return '#9C27B0';
    if (name.includes('flight') || name.includes('airport')) return '#2196F3';
    if (name.includes('shopping') || name.includes('market')) return '#E91E63';
    if (name.includes('museum') || name.includes('palace') || name.includes('temple')) return '#3F51B5';
    return '#4CAF50';
  };

  // Toggle favorites
  const toggleFavorite = (id) => {
    setFavoriteActivities(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Share trip
  const handleShare = async () => {
    if (!tripData) return;
    try {
      await Share.share({
        message: `Check out my trip to ${tripData.destination || 'my destination'}!\nDuration: ${tripData.duration || 'Multi-day'}\nBudget: ${tripData.budget || 'Custom budget'}`,
      });
    } catch (error) {
      console.error('Error sharing trip:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  if (!tripData) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="airplane-outline" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>No trip data available</Text>
        <Text style={styles.emptySubtitle}>Please provide trip details to display the planned itinerary.</Text>
      </View>
    );
  }

  const flights = tripData.flights || [];
  const hotels = tripData.hotels || [];
  const places = tripData.places_to_visit || [];
  const itinerary = tripData.itinerary || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Itinerary</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Trip Overview */}
        <View style={styles.tripOverview}>
          <Text style={styles.tripTitle}>{tripData.destination || 'Your Trip'}</Text>
        </View>

        {/* Daily Itinerary */}
        {itinerary.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Daily Itinerary</Text>
            </View>

            {/* Tabs for Days */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...new Set(itinerary.map(item => item.day))].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDay(day)}
                  style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
                >
                  <Text style={[styles.dayTabText, selectedDay === day && styles.dayTabTextActive]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* All activities for selected day */}
            <View style={styles.dayContent}>
              {itinerary
                .filter(item => item.day === selectedDay)
                .map((activity, idx) => (
                  <View key={idx} style={styles.activityCard}>
                    <View style={styles.activityHeader}>
                      <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity) }]}>
                        <Ionicons name={getActivityIcon(activity)} size={20} color="white" />
                      </View>
                      <View style={styles.activityContent}>
                        {activity.time && <Text style={styles.activityTime}>{activity.time}</Text>}
                        <Text style={styles.activityTitle}>{activity.activity || 'Activity'}</Text>
                        <Text style={styles.activityDetails}>{activity.details || 'No details available'}</Text>
                        {activity.best_time_to_visit && (
                          <Text style={styles.bestTime}>Best time: {activity.best_time_to_visit}</Text>
                        )}
                      </View>
                      <TouchableOpacity onPress={() => toggleFavorite(`${selectedDay}-${idx}`)}>
                        <Ionicons
                          name={favoriteActivities.has(`${selectedDay}-${idx}`) ? 'heart' : 'heart-outline'}
                          size={20}
                          color={favoriteActivities.has(`${selectedDay}-${idx}`) ? '#F44336' : '#666'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: '#666', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#999', textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  shareButton: { padding: 8 },
  scrollContainer: { flex: 1 },
  tripOverview: { backgroundColor: '#1c1c1eff', padding: 20 },
  tripTitle: { fontSize: 28, fontWeight: '700', color: '#fff' },
  sectionContainer: { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  dayTab: { padding: 8, backgroundColor: '#eee', borderRadius: 20, marginRight: 8 },
  dayTabActive: { backgroundColor: '#4CAF50' },
  dayTabText: { fontSize: 14, color: '#333' },
  dayTabTextActive: { color: '#fff', fontWeight: '600' },
  dayContent: { marginTop: 16 },
  activityCard: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 10 },
  activityHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  activityIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityTime: { fontSize: 12, color: '#667eea', fontWeight: '600', marginBottom: 4 },
  activityTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  activityDetails: { fontSize: 14, color: '#666', lineHeight: 20 },
  bestTime: { fontSize: 12, fontStyle: 'italic', color: '#777', marginTop: 4 },
});

export default PlannedTrip;
