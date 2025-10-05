namespace Memini.dto;
using entities;
public class DtoStoredUserTask
{
    public int Storedusertaskkey { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? Duration { get; set; } 

    public string? Created { get; set; } = string.Empty!;
}


public class DtoStoredUserTaskResponse
{
    public List<DtoStoredUserTask> Favorites = new List<DtoStoredUserTask>();
    public List<DtoStoredUserTask> Recent = new List<DtoStoredUserTask>();
}

public static class StoredUserTaskExtensions
{
    public static DtoStoredUserTask ToDto(this StoredUserTask userTask)
    {
        return new DtoStoredUserTask
        {
            Storedusertaskkey = userTask.Storedusertaskkey,
            Title = userTask.Title,
            Description = userTask.Description,
            Duration = userTask.Duration,
            Created = userTask.Created?.ToString("o") // ISO 8601: "2025-03-05T14:30:45.000Z"
        };
    }
}

