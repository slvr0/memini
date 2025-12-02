using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json.Serialization;
using Memini.Controllers;
using Memini.services;
using Memini.entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MeminiEventAPI.services;

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["JwtSettings:SecretKey"];
var keyBytes = Encoding.ASCII.GetBytes(jwtKey ?? "");

// Add authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});

/* Adds connection pool for event apis */
builder.Services.AddEventApiClients(builder.Configuration);


builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddScoped<AuthorisationService>();
builder.Services.AddControllers();

builder.Services.AddDbContext<MeminiDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://localhost:5001")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    // Add Swagger for development
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}
else
{
    // Production - More restrictive CORS
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(
                    "https://memini-launch-hmawcxg8cwa7f8c2.swedencentral-01.azurewebsites.net"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });
}

    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
    
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Development mode");
    app.UseDeveloperExceptionPage();
    app.UseSwagger();

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Memini API V1");
        c.RoutePrefix = string.Empty; // This makes Swagger UI available at root "/"
    });
}
else
{
    Console.WriteLine("Not Development mode");
    app.UseStaticFiles();
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}


app.UseDefaultFiles(); 
app.UseStaticFiles();  
app.UseCors();
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html"); // Keep this last
}

app.Run();
