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
        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$",
        ErrorMessage = "Password must be at least 8 characters long and" +
            " contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }
        [DataType(DataType.Date)]
        public DateOnly? DateofBirth { get; set; }
        [StringLength(200)]
        public string ?Address { get; set; }
    }
}
