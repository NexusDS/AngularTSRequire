using System.Web.Http;

namespace TsTest.App_Start
{
    public class WebApiConfig
    {
        public static void Registrer(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
        }
    }
}