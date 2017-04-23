using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class MLModel
    {
        private static Random r = new Random();

        public MLModel()
        {
           //Regular constructor, created a random game.

            JugadasOfensivasTeam1 = r.Next(10, 30);
            JugadasOfensivasTeam2 = r.Next(10, 30);
            JugadasDefensivasTeam1 = r.Next(10, 30);
            JugadasDefensivasTeam2 = r.Next(10, 30);
            FaltasTeam1 = r.Next(5, 15);
            FaltasTeam2 = r.Next(5, 15);

            double pesoTeam1 = (JugadasOfensivasTeam1) * 0.45 + (JugadasDefensivasTeam1) * 0.4 - (FaltasTeam1) * 0.15;
            double pesoTeam2 = (JugadasOfensivasTeam2) * 0.45 + (JugadasDefensivasTeam2) * 0.4 - (FaltasTeam2) * 0.15;

            if (pesoTeam1 > pesoTeam2)
                Ganador = 1;

            else if (pesoTeam1 == pesoTeam2)
                Ganador = r.Next(1, 2);
            else
                Ganador = 2;

            
        }

        public MLModel(int OfTeam1, int OfTeam2, int DefTeam1, int DefTeam2, int FTeam1, int Fteam2, int Winner)
        {
            //Constructor Validacion
            //Constructor for validation set.
            JugadasOfensivasTeam1 = OfTeam1;
            JugadasOfensivasTeam2 = OfTeam2;
            JugadasDefensivasTeam1 = DefTeam1;
            JugadasDefensivasTeam2 = DefTeam2;
            FaltasTeam1 = FTeam1;
            FaltasTeam2 = Fteam2;
            Ganador = Winner;
        }

        public MLModel(int OfTeam1, int OfTeam2, int DefTeam1, int DefTeam2, int FTeam1, int Fteam2)
        {
            //Constructor for test cases, without the winner.
            JugadasOfensivasTeam1 = OfTeam1;
            JugadasOfensivasTeam2 = OfTeam2;
            JugadasDefensivasTeam1 = DefTeam1;
            JugadasDefensivasTeam2 = DefTeam2;
            FaltasTeam1 = FTeam1;
            FaltasTeam2 = Fteam2;

        }

        public int JugadasOfensivasTeam1;
        public int JugadasOfensivasTeam2;
        public int JugadasDefensivasTeam1;
        public int JugadasDefensivasTeam2;
        public int FaltasTeam1;
        public int FaltasTeam2;
        public int Ganador;
    }
}
