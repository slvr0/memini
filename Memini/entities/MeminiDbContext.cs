using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Memini.entities;

public partial class MeminiDbContext : DbContext
{
    public MeminiDbContext()
    {
    }

    public MeminiDbContext(DbContextOptions<MeminiDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CommercialStatusInfo> CommercialStatusInfos { get; set; }

    public virtual DbSet<ContentInfo> ContentInfos { get; set; }

    public virtual DbSet<ContentMedium> ContentMedia { get; set; }

    public virtual DbSet<CoreNode> CoreNodes { get; set; }

    public virtual DbSet<NewsInfo> NewsInfos { get; set; }

    public virtual DbSet<PoiInfo> PoiInfos { get; set; }

    public virtual DbSet<SpatialInfo> SpatialInfos { get; set; }

    public virtual DbSet<StoredUserTask> StoredUserTasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserTask> UserTasks { get; set; }

    public virtual DbSet<WeatherInfo> WeatherInfos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=aws-1-eu-north-1.pooler.supabase.com;Database=postgres;Username=postgres.lxshdbmxrejsumjrwxnx;Password=EhqeQs_ZNtg9c4e;Port=5432;SSL Mode=Require;Trust Server Certificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresEnum("auth", "aal_level", new[] { "aal1", "aal2", "aal3" })
            .HasPostgresEnum("auth", "code_challenge_method", new[] { "s256", "plain" })
            .HasPostgresEnum("auth", "factor_status", new[] { "unverified", "verified" })
            .HasPostgresEnum("auth", "factor_type", new[] { "totp", "webauthn", "phone" })
            .HasPostgresEnum("auth", "oauth_authorization_status", new[] { "pending", "approved", "denied", "expired" })
            .HasPostgresEnum("auth", "oauth_client_type", new[] { "public", "confidential" })
            .HasPostgresEnum("auth", "oauth_registration_type", new[] { "dynamic", "manual" })
            .HasPostgresEnum("auth", "oauth_response_type", new[] { "code" })
            .HasPostgresEnum("auth", "one_time_token_type", new[] { "confirmation_token", "reauthentication_token", "recovery_token", "email_change_token_new", "email_change_token_current", "phone_change_token" })
            .HasPostgresEnum("realtime", "action", new[] { "INSERT", "UPDATE", "DELETE", "TRUNCATE", "ERROR" })
            .HasPostgresEnum("realtime", "equality_op", new[] { "eq", "neq", "lt", "lte", "gt", "gte", "in" })
            .HasPostgresEnum("storage", "buckettype", new[] { "STANDARD", "ANALYTICS" })
            .HasPostgresExtension("extensions", "pg_stat_statements")
            .HasPostgresExtension("extensions", "pgcrypto")
            .HasPostgresExtension("extensions", "uuid-ossp")
            .HasPostgresExtension("graphql", "pg_graphql")
            .HasPostgresExtension("vault", "supabase_vault");

        modelBuilder.Entity<CommercialStatusInfo>(entity =>
        {
            entity.HasKey(e => e.CommercialStatusInfoKey).HasName("commercial_status_info_pkey");

            entity.ToTable("commercial_status_info");

            entity.HasIndex(e => e.Active, "idx_commercial_status_info_active");

            entity.HasIndex(e => e.Availability, "idx_commercial_status_info_availability");

            entity.HasIndex(e => e.Free, "idx_commercial_status_info_free");

            entity.HasIndex(e => e.Status, "idx_commercial_status_info_status");

            entity.HasIndex(e => e.Verified, "idx_commercial_status_info_verified");

            entity.HasIndex(e => e.CoreNodeKey, "uk_commercial_status_info_core_node").IsUnique();

            entity.Property(e => e.CommercialStatusInfoKey).HasColumnName("commercial_status_info_key");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Availability)
                .HasMaxLength(50)
                .HasColumnName("availability");
            entity.Property(e => e.Cancelled).HasColumnName("cancelled");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.Currency)
                .HasMaxLength(50)
                .HasColumnName("currency");
            entity.Property(e => e.Free).HasColumnName("free");
            entity.Property(e => e.MaxPrice)
                .HasMaxLength(50)
                .HasColumnName("max_price");
            entity.Property(e => e.MinPrice)
                .HasMaxLength(50)
                .HasColumnName("min_price");
            entity.Property(e => e.Postponed).HasColumnName("postponed");
            entity.Property(e => e.Rescheduled).HasColumnName("rescheduled");
            entity.Property(e => e.SoldOut).HasColumnName("sold_out");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.StatusReason)
                .HasMaxLength(200)
                .HasColumnName("status_reason");
            entity.Property(e => e.Verified).HasColumnName("verified");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithOne(p => p.CommercialStatusInfo)
                .HasForeignKey<CommercialStatusInfo>(d => d.CoreNodeKey)
                .HasConstraintName("commercial_status_info_core_node_key_fkey");
        });

        modelBuilder.Entity<ContentInfo>(entity =>
        {
            entity.HasKey(e => e.ContentInfoKey).HasName("content_info_pkey");

            entity.ToTable("content_info");

            entity.HasIndex(e => e.Category, "idx_content_info_category");

            entity.HasIndex(e => e.Genre, "idx_content_info_genre");

            entity.HasIndex(e => e.ContentInformation, "idx_content_info_information");

            entity.HasIndex(e => e.PerformerName, "idx_content_info_performer");

            entity.HasIndex(e => e.SubGenre, "idx_content_info_sub_genre");

            entity.HasIndex(e => e.ContentSubtext, "idx_content_info_subtext");

            entity.HasIndex(e => e.Tags, "idx_content_info_tags");

            entity.HasIndex(e => e.CoreNodeKey, "uk_content_info_core_node").IsUnique();

            entity.Property(e => e.ContentInfoKey).HasColumnName("content_info_key");
            entity.Property(e => e.Category)
                .HasMaxLength(100)
                .HasColumnName("category");
            entity.Property(e => e.ContentInformation)
                .HasMaxLength(5000)
                .HasColumnName("content_information");
            entity.Property(e => e.ContentSubtext)
                .HasMaxLength(1000)
                .HasColumnName("content_subtext");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.Genre)
                .HasMaxLength(100)
                .HasColumnName("genre");
            entity.Property(e => e.GlobalRank).HasColumnName("global_rank");
            entity.Property(e => e.LocalRank).HasColumnName("local_rank");
            entity.Property(e => e.PerformerGenre)
                .HasMaxLength(100)
                .HasColumnName("performer_genre");
            entity.Property(e => e.PerformerName)
                .HasMaxLength(100)
                .HasColumnName("performer_name");
            entity.Property(e => e.PerformerType)
                .HasMaxLength(100)
                .HasColumnName("performer_type");
            entity.Property(e => e.Relevance).HasColumnName("relevance");
            entity.Property(e => e.SubGenre)
                .HasMaxLength(100)
                .HasColumnName("sub_genre");
            entity.Property(e => e.Tags)
                .HasMaxLength(200)
                .HasColumnName("tags");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithOne(p => p.ContentInfo)
                .HasForeignKey<ContentInfo>(d => d.CoreNodeKey)
                .HasConstraintName("content_info_core_node_key_fkey");
        });

        modelBuilder.Entity<ContentMedium>(entity =>
        {
            entity.HasKey(e => e.ContentMediaKey).HasName("content_media_pkey");

            entity.ToTable("content_media");

            entity.HasIndex(e => new { e.ContentInfoKey, e.IsPrimary }, "idx_content_media_content_primary").HasFilter("(is_primary = true)");

            entity.HasIndex(e => new { e.ContentInfoKey, e.Type }, "idx_content_media_content_type");

            entity.HasIndex(e => new { e.PoiInfoKey, e.IsPrimary }, "idx_content_media_poi_primary").HasFilter("(is_primary = true)");

            entity.HasIndex(e => new { e.PoiInfoKey, e.Type }, "idx_content_media_poi_type");

            entity.HasIndex(e => new { e.Type, e.IsPrimary }, "idx_content_media_type_primary").HasFilter("(is_primary = true)");

            entity.HasIndex(e => e.Url, "idx_content_media_url");

            entity.Property(e => e.ContentMediaKey).HasColumnName("content_media_key");
            entity.Property(e => e.Attribution)
                .HasMaxLength(500)
                .HasColumnName("attribution");
            entity.Property(e => e.ContentInfoKey).HasColumnName("content_info_key");
            entity.Property(e => e.Height).HasColumnName("height");
            entity.Property(e => e.IsPrimary)
                .HasDefaultValue(false)
                .HasColumnName("is_primary");
            entity.Property(e => e.PoiInfoKey).HasColumnName("poi_info_key");
            entity.Property(e => e.Prefix)
                .HasMaxLength(50)
                .HasColumnName("prefix");
            entity.Property(e => e.Suffix)
                .HasMaxLength(50)
                .HasColumnName("suffix");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
            entity.Property(e => e.Url)
                .HasMaxLength(500)
                .HasColumnName("url");
            entity.Property(e => e.Width).HasColumnName("width");

            entity.HasOne(d => d.ContentInfoKeyNavigation).WithMany(p => p.ContentMedia)
                .HasForeignKey(d => d.ContentInfoKey)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("content_media_content_info_key_fkey");

            entity.HasOne(d => d.PoiInfoKeyNavigation).WithMany(p => p.ContentMedia)
                .HasForeignKey(d => d.PoiInfoKey)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("content_media_poi_info_key_fkey");
        });

        modelBuilder.Entity<CoreNode>(entity =>
        {
            entity.HasKey(e => e.Key).HasName("core_node_pkey");

            entity.ToTable("core_node");

            entity.HasIndex(e => e.Guid, "core_node_guid_key").IsUnique();

            entity.HasIndex(e => e.City, "idx_core_node_city_code");

            entity.HasIndex(e => e.CountryCode, "idx_core_node_country_code");

            entity.HasIndex(e => e.Description, "idx_core_node_description");

            entity.HasIndex(e => e.EndDate, "idx_core_node_end");

            entity.HasIndex(e => e.Label, "idx_core_node_label");

            entity.HasIndex(e => e.Source, "idx_core_node_source");

            entity.HasIndex(e => e.StartDate, "idx_core_node_start");

            entity.HasIndex(e => e.Type, "idx_core_node_type");

            entity.Property(e => e.Key).HasColumnName("key");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .HasColumnName("country");
            entity.Property(e => e.CountryCode)
                .HasMaxLength(100)
                .HasColumnName("country_code");
            entity.Property(e => e.DateAdded)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_added");
            entity.Property(e => e.Description)
                .HasMaxLength(2000)
                .HasColumnName("description");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.ExternalId)
                .HasMaxLength(50)
                .HasColumnName("external_id");
            entity.Property(e => e.Guid)
                .HasMaxLength(50)
                .HasColumnName("guid");
            entity.Property(e => e.Label)
                .HasMaxLength(2000)
                .HasColumnName("label");
            entity.Property(e => e.Source)
                .HasMaxLength(50)
                .HasColumnName("source");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<NewsInfo>(entity =>
        {
            entity.HasKey(e => e.NewsInfoKey).HasName("news_info_pkey");

            entity.ToTable("news_info");

            entity.HasIndex(e => e.Categories, "idx_news_info_categories");

            entity.HasIndex(e => e.CoreNodeKey, "idx_news_info_core_node");

            entity.HasIndex(e => e.Description, "idx_news_info_description");

            entity.HasIndex(e => e.Locale, "idx_news_info_locale");

            entity.HasIndex(e => e.Source, "idx_news_info_source");

            entity.HasIndex(e => e.Title, "idx_news_info_title");

            entity.HasIndex(e => e.Uuid, "idx_news_info_uuid");

            entity.Property(e => e.NewsInfoKey).HasColumnName("news_info_key");
            entity.Property(e => e.Categories)
                .HasMaxLength(200)
                .HasColumnName("categories");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.DateAdded)
                .HasDefaultValueSql("now()")
                .HasColumnName("date_added");
            entity.Property(e => e.Description)
                .HasMaxLength(2000)
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500)
                .HasColumnName("image_url");
            entity.Property(e => e.Keywords)
                .HasMaxLength(500)
                .HasColumnName("keywords");
            entity.Property(e => e.Language)
                .HasMaxLength(100)
                .HasColumnName("language");
            entity.Property(e => e.Locale)
                .HasMaxLength(100)
                .HasColumnName("locale");
            entity.Property(e => e.PublishedDate).HasColumnName("published_date");
            entity.Property(e => e.Relevance).HasColumnName("relevance");
            entity.Property(e => e.Snippet)
                .HasMaxLength(1000)
                .HasColumnName("snippet");
            entity.Property(e => e.Source)
                .HasMaxLength(100)
                .HasColumnName("source");
            entity.Property(e => e.Title)
                .HasMaxLength(1000)
                .HasColumnName("title");
            entity.Property(e => e.Url)
                .HasMaxLength(500)
                .HasColumnName("url");
            entity.Property(e => e.Uuid)
                .HasMaxLength(50)
                .HasColumnName("uuid");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithMany(p => p.NewsInfos)
                .HasForeignKey(d => d.CoreNodeKey)
                .HasConstraintName("news_info_core_node_key_fkey");
        });

        modelBuilder.Entity<PoiInfo>(entity =>
        {
            entity.HasKey(e => e.PoiInfoKey).HasName("poi_info_pkey");

            entity.ToTable("poi_info");

            entity.HasIndex(e => e.AllCategories, "idx_poi_info_all_categories");

            entity.HasIndex(e => e.CoreNodeKey, "idx_poi_info_core_node");

            entity.HasIndex(e => e.Open, "idx_poi_info_open");

            entity.HasIndex(e => e.Rating, "idx_poi_info_rating");

            entity.HasIndex(e => e.TotalRatings, "idx_poi_info_total_rating");

            entity.HasIndex(e => e.Verified, "idx_poi_info_verified");

            entity.HasIndex(e => e.CoreNodeKey, "poi_info_core_node_key_key").IsUnique();

            entity.HasIndex(e => e.CoreNodeKey, "uk_poi_info_core_node").IsUnique();

            entity.Property(e => e.PoiInfoKey).HasColumnName("poi_info_key");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasColumnName("address");
            entity.Property(e => e.AllCategories)
                .HasMaxLength(200)
                .HasColumnName("all_categories");
            entity.Property(e => e.Category).HasColumnName("category");
            entity.Property(e => e.Closed).HasColumnName("closed");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.DateClosed).HasColumnName("date_closed");
            entity.Property(e => e.Free).HasColumnName("free");
            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.Open).HasColumnName("open");
            entity.Property(e => e.Popularity).HasColumnName("popularity");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(100)
                .HasColumnName("postal_code");
            entity.Property(e => e.PriceLevel).HasColumnName("price_level");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.TotalRatings).HasColumnName("total_ratings");
            entity.Property(e => e.Verified).HasColumnName("verified");
            entity.Property(e => e.WebsiteUrl)
                .HasMaxLength(200)
                .HasColumnName("website_url");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithOne(p => p.PoiInfo)
                .HasForeignKey<PoiInfo>(d => d.CoreNodeKey)
                .HasConstraintName("poi_info_core_node_key_fkey");
        });

        modelBuilder.Entity<SpatialInfo>(entity =>
        {
            entity.HasKey(e => e.SpatialInfoKey).HasName("spatial_info_pkey");

            entity.ToTable("spatial_info");

            entity.HasIndex(e => e.VenueName, "idx_spatial_info_venue_name");

            entity.HasIndex(e => e.VenueType, "idx_spatial_info_venue_type");

            entity.HasIndex(e => e.CoreNodeKey, "uk_spatial_info_core_node").IsUnique();

            entity.Property(e => e.SpatialInfoKey).HasColumnName("spatial_info_key");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .HasColumnName("address");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.Duration)
                .HasMaxLength(50)
                .HasColumnName("duration");
            entity.Property(e => e.Latitude)
                .HasMaxLength(50)
                .HasColumnName("latitude");
            entity.Property(e => e.Longitude)
                .HasMaxLength(50)
                .HasColumnName("longitude");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(50)
                .HasColumnName("postal_code");
            entity.Property(e => e.RecurrenceFrequency)
                .HasMaxLength(50)
                .HasColumnName("recurrence_frequency");
            entity.Property(e => e.Recurring).HasColumnName("recurring");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.StateCode)
                .HasMaxLength(50)
                .HasColumnName("state_code");
            entity.Property(e => e.Timezone)
                .HasMaxLength(50)
                .HasColumnName("timezone");
            entity.Property(e => e.VenueCapacity).HasColumnName("venue_capacity");
            entity.Property(e => e.VenueId)
                .HasMaxLength(100)
                .HasColumnName("venue_id");
            entity.Property(e => e.VenueName)
                .HasMaxLength(100)
                .HasColumnName("venue_name");
            entity.Property(e => e.VenueType)
                .HasMaxLength(100)
                .HasColumnName("venue_type");
            entity.Property(e => e.VenueUrl)
                .HasMaxLength(200)
                .HasColumnName("venue_url");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithOne(p => p.SpatialInfo)
                .HasForeignKey<SpatialInfo>(d => d.CoreNodeKey)
                .HasConstraintName("spatial_info_core_node_key_fkey");
        });

        modelBuilder.Entity<StoredUserTask>(entity =>
        {
            entity.HasKey(e => e.Storedusertaskkey).HasName("StoredUserTask_pkey");

            entity.ToTable("StoredUserTask");

            entity.Property(e => e.Storedusertaskkey).HasColumnName("storedusertaskkey");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Favorite).HasColumnName("favorite");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.Userkey).HasColumnName("userkey");

            entity.HasOne(d => d.UserkeyNavigation).WithMany(p => p.StoredUserTasks)
                .HasForeignKey(d => d.Userkey)
                .HasConstraintName("StoredUserTask_userkey_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userkey).HasName("User_pkey");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "User_email_key").IsUnique();

            entity.Property(e => e.Userkey).HasColumnName("userkey");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
        });

        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.Usertaskkey).HasName("UserTask_pkey");

            entity.ToTable("UserTask");

            entity.Property(e => e.Usertaskkey).HasColumnName("usertaskkey");
            entity.Property(e => e.Created)
                .HasComment("Datetime when task was created")
                .HasColumnName("created");
            entity.Property(e => e.Day).HasColumnName("day");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Endtime).HasColumnName("endtime");
            entity.Property(e => e.Month).HasColumnName("month");
            entity.Property(e => e.Starttime).HasColumnName("starttime");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.Userkey).HasColumnName("userkey");
            entity.Property(e => e.Year).HasColumnName("year");

            entity.HasOne(d => d.UserkeyNavigation).WithMany(p => p.UserTasks)
                .HasForeignKey(d => d.Userkey)
                .HasConstraintName("UserTask_userkey_fkey");
        });

        modelBuilder.Entity<WeatherInfo>(entity =>
        {
            entity.HasKey(e => e.WeatherInfoKey).HasName("weather_info_pkey");

            entity.ToTable("weather_info");

            entity.HasIndex(e => e.CoreNodeKey, "idx_weather_info_core_node");

            entity.HasIndex(e => e.WeatherDescription, "idx_weather_info_weather_description");

            entity.Property(e => e.WeatherInfoKey).HasColumnName("weather_info_key");
            entity.Property(e => e.CoreNodeKey).HasColumnName("core_node_key");
            entity.Property(e => e.PrecipitationSum).HasColumnName("precipitation_sum");
            entity.Property(e => e.TemperatureMax).HasColumnName("temperature_max");
            entity.Property(e => e.TemperatureMin).HasColumnName("temperature_min");
            entity.Property(e => e.WeatherDescription)
                .HasMaxLength(100)
                .HasColumnName("weather_description");
            entity.Property(e => e.WindDirection)
                .HasMaxLength(20)
                .HasColumnName("wind_direction");
            entity.Property(e => e.WindspeedMax).HasColumnName("windspeed_max");

            entity.HasOne(d => d.CoreNodeKeyNavigation).WithMany(p => p.WeatherInfos)
                .HasForeignKey(d => d.CoreNodeKey)
                .HasConstraintName("weather_info_core_node_key_fkey");
        });
        modelBuilder.HasSequence<int>("seq_schema_version", "graphql").IsCyclic();

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
