import axios from 'axios';
import { Vacancy, VacancyFilter } from '../models/Vacancy';

const API_BASE_URL = 'https://api.hh.ru';

type HHVacancyResponse = {
  id: string;
  name: string;
  employer: {
    name: string;
    logo_urls?: { original?: string };
  };
  schedule?: { name: string };
  address?: { city?: string; country?: string };
  alternate_url: string;
  description?: string;
  key_skills?: { name: string }[];
  responsibility?: string;
};

type HHApiResponse = {
  items: HHVacancyResponse[];
  found: number;
};

export const fetchVacancies = async (
  filter: VacancyFilter = {},
  page = 0,
  perPage = 5
): Promise<{ items: Vacancy[]; totalCount: number }> => {
  try {
    const params: Record<string, string | number> = {
      page,
      per_page: perPage,
    };

    if (filter.form) {
      params.schedule = filter.form === 'Полная занятость' ? 'fullDay' : 'flexible';
    }

    if (filter.position) {
      params.text = filter.position;
    }

    const response = await axios.get<HHApiResponse>(`${API_BASE_URL}/vacancies`, { params });

    const vacancyPromises = response.data.items.map(async (item) => {
      const detailedResponse = await axios.get<HHVacancyResponse>(`${API_BASE_URL}/vacancies/${item.id}`);
      const detailedData = detailedResponse.data;

      return {
        id: detailedData.id,
        title: detailedData.name,
        company: {
          name: detailedData.employer.name,
          logo_url: detailedData.employer.logo_urls?.original || '',
        },
        form: (detailedData.schedule?.name === 'Полный день' ? 'Полная занятость' : 'Частичная занятость') as 'Полная занятость' | 'Частичная занятость',
        address: {
          city: detailedData.address?.city || '',
          country: detailedData.address?.country || 'Russia',
        },
        url: detailedData.alternate_url,
        description: detailedData.description || '',
        responsibilities: detailedData.key_skills?.map((skill) => skill.name) ||
          (detailedData.responsibility ? [detailedData.responsibility] : []),
      };
    });

    const items = await Promise.all(vacancyPromises);

    return {
      items,
      totalCount: response.data.found,
    };
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }
};
