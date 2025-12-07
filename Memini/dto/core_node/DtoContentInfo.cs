using Memini.entities;

namespace Memini.dto.core_node;

public class DtoContentInfo
{
    public int ContentInfoKey { get; set; }
    public int CoreNodeKey { get; set; }
    public string? ContentInformation { get; set; }
    public string? ContentSubtext { get; set; }
    public string? Category { get; set; }
    public string? Tags { get; set; }
    public string? Genre { get; set; }
    public string? SubGenre { get; set; }
    public int? GlobalRank { get; set; }
    public int? LocalRank { get; set; }
    public float? Relevance { get; set; }
    public string? PerformerName { get; set; }
    public string? PerformerType { get; set; }
    public string? PerformerGenre { get; set; }
}

// Extension Methods
public static class ContentInfoExtensions
{
    public static DtoContentInfo ToDto(this ContentInfo contentInfo)
    {
        return new DtoContentInfo
        {
            ContentInfoKey = contentInfo.ContentInfoKey,
            CoreNodeKey = contentInfo.CoreNodeKey,
            ContentInformation = contentInfo.ContentInformation,
            ContentSubtext = contentInfo.ContentSubtext,
            Category = contentInfo.Category,
            Tags = contentInfo.Tags,
            Genre = contentInfo.Genre,
            SubGenre = contentInfo.SubGenre,
            GlobalRank = contentInfo.GlobalRank,
            LocalRank = contentInfo.LocalRank,
            Relevance = contentInfo.Relevance,
            PerformerName = contentInfo.PerformerName,
            PerformerType = contentInfo.PerformerType,
            PerformerGenre = contentInfo.PerformerGenre
        };
    }

    public static ContentInfo ToEntity(this DtoContentInfo dto)
    {
        return new ContentInfo
        {
            ContentInfoKey = dto.ContentInfoKey,
            CoreNodeKey = dto.CoreNodeKey,
            ContentInformation = dto.ContentInformation,
            ContentSubtext = dto.ContentSubtext,
            Category = dto.Category,
            Tags = dto.Tags,
            Genre = dto.Genre,
            SubGenre = dto.SubGenre,
            GlobalRank = dto.GlobalRank,
            LocalRank = dto.LocalRank,
            Relevance = dto.Relevance,
            PerformerName = dto.PerformerName,
            PerformerType = dto.PerformerType,
            PerformerGenre = dto.PerformerGenre
           
        };
    }
}
