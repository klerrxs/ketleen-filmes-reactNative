import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticator = async () => {
    const response = await AsyncStorage.getItem("isAuth");
    console.log(response);
    if (response == "true") {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    authenticator();
  }, []);

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        console.log(response);
        await AsyncStorage.setItem("isAuth", "true");
        navigation.navigate("Home");
      })
      .catch((error) => {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            Alert.alert("Email inválido");
            break;
          case "Firebase: Error (auth/user-not-found).":
            Alert.alert("Usuário não encontrado");
            break;
          case "Firebase: Error (auth/wrong-password).":
            Alert.alert("Senha incorreta");
            break;
          default:
            Alert.alert(error.message.toString());
            break;
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.buttonTextLogo}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Senha"
        secureTextEntry
      />
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => goToRegister()} style={styles.register}>
        Ainda não é membro? faça seu cadastro
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B68EE",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#4B0082",
    borderWidth: 1,
    borderRadius: 20,
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignContent: "center",
    width: 100,
    height: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
  },
  buttonTextLogo: {
    alignSelf: "center",
    fontSize: 25,
    color: "#ffffff",
  },
  register: {
    marginTop: 10,
    color: "#E6E6FA",
  },
});
