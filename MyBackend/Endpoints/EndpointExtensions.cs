// Endpoints/EndpointExtensions.cs
using System.Reflection;

namespace MyBackend.Endpoints
{
    public static class EndpointExtensions
    {
        public static void MapEndpoints(this WebApplication app)
        {
            var endpointTypes = Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(t => typeof(IEndpoint).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

            foreach (var type in endpointTypes)
            {
                var endpoint = (IEndpoint)Activator.CreateInstance(type)!;
                endpoint.MapEndpoints(app);
            }
        }
    }
}