import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import UsuariosAPI from "../../api/UsuarioApi";
import { Picker } from "@react-native-picker/picker";
import { useUsuario } from "@/wrapper/UsuarioContext";
import { useNavigation } from "@react-navigation/native";

const SelectUsuario = () => {
 // const navigation = useNavigation();
  //const getUsuarios = UsuariosAPI();
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<object[]>([
    { id: 0, nombre: "Alejandro Robles", tipoVal: 1 },
    { id: 1, nombre: "Sebastián García", tipoVal: 2 },
  ]);
  const [loading, setLoading] = useState(false);
  const { usuarioSeleccionado, setUsuarioSeleccionado } = useUsuario();

  const handleUsuarioChange = (itemValue: object) => {
    setUsuarioSeleccionado(itemValue);
    navigation.navigate("main");
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Lista de Usuarios</Text>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: "white" }}>Loading...</Text>
        </View>
      )}
      {!loading && usuarios.length > 0 && (
        <Picker
          selectedValue={usuarioSeleccionado}
          onValueChange={(itemValue) => handleUsuarioChange(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {usuarios.map((usuario) => (
            <Picker.Item
              key={usuario.id}
              label={usuario.nombre}
              value={usuario}
            />
          ))}
        </Picker>
      )}
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
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  picker: {
    width: 200,
    color: "white",
    backgroundColor: "black",
  },
  pickerItem: {
    color: "white",
  },
});

export default SelectUsuario;
