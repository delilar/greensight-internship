import React, { useState } from 'react';
import { Vacancy } from '../models/Vacancy';
import '../styles/VacancyCard.css';

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
  
  const getDescriptionPreview = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = vacancy.description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
  };
  
  return (
    <div className="vacancy-card">
      <div className="vacancy-title">
        <div className="vacancy-title-text">
          <p>{vacancy.title}</p>
          {vacancy.company.logo_url && (
            <img 
              src={vacancy.company.logo_url} 
              alt={`${vacancy.company.name} logo`}
              className="vacancy-company-logo" 
            />
          )}
        </div>
        <button 
          onClick={handleButtonClick} 
          className="vacancy-respond-button"
        >
          Откликнуться
        </button>
      </div>
      
      <div className="vacancy-details">
        <div className="vacancy-detail">
          <span className="vacancy-detail-label">Занятость:</span> {vacancy.form}
        </div>
        <div className="vacancy-detail">
          <span className="vacancy-detail-label">Компания:</span> {vacancy.company.name}
        </div>
        <div className="vacancy-detail">
          <span className="vacancy-detail-label">Адрес:</span> {vacancy.address.city || 'Не указан'}
        </div>
      </div>
      
      <div className="vacancy-description-preview">
        {getDescriptionPreview()}
      </div>
      
      <div className={`vacancy-hidden-content ${showDetails ? 'show' : ''}`}>
        <div className="vacancy-description" dangerouslySetInnerHTML={createMarkup(vacancy.description)} />
        
        {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
          <div className="vacancy-success-snapshot">
            <p className="vacancy-success-snapshot-title">Key Skills / Responsibilities:</p>
            <ul className="vacancy-success-snapshot-list">
              {vacancy.responsibilities.map((responsibility, index) => (
                <li key={index} className="vacancy-success-snapshot-item">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <button className="vacancy-toggle-button" onClick={toggleDetails}>
        {showDetails ? 'Свернуть ↑' : 'Узнать больше ↓'}
      </button>
    </div>
  );
};

export default VacancyCard;