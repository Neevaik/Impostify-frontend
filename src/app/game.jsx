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
            <View style={globalStyles.content}>

                <Text style={globalStyles.title}>
                    TOUR {turn}
                </Text>

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

                                const isSelected =
                                    selectedPlayer === index;

                                return (
                                    <Pressable
                                        key={index}
                                        style={[
                                            styles.playerButton,
                                            isSelected &&
                                            styles.selectedPlayer,
                                        ]}
                                        onPress={() =>
                                            selectPlayer(index)
                                        }
                                    >
                                        <Text style={styles.playerText}>
                                            {player.name}
                                        </Text>

                                        {isSelected && (
                                            <Text style={styles.check}>
                                                ✓
                                            </Text>
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>

                        <Pressable
                            style={[
                                globalStyles.button,
                                selectedPlayer === null &&
                                styles.disabledButton,
                            ]}
                            onPress={handleEliminate}
                        >
                            <Text style={globalStyles.buttonText}>
                                ÉLIMINER
                            </Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Text style={globalStyles.subtitle}>
                            RÉSULTAT
                        </Text>

                        <View style={styles.resultsContainer}>
                            {selectedPlayer !== null && (
                                <View style={styles.result}>
                                    <Text style={styles.playerText}>
                                        {players[selectedPlayer].name}
                                    </Text>

                                    <Text style={styles.role}>
                                        {players[selectedPlayer].role}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Pressable
                            style={globalStyles.button}
                            onPress={handleNextTurn}
                        >
                            <Text style={globalStyles.buttonText}>
                                CONTINUER
                            </Text>
                        </Pressable>
                    </>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playersContainer: {
        width: "100%",
        marginBottom: 30,
    },

    playerButton: {
        width: "100%",
        padding: 18,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#555555",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    selectedPlayer: {
        borderColor: "#FFFFFF",
        backgroundColor: "#333333",
    },

    playerText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },

    check: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
    },

    disabledButton: {
        opacity: 0.4,
    },

    resultsContainer: {
        width: "100%",
        marginBottom: 30,
    },

    result: {
        width: "100%",
        padding: 20,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: "#222222",
        alignItems: "center",
    },

    role: {
        color: "#AAAAAA",
        fontSize: 18,
        marginTop: 5,
    },
});