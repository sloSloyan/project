import React from 'react';
import { FilterType } from '../../types/todo';
import styles from './TodoFilter.module.scss';
import cn from 'classnames';


interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;

}

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange  }) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Выполненные' }
  ];



  return (
    <div className={styles.block}>
      {filters.map((filter) => (
        <div
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}

            className={cn(styles.item, {
            [styles.itemActive]: currentFilter === filter.key
          })}
        >
          {filter.label}
        </div>
      ))}
  
    </div>
  );
};

export default TodoFilter;