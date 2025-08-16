import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';

const SelectTareekh = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripType, setTripType] = useState('round-trip');

  // Set up navigation header
   useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    
    // If end date is before start date, clear it
    if (endDate && endDate < selectedDate) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!startDate) {
      Alert.alert('Error', 'Please select a start date');
      return;
    }
    
    if (tripType === 'round-trip' && !endDate) {
      Alert.alert('Error', 'Please select an end date for round trip');
      return;
    }

    const dateData = {
      startDate,
      endDate: tripType === 'round-trip' ? endDate : null,
      tripType,
      formattedDates: {
        departure: formatDateDisplay(startDate),
        return: endDate ? formatDateDisplay(endDate) : null
      },
      duration: startDate && endDate && tripType === 'round-trip' 
        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
        : null,
      timestamp: new Date().toISOString()
    };

    // Update trip data with date information
    const updatedTripData = {
      ...tripData,
      dateSelection: dateData
    };
    
    setTripData(updatedTripData);
    
    // Comprehensive logging of all trip data (safe logging without JSON.stringify)
    console.log('=== COMPLETE TRIP DATA LOG ===');
    console.log('🏠 Selected Place Data:', updatedTripData.selectedPlace || 'Not selected');
    console.log('📍 Destination:', updatedTripData.destination || 'Not selected');
    console.log('👥 Traveller Count:', updatedTripData.travellerCount || 'Not selected');
    console.log('📅 Date Selection:');
    console.log('  - Trip Type:', dateData.tripType);
    console.log('  - Start Date:', dateData.startDate);
    console.log('  - End Date:', dateData.endDate);
    console.log('  - Formatted Departure:', dateData.formattedDates.departure);
    console.log('  - Formatted Return:', dateData.formattedDates.return);
    console.log('  - Trip Duration (days):', dateData.duration);
    console.log('  - Selected at:', dateData.timestamp);
    console.log('📊 Updated Trip Data Object:', updatedTripData);
    console.log('=== END COMPLETE TRIP DATA ===');
    
    // Navigate to select budget screen
    router.push('/create-trip/select-budget');
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const addDaysToToday = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    maxWidth: {
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
    },
    backButton: {
      marginLeft: 15,
      marginTop: 10,
      padding: 8,
    },
    backButtonText: {
      fontSize: 16,
      color: '#000000',
      fontWeight: '600',
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
      marginTop: 40,
    },
    iconContainer: {
      width: 64,
      height: 64,
      backgroundColor: '#000000',
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconText: {
      fontSize: 24,
      color: '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#e5e5e5',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000000',
      marginBottom: 16,
    },
    tripTypeContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    tripTypeButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      borderWidth: 2,
      alignItems: 'center',
    },
    tripTypeButtonActive: {
      borderColor: '#000000',
      backgroundColor: '#f0f0f0',
    },
    tripTypeButtonInactive: {
      borderColor: '#cccccc',
      backgroundColor: '#ffffff',
    },
    tripTypeIcon: {
      fontSize: 18,
      marginBottom: 4,
      color: '#000000',
    },
    tripTypeText: {
      fontSize: 12,
      fontWeight: '500',
    },
    tripTypeTextActive: {
      color: '#000000',
    },
    tripTypeTextInactive: {
      color: '#666666',
    },
    inputSection: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333333',
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelIcon: {
      marginRight: 8,
    },
    dateInput: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      color: '#000000',
    },
    dateInputFocused: {
      borderColor: '#000000',
      borderWidth: 2,
    },
    dateDisplay: {
      fontSize: 14,
      color: '#333333',
      fontWeight: '500',
      marginTop: 8,
    },
    durationContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 16,
      marginBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    durationLabel: {
      fontSize: 14,
      color: '#666666',
    },
    durationValue: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000000',
    },
    submitButton: {
      backgroundColor: '#000000',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    quickSelectContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    quickSelectButton: {
      flex: 1,
      minWidth: '45%',
      padding: 12,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e5e5e5',
    },
    quickSelectText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#666666',
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.maxWidth}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.title}>Select Your Travel Dates</Text>
            <Text style={styles.subtitle}>Choose when you'd like to start your journey</Text>
          </View>

          {/* Trip Type Selector */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trip Type</Text>
            <View style={styles.tripTypeContainer}>
              <TouchableOpacity
                onPress={() => setTripType('one-way')}
                style={[
                  styles.tripTypeButton,
                  tripType === 'one-way' ? styles.tripTypeButtonActive : styles.tripTypeButtonInactive
                ]}
              >
                <Text style={styles.tripTypeIcon}>→</Text>
                <Text style={[
                  styles.tripTypeText,
                  tripType === 'one-way' ? styles.tripTypeTextActive : styles.tripTypeTextInactive
                ]}>
                  One Way
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setTripType('round-trip')}
                style={[
                  styles.tripTypeButton,
                  tripType === 'round-trip' ? styles.tripTypeButtonActive : styles.tripTypeButtonInactive
                ]}
              >
                <Text style={styles.tripTypeIcon}>⇄</Text>
                <Text style={[
                  styles.tripTypeText,
                  tripType === 'round-trip' ? styles.tripTypeTextActive : styles.tripTypeTextInactive
                ]}>
                  Round Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Selection */}
          <View style={styles.card}>
            {/* Start Date */}
            <View style={styles.inputSection}>
              <View style={styles.label}>
                <Text style={styles.labelIcon}>🛫</Text>
                <Text>Departure Date</Text>
              </View>
              <TextInput
                style={styles.dateInput}
                value={startDate}
                onChangeText={handleStartDateChange}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999999"
              />
              {startDate && (
                <Text style={styles.dateDisplay}>
                  {formatDateDisplay(startDate)}
                </Text>
              )}
            </View>

            {/* End Date (only for round trip) */}
            {tripType === 'round-trip' && (
              <View style={styles.inputSection}>
                <View style={styles.label}>
                  <Text style={styles.labelIcon}>🛬</Text>
                  <Text>Return Date</Text>
                </View>
                <TextInput
                  style={styles.dateInput}
                  value={endDate}
                  onChangeText={handleEndDateChange}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#999999"
                />
                {endDate && (
                  <Text style={styles.dateDisplay}>
                    {formatDateDisplay(endDate)}
                  </Text>
                )}
              </View>
            )}

            {/* Trip Duration Display */}
            {startDate && endDate && tripType === 'round-trip' && (
              <View style={styles.durationContainer}>
                <Text style={styles.durationLabel}>Trip Duration:</Text>
                <Text style={styles.durationValue}>
                  {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days
                </Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>
                Continue to Budget Selection →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Date Options */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Select</Text>
            <View style={styles.quickSelectContainer}>
              {[
                { label: 'Tomorrow', days: 1 },
                { label: 'Next Week', days: 7 },
                { label: 'Next Month', days: 30 },
                { label: 'Custom', days: null }
              ].map((option) => (
                <TouchableOpacity
                  key={option.label}
                  onPress={() => {
                    if (option.days) {
                      setStartDate(addDaysToToday(option.days));
                    }
                  }}
                  style={styles.quickSelectButton}
                >
                  <Text style={styles.quickSelectText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectTareekh;