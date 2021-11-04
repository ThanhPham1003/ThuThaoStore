import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.Container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.fixedRation} type={type} ration={'1:1'}/>
      </View> 

          <Button
            //style={styles.button}
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </Button>

    </View>
  )
}
const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },
    cameraContainer:{
        flex: 1, 
        flexDirection: 'row'
    },
    fixedRation:{
        flex: 1,
        aspectRatio: 1
    }



})