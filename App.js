import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLORS from "./src/consts/colors";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import Login from "./src/views/screens/Login";
import { store } from "./store";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./src/views/screens/Splash";

const Stack = createNativeStackNavigator();

const App = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkAuthenticationStatus();
  });
  {
    console.log(isLoggedIn);
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
