import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { words } from '../data/words';
import { globalStyles } from "../styles/global";

export default function DistributionScreen() {
    const router = useRouter();
    const { players, impostorsCount } = useLocalSearchParams();
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [showRole, setShowRole] = useState(false);
    const playerList = JSON.parse(players);

    const [impostorIndexes] = useState(() => {
        return [...playerList.keys()]
            .sort(() => Math.random() - 0.5)
            .slice(0, Number(impostorsCount));
    });

    const [gameWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    });

    const playersData = playerList.map((player, index) => ({
        name: player,
        role: impostorIndexes.includes(index) ? "IMPOSTOR" : "CIVIL",
        word: impostorIndexes.includes(index) ? null : gameWord,
    }));

    const currentPlayerData = playersData[currentPlayer - 1];

    const handleNext = () => {
        if (currentPlayer < playerList.length) {
            setCurrentPlayer(currentPlayer + 1);
            setShowRole(false);
        } else {
            router.push({
                pathname: "/game",
                params: {
                    playersData: JSON.stringify(playersData),
                },
            });
        }
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.page}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.title}>DISTRIBUTION</Text>

                    <View style={styles.playerBadge}>
                        <Text style={styles.player}>{playerList[currentPlayer - 1]}</Text>
                    </View>

                    {!showRole ? (
                        <>
                            <Text style={globalStyles.subtitle}>
                                Appuyez pour découvrir votre rôle
                            </Text>

                            <Pressable
                                style={({ pressed }) => [
                                    globalStyles.button,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                                onPress={() => setShowRole(true)}
                            >
                                <Text style={globalStyles.buttonText}>VOIR MON RÔLE</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <View style={styles.roleCard}>
                                {currentPlayerData.role === "CIVIL" && (
                                    <Text style={styles.role}>{currentPlayerData.word}</Text>
                                )}

                                {currentPlayerData.role === "IMPOSTOR" && (
                                    <Text style={styles.role}>Vous êtes l'imposteur</Text>
                                )}
                            </View>

                            <Pressable
                                style={({ pressed }) => [
                                    globalStyles.button,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                                onPress={handleNext}
                            >
                                <Text style={globalStyles.buttonText}>SUIVANT</Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playerBadge: {
        backgroundColor: "rgba(125, 211, 252, 0.12)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(125, 211, 252, 0.3)",
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 24,
        alignItems: "center",
    },

    player: {
        color: "#F8FAFC",
        fontSize: 28,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    roleCard: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        padding: 22,
        marginBottom: 24,
        alignItems: "center",
    },

    role: {
        color: "#F8FAFC",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
    },
});