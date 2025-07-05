import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth } from './../../../configs/FirebaseConfig.js';
import { Colors } from './../../../constants/Colors.ts';
export default function() {
    const router=useRouter();
    const navigation=useNavigation();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])

    const onSignIn=()=>{
        if(!email&&!password)
        {
            ToastAndroid.show('Please enter all details',ToastAndroid.LONG);
            return ;
        }
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    if(errorCode=='auth/invalid-credential')
    {
        ToastAndroid.show("Invalid credentials",ToastAndroid.LONG);
    }
  });

    }
    
  return (
    <View style={{
        padding:25,
        paddingTop:50,
        backgroundColor:Colors.WHITE,
        height:'100%',
    }}>
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,
            marginTop:30
        }}>
            Let's Sign You In
        </Text>
         <Text style={{
            fontFamily:'outfit-medium',
            fontSize:30,
            color:Colors.GRAY,
            marginTop:20
        }}>
            Welcome Back
        </Text>
         <Text style={{
            fontFamily:'outfit-medium',
            fontSize:30,
            color:Colors.GRAY,
            marginTop:10
        }}>
            You've been missed 
        </Text>
        <View style={{
            marginTop:40
        }}>
            <Text style={{
                fontFamily:'outfit'
            }}>
                Email
            </Text>
            <TextInput style={styles.input}
             onChangeText={(value)=>setEmail(value)}
             placeholder='Enter Email' />
        </View>
          <View style={{
            marginTop:20,
            marginBottom:20
        }}>
            <Text style={{
                fontFamily:'outfit'
            }}>
                Password
            </Text>
            <TextInput type="password"
            style={styles.input}
            secureTextEntry={true}
            placeholder='Enter Password'
            onChangeText={(value)=>setPassword(value)} />
        </View>
        <TouchableOpacity onPress={onSignIn}
        style={{
            padding:15,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:30
        }}>
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center'
            }}>
                Sign In
            </Text>
        </TouchableOpacity>
        {/* Create Account Button */}
         <TouchableOpacity 
         onPress={()=>router.replace('auth/sign-up')
         }
         style={{
            padding:15,
            backgroundColor:Colors.WHITE,
            borderRadius:15,
            marginTop:30,
            borderWidth:1
        }}>
            <Text style={{
                color:Colors.PRIMARY,
                textAlign:'center'
            }}>
                Create Account
            </Text>
        </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
    input:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.GRAY,
        fontFamily:'outfit'
    }
})