package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import conexion.ConexionDB;
import modelo.Usuario;

public class UsuarioDAO {

    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre_completo, email, contraseña_hash, tipo_usuario, terminos_condiciones, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, usuario.getNombreCompleto());
            pstmt.setString(2, usuario.getEmail());
            pstmt.setString(3, usuario.getContraseñaHash());
            pstmt.setString(4, usuario.getTipoUsuario());
            pstmt.setBoolean(5, usuario.isTerminosCondiciones());
            pstmt.setDate(6, usuario.getFechaRegistro());
    
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    private Usuario extraerUsuarioDeResultSet(ResultSet rs) throws Exception {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setNombreCompleto(rs.getString("nombre_completo"));
        usuario.setEmail(rs.getString("email"));
        usuario.setContraseñaHash(rs.getString("contraseña_hash"));
        usuario.setTipoUsuario(rs.getString("tipo_usuario"));
        usuario.setTerminosCondiciones(rs.getBoolean("terminos_condiciones"));
        usuario.setFechaRegistro(rs.getDate("fecha_registro"));
        return usuario;
    }
    
    public List<Usuario> obtenerTodos() {
        List<Usuario> usuarios = new ArrayList<>();
        String query = "SELECT * FROM usuarios";
        
        try (Connection conn = ConexionDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                Usuario usuario = extraerUsuarioDeResultSet(rs);
                usuarios.add(usuario);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return usuarios;
    }
    
    public Usuario obtenerPorId(int id) {
        String query = "SELECT * FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return extraerUsuarioDeResultSet(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public boolean modificar(Usuario usuario) {
        String query = "UPDATE usuarios SET nombre_completo = ?, email = ?, contraseña_hash = ?, tipo_usuario = ?, terminos_condiciones = ?, fecha_registro = ? WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, usuario.getNombreCompleto());
            pstmt.setString(2, usuario.getEmail());
            pstmt.setString(3, usuario.getContraseñaHash());
            pstmt.setString(4, usuario.getTipoUsuario());
            pstmt.setBoolean(5, usuario.isTerminosCondiciones());
            pstmt.setDate(6, usuario.getFechaRegistro());
            pstmt.setInt(7, usuario.getId());
            
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean eliminar(int id) {
        String query = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
