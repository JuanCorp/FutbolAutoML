using FootballML.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FootballML.Controllers
{
    public class JuegoController : Controller
    {



        public ActionResult Jugar(string equipoa = "2", string equipob = "1")
        {
            //Search for the submitted teams and create a soccer game with the pre-selected teams.

            int equipo1 = Convert.ToInt32(equipoa)+1;
            int equipo2 = Convert.ToInt32(equipob)+1;

            var model = new JuegoViewModel();
            var team1 = new Equipos();
            var team2 = new Equipos();

            using (var context = new SoccerEntities())
            {
                team1 = (from t in context.Equipos
                         where t.IDEquipo.Equals(equipo1)
                         select t).First();

                team2 = (from t in context.Equipos
                         where t.IDEquipo.Equals(equipo2)
                         select t).First();
            }
            model.juego.Equipos1 = team1;
            model.juego.Equipos = team2;

            model.equipo1 = equipo1;
            model.equipo2 = equipo2;
            model.nombre1 = team1.Nombre;
            model.nombre2 = team2.Nombre;
            model.icono1 = team1.icono;
            model.icono2 = team2.icono;
            return View(model);
        }

        [HttpPost]
        public ActionResult Jugar(List<string> results)
        {
            //Game's over, create the game details and plays details.
            var modelo = new JuegoViewModel();

            var juego = new Juegos();
            var detallesJuego = results.Last().Split(',') ;
            //Llenar Juego.
            //Game details.
            juego.Equipo1ID = Convert.ToInt32(detallesJuego[0]);
            juego.Equipo2ID = Convert.ToInt32(detallesJuego[1]);
            juego.OfensivasTeam1 = Convert.ToInt32(detallesJuego[2]);
            juego.OfensivasTeam2 = Convert.ToInt32(detallesJuego[3]);
            juego.DefensivasTeam1 = Convert.ToInt32(detallesJuego[4]);
            juego.DefensivasTeam2 = Convert.ToInt32(detallesJuego[5]);
            juego.FaltasTeam1 = Convert.ToInt32(detallesJuego[6]);
            juego.FaltasTeam2= Convert.ToInt32(detallesJuego[7]);
            juego.GolesTeam1 = Convert.ToInt32(detallesJuego[8]);
            juego.GolesTeam2 = Convert.ToInt32(detallesJuego[9]);
            if (juego.GolesTeam1 > juego.GolesTeam2)
            {
                juego.Ganador = juego.Equipo1ID;
            }
            else
                juego.Ganador = juego.Equipo2ID;

            modelo.juego = juego;
            results.Remove(results.Last());

            List<Jugadas> jugadas = new List<Jugadas>();
            foreach(var result in results)
            {
                //Plays details.
                var jugada = new Jugadas();
                var detalles = result.Split(',');
                jugada.Juegos = juego;
                jugada.NumJugada = Convert.ToInt32(detalles[0]);
                jugada.Equipo= Convert.ToInt32(detalles[1]);
                jugada.CategoriaJugada =detalles[2];
                jugada.TipoJugada = detalles[3];
                jugada.Minuto = Convert.ToInt32(detalles[4]);
                jugada.Segundo = 0;
                jugadas.Add(jugada);

            }
            modelo.jugadas = jugadas;

            using(var context = new SoccerEntities())
            {
                //Save details into the db.
                context.Juegos.Add(juego);

                context.SaveChanges();

                foreach (var jugada in jugadas)
                    context.Jugadas.Add(jugada);


                var equipo1 = from t in context.Equipos
                              where t.IDEquipo.Equals(juego.Equipo1ID)
                              select t;

                var equipo2 = from t in context.Equipos
                              where t.IDEquipo.Equals(juego.Equipo2ID)
                              select t;


                if(equipo1.First().IDEquipo == juego.Ganador)
                {
                    //Gano el Equipo 1;
                    equipo1.First().Victorias++;
                    equipo2.First().Derrotas++;
                }
                else
                {
                    //Gano el Equipo 2;
                    equipo1.First().Derrotas++;
                    equipo2.First().Victorias++;
                }



                context.SaveChanges();


            }

            return Json(new { redirectTo = Url.Action("Resultado") });
        }

        public ActionResult Resultado()
        {
            //Create the game results to be displayed.

            Juegos juego = new Juegos();
            var model = new JuegoViewModel();

            using (var context = new SoccerEntities())
            {
                //Get the last game played, to display it in the results screen.
                var query = (from j in context.Juegos
                         orderby j.IDJuego descending
                         select j).First();
                juego = query;
                model.juego = juego;


                    model.juego.Equipos = juego.Equipos;
                    model.juego.Equipos1 = juego.Equipos1;

                model.equipo1 = juego.Equipo1ID;
                model.equipo2 = juego.Equipo2ID;
            }
            return View(model);
        }
    }
}