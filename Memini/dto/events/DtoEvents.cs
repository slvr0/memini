namespace Memini.dto.events;

public class DtoEvents
{

}

public class DtoCategoricalEnum<T>
{
    public int EnumValue { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class DtoCategoricalEnumResponse<T> 
{
    public List<DtoCategoricalEnum<T>> categoricalEnums = new List<DtoCategoricalEnum<T>>();
}
