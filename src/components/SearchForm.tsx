import {ChangeEvent, FormEvent, FC, useState, useEffect } from 'react';

import { VacancyFilter } from '@/types/Vacancy';

import Dropdown from '@components/Dropdown';
import Button from '@components/Button';
import Link from '@components/Link';

import CloseIcon from "@icons/close.svg"

import '@styles/SearchFrom.scss';

interface SearchFormProps {
  onFilterChange: (filter: VacancyFilter) => void;
  initialFilters?: VacancyFilter;
}

const SearchForm: FC<SearchFormProps> = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState<VacancyFilter>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => !!value);

  const formOptions = [
    { value: 'Полная занятость', label: 'Полная занятость' },
    { value: 'Частичная занятость', label: 'Частичная занятость' }
  ];

  const positionOptions = [
    { value: 'Developer', label: 'Разработчик' },
    { value: 'Designer', label: 'Дизайнер' },
    { value: 'Manager', label: 'Менеджер' }
  ];

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <div className="search-form__row">
          <Dropdown
            id="form"
            name="form"
            label="Занятость"
            value={filters.form || ''}
            options={formOptions}
            onChange={handleChange}
            placeholderClass="dropdown-placeholder"
          />

          <Dropdown
            id="position"
            name="position"
            label="Должность"
            value={filters.position || ''}
            options={positionOptions}
            onChange={handleChange}
            placeholderClass="dropdown-placeholder"
          />
        </div>

        <Button color="blue" onClick={handleSubmit}>
          Поиск
        </Button>
      </div>

      {hasActiveFilters && (
        <Link iconPosition="left" type="underlined" icon={<CloseIcon />} onClick={clearFilters} className="search-form__clear-link">
          Очистить фильтры
        </Link>
      )}
    </form>
  );
};

export default SearchForm;