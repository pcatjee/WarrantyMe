import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });
  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.replace("BoardScreen");
    } else {
      navigation.replace("Home");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#00244E" barStyle="light-content" />
      <ImageBackground
        source={require("../../assets/splash.png")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 23,
    fontWeight: "600",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Splash;
