import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { api } from "../api/axios";
import { idDetail } from "../redux/slice";

export default function Home({ navigation }) {
  const [movies, setMovies] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ac57c76aa7b66833535f4b4aabe014f6&language=pt-BR&page=1`
      )
      .then((resposta) => {
        setMovies(resposta.data.results);
        console.log(resposta.data.results);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const GoToDetail = async (id) => {
    await dispatch(idDetail(id));
    navigation.navigate("Detail");
  };

  return (
    <View style={styles.container}>
      {!movies ? null : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.grid}
              key={item.id}
              onPress={() => GoToDetail(item.id)}
            >
              <View style={styles.subContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                />
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
    paddingVertical: "10%",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#E50914",
    marginVertical: "5%",
    height: 80,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#000",
    paddingHorizontal: "5%",
    height: 80,
    width: "100%",
  },
  image: {
    width: 50,
    height: 80,
    marginRight: "5%",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    width: "70%",
  },
});
