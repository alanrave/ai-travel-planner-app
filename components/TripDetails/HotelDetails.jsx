import { Text, View } from 'react-native';

export default function HotelDetails({ hotelList }) {
  if (!hotelList || hotelList.length === 0) {
    return (
      <View>
        <Text>No hotel information available</Text>
      </View>
    );
  }

  return (
    <View>
      {hotelList.map((hotel, index) => (
        <View key={index}>
          <Text>🏨 {hotel.name}</Text>
          <Text>Address: {hotel.address}</Text>
          <Text>Price: {hotel.price}</Text>
        </View>
      ))}
    </View>
  );
}
