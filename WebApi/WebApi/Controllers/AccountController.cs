﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration config;

        public AccountController(IUnitOfWork uow, IConfiguration config)
        {
            this.uow = uow;
            this.config = config;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginReqDto loginReqDto)
        {
            var user = await uow.UserRepository.Authenticate(loginReqDto.UserName, loginReqDto.Password);
            if (user == null)
            {
                return Unauthorized("Invalid User ID or Password");
            }

            return Ok(new LoginResDto()
            {
                UserName = user.UserName,
                Token = CreateJWT(user)

            });

        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(LoginReqDto loginReqDto)
        {
            if(await uow.UserRepository.UserAlreadyexists(loginReqDto.UserName))
                return BadRequest("User Already Exists");
            uow.UserRepository.Register(loginReqDto);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var secretKey = Environment.GetEnvironmentVariable("ASPNETCORE_AppSettings__Key");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),

            };
            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signinCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
