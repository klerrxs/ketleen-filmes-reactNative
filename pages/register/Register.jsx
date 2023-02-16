import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../auth";

export function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        Alert.alert("Conta criada");
        navigation.navigate("Login");
      })
      .catch((error) => {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            Alert.alert("Email inválido");
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            Alert.alert("A senha deve ser maior que 5 caracteres.");
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            Alert.alert("Esse email já está cadastrado.");
            break;
          default:
            Alert.alert(error.message.toString());
            break;
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.buttonTextLogo}>Cadastrar</Text>
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
      <TouchableOpacity style={styles.button} onPress={() => onRegister()}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text onPress={() => goToLogin()} style={styles.login}>
        Já é membro? faça seu login
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
    borderColor: "#4B0082	",
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
  login: {
    marginTop: 10,
    color: "#E6E6FA",
  },
});
