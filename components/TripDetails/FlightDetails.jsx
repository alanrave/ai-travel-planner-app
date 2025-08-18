import { Text, View } from 'react-native';

export default function FlightDetails({ flightData }) {
  if (!flightData || flightData.length === 0) {
    return (
      <View>
        <Text>No flight information available</Text>
      </View>
    );
  }

  return (
    <View>
      {flightData.map((flight, index) => (
        <View key={index}>
          <Text>✈ Airline: {flight.airline}</Text>
          <Text>From: {flight.departure_city}</Text>
          <Text>To: {flight.arrival_city}</Text>
          <Text>Departure: {flight.departure_date}</Text>
          <Text>Arrival: {flight.arrival_date}</Text>
        </View>
      ))}
    </View>
  );
}
