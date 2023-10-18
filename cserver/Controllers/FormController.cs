using Microsoft.AspNetCore.Mvc;
using Npgsql;
namespace cserver.Controllers;

[ApiController]
[Route("forms")]
public class FormController : ControllerBase
{

    private readonly string? _connectionString;

    public FormController(IConfiguration configuration){
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet("{id}", Name = "GetFormById")]
    public ActionResult<Form> GetById(int id)
    {
        try
        {
            using NpgsqlConnection connection = new(_connectionString);
            connection.Open();

            using NpgsqlCommand selectCommand = new("SELECT * FROM form_metadata fm JOIN form_responses fr ON fm.form_response_id=fr.id WHERE fm.id = @Id", connection);
            selectCommand.Parameters.AddWithValue("@Id", id);

            using NpgsqlDataReader reader = selectCommand.ExecuteReader();

            if (reader.Read())
            {
                Form form = new()
                {
                    Consultant_id = reader.GetInt32(1),
                    Customer_id = reader.GetInt32(2),
                    Sales_id = reader.GetInt32(3),
                    Date = reader.GetDateTime(4).ToString("yyyy-MM-dd"), 
                    Form_response_id = reader.GetInt32(5),
                    Updated_at = reader.GetDateTime(6).ToString("yyyy-MM-dd"), 
                    Created_at = reader.GetDateTime(7).ToString("yyyy-MM-dd") 

                };

                return Ok(form); 
            }
            else
            {
                return NotFound(); 
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error" + ex);
        }
    }


}