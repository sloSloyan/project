import React from 'react';
import { Todo } from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
 onEdit: (id: string, newText: string) => void;
}



const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return <div className={styles.empty}>Нет задач</div>;
  }


  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;