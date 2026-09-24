import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { globalStyles } from "../styles/global";

export default function gameSetup() {
    const router = useRouter();
    const { playersCount, players } = useLocalSearchParams();
    const [impostors, setImpostors] = useState(1);


    const handleNext = () => {
        router.push({
            pathname: "/distribution",
            params: {
                impostorsCount: impostors,
                players
            },
        });
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.content}>

                <Text style={globalStyles.title}>Nombre d'imposteurs</Text>

                <Text style={styles.info}>{playersCount} joueurs</Text>

                <View style={styles.counter}>
                    <Pressable style={styles.counterButton}
                        onPress={() => setImpostors(Math.max(1, impostors - 1))}>
                        <Text style={styles.counterText}>-</Text>
                    </Pressable>

                    <Text style={styles.number}>{impostors}</Text>

                    <Pressable style={styles.counterButton}
                        onPress={() => setImpostors(Math.min(Number(playersCount) - 1, impostors + 1))}>
                        <Text style={styles.counterText}>+</Text>
                    </Pressable>
                </View>

                <Pressable
                    style={globalStyles.button}
                    onPress={handleNext}>
                    <Text style={globalStyles.buttonText}>CONTINUER</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: "#FFFFFF",
        fontSize: 20,
        marginBottom: 15,
    },

    counter: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
    },

    counterButton: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    counterText: {
        color: "#111111",
        fontSize: 28,
        fontWeight: "bold",
    },

    number: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "bold",
        marginHorizontal: 30,
    },
    info: {
        color: "#AAAAAA",
        fontSize: 16,
        marginBottom: 15,
    },
});