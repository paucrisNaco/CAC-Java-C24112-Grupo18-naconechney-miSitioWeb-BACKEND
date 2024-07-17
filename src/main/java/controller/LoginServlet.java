package controller;


import dao.UserDao;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private UserDao userDao;

    @Override
    public void init() throws ServletException {
        super.init();
        userDao = new UserDao(); // Inicialización del DAO
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("contraseña");

        // Validar credenciales
        boolean usuarioValido = userDao.validarUsuario(email, password);
        if (usuarioValido) {
            // Redirigir a la página del blog si las credenciales son válidas
            response.sendRedirect("blog.html");
        } else {
            // Redirigir al inicio de sesión con mensaje de error
            response.sendRedirect("registrarse.html");
        }
    }
}


