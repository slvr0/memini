
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Memini.dto;
public class DtoResponse<T>
{
    [JsonPropertyName("response")]
    public string Response { get; set; } = string.Empty;

    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("responseObject")]
    public T? ResponseObject { get; set; }

    public static DtoResponse<T> Ok(T obj, string message = "")
    {
        return new DtoResponse<T>
        {
            Success = true,
            ResponseObject = obj,
            Response = message
        };
    }

    public static DtoResponse<T> Fail(string message)
    {
        return new DtoResponse<T>
        {
            Success = false,
            ResponseObject = default,
            Response = message
        };
    }
}

public static class DtoResponseExtensions
{
    public static IActionResult ToOkResult<T>(this DtoResponse<T> response)
    {
        return new OkObjectResult(response);
    }

    public static IActionResult ToBadRequestResult<T>(this DtoResponse<T> response)
    {
        return new BadRequestObjectResult(response);
    }

    public static IActionResult ToNotFoundResult<T>(this DtoResponse<T> response)
    {
        return new NotFoundObjectResult(response);
    }
}
