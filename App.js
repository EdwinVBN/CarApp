import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Pressable, Image, Alert, Button  } from 'react-native';
import { cars } from './car.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const naam = 'Admin';
const wachtwoord = 'password';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === naam && password === wachtwoord) {
      navigation.navigate('CarGallery');
    } else {
      Alert.alert('Incorrect', 'Username or password is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
}

function CarDetailsScreen({ route }) {
  const { auto } = route.params;
  return (
    <View style={styles.detialsContainer}>
      <Image source={{ uri: auto.image }} style={styles.detialsImage} />
      <View style={styles.textContainer}>
        <Text style={styles.textTitel}>{auto.merk}</Text>
        <Text style={styles.detialsText}>{auto.model} - {auto.bouwjaar}</Text>
        <Text style={styles.detialsText}>{auto.beschrijving}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2C2C2C',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="CarGallery" component={CarGalleryScreen} options={{ title: 'Car Gallery' }} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} options={{ title: 'Car Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CarGalleryScreen({ navigation }) {
  const autoInfo = (auto) => {
    navigation.navigate('CarDetails', { auto });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.carContainer}>
          {
            cars.map((auto) => (
              <Pressable key={auto.id} onPress={() => autoInfo(auto)}>
                <Image source={{uri: auto.image}} style={styles.carImage} />
              </Pressable>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  header: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollview: {
    padding: 16,
    marginTop: 50,
  },
  carContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  carImage: {
    height: 150,
    width: 150,
    marginBottom: 25,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  detialsContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',

  },
  detialsImage: {
    height: '45%',
    width: '90%',
    marginBottom: 25,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginTop: 30,
  },
  textContainer: {
    backgroundColor: '#2C2C2C',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
    padding: '3%',
    borderRadius: 15,
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  textTitel: {
    fontSize: '32%',
    color: 'white',
    fontWeight: 'bold',
  },
  detialsText: {
    color: 'white',
    fontSize: '16%',
    textAlign: 'center',
  }

});
