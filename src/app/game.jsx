import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function GameScreen() {
    const router = useRouter();

    const { playersData } = useLocalSearchParams();

    const initialPlayers = JSON.parse(playersData);

    const [players, setPlayers] = useState(
        initialPlayers.map((player) => ({
            ...player,
            eliminated: false,
        }))
    );

    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const [showResults, setShowResults] = useState(false);

    const [turn, setTurn] = useState(1);

    const selectPlayer = (index) => {
        setSelectedPlayer(index);
    };

    const handleEliminate = () => {
        if (selectedPlayer === null) {
            return;
        }

        const updatedPlayers = players.map((player, index) => {
            if (index === selectedPlayer) {
                return {
                    ...player,
                    eliminated: true,
                };
            }

            return player;
        });

        setPlayers(updatedPlayers);
        setShowResults(true);
    };

    const handleNextTurn = () => {
        const remainingPlayers = players.filter(
            (player) => !player.eliminated
        );

        const remainingImpostors = remainingPlayers.filter(
            (player) => player.role === "IMPOSTOR"
        );

        const remainingCivils = remainingPlayers.filter(
            (player) => player.role === "CIVIL"
        );

        if (remainingImpostors.length === 0) {
            router.push({
                pathname: "/endGame",
                params: {
                    winner: "CIVILS",
                },
            });

            return;
        }

        if (remainingImpostors.length >= remainingCivils.length) {
            router.push({
                pathname: "/endGame",
                params: {
                    winner: "IMPOSTORS",
                },
            });

            return;
        }

        setSelectedPlayer(null);
        setShowResults(false);
        setTurn(turn + 1);
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.page}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.title}>TOUR {turn}</Text>

                    {!showResults ? (
                        <>
                            <Text style={globalStyles.subtitle}>
                                Sélectionnez un joueur à éliminer
                            </Text>

                            <View style={styles.playersContainer}>
                                {players.map((player, index) => {
                                    if (player.eliminated) {
                                        return null;
                                    }

                                    const isSelected = selectedPlayer === index;

                                    return (
                                        <Pressable
                                            key={index}
                                            style={[
                                                styles.playerButton,
                                                isSelected && styles.selectedPlayer,
                                            ]}
                                            onPress={() => selectPlayer(index)}
                                        >
                                            <Text style={styles.playerText}>{player.name}</Text>
                                            {isSelected && <Text style={styles.check}>✓</Text>}
                                        </Pressable>
                                    );
                                })}
                            </View>

                            <Pressable
                                style={[
                                    globalStyles.button,
                                    selectedPlayer === null && styles.disabledButton,
                                ]}
                                onPress={handleEliminate}
                            >
                                <Text style={globalStyles.buttonText}>ÉLIMINER</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Text style={globalStyles.subtitle}>RÉSULTAT</Text>

                            <View style={styles.resultsContainer}>
                                {selectedPlayer !== null && (
                                    <View style={styles.result}>
                                        <Text style={styles.playerText}>{players[selectedPlayer].name}</Text>
                                        <Text style={styles.role}>{players[selectedPlayer].role}</Text>
                                    </View>
                                )}
                            </View>

                            <Pressable
                                style={({ pressed }) => [
                                    globalStyles.button,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                                onPress={handleNextTurn}
                            >
                                <Text style={globalStyles.buttonText}>CONTINUER</Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playersContainer: {
        width: "100%",
        marginBottom: 24,
    },

    playerButton: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.04)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    selectedPlayer: {
        borderColor: "#7DD3FC",
        backgroundColor: "rgba(125, 211, 252, 0.12)",
    },

    playerText: {
        color: "#F8FAFC",
        fontSize: 18,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    check: {
        color: "#7DD3FC",
        fontSize: 24,
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.4,
    },

    resultsContainer: {
        width: "100%",
        marginBottom: 24,
    },

    result: {
        width: "100%",
        padding: 20,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.04)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
    },

    role: {
        color: "#A7B4C2",
        fontSize: 18,
        marginTop: 8,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});