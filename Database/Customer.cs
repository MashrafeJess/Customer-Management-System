using System.ComponentModel.DataAnnotations;
namespace Database
{
    public class Customer
    {
        [Key]
        [StringLength(128)]
        public string CustomerId { get; set; } = Guid.NewGuid().ToString();
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [DataType(DataType.Date)]
        public DateOnly? DateofBirth { get; set; }
        [StringLength(200)]
        public string ?Address { get; set; }
    }
}
