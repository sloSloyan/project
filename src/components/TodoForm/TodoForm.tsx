import React, { useState } from 'react';
import styles from './TodoForm.module.scss';

interface TodoFormProps {
  onAdd: (text: string, dueDate: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), dueDate);
      setText('');
      setDueDate('');
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите новую задачу..."
       className={styles.text}
      />
         <input 
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className={styles.date}
/>
      <button
        className={styles.btn}
      >
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;