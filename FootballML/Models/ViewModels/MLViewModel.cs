using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballML.Models
{
    public class MLViewModel
    {

        public MLViewModel(List<MLModel> _test , List<SimulResults> _validate, double accuracy, int _size)
        {
            test = _test;
            validate = _validate;
            Accuracy = accuracy;
            size = _size;
        }

       public List<MLModel> test;
       public List<SimulResults> validate;
        public double Accuracy;
        public int size;
    }
}