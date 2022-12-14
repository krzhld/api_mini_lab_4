import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';

const SearchScreen = ({ navigation }) => {

    
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState("");


    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", ">=", input));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                chats.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            console.log(chats);
            setChats(chats);
        });
        return unsubscribe;
    }, [])

   

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }


    return (
        <SafeAreaView>
            <Input placeholder='Search chat'
      onChangeText={(input) => setInput(input)}/>
      
        <ScrollView style={styles.container}>
            {chats.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}   
        </ScrollView>
    </SafeAreaView>
    );
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})