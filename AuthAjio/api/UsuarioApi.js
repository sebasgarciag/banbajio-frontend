import axios from "axios";
import { URL_BASE_API } from "@env";

const UsuariosAPI = () => {
  async function getUsuarios() {
      try {
      const response = await axios.get(`${URL_BASE_API}/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Error fetching usuarios 2:", error);
      throw error;
    }
  }
  return getUsuarios;
};

export default UsuariosAPI;
