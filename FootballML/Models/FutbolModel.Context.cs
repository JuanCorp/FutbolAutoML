﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FootballML.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FootbolDBEntities : DbContext
    {
        public FootbolDBEntities()
            : base("name=FootbolDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Equipos> Equipos { get; set; }
        public virtual DbSet<Juegos> Juegos { get; set; }
        public virtual DbSet<SimulResults> SimulResults { get; set; }
        public virtual DbSet<TestSimul> TestSimul { get; set; }
        public virtual DbSet<Jugadas> Jugadas { get; set; }
    }
}
