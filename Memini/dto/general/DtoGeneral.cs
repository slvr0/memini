namespace Memini.dto.general;

public class DtoCategoricalEnum<T>
{
    public int EnumValue { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class DtoCategoricalEnumResponse<T>
{
    public List<DtoCategoricalEnum<T>> categoricalEnums = new List<DtoCategoricalEnum<T>>();
}

public class DtoPaginationState
{
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalItems { get; set; }
}

public class DtoPaginatedResponse<T>
{
    public T Data { get; set; }
    public int TotalItems { get; set; }
    public int TotalPages { get; set; }
}
