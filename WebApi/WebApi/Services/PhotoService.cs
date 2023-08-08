using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using WebApi.Interfaces;

namespace WebApi.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;

        public PhotoService(IConfiguration config)
        {
            var name = config.GetSection("CloudinarySettings:CloudName").Value;
            var apiKey = Environment.GetEnvironmentVariable("REMA_CloudinarySettings_ApiKey");
            var apiSecret = Environment.GetEnvironmentVariable("REMA_CloudinarySettings_ApiSecret");

            Account account = new Account(name,apiKey,apiSecret);

            cloudinary = new Cloudinary(account);
        }
        public Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            throw new NotImplementedException();
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();
            if (photo.Length > 0)
            {
                using var stream = photo.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(photo.FileName, stream),
                    Transformation = new Transformation()
                        .Height(500).Width(800)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
    }
}
