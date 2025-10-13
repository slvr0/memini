using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Memini.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTablesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "graphql");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:auth.aal_level", "aal1,aal2,aal3")
                .Annotation("Npgsql:Enum:auth.code_challenge_method", "s256,plain")
                .Annotation("Npgsql:Enum:auth.factor_status", "unverified,verified")
                .Annotation("Npgsql:Enum:auth.factor_type", "totp,webauthn,phone")
                .Annotation("Npgsql:Enum:auth.oauth_registration_type", "dynamic,manual")
                .Annotation("Npgsql:Enum:auth.one_time_token_type", "confirmation_token,reauthentication_token,recovery_token,email_change_token_new,email_change_token_current,phone_change_token")
                .Annotation("Npgsql:Enum:realtime.action", "INSERT,UPDATE,DELETE,TRUNCATE,ERROR")
                .Annotation("Npgsql:Enum:realtime.equality_op", "eq,neq,lt,lte,gt,gte,in")
                .Annotation("Npgsql:Enum:storage.buckettype", "STANDARD,ANALYTICS")
                .Annotation("Npgsql:PostgresExtension:extensions.pg_stat_statements", ",,")
                .Annotation("Npgsql:PostgresExtension:extensions.pgcrypto", ",,")
                .Annotation("Npgsql:PostgresExtension:extensions.uuid-ossp", ",,")
                .Annotation("Npgsql:PostgresExtension:graphql.pg_graphql", ",,")
                .Annotation("Npgsql:PostgresExtension:vault.supabase_vault", ",,");

            migrationBuilder.CreateSequence<int>(
                name: "seq_schema_version",
                schema: "graphql",
                cyclic: true);

            migrationBuilder.CreateTable(
                name: "memini_event",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    external_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    source = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    name = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    data_quality = table.Column<decimal>(type: "numeric(3,2)", precision: 3, scale: 2, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("memini_event_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    userkey = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("User_pkey", x => x.userkey);
                });

            migrationBuilder.CreateTable(
                name: "event_categorization_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    primary_category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    categories = table.Column<List<string>>(type: "text[]", nullable: true),
                    tags = table.Column<List<string>>(type: "text[]", nullable: true),
                    labels = table.Column<List<string>>(type: "text[]", nullable: true),
                    genre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    sub_genre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    segment = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    is_featured = table.Column<bool>(type: "boolean", nullable: true),
                    global_rank = table.Column<int>(type: "integer", nullable: true),
                    local_rank = table.Column<int>(type: "integer", nullable: true),
                    relevance_score = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_categorization_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_categorization_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_geographic_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    country_code = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    state = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    state_code = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    address = table.Column<string>(type: "text", nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    search_radius_value = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    search_radius_unit = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    place_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_geographic_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_geographic_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_media",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    media_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    width = table.Column<int>(type: "integer", nullable: true),
                    height = table.Column<int>(type: "integer", nullable: true),
                    is_primary = table.Column<bool>(type: "boolean", nullable: true),
                    attribution = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_media_pkey", x => x.id);
                    table.ForeignKey(
                        name: "event_media_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_performers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    performer_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    name = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    is_headliner = table.Column<bool>(type: "boolean", nullable: true),
                    image_url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    genres = table.Column<List<string>>(type: "text[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_performers_pkey", x => x.id);
                    table.ForeignKey(
                        name: "event_performers_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_price_ranges",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    min_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    max_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_price_ranges_pkey", x => x.id);
                    table.ForeignKey(
                        name: "event_price_ranges_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_pricing_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    min_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    max_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    is_free = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_pricing_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_pricing_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_status_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    status_reason = table.Column<string>(type: "text", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: true),
                    is_cancelled = table.Column<bool>(type: "boolean", nullable: true),
                    is_postponed = table.Column<bool>(type: "boolean", nullable: true),
                    is_rescheduled = table.Column<bool>(type: "boolean", nullable: true),
                    is_sold_out = table.Column<bool>(type: "boolean", nullable: true),
                    status_changed_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    ticket_availability = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_status_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_status_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_temporal_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    start_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    local_start_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    local_end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    timezone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    duration_minutes = table.Column<int>(type: "integer", nullable: true),
                    is_date_tbd = table.Column<bool>(type: "boolean", nullable: true),
                    is_time_tbd = table.Column<bool>(type: "boolean", nullable: true),
                    display_time = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    is_recurring = table.Column<bool>(type: "boolean", nullable: true),
                    recurrence_frequency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    recurrence_end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_temporal_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_temporal_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "event_venue_info",
                columns: table => new
                {
                    event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    venue_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    name = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    address = table.Column<string>(type: "text", nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    capacity = table.Column<int>(type: "integer", nullable: true),
                    url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    additional_info = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("event_venue_info_pkey", x => x.event_id);
                    table.ForeignKey(
                        name: "event_venue_info_event_id_fkey",
                        column: x => x.event_id,
                        principalTable: "memini_event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoredUserTask",
                columns: table => new
                {
                    storedusertaskkey = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    duration = table.Column<int>(type: "integer", nullable: true),
                    favorite = table.Column<bool>(type: "boolean", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    userkey = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("StoredUserTask_pkey", x => x.storedusertaskkey);
                    table.ForeignKey(
                        name: "StoredUserTask_userkey_fkey",
                        column: x => x.userkey,
                        principalTable: "User",
                        principalColumn: "userkey");
                });

            migrationBuilder.CreateTable(
                name: "UserTask",
                columns: table => new
                {
                    usertaskkey = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<int>(type: "integer", nullable: false),
                    month = table.Column<int>(type: "integer", nullable: false),
                    day = table.Column<int>(type: "integer", nullable: false),
                    starttime = table.Column<int>(type: "integer", nullable: false),
                    endtime = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    userkey = table.Column<int>(type: "integer", nullable: true),
                    created = table.Column<DateOnly>(type: "date", nullable: true, comment: "Datetime when task was created")
                },
                constraints: table =>
                {
                    table.PrimaryKey("UserTask_pkey", x => x.usertaskkey);
                    table.ForeignKey(
                        name: "UserTask_userkey_fkey",
                        column: x => x.userkey,
                        principalTable: "User",
                        principalColumn: "userkey");
                });

            migrationBuilder.CreateIndex(
                name: "idx_cat_categories",
                table: "event_categorization_info",
                column: "categories")
                .Annotation("Npgsql:IndexMethod", "gin");

            migrationBuilder.CreateIndex(
                name: "idx_cat_genre",
                table: "event_categorization_info",
                column: "genre");

            migrationBuilder.CreateIndex(
                name: "idx_cat_primary",
                table: "event_categorization_info",
                column: "primary_category");

            migrationBuilder.CreateIndex(
                name: "idx_cat_type",
                table: "event_categorization_info",
                column: "type");

            migrationBuilder.CreateIndex(
                name: "idx_geo_city",
                table: "event_geographic_info",
                column: "city");

            migrationBuilder.CreateIndex(
                name: "idx_geo_coordinates",
                table: "event_geographic_info",
                columns: new[] { "latitude", "longitude" });

            migrationBuilder.CreateIndex(
                name: "idx_geo_country",
                table: "event_geographic_info",
                column: "country_code");

            migrationBuilder.CreateIndex(
                name: "idx_media_event",
                table: "event_media",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "idx_media_primary",
                table: "event_media",
                columns: new[] { "event_id", "is_primary" });

            migrationBuilder.CreateIndex(
                name: "idx_performers_event",
                table: "event_performers",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "idx_performers_id",
                table: "event_performers",
                column: "performer_id");

            migrationBuilder.CreateIndex(
                name: "idx_performers_name",
                table: "event_performers",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "idx_price_ranges_event",
                table: "event_price_ranges",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "idx_pricing_free",
                table: "event_pricing_info",
                column: "is_free");

            migrationBuilder.CreateIndex(
                name: "idx_pricing_max",
                table: "event_pricing_info",
                column: "max_price");

            migrationBuilder.CreateIndex(
                name: "idx_pricing_min",
                table: "event_pricing_info",
                column: "min_price");

            migrationBuilder.CreateIndex(
                name: "idx_status_active",
                table: "event_status_info",
                column: "is_active");

            migrationBuilder.CreateIndex(
                name: "idx_status_cancelled",
                table: "event_status_info",
                column: "is_cancelled");

            migrationBuilder.CreateIndex(
                name: "idx_status_status",
                table: "event_status_info",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "idx_temporal_end_date",
                table: "event_temporal_info",
                column: "end_date");

            migrationBuilder.CreateIndex(
                name: "idx_temporal_local_start",
                table: "event_temporal_info",
                column: "local_start_date");

            migrationBuilder.CreateIndex(
                name: "idx_temporal_start_date",
                table: "event_temporal_info",
                column: "start_date");

            migrationBuilder.CreateIndex(
                name: "idx_venue_city",
                table: "event_venue_info",
                column: "city");

            migrationBuilder.CreateIndex(
                name: "idx_venue_id",
                table: "event_venue_info",
                column: "venue_id");

            migrationBuilder.CreateIndex(
                name: "idx_venue_name",
                table: "event_venue_info",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "idx_events_created_at",
                table: "memini_event",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "idx_events_data_quality",
                table: "memini_event",
                column: "data_quality");

            migrationBuilder.CreateIndex(
                name: "idx_events_external_id",
                table: "memini_event",
                column: "external_id");

            migrationBuilder.CreateIndex(
                name: "idx_events_name",
                table: "memini_event",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "idx_events_source",
                table: "memini_event",
                column: "source");

            migrationBuilder.CreateIndex(
                name: "IX_StoredUserTask_userkey",
                table: "StoredUserTask",
                column: "userkey");

            migrationBuilder.CreateIndex(
                name: "User_email_key",
                table: "User",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_userkey",
                table: "UserTask",
                column: "userkey");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "event_categorization_info");

            migrationBuilder.DropTable(
                name: "event_geographic_info");

            migrationBuilder.DropTable(
                name: "event_media");

            migrationBuilder.DropTable(
                name: "event_performers");

            migrationBuilder.DropTable(
                name: "event_price_ranges");

            migrationBuilder.DropTable(
                name: "event_pricing_info");

            migrationBuilder.DropTable(
                name: "event_status_info");

            migrationBuilder.DropTable(
                name: "event_temporal_info");

            migrationBuilder.DropTable(
                name: "event_venue_info");

            migrationBuilder.DropTable(
                name: "StoredUserTask");

            migrationBuilder.DropTable(
                name: "UserTask");

            migrationBuilder.DropTable(
                name: "memini_event");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropSequence(
                name: "seq_schema_version",
                schema: "graphql");
        }
    }
}
