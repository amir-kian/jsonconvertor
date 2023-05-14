using Dapper;
using CodeVoucherGroups.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using JsonConverter.Models;
using System;

namespace JsonConverter.Controllers.APIs
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeVoucherGroupsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public CodeVoucherGroupsController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public async Task<ActionResult<List<CodeVoucherGroup>>> GetAllCodeVoucherGroup()
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var CodeVoucherGroups = await connection.QueryAsync<CodeVoucherGroup>("select Id,Code,Title from accounting.CodeVoucherGroups ");
                return Ok(CodeVoucherGroups);

            }
            catch (Exception e)
            {

                throw;
            }

        }
        [HttpGet("{CodeVoucherGroupId}")]
        public async Task<ActionResult<CodeVoucherGroup>> GetAllCodeVoucherGroup(int CodeVoucherGroupId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            var CodeVoucherGroup = await connection.QueryFirstAsync<CodeVoucherGroup>("select Id,Code,Title from accounting.CodeVoucherGroups where id=@Id ", new { Id = CodeVoucherGroupId });
            return Ok(CodeVoucherGroup);
        }

        [HttpPost]
        public async Task<ActionResult<List<CodeVoucherGroup>>> CreateCodeVoucherGroup(CodeVoucherGroup codeVoucherGroup)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("insert into accounting.CodeVoucherGroups(name,firstname) values(@Name,@FirstName)", codeVoucherGroup);

            return Ok(await connection.QueryAsync<CodeVoucherGroup>("select Id,Code,Title from accounting.CodeVoucherGroups "));
        }

        [HttpPut]
        public async Task<ActionResult<List<CodeVoucherGroup>>> UpdateCodeVoucherGroup(CodeVoucherGroup codeVoucherGroup)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("Update accounting.CodeVoucherGroups set name=@Name,firstname=@FirstName where id=@Id", codeVoucherGroup);

            return Ok(await connection.QueryAsync<CodeVoucherGroup>("select Id,Code,Title from accounting.CodeVoucherGroups "));
        }

        [HttpDelete("{CodeVoucherGroupId}")]
        public async Task<ActionResult<List<CodeVoucherGroup>>> DeleteCodeVoucherGroup(int CodeVoucherGroupId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            await connection.ExecuteAsync("Delete from accounting.CodeVoucherGroups  where id=@Id", new { Id = CodeVoucherGroupId });

            return Ok(await connection.QueryAsync<CodeVoucherGroup>("select Code,Title from accounting.CodeVoucherGroups "));
        }

    }
}
