package controller;

import java.io.IOException;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UsuarioDAO;
import modelo.Usuario;

@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nombreCompleto = request.getParameter("Nombre");
        String email = request.getParameter("email");
        String contraseña = request.getParameter("password");
        String tipoUsuario = request.getParameter("perfil");
        boolean terminosCondiciones = "on".equals(request.getParameter("aceptoTerminos"));
        Date fechaRegistro = new Date(System.currentTimeMillis());

        Usuario usuario = new Usuario();
        usuario.setNombreCompleto(nombreCompleto);
        usuario.setEmail(email);
        usuario.setContraseñaHash(contraseña);
        usuario.setTipoUsuario(tipoUsuario);
        usuario.setTerminosCondiciones(terminosCondiciones);
        usuario.setFechaRegistro(fechaRegistro);

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        boolean registroExitoso = usuarioDAO.insertarUsuario(usuario);

        if (registroExitoso) {
            response.sendRedirect("blog.html");
        } else {
            response.sendRedirect("registrarse.html");
        }
    }
}
