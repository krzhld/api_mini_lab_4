import {  StyleSheet, View } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import { Image , Text} from 'react-native-elements';

const UserProfileScreen = ({ navigation }) => {

    return (
      <View style={styles.container}>
          <StatusBar style="light"/>
          <Image source={{
              uri: auth?.currentUser?.photoURL,
          }}
          style = {{width: 100, height: 100}}/>
          <Text h3 style={{ marginBottom: 50 }}>User name: {auth?.currentUser?.displayName} </Text>
          <Text h3 style={{ marginBottom: 50 }}>Email: {auth?.currentUser?.email} </Text>
      </View>
    );
  }

export default UserProfileScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    }
})
