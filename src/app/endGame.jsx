import { useRouter, useLocalSearchParams } from "expo-router";

import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

import { globalStyles } from "../styles/global";

export default function endGame() {
    const router = useRouter();

    const { winner } = useLocalSearchParams();

    const isCivilsWinner = winner === "CIVILS";

    const handleHome = () => {
        router.push("/");
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.page}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.title}>PARTIE TERMINÉE</Text>

                    {isCivilsWinner ? (
                        <>
                            <Text style={styles.emoji}>🎉</Text>
                            <Text style={styles.winner}>LES CIVILS ONT GAGNÉ !</Text>
                            <Text style={globalStyles.subtitle}>
                                Tous les imposteurs ont été trouvés.
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.emoji}>👿</Text>
                            <Text style={styles.winner}>LES IMPOSTEURS ONT GAGNÉ !</Text>
                            <Text style={globalStyles.subtitle}>
                                Les imposteurs sont désormais majoritaires.
                            </Text>
                        </>
                    )}

                    <Pressable
                        style={({ pressed }) => [
                            globalStyles.button,
                            { opacity: pressed ? 0.9 : 1 },
                        ]}
                        onPress={handleHome}
                    >
                        <Text style={globalStyles.buttonText}>REJOUER</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    emoji: {
        fontSize: 64,
        marginBottom: 18,
        textAlign: "center",
    },

    winner: {
        color: "#F8FAFC",
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 12,
        lineHeight: 32,
    },
});
