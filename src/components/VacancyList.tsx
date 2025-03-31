import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVacanciesInfiniteQuery } from '@/api';
import { VacancyFilter } from '@/types/Vacancy';
import VacancyCard from '@components/VacancyCard';
import SearchForm from '@components/SearchForm';
import '@styles/VacancyList.scss';
import Button from './Button';

const VacancyList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filters, setFilters] = useState<VacancyFilter>({});
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const formParam = params.get('form');
    const positionParam = params.get('position');
    
    const initialFilters: VacancyFilter = {};
    if (formParam) initialFilters.form = formParam as 'Полная занятость' | 'Частичная занятость';
    if (positionParam) initialFilters.position = positionParam;
    
    setFilters(initialFilters);
  }, [location.search]);

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useVacanciesInfiniteQuery(filters);
  
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.form) params.set('form', filters.form);
    if (filters.position) params.set('position', filters.position);
    
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    navigate(newUrl, { replace: true });
  }, [filters, navigate, location.pathname]);
  
  const handleFilterChange = (newFilters: VacancyFilter) => {
    setFilters(newFilters);
  };
  
  const handleShowMore = () => {
    fetchNextPage();
  };

  const allVacancies = data?.pages.flatMap(page => page.items) || [];
  
  return (
    <div className="vacancy-list">
      <h1 className="vacancy-list__title">Список вакансий</h1>
      
      <SearchForm 
        onFilterChange={handleFilterChange} 
        initialFilters={filters}
      />
      
      <div className="vacancy-list__content">
        {isLoading && !isFetchingNextPage ? (
          <div className="vacancy-list__loading">Загрузка вакансий...</div>
        ) : isError ? (
          <div className="vacancy-list__error">
            Error loading vacancies: {error instanceof Error ? error.message : 'Unknown error'}. 
            Please try again later.
          </div>
        ) : allVacancies.length === 0 ? (
          <div className="vacancy-list__empty">Нет вакансий удовлетворяющих вашим критериям</div>
        ) : (
          <>
            {allVacancies.map(vacancy => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
            
            {isFetchingNextPage && (
              <div className="vacancy-list__loading">Загрузка вакансий...</div>
            )}
            
            {hasNextPage && !isFetchingNextPage && (
              <Button className="vacancy-list__show-more" onClick={handleShowMore}>
                Показать больше
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VacancyList;