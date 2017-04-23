using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class EquipoViewModel
    {

        public EquipoViewModel()
        {
            //Get list of teams from the DB.
            using(var context = new SoccerEntities())
            {
                Equipos = (from team in context.Equipos
                           select team).ToList();
            }
        }

        public List<Equipos> Equipos;
        public TablaHistorialModel tabla;

        [Range(1, 25, ErrorMessage = "Debe ser mayor que 1 y menor que 25")]
        [Required(ErrorMessage = "La cantidad es requerida")]
        public int cantidad { get; set; }
        public int equipo1;
        public int equipo2;
    }
}