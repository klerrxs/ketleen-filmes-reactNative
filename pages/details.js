import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { data, getMovieDetails, id, returnHome } from "../redux/slice";

export default function Detail({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  var details = useSelector(data);
  var ids = useSelector(id);

  const start = async () => {
    await dispatch(getMovieDetails(ids));
    setIsLoading(false);
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Image
          style={{ width: "50%", height: "20%" }}
          source={{
            uri: "https://portal.safetynetwireless.com/dist/images/loader.gif",
          }}
        />
      ) : (
        <>
          <ImageBackground
            style={styles.header}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${details.poster_path}`,
            }}
          ></ImageBackground>
          <View style={styles.mid}>
            <Text style={styles.tittle}>{details.title}</Text>
            <Text style={styles.midTitle}>Sinopse</Text>
            <Text style={styles.midText}>{details.overview}</Text>
            <Text style={styles.midTitle}>Nota</Text>
            <Text style={styles.midText}>{details.vote_average}</Text>
            <Text style={styles.midTitle}>Data de lançamento</Text>
            <Text style={styles.midText}>{details.release_date}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Home");
                dispatch(returnHome());
                setIsLoading(true);
              }}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#000",
    opacity: 0.3,
  },
  mid: {
    flex: 4,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  midTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  midText: {
    fontSize: 16,
  },
  tittle: {
    color: "#000",
    fontSize: 35,
  },
  button: {
    height: "10%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E50914",
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
