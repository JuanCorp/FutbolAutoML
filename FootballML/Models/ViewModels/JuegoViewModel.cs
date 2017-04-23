using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class JuegoViewModel
    {
        public JuegoViewModel()
        {
            jugadas = new List<Jugadas>();
            juego = new Juegos();
        }

       public List<Jugadas> jugadas;
       public Juegos juego;
        public int equipo1;
        public int equipo2;
        public string nombre1;
        public string nombre2;
        public string icono1;
        public string icono2;
    }
}