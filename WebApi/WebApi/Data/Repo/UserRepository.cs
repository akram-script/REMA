﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string username, string Passwordtext)
        {
            var user =  await dc.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null || user.PasswordKey == null) 
                return null;

            if (!MatchPasswordhash(Passwordtext, user.Password, user.PasswordKey))
                return null;

            return user;
        }

        private bool MatchPasswordhash(string passwordtext, byte[] password, byte[] passwordKey)
        {
            using var hmac = new HMACSHA512(passwordKey);
            var Passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordtext));
            return Passwordhash.SequenceEqual(password);
        }

        public void Register(LoginReqDto loginReqDto)
        {
            byte[] Passwordhash, PasswordKey; 
            using (var hmac = new  HMACSHA512())
            {
                PasswordKey = hmac.Key;
                Passwordhash = hmac.ComputeHash(System  .Text.Encoding.UTF8.GetBytes(loginReqDto.Password));
            }
            var user = new User()
            {
                Username = loginReqDto.UserName,
                Password = Passwordhash,
                PasswordKey = PasswordKey,
                Email = loginReqDto.Email,
                Mobile = loginReqDto.Mobile,
            };
            dc.Users.Add(user);
        }

        public async Task<bool> UserAlreadyexists(string username)
        {
           return await dc.Users.AnyAsync(x => x.Username == username);
        }
    }
}
