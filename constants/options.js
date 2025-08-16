import { Ionicons } from '@expo/vector-icons';

export const SelectTravelesList = [
  {
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: <Ionicons name="happy-outline" size={24} color="black" />,
    people: '1',
  },
  {
    title: 'Couple',
    desc: 'Two travelers in tandem',
    icon: <Ionicons name="heart-sharp" size={24} color="black" />,
    people: '2 People',
  },
  {
    title: 'Family',
    desc: 'A group of fun-loving explorers',
    icon: <Ionicons name="home" size={24} color="black" />,
    people: '3 to 5 People',
  },
  {
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: <Ionicons name="infinite-sharp" size={24} color="black" />,
    people: '5 to 10 Friends',
  },
];
export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
    people: 'Budget-friendly'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
    people: 'Balanced spending'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '💎',
    people: 'Premium experience'
  }
];
export const AI_PROMPT='Generate a travel plan for the location: {location} for {totalDay} Days and {totalNight} Night for {traveler} with a {budget} budget. The travel plan should include flight details with options, prices, and booking URLs. Provide hotel options with the hotel name, address, image URL, geo-coordinates, rating, and description. Include places to visit nearby with the place name, details, image URL, geo-coordinates, ticket pricing, and the time required to travel to each location. Create a daily itinerary with a plan for each day and the best times to visit each location. Provide the travel plan in JSON format'