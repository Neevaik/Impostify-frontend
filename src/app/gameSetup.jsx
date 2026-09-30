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
            <View style={globalStyles.page}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.title}>IMPOSTEURS</Text>

                    <Text style={styles.info}>{playersCount} joueurs</Text>

                    <View style={styles.counterCard}>
                        <Pressable style={({ pressed }) => [styles.counterButton, { opacity: pressed ? 0.8 : 1 },]} onPress={() => setImpostors(Math.max(1, impostors - 1))}>
                            <Text style={styles.counterText}>−</Text>
                        </Pressable>

                        <Text style={styles.number}>{impostors}</Text>

                        <Pressable style={({ pressed }) => [styles.counterButton, { opacity: pressed ? 0.8 : 1 },]} onPress={() => setImpostors(Math.min(Number(playersCount) - 2, impostors + 1))}>
                            <Text style={styles.counterText}>+</Text>
                        </Pressable>
                    </View>

                    <Pressable style={({ pressed }) => [globalStyles.button, { opacity: pressed ? 0.9 : 1 },]} onPress={handleNext}>
                        <Text style={globalStyles.buttonText}>CONTINUER</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    info: {
        color: "#A7B4C2",
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        letterSpacing: 0.5,
    },

    counterCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 28,
    },

    counterButton: {
        width: 56,
        height: 56,
        backgroundColor: "#7DD3FC",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#7DD3FC",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },

    counterText: {
        color: "#0F172A",
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 30,
    },

    number: {
        color: "#F8FAFC",
        fontSize: 34,
        fontWeight: "800",
        marginHorizontal: 32,
        minWidth: 32,
        textAlign: "center",
    },
});