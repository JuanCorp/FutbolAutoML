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

            var model = new EquipoViewModel();

            return View(model);
        }


    }
}