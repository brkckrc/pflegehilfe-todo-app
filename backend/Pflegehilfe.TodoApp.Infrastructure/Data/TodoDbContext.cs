using Microsoft.EntityFrameworkCore;
using Pflegehilfe.TodoApp.Domain.Entities;

namespace Pflegehilfe.TodoApp.Infrastructure.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> Todos => Set<TodoItem>();
}