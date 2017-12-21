using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class Library
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A reference library name is required")]
        public string Name { get; set; }
        public virtual ICollection<DocumentCode> DocumentCodes { get; set; }
        public virtual ICollection<PackageTemplate> PackageTemplates { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }

    public class DocumentCode
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A document code is required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "A document code description is required")]
        public string Description { get; set; }
        public int? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public virtual DocumentCode Parent { get; set; }
        public virtual ICollection<DocumentCode> Children { get; set; }
        public int LibraryId { get; set; }
        [ForeignKey("LibraryId")]
        public virtual Library Library { get; set; }
        public virtual ICollection<PackageTemplateItem> PackageTemplateItems { get; set; }
        public virtual ICollection<OrderDataRequirement> OrderDataRequirement { get; set; }
    }

    public class PackageTemplate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A document code is required")]
        public string Name { get; set; }
        public int LibraryId { get; set; }
        [ForeignKey("LibraryId")]
        public virtual Library Library { get; set; }
        public virtual ICollection<PackageTemplateItem> PackageTemplateItems { get; set; }
    }

    public class PackageTemplateItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PackageTemplateId { get; set; }
        [ForeignKey("PackageTemplateId")]
        public virtual PackageTemplate PackageTemplate { get; set; }

        public int DocumentCodeId { get; set; }
        [ForeignKey("DocumentCodeId")]
        public virtual DocumentCode DocumentCode { get; set; }
    }

}
