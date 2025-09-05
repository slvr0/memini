
using Memini.entities;

namespace Memini.dto;

public class DtoUserTask
{
    public int UserTaskKey { get; set; }

    public int Year { get; set; }

    public int Month { get; set; }

    public int Day { get; set; }

    public int StartTime { get; set; }

    public int EndTime { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }
}

public class DtoUserTaskDateRequest
{
    public int Year { get; set; }

    public int Month { get; set; }

    public int Day { get; set; }
}


public class DtoTaskListResponse
{
    public List<DtoUserTask> Tasks { get; set; } = new List<DtoUserTask>();
}

public static class UserTaskExtensions
{
    public static DtoUserTask ToDto(this UserTask userTask)
    {
        return new DtoUserTask
        {
            UserTaskKey = userTask.Usertaskkey,
            Year = userTask.Year,
            Month = userTask.Month,
            Day = userTask.Day,
            Title = userTask.Title,
            Description = userTask.Description,
            StartTime = userTask.Starttime,
            EndTime = userTask.Endtime
        };
    }
}
