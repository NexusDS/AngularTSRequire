using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using System;
using System.Web;
using System.Web.Http;
using TsTest.App_Start;
using TsTest.Model.Data;

namespace TsTest
{
    public class Global : HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            // Web Api configuration
            GlobalConfiguration.Configure(WebApiConfig.Registrer);

            // Simple injector configuration
            var container = new Container();
            container.Register<IDataManager, StaticDataManager>(Lifestyle.Singleton);
            container.Verify();
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}