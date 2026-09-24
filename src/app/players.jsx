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
            <View style={globalStyles.content}>

                <Text style={globalStyles.title}>
                    JOUEURS
                </Text>

                <Text style={globalStyles.subtitle}>
                    Ajoutez les joueurs de la partie
                </Text>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nom du joueur"
                    placeholderTextColor="#777777"
                />

                <Pressable
                    style={globalStyles.button}
                    onPress={handleAddPlayer}
                >
                    <Text style={globalStyles.buttonText}>
                        AJOUTER
                    </Text>
                </Pressable>

                <View style={styles.playerList}>
                    {players.map((player, index) => (
                        <View
                            key={index}
                            style={styles.playerItem}
                        >
                            <Text style={styles.playerName}>
                                {player}
                            </Text>

                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleDeletePlayer(index)}
                            >
                                <Text style={styles.deleteButtonText}>
                                    SUPPRIMER
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                {players.length >= 3 && (
                    <Pressable
                        style={globalStyles.button}
                        onPress={handleNext}
                    >
                        <Text style={globalStyles.buttonText}>
                            CONTINUER
                        </Text>
                    </Pressable>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        maxWidth: 400,
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 18,
        color: "#111111",
        marginBottom: 15,
    },

    playerList: {
        width: "80%",
        maxWidth: 400,
        marginTop: 20,
        marginBottom: 20,
    },

    playerItem: {
        backgroundColor: "#222222",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 8,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    playerName: {
        color: "#FFFFFF",
        fontSize: 18,
        flex: 1,
    },

    deleteButton: {
        backgroundColor: "#444444",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },

    deleteButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
});