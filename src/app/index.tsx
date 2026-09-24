import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { globalStyles } from "../styles/global";

export default function HomeScreen() {
  const router = useRouter();

  const handlePlay = () => {
    router.push("/players");
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>IMPOSTIFY</Text>

        <Text style={globalStyles.subtitle}>
          Le jeu de l'imposteur
        </Text>

        <Pressable
          style={globalStyles.button}
          onPress={handlePlay}
        >
          <Text style={globalStyles.buttonText}>JOUER</Text>
        </Pressable>
      </View>
    </View>
  );
}