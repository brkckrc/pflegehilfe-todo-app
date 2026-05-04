namespace Pflegehilfe.TodoApi.Dtos;

public class CreateTodoRequest
{
    public string Title { get; set; } = string.Empty;

    public DateTime? Deadline { get; set; }
}