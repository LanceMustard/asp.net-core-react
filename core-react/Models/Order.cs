using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "An order description is required")]
        public string Description { get; set; }
        public int SupplierId { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
