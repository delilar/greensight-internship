export interface Vacancy {
    id: string;
    title: string;
    company: {
      name: string;
      logo_url?: string;
    };
    form: 'Полная занятость' | 'Частичная занятость';
    address: {
      city: string;
      country: string;
    };
    url: string;
    description: string;
    responsibilities: string[];
  }
  
  export interface VacancyFilter {
    form?: string;
    position?: string;
  }