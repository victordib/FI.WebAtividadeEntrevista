using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public long Id { get; set; }
        private string _CPF;

        /// <summary>
        /// CPF
        /// </summary>
        [Required(ErrorMessage = "O Campo CPF obrigatório")]
        public string CPF
        {
            get { return _CPF; }
            set { _CPF = Regex.Replace(value, @"[^0-9]", ""); }
        }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }
    }
}