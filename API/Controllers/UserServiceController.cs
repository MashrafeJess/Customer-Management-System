using Microsoft.AspNetCore.Mvc;
using Business;
using Database;
namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserServiceController : ControllerBase
    {
        [HttpPost]
        public Result Registration(Customer customer)
        {
            Result result = new UserService().Register(customer);
            return result;
        }
        [HttpPost]
        public Result Login(LoginForm form)
        {
            Result result = new UserService().Login(form);
            return result;
        }
        [HttpGet]
        public Result GetAllUsers()
        {
            Result result = new UserService().GetAllUsers();
            return result;
        }
        [HttpGet]
        public Result GetUserById(string userId)
        {
            Result result = new UserService().GetUserById(userId);
            return result;
        }
    }


}
