﻿using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace WebApi.Extentions
{
    public static class ExeptionMiddleWearExctentions
    {
        public static void ConfigureExceptionHandler(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler(
                options =>
                {
                    options.Run(
         async
         context =>
                   {
                       context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                       var ex = context.Features.Get<IExceptionHandlerFeature>();
                       if (ex != null)
                           await context.Response.WriteAsync(ex.Error.Message);
                   });
                });
            }
        }

    }
}
