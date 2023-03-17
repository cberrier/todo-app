const baseUrl = 'http://localhost:8080/'

export const getAllTodo = async () => {
    const response = await fetch(baseUrl + "todos")
    return response.ok ? response.json() : { items: [] }
}

export const deleteTodo = async (id) => {
    return await fetch(baseUrl + `todos/${id}`, {        
        method: "DELETE"
    });
};

// Update todo
export const toggleComplete = async (todo) => {
    return await fetch(baseUrl + `todos/${todo.id}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todo.text, completed: todo.completed}),
    });
};

export const createTodo = async (e, todo) => {
    return await fetch(baseUrl + `todos/${todo.id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
};