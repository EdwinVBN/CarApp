import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { animals } from './animals.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CarDetailsScreen({ route }) {
  const { car } = route.params;
  return (
    <View style={styles.detialsContainer}>
      <Image source={{ uri: car.imageSource }} style={styles.detialsImage} />
      <View style={styles.textContainer}>
        <Text style={styles.textTitel}>{car.name}</Text>
        <Text style={styles.detialsText}>{car.description}</Text>
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
        <Stack.Screen name="AnimalGallery" component={CarGalleryScreen} options={{ title: 'Animal Gallery' }} />
        <Stack.Screen name="AnimalDetails" component={CarDetailsScreen} options={{ title: 'Animal Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CarGalleryScreen({ navigation }) {
  const autoInfo = (animal) => {
    navigation.navigate('AnimalDetails', { animal });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.animalContainer}>
          
          {
            animals.map((animal) => (
              <TouchableOpacity key={animal.name} onPress={() => autoInfo(animal)}>
                <Image source={{uri: animal.imageSource}} style={styles.animalImage} />
              </TouchableOpacity>
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
  animalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  animalImage: {
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
