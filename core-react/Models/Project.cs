using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A project name is required")]
        public string Name { get; set; }
        public ICollection<Order> Orders { get; set; }

        //public Project()
        //{
        //    Orders = new List<Order>();
        //}
    }
}
