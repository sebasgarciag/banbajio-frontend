import axios from "axios";
import { URL_BASE_API } from "@env";

const CuentasAPI = () => {
  async function getCuentasbyUsuarioId(usuarioId) {
    try {
      const response = await axios.get(
        `${URL_BASE_API}/cuentas/usuario/${usuarioId}`
      );
      // Asumiendo que la respuesta es un array de cuentas
      const cuentas = response.data.map((cuenta) => ({
        id: cuenta.id,
        saldo: cuenta.saldo,
        numeroCuenta: cuenta.numero_cuenta,
        clabe: cuenta.clabe,
        banco: {
          id: cuenta.banco.id,
          noBanco: cuenta.banco.no_banco,
          nombre: cuenta.banco.nombre,
        },
      }));
      return cuentas;
    } catch (error) {
      console.error("Error fetching cuentas:", error);
      throw error;
    }
  }
  return getCuentasbyUsuarioId;
};

export default CuentasAPI;
