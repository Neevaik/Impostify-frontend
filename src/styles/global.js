  import { StyleSheet } from "react-native";

export const colors = {
  background: "#111111",
  primary: "#FFFFFF",
  secondary: "#AAAAAA",
  text: "#111111",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 50,
  },

  button: {
    width: "80%",
    maxWidth: 400,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
});