using FootballML.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FootballML.Controllers
{
    public class MLController : Controller
    {
        // GET: ML
        public ActionResult Index()
        {
            InputSimulModel model = new InputSimulModel();
            return View(model);
        }

        [HttpPost]
        public ActionResult Index(InputSimulModel model)
        {
            if (ModelState.IsValid)
            {
                TempData["cantidad"] = model;
                return RedirectToAction("Simulacion");
            }
            return View(model);
        }

        public ActionResult Simulacion()
        {
            var modelo = (InputSimulModel)TempData["cantidad"];
            int cantidad = modelo.cantidad;
            MLSimulation sim = new MLSimulation(cantidad);
            MLViewModel model = new MLViewModel(sim.test,sim.result,sim.accuracy*100, cantidad);


            return View(model);
        }
    }
}