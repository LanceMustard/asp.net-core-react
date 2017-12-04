using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class Supplier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A supplier name is required")]
        public string Name { get; set; }
        public ICollection<Order> Orders { get; set; }

        //public Supplier()
        //{
        //    Orders = new List<Order>(); 
        //}
    }
}
