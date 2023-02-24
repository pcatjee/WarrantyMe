import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import COLORS from "../../consts/colors";
import UserIcon from "react-native-vector-icons/FontAwesome5";
import LockIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const apiUrl =
    "https://wme-staging-backend.herokuapp.com/api/v1/executives/getExecutiveLogin";

  const handleLogin = async () => {
    setIsLoading(true);

    fetch(`${apiUrl}?mobile=${mobile}&password=${password}`)
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Wrong Credentials");
        }
      })
      .then((data) => {
        ToastAndroid.show("Successfully Logged In", ToastAndroid.SHORT);
        console.log(data);
        AsyncStorage.setItem("token", data.token);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputbox}>
        <UserIcon name="user-alt" size={15} color={"grey"} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setMobile}
          value={mobile}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputbox}>
        <LockIcon name="lock" size={20} color={"grey"} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>Forgot password?</Text>
      </TouchableOpacity>

      {isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          {ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)}
          <Text>Please wait...</Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  inputbox: {
    width: "80%",
    height: 48,
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lighterGrey,
  },
  input: {
    marginLeft: 20,
    backgroundColor: COLORS.lighterGrey,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "80%",
    height: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  text: {
    marginTop: 20,
  },
});
