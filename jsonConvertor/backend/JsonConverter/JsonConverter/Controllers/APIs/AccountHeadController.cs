using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using JsonConverter.Models;

namespace JsonConverter.Controllers.APIs
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountHeadController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AccountHeadController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("GetAllAccountHeads")]
        public async Task<ActionResult<List<AccountHead>>> GetAllAccountHeads()
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var AccountHead = await connection.QueryAsync<AccountHead>("select Id,Code,Title from accounting.AccountHead ");
                return Ok(AccountHead);

            }
            catch (Exception e)
            {

                throw;
            }

        }
        [HttpGet("{AccountHeadId}")]
        public async Task<ActionResult<AccountHead>> GetAccountHead(int AccountHeadId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            var AccountHead = await connection.QueryFirstAsync<AccountHead>("select Id,Code,Title from accounting.AccountHead where id=@Id ", new { Id = AccountHeadId });
            return Ok(AccountHead);
        }

        [HttpPost]
        public async Task<ActionResult<List<AccountHead>>> CreateAccountHead(AccountHead codeVoucherGroup)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("insert into accounting.AccountHead(name,firstname) values(@Name,@FirstName)", codeVoucherGroup);

            return Ok(await connection.QueryAsync<AccountHead>("select Id,Code,Title from accounting.AccountHead "));
        }

        [HttpPut]
        public async Task<ActionResult<List<AccountHead>>> UpdateAccountHead(AccountHead codeVoucherGroup)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("Update accounting.AccountHead set name=@Name,firstname=@FirstName where id=@Id", codeVoucherGroup);

            return Ok(await connection.QueryAsync<AccountHead>("select Code,Title from accounting.AccountHead "));
        }

        [HttpDelete("{AccountHeadId}")]
        public async Task<ActionResult<List<AccountHead>>> DeleteAccountHead(int AccountHeadId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("Delete from accounting.AccountHead  where id=@Id", new { Id = AccountHeadId });

            return Ok(await connection.QueryAsync<AccountHead>("select Code,Title from accounting.AccountHead "));
        }

    }
}
