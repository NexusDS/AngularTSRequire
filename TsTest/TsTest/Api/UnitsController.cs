using System.Collections.Generic;
using System.Web.Http;
using System.Web.Security;
using TsTest.Model.Data;
using TsTest.Model.Units;
using TsTest.Model.Users;

namespace TsTest.Api
{
    public class UnitsController : ApiController
    {
        private readonly IDataManager _dataManager;

        public UnitsController(IDataManager dataManager)
        {
            _dataManager = dataManager;
        }

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody] Credentials credentials)
        {
             if (credentials != null && credentials.UserName == "adm" && credentials.Password == "12Qwaszx")
            {
                FormsAuthentication.SetAuthCookie(credentials.UserName, false);
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return Ok();
        }

        [Authorize]
        [Route("units/getall")]
        public IEnumerable<Unit> GetAllUnits()
        {
            return _dataManager.GetAllUnits();
        }

        [Route("units/getdata")]
        public IEnumerable<UnitSmall> GetUpdatedData()
        {
            return _dataManager.GetUpdatedData();
        }
    }
}
