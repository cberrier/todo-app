import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from './components';
import { getAllTodo, deleteTodo, toggleComplete, createTodo } from './services/TodoService';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Read todo
  useEffect(() => {
    const fetchData = async () => {
      await getAllTodo().then((data) => {
        const { items } = data
        setTodos(items)
      })
    }

    fetchData()
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    const data = {
      text: input,
      completed: false,
      id: uuidv4()
    }

    createTodo(e, data)
    setTodos([...todos, data])
    setInput('')
  };

  const handleDelete = async (id) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id)
    setTodos([...filteredTodo])
    await deleteTodo(id)
  }

  const handleToggleComplete = async (todo) => {
    const update = {
      ...todo,
      completed: !todo.completed
    }
    const updateId = update.id
    const tmpTodos = [...todos];
    const todoIndex = tmpTodos.findIndex(a => a.id === updateId)
    tmpTodos[todoIndex] = update

    setTodos(tmpTodos)
    await toggleComplete(todo)
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={handleCreate} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={handleToggleComplete}
              deleteTodo={handleDelete}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;