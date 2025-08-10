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

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserTask> UserTasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-8F7DABU;Database=react-fuse-db;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserKey).HasName("PK__User__296ADCF189E4169E");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.UserTaskKey).HasName("PK__UserTask__D15CBB55E3CA2209");

            entity.ToTable("UserTask");

            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.UserKeyNavigation).WithMany(p => p.UserTasks)
                .HasForeignKey(d => d.UserKey)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTask_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
