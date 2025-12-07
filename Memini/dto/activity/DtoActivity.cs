namespace Memini.dto.activity;

using Memini.dto.core_node;

public class DtoActivityNode : DtoCoreNode
{
    public int StartTime { get; set; }  
    public int EndTime { get; set; }

}

public class DtoActivityRequest
{
}

public class DtoActivityResponse
{
   
}

public class DtoDateRequest
{
    public string Date { get; set; }
}

public class DtoDateRangeRequest
{
    public string StartDate { get; set; }
    public string EndDate { get; set; }
}