import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUsuario } from "@/wrapper/UsuarioContext";
import { BANBAJIO_RED } from "@/constants/colors";

const TwoFA = ({
  onBack,
  availableBalance,
  onTransferComplete,
  onAuthComplete,
}) => {
  const { usuarioSeleccionado } = useUsuario();
  const [codigo, setCodigo] = useState("");

  const handleCodigoChange = (text) => {
    // Limitar a solo 6 valores numéricos
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= 6) {
      setCodigo(numericText);
    }
  };

  const handleSubmit = () => {
    onAuthComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Factor Authentication</Text>
      <Text style={styles.subtitle}>{usuarioSeleccionado.nombre}</Text>
      <TextInput
        style={styles.input}
        placeholder="código 2FA"
        placeholderTextColor="#888"
        value={codigo}
        onChangeText={handleCodigoChange}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button title="Enviar" onPress={handleSubmit} color={BANBAJIO_RED} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    color: "white",
    paddingHorizontal: 10,
    width: "60%",
    fontSize: 24,
    textAlign: "center",
  },
});

export default TwoFA;
