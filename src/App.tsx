import React, { useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';
import { Todo, FilterType } from './types/todo';
import './App.css';
import styles from './App.module.scss';

function App() {
  // Состояние для хранения списка задач
  const [todos, setTodos] = useState<Todo[]>([]);
  // Состояние для текущего фильтра
  const [filter, setFilter] = useState<FilterType>('all');
   const [selectedDate, setSelectedDate] = useState('');


  // Функция для добавления новой задачи
  const addTodo = (text: string, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // Простой способ генерации ID
      text,
      completed: false,
      dueDate
    };
    setTodos([...todos, newTodo]);
  };

  // Функция для переключения статуса задачи
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Функция для удаления задачи
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  //
  const editTodo = (id: string, newText: string) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  ));
};

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = todos.filter(todo => {
    if (selectedDate && todo.dueDate !== selectedDate) return false;
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  

  return (
    <div className="App">
      <div className={styles.mainBlock}>
        <h1 className={styles.title}>Мой ToDo List</h1>
        
        <TodoForm onAdd={addTodo} />

        <div className={styles.selectedBlock}>
        <input 
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.date}
        />
        <button 
          onClick={() => setSelectedDate('')}
          className={styles.reset}
        >
          Сбросить дату
        </button>
      </div>
        
        <TodoFilter 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
        
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
          onEdit={editTodo}
        />
        
        <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          Всего задач: {todos.length} | 
          Выполнено: {todos.filter(t => t.completed).length} | 
          Осталось: {todos.filter(t => !t.completed).length}
        </div>
      </div>
    </div>
  );
}

export default App;