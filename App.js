import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./pages/welcome";
import Detail from "./pages/details";
import Home from "./pages/home";

import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Filmes",
              headerBackVisible: false,
              headerStyle: { backgroundColor: "#E50914" },
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: "Detalhes",
              headerBackVisible: false,
              headerStyle: { backgroundColor: "#E50914" },
            }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
