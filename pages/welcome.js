import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Welcome({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => navigation.navigate("Login"), 3000);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.container}
    >
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
