import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import { CreateTripContext } from '../context/CreateTripContext';

export default function RootLayout() {
  const [tripData,setTripData] = useState({});
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf')

  });
  return (
    <CreateTripContext.Provider value={{tripData,setTripData}}>

    <Stack screenOptions={{
      headerShown:false
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="create-trip/search-place" options={{ headerShown:false}} />
      <Stack.Screen name="create-trip/select-traveller" options={{ headerShown:false}} />
      <Stack.Screen name="create-trip/select-tareekh" options={{ headerShown:false }} />
      <Stack.Screen name="create-trip/select-budget" options={{ headerShown:false }} />
    </Stack>
    </CreateTripContext.Provider>
  );
}