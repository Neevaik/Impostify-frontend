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
            <View style={globalStyles.content}>

                <Text style={globalStyles.title}>
                    PARTIE TERMINÉE
                </Text>

                {isCivilsWinner ? (
                    <>
                        <Text style={styles.emoji}>
                            🎉
                        </Text>

                        <Text style={styles.winner}>
                            LES CIVILS ONT GAGNÉ !
                        </Text>

                        <Text style={globalStyles.subtitle}>
                            Tous les imposteurs ont été trouvés.
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.emoji}>
                            👿
                        </Text>

                        <Text style={styles.winner}>
                            LES IMPOSTEURS ONT GAGNÉ !
                        </Text>

                        <Text style={globalStyles.subtitle}>
                            Les imposteurs sont désormais majoritaires.
                        </Text>
                    </>
                )}

                <View style={styles.buttonsContainer}>

                    <Pressable
                        style={styles.homeButton}
                        onPress={handleHome}
                    >
                        <Text style={styles.homeButtonText}>
                            REJOUER
                        </Text>
                    </Pressable>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    emoji: {
        fontSize: 60,
        marginBottom: 20,
    },

    winner: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },

    buttonsContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
        gap: 15,
    },

    homeButton: {
        width: "80%",
        maxWidth: 400,
        paddingVertical: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#555555",
        alignItems: "center",
    },

    homeButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
