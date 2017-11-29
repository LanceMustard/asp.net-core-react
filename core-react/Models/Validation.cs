using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.React.Models
{
    public class CheckInAttribute : ValidationAttribute
    {
        private readonly string[] _words;
        public CheckInAttribute(string[] words)
            : base("{0} contains invalid character.")
        {
            _words = words;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string validValues = null;
            foreach (string word in _words)
            {
                if (value.ToString() == word)
                {
                    return ValidationResult.Success;
                }
                validValues = validValues == null ? value.ToString() : ", " + value.ToString();
            }

            return new ValidationResult("Value must be any of [" + validValues + "]");
        }
    }
}
