using MeminiEventAPI.api_datamodels;
using Memini.mapping.events;
using Memini.validators;
using Memini.entities;
using Memini.structures.events;
using Memini.services;

using MeminiEventAPI.api_datamodels.ticketmaster;
using Microsoft.EntityFrameworkCore;

namespace Memini.managers;

public class EventManager
{
    public CoreNode CreateCoreNodeFromEvent(NormalizedEvent normalizedEvent, string source)
    {
        var coreNode                = normalizedEvent.ConvertToCoreNode();
        var spatialInfo             = normalizedEvent.ConvertToSpatialInfo();
        var contentInfo             = normalizedEvent.ConvertToContentInfo();   
        var commercialStatusInfo    = normalizedEvent.ConvertToCommercialStatusInfo();

        coreNode.SpatialInfo = spatialInfo;
        coreNode.ContentInfo = contentInfo;
        coreNode.CommercialStatusInfo = commercialStatusInfo;

        coreNode.Source = source;
        return coreNode;
    }

    public async Task DeleteOldCoreNodes(int olderThanMonths, MeminiDbContext context)
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.AddMonths(-olderThanMonths);

            var results = await context.CoreNodes
                .Where(cn => cn.StartDate < cutoffDate)
                .ToListAsync();

            context.CoreNodes.RemoveRange(results);
            await context.SaveChangesAsync();

            Console.WriteLine($"Deleted {results.Count} old core nodes");
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task StoreUniqueEvents(List<NormalizedEvent> events, string source, MeminiDbContext context)
    {
        try
        {           
            var coreNodes = events
                .Select(normalizedEvent => CreateCoreNodeFromEvent(normalizedEvent, source))
                .ToList();

            var uniqueCoreNodes = await context.CoreNodes.GetItemsToInsertMultiField(coreNodes,
                e => e.Label ?? string.Empty,
                e => e.StartDate,
                similarityThreshold: 90,
                dateDifferenceThresholdDays: 1
                );

            // Add all at once - EF Core will handle FK relationships
            await context.CoreNodes.AddRangeAsync(uniqueCoreNodes);

            // Save changes - this will set all the foreign keys automatically
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {         
            Console.Write(e.Message);
            
        }
    }
}
