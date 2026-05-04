namespace Pflegehilfe.TodoApp.Domain.Entities;

public class TodoItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Title { get; set; } = string.Empty;

    public DateTime? Deadline { get; set; }

    public bool IsDone { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}