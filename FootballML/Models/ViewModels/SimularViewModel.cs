using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class SimularViewModel
    {
        public SimularViewModel()
        {
            jugadas = new List<Jugadas>();
        }

        public List<Jugadas> jugadas;
        public  string[] jugs;
        public string nombre1;
        public string nombre2;
        public string icono1;
        public string icono2;
       public  int equipo1;
        public int equipo2;

    }
}