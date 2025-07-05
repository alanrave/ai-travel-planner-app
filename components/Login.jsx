import { View, Text, Image ,StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors.ts'; // your custom color file
import { useRouter } from 'expo-router';

export default function Login() {
  const router=useRouter();
  return (
    <View>
      <Image
        source={require('./../assets/images/travel_back.jpeg')}
        style={{
          width: '100%',
          height: 520,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View
        style={{
          backgroundColor: Colors.WHITE,
          marginTop: -40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: '100%',
          padding: 25,
        }}
      >
        <Text
          style={{
            fontSize:30,
            fontFamily: 'outfit-bold',
            textAlign:'center',
            marginTop:20
          }}
        >
          RAHI : YOUR TRUE COMPANION
        </Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:17,
          textAlign:'center',
          color:Colors.GRAY,
          marginTop:20,
        }}>
          Experience travelling like never before. Dive into the cultural experiences
           and the never discovered beauty so far.
        </Text>
        <TouchableOpacity style={styles.button}
           onPress={()=>router.push('auth/sign-in')}
        >
          <Text style={{color:Colors.WHITE,
            textAlign:'center',
            fontFamily:'outfit',
            fontSize:17,
            
          }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:99,
    marginTop:'25%'
  }
})