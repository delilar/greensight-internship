import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchVacancies } from '../api';
import { Vacancy, VacancyFilter } from '../models/Vacancy';
import VacancyCard from './VacancyCard';
import SearchForm from './SearchForm';
import '../styles/VacancyList.css';

const VacancyList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<VacancyFilter>({});
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const formParam = params.get('form');
    const positionParam = params.get('position');
    
    const initialFilters: VacancyFilter = {};
    if (formParam) initialFilters.form = formParam;
    if (positionParam) initialFilters.position = positionParam;
    
    setFilters(initialFilters);
    setPage(pageParam ? parseInt(pageParam, 10) : 0);
  }, [location.search]);
  
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (page > 0) params.set('page', page.toString());
    if (filters.form) params.set('form', filters.form);
    if (filters.position) params.set('position', filters.position);
    
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    navigate(newUrl, { replace: true });
  }, [filters, page, navigate, location.pathname]);
  
  useEffect(() => {
    const loadVacancies = async () => {
      try {
        setLoading(true);
        const response = await fetchVacancies(filters, page);
        
        if (page === 0) {
          setVacancies(response.items);
        } else {
          setVacancies(prev => [...prev, ...response.items]);
        }
        
        setHasMore(response.items.length > 0 && response.items.length < response.totalCount);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Error loading vacancies: ${errorMessage}. Please try again later.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadVacancies();
  }, [filters, page]);
  
  const handleFilterChange = (newFilters: VacancyFilter) => {
    setFilters(newFilters);
    setPage(0);
    setVacancies([]);
  };
  
  const handleShowMore = () => {
    setPage(prev => prev + 1);
  };
  
  return (
    <div className="vacancy-list-container">
      <h1 className="vacancy-list-title">Список вакансий</h1>
      
      <SearchForm 
        onFilterChange={handleFilterChange} 
        initialFilters={filters}
      />
      
      <div className="vacancy-list">
        {loading && page === 0 ? (
          <div className="vacancy-loading">Загрузка вакансий...</div>
        ) : error ? (
          <div className="vacancy-error">{error}</div>
        ) : vacancies.length === 0 ? (
          <div className="vacancy-list-empty">Нет вакансий удовлетворяющих вашим критериям</div>
        ) : (
          <>
            {vacancies.map(vacancy => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
            
            {loading && page > 0 && <div className="vacancy-loading">Загрузка вакансий...</div>}
            
            {hasMore && !loading && (
              <button className="show-more-button" onClick={handleShowMore}>
                Показать больше
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VacancyList;
