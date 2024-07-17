package com.pen_and_paper.mi_sitio_web_java;

import java.sql.Connection;
import java.sql.SQLException;

import conexion.ConexionDB;

public class conexionDB {
    public static void main(String[] args) {
        try {
            Connection conn = ConexionDB.getConnection();
            if (conn!=null) {
                System.out.println("Conección exitosa");                
            }
        } catch (SQLException e) {
            System.out.println("No se realizó la conección");
        }
    }
}
