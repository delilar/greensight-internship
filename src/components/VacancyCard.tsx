import React, { useState } from 'react';
import { Vacancy } from '@/types/Vacancy';
import Button from '@components/Button';
import Link from '@components/Link';
import ChevronUpIcon from "@icons/chevronUp.svg";
import ChevronDownIcon from "@icons/chevronDown.svg";
import '@styles/VacancyCard.scss';

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleButtonClick = () => {
    window.open(vacancy.url, '_blank', 'noopener,noreferrer');
  };
  
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="vacancy-card">
      <div className="vacancy-card__header">
        <div className="vacancy-card__title-wrapper">
          <p className="vacancy-card__title">
            {vacancy.title}
          </p>
          {vacancy.company.logo_url && (
            <img 
              src={vacancy.company.logo_url} 
              alt={`${vacancy.company.name} logo`}
              className="vacancy-card__logo" 
            />
          )}
        </div>
        <Button 
          color="gray" 
          onClick={handleButtonClick}
          className="vacancy-card__apply-button"
        >
          Откликнуться
        </Button>
      </div>
      
      <div className="vacancy-card__details">
        <div className="vacancy-card__detail">
          <span className="vacancy-card__detail-label">Занятость:</span> {vacancy.form}
        </div>
        <div className="vacancy-card__detail">
          <span className="vacancy-card__detail-label">Компания:</span> {vacancy.company.name}
        </div>
        <div className="vacancy-card__detail">
          <span className="vacancy-card__detail-label">Адрес:</span> {vacancy.address.city || 'Не указан'}
        </div>
      </div>
      
      <div className={`vacancy-card__description-container ${showDetails ? 'vacancy-card__description-container--expanded' : ''}`}>
        <div className="vacancy-card__description" dangerouslySetInnerHTML={createMarkup(vacancy.description)} />
      </div>
      
      <div className="vacancy-card__toggle-container">
        <Link 
          type="standart" 
          onClick={toggleDetails} 
          icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />} 
          iconPosition="right"
          className="vacancy-card__toggle"
        >
          {showDetails ? 'Свернуть' : 'Узнать больше'}
        </Link>
      </div>
    </div>
  );
};

export default VacancyCard;