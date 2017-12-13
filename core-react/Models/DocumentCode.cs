using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class DocumentCode
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A document code is required")]
        public string Code { get; set; }
        [Required(ErrorMessage = "A document code description is required")]
        public string Description { get; set; }
        public int ParentId { get; set; }
        [ForeignKey("ParentId")]
        public DocumentCode Parent { get; set; }
        //public ICollection<DocumentCode> Children { get; set; }

        public DocumentCode()
        {
            ParentId = 0;
        }
    }

    public class PackageTemplate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "A document code is required")]
        public string Name { get; set; }
    }

    public class PackageTemplateDocumentCode
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PackageTemplateId { get; set; }
        [ForeignKey("PackageTemplateId")]
        public PackageTemplate PackageTemplate { get; set; }
        public int DocumentCodeId { get; set; }
        [ForeignKey("DocumentCodeId")]
        public DocumentCode DocumentCode { get; set; }
    }
    }
