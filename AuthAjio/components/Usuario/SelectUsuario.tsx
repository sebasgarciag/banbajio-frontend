import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import UsuariosAPI from "../../api/UsuarioApi";
import { Picker } from "@react-native-picker/picker";

const SelectUsuario = ({ onUsuarioSeleccionado }) => {
  const getUsuarios = UsuariosAPI();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const data = await getUsuarios();
        setUsuarios(data);
        console.log("Usuarios:", usuarios.length);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleUsuarioChange = (usuarioId) => {
    setUsuarioSeleccionado(usuarioId);
    const selectedUsuario = usuarios.find((user) => user.id === usuarioId);
    onUsuarioSeleccionado(selectedUsuario);
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
              value={usuario.id}
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
