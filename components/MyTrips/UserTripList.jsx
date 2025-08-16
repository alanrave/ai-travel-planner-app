import { useRouter } from 'expo-router';
import moment from 'moment';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './../../constants/Colors';
import UserTripCard from './../MyTrips/UserTripCard';

const UserTripList = ({ userTrips }) => {
    const router = useRouter();
    console.log('userTrips from UserTripList', userTrips);
    
    if (!userTrips || userTrips.length === 0) {
        return null;
    }

    const latestTrip = JSON.parse(userTrips[0].tripData);
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
    const photoRef = latestTrip?.locationInfo?.photoRef;

    const imageUrl = photoRef && apiKey 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
        : null;

    return (
        <View style={styles.container}>
            {/* Featured/Latest Trip */}
            <View style={styles.featuredTrip}>
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
                
                <View style={styles.tripInfo}>
                    <Text style={styles.paragraph}>
                        {latestTrip?.destination || latestTrip?.locationInfo?.name}
                    </Text>
                    <View style={styles.flexContainer}>
                        <Text style={styles.smallPara}>
                            {moment(latestTrip.startDate).format("DD MMM YYYY")}
                        </Text>
                        <Text style={styles.smallPara}>
                            🚌 {latestTrip?.traveler?.title}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => router.push({
                            pathname: '/trip-details',
                            params: { trip: JSON.stringify(userTrips[0]) }
                        })}
                    >
                        <Text style={styles.buttonText}>See Your Plan</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Other Trips */}
            {userTrips.length > 1 && (
                <View style={styles.otherTripsContainer}>
                    <Text style={styles.sectionTitle}>Other Trips</Text>
                    {userTrips.slice(1).map((trip, index) => (  
                        <UserTripCard trip={trip} key={`trip-${index}`} />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    featuredTrip: {
        marginTop: 20,
    },
    tripInfo: {
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    paragraph: {
        fontFamily: 'Outfit-Medium',
        fontSize: 20,
    },
    smallPara: {
        fontFamily: 'Outfit',
        fontSize: 17,
        color: Colors.gray
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.white,
        fontFamily: 'Outfit-Medium',
        fontSize: 15
    },
    otherTripsContainer: {
        marginTop: 30,
    },
    sectionTitle: {
        fontFamily: 'Outfit-Bold',
        fontSize: 22,
        marginBottom: 15,
        color: Colors.black || '#000',
    },
});

export default UserTripList;