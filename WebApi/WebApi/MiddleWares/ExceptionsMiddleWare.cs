namespace WebApi.MiddleWares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        public ExceptionMiddleware(RequestDelegate next) {
            this.next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {

                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
