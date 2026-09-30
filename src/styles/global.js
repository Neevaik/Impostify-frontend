import { StyleSheet } from "react-native";

export const colors = {
  background: "#0F1720",
  panel: "#121C26",
  panelSoft: "#1B2833",
  primary: "#F8FAFC",
  secondary: "#A7B4C2",
  accent: "#7DD3FC",
  accentSoft: "#DFF7FF",
  text: "#0F172A",
  border: "rgba(255,255,255,0.08)",
  success: "#86EFAC",
  danger: "#FCA5A5",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },

  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.panel,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 3,
    color: colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.4,
  },

  button: {
    width: "100%",
    maxWidth: 320,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 1.4,
  },
});