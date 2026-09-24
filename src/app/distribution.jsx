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
            <View style={globalStyles.content}>

                <Text style={globalStyles.title}>
                    DISTRIBUTION
                </Text>

                <Text style={styles.player}>
                    {playerList[currentPlayer - 1]}
                </Text>

                {!showRole ? (
                    <>
                        <Text style={globalStyles.subtitle}>
                            Appuyez pour découvrir votre rôle
                        </Text>

                        <Pressable
                            style={globalStyles.button}
                            onPress={() => setShowRole(true)}
                        >
                            <Text style={globalStyles.buttonText}>
                                VOIR MON RÔLE
                            </Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        {currentPlayerData.role === "CIVIL" && (
                            <Text style={styles.role}>
                                {currentPlayerData.word}
                            </Text>
                        )}

                        {currentPlayerData.role === "IMPOSTOR" && (
                            <Text style={styles.role}>
                                Vous êtes l'imposteur
                            </Text>
                        )}

                        <Pressable
                            style={globalStyles.button}
                            onPress={handleNext}
                        >
                            <Text style={globalStyles.buttonText}>
                                SUIVANT
                            </Text>
                        </Pressable>
                    </>
                )}

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    player: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
    },

    role: {
        color: "#FFFFFF",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 40,
    },
});