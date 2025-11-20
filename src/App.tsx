import React, { useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';
import Pagination from './components/Pagination/Pagination';
import { Todo, FilterType } from './types/todo';
import './App.css';
import styles from './App.module.scss';

  const mass = [
    {
  id: '1',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '2',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '3',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '4',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '5',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '6',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '7',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '8',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '9',
  text: 'string',
  completed: false,
  dueDate: '',
},
  {
  id: '10',
  text: 'string',
  completed: false,
  dueDate: '',
},
   ]

function App() {
  // Состояние для хранения списка задач
  const [todos, setTodos] = useState<Todo[]>(mass);
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

  const [sortByDate, setSortByDate] = useState<'date' | 'none'>('none');
const [sortByName, setSortByName] = useState<'name' | 'none'>('none');

  const [sortBy, setSortBy] = useState<'date' | 'none' | 'name'>('none');


// ДОБАВЛЯЕМ ФУНКЦИЮ СОРТИРОВКИ ПЕРЕД filteredTodos
const sortedAndFilteredTodos = filteredTodos.sort((a, b) => {
  if (sortBy === 'date') {
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  }
    if (sortBy === 'name') {
    return a.text.localeCompare(b.text);
  }
  return 0; // без сортировки
});

const [currentPage, setCurrentPage] = useState(1); // текущая страница
const [tasksPerPage] = useState(5); // сколько задач на странице

// Индекс последней задачи на странице
const indexOfLastTask = currentPage * tasksPerPage;
// Индекс первой задачи на странице  
const indexOfFirstTask = indexOfLastTask - tasksPerPage;
// Задачи для текущей страницы
const currentTasks = sortedAndFilteredTodos.slice(indexOfFirstTask, indexOfLastTask);

  

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
          // todos={sortedAndFilteredTodos} 
          todos={currentTasks}
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
          onEdit={editTodo}
          sortBy={sortBy}
          // setSortByDate={setSortByDate}
          // setSortByName={setSortByName}
          onSortChange={setSortBy}
        />

        <Pagination
  tasksPerPage={tasksPerPage}
  totalTasks={sortedAndFilteredTodos.length} // общее количество задач
  currentPage={currentPage}
  onPageChange={setCurrentPage}
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