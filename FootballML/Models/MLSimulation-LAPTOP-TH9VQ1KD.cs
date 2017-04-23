using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace FootballML.Models
{
    public class MLSimulation
    {

       

        public MLSimulation(int _size)
        {
            size = _size; 
            PrepararModelo(size);
            InvokeBatchExecutionService().Wait();
            CargarValidacion();
            accuracy = CalcularAccuracy(size);
        }

       
       public List<MLModel> test;
       public List<SimulResults> result;
        public List<TestSimul> juegos;
       public double accuracy;
        public static int size;






        public enum BatchScoreStatusCode
        {
            NotStarted,
            Running,
            Failed,
            Cancelled,
            Finished
        }

        public class BatchScoreStatus
        {
            // Status code for the batch scoring job
            public BatchScoreStatusCode StatusCode { get; set; }


            // Locations for the potential multiple batch scoring output
            // Error details, if any
            public string Details { get; set; }
        }

        public class BatchExecutionRequest
        {

            public IDictionary<string, string> GlobalParameters { get; set; }

            // Locations for the potential multiple batch scoring outputs
        }

        static async Task InvokeBatchExecutionService()
        {


            const string BaseUrl = "https://ussouthcentral.services.azureml.net/workspaces/fa5d809a5a41418d863ab001fc29772d/services/28c329f9682a4927915160a4a1bdd7fc/jobs";
            const string apiKey = "8Hu6yFjjL+aKmUsSsYq4e6ANdQHsRBk92rjOY3udADYk/rkrAQgD7RrnrC4dTot28PYnQnZtyeoWN/x7y0GzBQ=="; // Replace this with the API key for the web service

            // set a time out for polling status
            const int TimeOutInMilliseconds = 120 * 1000; // Set a timeout of 2 minutes


            using (HttpClient client = new HttpClient())
            {
                var request = new BatchExecutionRequest()
                {
                    GlobalParameters = new Dictionary<string, string>() {
                     { "Database query",@"Select TOP " +size.ToString() + " OfensivasTeam1,OfensivasTeam2,DefensivasTeam1,DefensivasTeam2,FaltasTeam1,FaltasTeam2 From TestSimul Order BY FechaCreacion DESC" },
                    }
                };

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                // WARNING: The 'await' statement below can result in a deadlock if you are calling this code from the UI thread of an ASP.Net application.
                // One way to address this would be to call ConfigureAwait(false) so that the execution does not attempt to resume on the original context.
                // For instance, replace code such as:
                //      result = await DoSomeTask()
                // with the following:
                //      result = await DoSomeTask().ConfigureAwait(false)


                Console.WriteLine("Submitting the job...");

                // submit the job
                var response = await client.PostAsJsonAsync(BaseUrl + "?api-version=2.0", request).ConfigureAwait(false);
                if (!response.IsSuccessStatusCode)
                {
                    return;
                }

                string jobId = await response.Content.ReadAsAsync<string>().ConfigureAwait(false);
                Console.WriteLine(string.Format("Job ID: {0}", jobId));


                // start the job
                Console.WriteLine("Starting the job...");
                response = await client.PostAsync(BaseUrl + "/" + jobId + "/start?api-version=2.0", null).ConfigureAwait(false);
                if (!response.IsSuccessStatusCode)
                {
                    return;
                }

                string jobLocation = BaseUrl + "/" + jobId + "?api-version=2.0";
                Stopwatch watch = Stopwatch.StartNew();
                bool done = false;
                while (!done)
                {
                    Console.WriteLine("Checking the job status...");
                    response = await client.GetAsync(jobLocation).ConfigureAwait(false);
                    if (!response.IsSuccessStatusCode)
                    {
                        return;
                    }

                    BatchScoreStatus status = await response.Content.ReadAsAsync<BatchScoreStatus>().ConfigureAwait(false);
                    if (watch.ElapsedMilliseconds > TimeOutInMilliseconds)
                    {
                        done = true;
                        Console.WriteLine(string.Format("Timed out. Deleting job {0} ...", jobId));
                        await client.DeleteAsync(jobLocation).ConfigureAwait(false);
                    }
                    switch (status.StatusCode)
                    {
                        case BatchScoreStatusCode.NotStarted:
                            Console.WriteLine(string.Format("Job {0} not yet started...", jobId));
                            break;
                        case BatchScoreStatusCode.Running:
                            Console.WriteLine(string.Format("Job {0} running...", jobId));
                            break;
                        case BatchScoreStatusCode.Failed:
                            Console.WriteLine(string.Format("Job {0} failed!", jobId));
                            Console.WriteLine(string.Format("Error details: {0}", status.Details));
                            done = true;
                            break;
                        case BatchScoreStatusCode.Cancelled:
                            Console.WriteLine(string.Format("Job {0} cancelled!", jobId));
                            done = true;
                            break;
                        case BatchScoreStatusCode.Finished:
                            done = true;
                            Console.WriteLine(string.Format("Job {0} finished!", jobId));

                            Console.WriteLine("Response: ");
                            Console.WriteLine(await response.Content.ReadAsStringAsync().ConfigureAwait(false));
                            break;
                    }

                    if (!done)
                    {
                        Thread.Sleep(1000); // Wait one second
                    }
                }
            }
        }
        public void PrepararModelo(int size)

        {
            test = new List<MLModel>();
            juegos = new List<TestSimul>();
            for(int i = 0; i < size; i++)
            {
                var juego = new MLModel();
                var t = new TestSimul();
                test.Add(juego);

                t.OfensivasTeam1 = juego.JugadasOfensivasTeam1;
                t.OfensivasTeam2 = juego.JugadasOfensivasTeam2;
                t.DefensivasTeam1 = juego.JugadasDefensivasTeam1;
                t.DefensivasTeam2 = juego.JugadasDefensivasTeam2;
                t.FaltasTeam1 = juego.FaltasTeam1;
                t.FaltasTeam2= juego.FaltasTeam2;
                t.Ganador = -1;
                t.FechaCreacion = DateTime.Now;
                juegos.Add(t);
            }

            using (var context = new FootballML.Models.SoccerEntities())
            {
                foreach(var t in juegos)
                {
                    context.TestSimul.Add(t);
                }
                context.SaveChanges();
            }
        }

        public void CargarValidacion()
        {
            using (var context = new SoccerEntities())
            {
                var query = (from t in context.SimulResults
                            orderby t.FechaCreacion descending
                            select t).Take(size).ToList();

                result = query;
            }

        }

        public double CalcularAccuracy(int size)
        {
            double sum = 0.0;

            for(int i =0; i<size;i++)
            {
                if (test[i].Ganador == (int)result[i].Ganador)
                    sum++;

            }


            return sum/size;
        }
    }

 
    
}