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
        public string Required { get; set; }
        public string Unit { get; set; }    // Weeks / Days
        public int Quantity { get; set; }
        public DateTime? DateRequired { get; set; }
        public string Comments { get; set; }
        public virtual string DateRequiredText
        {
            get
            {
                string retval = DateRequired.ToString();
                //if (retval == "1/01/0001 12:00:00 AM")
                if (string.IsNullOrEmpty(retval))
                { 
                    if (Required == "Manual")
                    {
                        retval = "Not set";
                    }
                    else
                    {
                        // i.e. 7 Days After Award
                        retval = Quantity.ToString() + " " + Unit + " " + Required;
                        // Calculate automatically if possible
                        if (Required == "After Award" && Order != null)
                        {
                            if (Order.AwardDate != null) 
                            {
                                DateTime required = Order.AwardDate;
                                if (Unit == "Days") required = required.AddDays(Quantity);
                                else if (Unit == "Weeks") required = required.AddDays(Quantity * 7);
                                retval = required.ToString();
                            }
                        }
                    }
                }
                return retval;
            }
        }

        public OrderDataRequirement()
        {
            // The Required value determines how the DateRequired is calculated
            // "Manual" : manually set
            // "After Award" : calculated by the (Unit) * (Quantity) after the Package award date
            Required = "Manual";
            Unit = "Days";
            DateRequired = null;
        }
    }

}
