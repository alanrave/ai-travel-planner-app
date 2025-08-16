/*import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from './../../constants/Colors';

export default function SearchPlace() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search'
    });
  }, []);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText.length > 2) {
        searchPlaces(searchText);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const searchPlaces = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`
      );
      
      const data = await response.json();
      
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.warn('Mapbox Geocoding API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = (place) => {
    // Extract relevant data from Mapbox response
    const placeData = {
      description: place.place_name,
      place_id: place.id,
      geometry: place.geometry,
      properties: place.properties,
      context: place.context,
      coordinates: {
        latitude: place.geometry.coordinates[1],
        longitude: place.geometry.coordinates[0]
      }
    };

    console.log('Selected place:', placeData);
    
    // Store place data in tripData context
    setTripData({
      ...tripData,
      selectedPlace: placeData,
      destination: place.place_name // Store human-readable destination name
    });
    
    // Clear search and suggestions
    setSearchText(place.place_name);
    setSuggestions([]);
    
    // Navigate to next screen
    router.push('/create-trip/select-traveller');
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handlePlaceSelect(item)}
    >
      <Text style={styles.suggestionText}>{item.place_name}</Text>
      <Text style={styles.suggestionSubtext}>
        {item.properties?.category || item.place_type?.[0] || ''}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search places..."
        value={searchText}
        onChangeText={setSearchText}
        autoFocus={true}
      />
      
      {isLoading && (
        <Text style={styles.loadingText}>Searching...</Text>
      )}
      
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={renderSuggestion}
        style={styles.suggestionsList}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 95,
    backgroundColor: Colors.WHITE,
    height: '100%'
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  loadingText: {
    padding: 15,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  suggestionsList: {
    flex: 1
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff'
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  suggestionSubtext: {
    fontSize: 14,
    color: '#666'
  }
});*/
import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from './../../constants/Colors';

export default function SearchPlace() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search'
    });
  }, []);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText.length > 2) {
        searchPlaces(searchText);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const searchPlaces = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}&types=(cities)`
      );
      
      const data = await response.json();
      
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.warn('Google Places API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}&fields=name,geometry,photos,formatted_address`
      );
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.warn('Error fetching place details:', error);
      return null;
    }
  };

  const handlePlaceSelect = async (place) => {
    setIsLoading(true);
    
    try {
      // Get detailed place information including photos
      const placeDetails = await getPlaceDetails(place.place_id);
      
      console.log('Place details:', placeDetails);
      
      // Extract photo reference
      const photoRef = placeDetails?.photos?.[0]?.photo_reference;
      console.log('Photo reference found:', photoRef);
      
      // Store place data in tripData context with proper structure
      setTripData({
        ...tripData,
        locationInfo: {
          name: place.description,
          photoRef: photoRef, // This is the key field we need!
          placeId: place.place_id,
          coordinates: placeDetails?.geometry?.location,
          address: placeDetails?.formatted_address,
        },
        destination: place.description // Store human-readable destination name
      });
      
      console.log('Updated tripData with photo reference:', {
        ...tripData,
        locationInfo: {
          name: place.description,
          photoRef: photoRef,
          placeId: place.place_id,
        }
      });
      
      // Clear search and suggestions
      setSearchText(place.description);
      setSuggestions([]);
      
      // Navigate to next screen
      router.push('/create-trip/select-traveller');
      
    } catch (error) {
      console.error('Error selecting place:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handlePlaceSelect(item)}
    >
      <Text style={styles.suggestionText}>{item.description}</Text>
      <Text style={styles.suggestionSubtext}>
        {item.structured_formatting?.secondary_text || ''}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log("tripData updated:", tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search places..."
        value={searchText}
        onChangeText={setSearchText}
        autoFocus={true}
      />
      
      {isLoading && (
        <Text style={styles.loadingText}>Searching...</Text>
      )}
      
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={renderSuggestion}
        style={styles.suggestionsList}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 95,
    backgroundColor: Colors.WHITE,
    height: '100%'
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  loadingText: {
    padding: 15,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  suggestionsList: {
    flex: 1
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff'
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  suggestionSubtext: {
    fontSize: 14,
    color: '#666'
  }
});