using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Services;
using MyBackend.Endpoints;
using MyBackend.Endpoints.Auth;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------
// Configurar DbContext
// -------------------------------
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// -------------------------------
// Registrar servicios
// -------------------------------
builder.Services.AddScoped<AuthService>();

// -------------------------------
// Registrar automáticamente todos los controllers
// -------------------------------
var assembly = Assembly.GetExecutingAssembly();

var controllerTypes = assembly.GetTypes()
    .Where(t => t.IsClass && !t.IsAbstract && typeof(ControllerBase).IsAssignableFrom(t));

foreach (var type in controllerTypes)
{
    builder.Services.AddScoped(type);
}

// -------------------------------
// Registrar MVC controllers
// -------------------------------
builder.Services.AddControllers();

// -------------------------------
// Configurar CORS
// -------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// -------------------------------
// Aplicar CORS antes de los endpoints
// -------------------------------
app.UseCors("AllowFrontend");

// -------------------------------
// Mapear tus endpoints
// -------------------------------
app.MapAuthEndpoints();
app.MapEndpoints();

app.Run();