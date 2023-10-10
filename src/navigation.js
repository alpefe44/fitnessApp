import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import DetailScreen from './screens/DetailScreen';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='TabScreen' component={BottomTab} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const BottomTab = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? 'home' : 'home-outline'
          } else if (rn === "Profile") {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color}></Ionicons>
        },
        tabBarActiveTintColor: 'orange',
        tabBarLabelStyle: { padding: 5, fontSize: 12, fontWeight: 'bold' },
        tabBarInactiveTintColor: 'gray',

      })}


    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerTitleAlign: 'center'
      }} />
      <Tab.Screen name='Profile' component={ProfileScreen}></Tab.Screen>
    </Tab.Navigator>

  );
}

