import { FC, ChangeEvent, useState } from 'react';
import ChevronUp from '@icons/chevronUp.svg';
import ChevronDown from '@icons/chevronDown.svg';
import '@styles/components/Dropdown.scss';

import { DropdownProps } from './types.ts';

const Dropdown: FC<DropdownProps> = ({ 
  id, 
  name, 
  label, 
  value, 
  options, 
  onChange,
  placeholderClass = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    setIsOpen(false);
  };

  // Добавляем класс placeholder когда значение пустое
  const selectClassName = value === '' ? placeholderClass : '';

  return (
    <div className="dropdown-group">
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={selectClassName}
          required
        >
          <option value="" disabled hidden>Не выбрано</option>
          
          {options.filter(option => option.value !== '').map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="dropdown-icon">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;