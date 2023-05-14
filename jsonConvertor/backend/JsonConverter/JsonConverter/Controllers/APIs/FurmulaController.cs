using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using JsonConverter.Models;
using System.Linq;

namespace JsonConverter.Controllers.APIs
{
    [Route("api/[controller]")]
    [ApiController]
    public class FurmulaController : ControllerBase
    {
        private readonly IConfiguration _config;

        public FurmulaController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("GetAllRowDescription")]
        public async Task<ActionResult<List<string>>> GetAllRowDescription()
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var Furmula = await connection.QueryAsync<string>("select RowDescription from dbo.Furmula ");
                return Ok(Furmula.Distinct());

            }
            catch (Exception e)
            {

                throw;
            }

        }

        [HttpGet("GetAllFormula")]
        public async Task<ActionResult<List<Furmula>>> GetAllFormula()
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var Furmula = await connection.QueryAsync<Furmula>("select * from dbo.Furmula ");
                return Ok(Furmula.Distinct());

            }
            catch (Exception e)
            {

                throw;
            }

        }
        [HttpGet("GetFormula/{FormulaId}")]
        public async Task<ActionResult<Furmula>> GetFormula(int FormulaId)
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var sql = @"SELECT
                   [VoucherTypeId]
                  ,[OrderIndex]
                  ,[SourceVoucherTypeId]
                  ,[DebitCreditStatus]
                  ,[AccountHeadId]
                  ,[RowDescription]
                  ,[Formula]
                  ,[Conditions]
                  ,[GroupBy]
                  ,[OwnerRoleId]
                  ,[CreatedById]
                  ,[CreatedAt]
                  ,[ModifiedById]
                  ,[ModifiedAt]
                  ,[IsDeleted]
                 FROM [EefaDev].[dbo].[Furmula]
                 where Id=@Id ";
                var Furmula = await connection.QueryFirstAsync<Furmula>(sql, new { Id = FormulaId });
                if (Furmula == null)
                {
                    // Return an appropriate error response to the user
                    return NotFound();
                }
                return Ok(Furmula);
            }
            catch (SqlException ex)
            {

                return StatusCode(500, $"An error occurred while retrieving the formula: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the formula: {ex.Message}");
            }
        }


        [HttpPost("AddFormula")]
        public async Task<IActionResult> AddFormula(Furmula model)
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var sql = @"insert into dbo.Furmula(VoucherTypeId,OrderIndex,SourceVoucherTypeId,DebitCreditStatus,AccountHeadId,RowDescription,Formula,Conditions,GroupBy,OwnerRoleId,CreatedById,CreatedAt,ModifiedById,ModifiedAt,IsDeleted) values(@VoucherTypeId,@OrderIndex,@SourceVoucherTypeId,@DebitCreditStatus,@AccountHeadId,@RowDescription,@Formula,@Conditions,@GroupBy,@OwnerRoleId,@CreatedById,@CreatedAt,@ModifiedById,@ModifiedAt,@IsDeleted)";
                var rowsAffected = await connection.ExecuteAsync(sql, model);

                if (rowsAffected == 1)
                {
                    return Ok(true);
                }
                else
                {
                    return BadRequest("Could not add formula.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the formula: {ex.Message}");
            }
        }


        [HttpDelete("DeleteFormula")]
        public async Task<bool> DeleteFormula([FromQuery] int FormulaId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
            var rowsAffected = await connection.ExecuteAsync("Delete from dbo.Furmula  where Id=@Id", new { Id = FormulaId });

            return rowsAffected == 1;
        }

        [HttpPut("UpdateFormula")]
        public async Task<IActionResult> UpdateFormula([FromBody] Furmula model)
        {
            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefualtConnection"));
                var sql = @"UPDATE dbo.Furmula SET 
            VoucherTypeId = @VoucherTypeId, 
            OrderIndex = @OrderIndex, 
            SourceVoucherTypeId = @SourceVoucherTypeId,
            DebitCreditStatus = @DebitCreditStatus,
            AccountHeadId = @AccountHeadId,
            RowDescription = @RowDescription,
            Formula = @Formula,
            Conditions = @Conditions,
            GroupBy = @GroupBy,
            OwnerRoleId = @OwnerRoleId,
            CreatedById = @CreatedById,
            CreatedAt = @CreatedAt,
            ModifiedById = @ModifiedById,
            ModifiedAt = @ModifiedAt,
            IsDeleted = @IsDeleted 
            WHERE Id = @Id";

                var rowsAffected = await connection.ExecuteAsync(sql, model);

                if (rowsAffected == 1)
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Log the exception or return a custom error message
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the formula.");
            }
        }



    }
}
