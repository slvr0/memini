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

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=DESKTOP-8F7DABU;Database=react-fuse-db;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True").UseLazyLoadingProxies();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.ActivityKey).HasName("PK__Activity__30266EF9BAFF0737");

            entity.ToTable("Activity");

            entity.Property(e => e.ActivityType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.UserKeyNavigation).WithMany(p => p.Activities)
                .HasForeignKey(d => d.UserKey)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Activity__UserKe__5629CD9C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserKey).HasName("PK__User__296ADCF189E4169E");

            entity.ToTable("User");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
