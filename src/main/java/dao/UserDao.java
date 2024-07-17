package dao;

import conexion.ConexionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {

    public boolean validarUsuario(String email, String contraseña) {
        boolean validar = true;

        String sql = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";
        
        try (Connection conexion = ConexionDB.getConnection();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {
            
            consulta.setString(1, email);
            consulta.setString(2, contraseña);

            try (ResultSet resultado = consulta.executeQuery()) {
                validar = resultado.next(); // Si hay algún resultado, el usuario y contraseña son válidos
            }

        } catch (SQLException e) {
            e.printStackTrace();
            // Puedes lanzar una excepción personalizada aquí o manejarla según tus necesidades
        }

        return validar;
    }
}

