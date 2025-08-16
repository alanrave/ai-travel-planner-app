import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/options';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SelectBudget() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      budget: selectedBudget
    });
  }, [selectedBudget]);

  const onContinue = () => {
    // Navigate to next screen or generate trip
    router.push('/create-trip/review-trip');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Choose spending habits for your trip</Text>
        
        <FlatList
          data={SelectBudgetOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedBudget(item)}
              style={styles.optionContainer}
            >
              <OptionCard option={item} selectedTraveler={selectedBudget} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selectedBudget ? Colors.PRIMARY : Colors.GRAY }
        ]}
        disabled={!selectedBudget}
        onPress={onContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingTop: 85,
    padding: 25,
    height: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    paddingTop: 30
  },
  content: {
    marginTop: 10
  },
  subtitle: {
    fontFamily: 'outfit-medium',
    fontSize: 25,
    paddingTop: 10
  },
  optionContainer: {
    marginVertical: 10
  },
  button: {
    padding: 20,
    borderRadius: 15,
    marginTop: 20
  },
  buttonText: {
    width: '100%',
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 20
  }
});