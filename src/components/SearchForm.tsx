import React, { useState, useEffect } from 'react';
import { VacancyFilter } from '../models/Vacancy';
import '../styles/SearchForm.css';


interface SearchFormProps {
  onFilterChange: (filter: VacancyFilter) => void;
  initialFilters?: VacancyFilter;
}

const SearchForm: React.FC<SearchFormProps> = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState<VacancyFilter>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form-container">
        <div className="search-form-row">
          <div className="search-form-group">
            <label htmlFor="form">Занятость</label>
            <select
              id="form"
              name="form"
              value={filters.form || ''}
              onChange={handleChange}
            >
              <option value="">Не выбрано</option>
              <option value="Полная занятость">Полная занятость</option>
              <option value="Частичная занятость">Частичная занятость</option>
            </select>
          </div>

          <div className="search-form-group">
            <label htmlFor="position">Должность</label>
            <select
              id="position"
              name="position"
              value={filters.position || ''}
              onChange={handleChange}
            >
              <option value="">Не выбрано</option>
              <option value="Developer">Разработчик</option>
              <option value="Designer">Дизайнер</option>
              <option value="Manager">Менеджер</option>
            </select>
          </div>
        </div>

        <button type="submit" className="search-form-button">Поиск</button>
      </div>

      {hasActiveFilters && (
        <button type="button" className="clear-filters" onClick={clearFilters}>
          <span className="clear-icon">×</span> Очистить фильтры
        </button>
      )}
    </form>
  );
};

export default SearchForm;