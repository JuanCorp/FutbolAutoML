using FootballML.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FootballML.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //Main menu loading logic.

            var model = new EquipoViewModel();

            //Load tables to be displayed for the history submenu and create the model.

            TablaHistorialModel tabla = new TablaHistorialModel();
            using (var context = new SoccerEntities())
            {
                var query = from j in context.Juegos
                            orderby j.IDJuego descending
                            select j;

                foreach (var juego in query)
                {
                    var helper = new NombreHelper();
                    helper.juego = juego;
                    helper.nombre1 = juego.Equipos1.Nombre;
                    helper.nombre2 = juego.Equipos.Nombre;
                    tabla.juegos.Add(helper);
                }

            }
            model.tabla = tabla;

            return View(model);
        }

        public ActionResult Simular(int id)
        {
            //Create the game to be replayed, with its plays.
            SimularViewModel model = new SimularViewModel();
            using (var context = new SoccerEntities())
            {
                
                var juego = (from j in context.Juegos
                             where j.IDJuego.Equals(id)
                             select j).First();

                var jugadas = (from jugada in context.Jugadas
                               where jugada.IDJuego.Equals(id)
                               select jugada).ToList();

                string[] jugs = ConvertJugadas(jugadas);

                model.nombre1 = juego.Equipos.Nombre;
                model.nombre2 = juego.Equipos1.Nombre;

                model.equipo1 = juego.Equipo1ID;
                model.equipo2 = juego.Equipo2ID;

                model.icono1 = juego.Equipos.icono;
                model.icono2 = juego.Equipos1.icono;

                model.jugadas = jugadas;
                model.jugs = jugs;
                

                return View(model);
            }


           

        }

        [HttpPost]
        public ActionResult Index(EquipoViewModel model)
        {
            //ML experiment quantity submit.
            if (ModelState.IsValid)
            {
                TempData["cantidad"] = model;
                return RedirectToAction("Simulacion");
            }
            return View(model);
        }

        public ActionResult Simulacion()
        {
            //Create the machine learning model to be submitted.
            var modelo = (EquipoViewModel)TempData["cantidad"];
            int cantidad = modelo.cantidad;
            MLSimulation sim = new MLSimulation(cantidad);
            MLViewModel model = new MLViewModel(sim.test, sim.result, sim.accuracy * 100, cantidad);


            return View(model);
        }

        string[] ConvertJugadas(List<Jugadas> jugadas)
        {
            //Convert a plays (jugadas) object list into a string array to be sent to the view.
            string[] resultado = new string[jugadas.Count];

            for (int i = 0; i < jugadas.Count; i++)
            {
                string line = jugadas[i].NumJugada.ToString() + "," +
                    jugadas[i].Equipo.ToString() + "," +
                    jugadas[i].CategoriaJugada + "," + 
                    jugadas[i].TipoJugada + ","+ 
                    jugadas[i].Minuto.ToString();

                resultado[i] = line;
            }

            return resultado;
        }
    }

    
}