import { View, Text } from "react-native";
import { useUsuario } from "@/wrapper/UsuarioContext";

const Home = () => {
  const { usuarioSeleccionado } = useUsuario();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>
        {usuarioSeleccionado.id}: {usuarioSeleccionado.nombre}
      </Text>
    </View>
  );
};

export default Home;
