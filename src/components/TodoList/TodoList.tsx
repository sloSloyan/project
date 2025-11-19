import React from 'react';
import { Todo } from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';
import sortIcon from './icons/sort23.png';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
 onEdit: (id: string, newText: string) => void;
     sortBy: 'date' | 'none' | 'name';
    //  setSortByName: (sort: 'name' | 'none') => void;
    //  setSortByDate: (sort: 'date' | 'none' ) => void;
       onSortChange: (sort: 'date' | 'none' | 'name') => void;

}



const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete,
     onEdit, sortBy, onSortChange }) => {
  if (todos.length === 0) {
    return <div className={styles.empty}>Нет задач</div>;
  }

  console.log('sortBy = ', sortBy)
  return (
    <div>
      {/* {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))} */}
      <table className={styles.table}>
  <thead>
    <tr>
      <th>
        <div className={styles.nameBlock}>
         Задача
  <span    className={styles.icon}   onClick={() => onSortChange(sortBy === 'name' ? 'none' : 'name')}>
       ↑↓
  </span>
        </div>
       
        </th>
      <th>Статус</th>
      <th><div className={styles.dateBlock}>
        <span>Дата</span>
        <span  
       onClick={() => onSortChange(sortBy === 'date' ? 'none' : 'date')}
        className={styles.icon} 
        >
           {sortBy === 'date' ? '↑' : '↑↓'} 
        </span>
        </div></th>
      <th>Действия</th>
    </tr>
  </thead>
  <tbody>
    {todos.map(todo => (
      <TodoItem key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit} />
    ))}
  </tbody>
</table>
    </div>
  );
};

export default TodoList;