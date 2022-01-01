import React, {useContext, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native'
import {FirebaseContext} from '../context/FirebaseContext'
import { LoadingContext } from '../context/LoadingContext'
export default function LoadingScreen(){
  const firebase = useContext(FirebaseContext)
  const [_,setLoaded] = useContext(LoadingContext)
  useEffect(() =>{
    setTimeout(async () => {
      setLoaded({isLoaded: true})
    }, 1000)
  },[])
  return(
    <View style={styles.Container}>
      <Text style={styles.Title}>Thu Thao Store</Text>
      <LottieView 
        source={require("../assets/loadingAnimation.json")} 
        autoPlay
        loop
        style={{width: '90%'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container:{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5ceb2',
  },
  Title:{
    fontSize: 32,
    color:'#FFFFFF'
  }
})