using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pflegehilfe.TodoApi.Dtos;
using Pflegehilfe.TodoApp.Domain.Entities;
using Pflegehilfe.TodoApp.Infrastructure.Data;

namespace Pflegehilfe.TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly TodoDbContext _context;

    public TodosController(TodoDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetTodos()
    {
        var todos = await _context.Todos
            .OrderBy(todo => todo.IsDone)
            .ThenBy(todo => todo.Deadline)
            .ThenByDescending(todo => todo.CreatedAt)
            .ToListAsync();

        return Ok(todos);
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodo(CreateTodoRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Trim().Length <= 10)
        {
            return BadRequest("Task must be longer than 10 characters.");
        }

        var todo = new TodoItem
        {
            Title = request.Title.Trim(),
            Deadline = request.Deadline,
            IsDone = false
        };

        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
    }

    [HttpPut("{id:guid}/done")]
    public async Task<IActionResult> MarkAsDone(Guid id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo is null)
        {
            return NotFound();
        }

        todo.IsDone = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTodo(Guid id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo is null)
        {
            return NotFound();
        }

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}