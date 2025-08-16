import { Redirect } from "expo-router";
import { View } from "react-native";
import Login from './../components/Login';
import { auth } from './../configs/FirebaseConfig';
import {Stack} from 'expo-router';
export default function Index() {
  const user=auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user?
        <Redirect href="/mytrip"/>:
        <Login/>
      }
     
    </View>
  );
}
