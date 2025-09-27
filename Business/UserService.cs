using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database;
using Database.Context;
using Microsoft.AspNetCore.Identity;
namespace Business
{
    public class UserService
    {
        CustomerContext context = new CustomerContext();
        public Result Register(Customer customer)
        {
            bool emailExists = context.Customer.Any(c => c.Email == customer.Email);
            if (emailExists)
            {
                return new Result(false, "Email already exists");
            }
            customer.Password = new PasswordHasher<object>().HashPassword(customer, customer.Password);
            context.Customer.Add(customer);
            return new Result().DBcommit(context, "User Registered Successfully", null, customer);
        }
        public Result Login(LoginForm form)
        {
            var user = context.Customer.FirstOrDefault(c => c.Email == form.Email);
            if (user == null)
            {
                return new Result(true, "Customer Not Found", user);
            }
            var verificationResult = new PasswordHasher<object>().VerifyHashedPassword(user, user.Password, form.Password);
            if (verificationResult == PasswordVerificationResult.Success)
            {
                return new Result(true, "Login Successful", user);
            }
            return new Result(false, "Invalid email or password");
        }
        public Result GetAllUsers()
        {
            var users = context.Customer.ToList();
            return new Result(true, "Users Retrieved Successfully", users);
        }
        public Result GetUserById(string userId)
        {
            var user = context.Customer.Find(userId);
            if (user != null)
            {
                return new Result(true, "User Retrieved Successfully", user);
            }
            return new Result(false, "User Not Found");
        }
        public Result UpdateUser(Customer updatedCustomer)
        {
            var user = context.Customer.Find(updatedCustomer.CustomerId);
            if (user == null)
                return new Result(false, "User Not Found");

            // Update only if new value is provided
            if (!string.IsNullOrEmpty(updatedCustomer.Name))
                user.Name = updatedCustomer.Name;

            if (!string.IsNullOrEmpty(updatedCustomer.Email))
                user.Email = updatedCustomer.Email;

            if (!string.IsNullOrEmpty(updatedCustomer.Password))
                user.Password = new PasswordHasher<object>().HashPassword(user, updatedCustomer.Password);

            if (updatedCustomer.DateofBirth != null)
                user.DateofBirth = updatedCustomer.DateofBirth;

            if (!string.IsNullOrEmpty(updatedCustomer.Address))
                user.Address = updatedCustomer.Address;

            try
            {
                return new Result().DBcommit(context, "Successfully updated", null, user);
            }
            catch (Exception ex)
            {
                return new Result(false, "Update failed: " + ex.Message, null);
            }
        }


        public Result DeleteUser(string userId)
        {

            var user = context.Customer.Find(userId);
            if (user == null)
                return new Result(false, "User Not Found");

            context.Remove(user);

            try
            {
                context.SaveChanges(); // or DBcommit without returning the deleted entity
                return new Result(true, "User Deleted Successfully", null);
            }
            catch (Exception ex)
            {
                return new Result(false, ex.Message, null);
            }
        }

    }
}
