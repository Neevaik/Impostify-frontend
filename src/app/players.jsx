import { useRouter } from "expo-router";
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";

import { globalStyles } from "../styles/global";

export default function PlayersScreen() {
    const [name, setName] = useState("");
    const [players, setPlayers] = useState(["bob", "john", "luc"]);
    const router = useRouter();

    const handleAddPlayer = () => {
        const trimmedName = name.trim().toLowerCase();
        if (trimmedName === "" || players.includes(trimmedName)) { return; }

        setPlayers([...players, name.trim()]);
        setName("");
    };

    const handleDeletePlayer = (indexToDelete) => {
        setPlayers(players.filter((_, index) => index !== indexToDelete));
    };

    const handleNext = () => {
        router.push({
            pathname: "/gameSetup",
            params: {
                playersCount: players.length,
                players: JSON.stringify(players)
            },
        });
    };

    return (
        <View style={globalStyles.container}>
            <View style={styles.page}>
                <View style={styles.card}>
                    <Text style={globalStyles.title}>JOUEURS</Text>

                    <Text style={globalStyles.subtitle}>
                        Ajoutez les joueurs de la partie
                    </Text>

                    <View style={styles.formRow}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Nom du joueur"
                            placeholderTextColor="#7B8794"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Pressable
                            style={({ pressed }) => [
                                styles.addButton,
                                { opacity: pressed ? 0.9 : 1 },
                            ]}
                            onPress={handleAddPlayer}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </Pressable>
                    </View>

                    <View style={styles.playerList}>
                        {players.map((player, index) => (
                            <View key={`${player}-${index}`} style={styles.playerItem}>
                                <Text style={styles.playerName}>{player}</Text>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.deleteButton,
                                        { opacity: pressed ? 0.8 : 1 },
                                    ]}
                                    onPress={() => handleDeletePlayer(index)}
                                >
                                    <Text style={styles.deleteButtonText}>SUPPRIMER</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>

                    {players.length >= 3 && (
                        <Pressable
                            style={({ pressed }) => [
                                globalStyles.button,
                                { opacity: pressed ? 0.9 : 1 },
                            ]}
                            onPress={handleNext}
                        >
                            <Text style={globalStyles.buttonText}>CONTINUER</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 24,
    },

    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#121C26",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        padding: 24,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.18,
        shadowRadius: 18,
        elevation: 8,
    },

    formRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
    },

    input: {
        flex: 1,
        height: 56,
        backgroundColor: "#F8FAFC",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 17,
        color: "#0F172A",
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.08)",
    },

    addButton: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: "#7DD3FC",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#7DD3FC",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
    },

    addButtonText: {
        color: "#0F172A",
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 30,
    },

    playerList: {
        width: "100%",
        marginTop: 8,
        marginBottom: 20,
        gap: 10,
    },

    playerItem: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    playerName: {
        color: "#F8FAFC",
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        textTransform: "capitalize",
    },

    deleteButton: {
        backgroundColor: "rgba(255,255,255,0.06)",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    deleteButtonText: {
        color: "#F8FAFC",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.7,
    },
});