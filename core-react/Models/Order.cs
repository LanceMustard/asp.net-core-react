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
        public string Number { get; set; }
        [Required(ErrorMessage = "An order number is required")]
        public DateTime AwardDate { get; set; }
        public string RequisitionNumber { get; set; }
        public string ResponsibleEngineer { get; set; }
        public string Description { get; set; }
        public int SupplierId { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public virtual ICollection<OrderDataRequirement> OrderDataRequirement { get; set; }
    }

    public class OrderDataRequirement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int DocumentCodeId { get; set; }
        [ForeignKey("DocumentCodeId")]
        public DocumentCode DocumentCode { get; set; }
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }

    }

}
