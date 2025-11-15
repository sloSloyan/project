import React, { useState } from 'react';
import { Todo } from '../../types/todo';

import styles from './TodoItem.module.scss';
import cn from 'classnames';
import pencilIcon from './icons/pencil.png';



interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
   onEdit: (id: string, newText: string) => void; 
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
  setIsEditing(true);
  setEditText(todo.text);
};

const handleSave = () => {
  if (editText.trim()) {
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  }
};

const handleCancel = () => {
  setIsEditing(false);
  setEditText(todo.text);
};


      const formatDate = (dateString: string) => {
    if (!dateString) return 'Без даты';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Без даты';
    return date.toLocaleDateString('ru-RU');
  };
 
  return (
    <div className={styles.block}>
     
           <span 
      className={cn(styles.text, {
        [styles.textActive]: todo.completed
      })}>
        {todo.text}
      </span>
      
      
      <span className={styles.date}>
    {formatDate(todo.dueDate!)} 
</span>
      {isEditing ? ( <>
         <input
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
          <button onClick={handleSave} className={styles.saveButton}>✓</button>
          <button onClick={handleCancel} className={styles.cancelButton}>✕</button>
        </>) : (
            <>
            <span className={styles.edit} onClick={handleEdit}> 
                <img className={styles.icon} src={pencilIcon} alt="" />
            </span>
                 <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.delete}
      >
        Удалить
      </button>
            </>
        )}
       {/* <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.delete}
      >
        Удалить
      </button> */}
    </div>
  );
};

export default TodoItem;