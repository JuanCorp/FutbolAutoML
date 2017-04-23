using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class TablaHistorialModel
    {
        public TablaHistorialModel()
        {
            juegos = new List<NombreHelper>();
        }

       public List<NombreHelper> juegos;
    }
}