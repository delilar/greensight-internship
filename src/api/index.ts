import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Vacancy, VacancyFilter } from '../types/Vacancy';

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

const fetchVacanciesPage = async ({ 
  pageParam = 0, 
  filter = {}, 
  perPage = 5 
}: { 
  pageParam?: number; 
  filter?: VacancyFilter; 
  perPage?: number; 
}): Promise<{ 
  items: Vacancy[]; 
  totalCount: number; 
  nextPage: number | undefined; 
}> => {
  const params: Record<string, string | number> = {
    page: pageParam,
    per_page: perPage,
  };

  if (filter.form) {
    params.schedule = filter.form === 'Полная занятость' ? 'fullDay' : 'flexible';
  }

  if (filter.position) {
    params.text = filter.position;
  }

  const { data } = await axios.get<HHApiResponse>(`${API_BASE_URL}/vacancies`, { params });

  const items = await Promise.all(
    data.items.map(async (item) => {
      const { data: detailedData } = await axios.get<HHVacancyResponse>(`${API_BASE_URL}/vacancies/${item.id}`);
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
    })
  );

  const hasNextPage = data.items.length === perPage && (pageParam + 1) * perPage < data.found;
  const nextPage = hasNextPage ? pageParam + 1 : undefined;

  return { items, totalCount: data.found, nextPage };
};

export const useVacanciesInfiniteQuery = (filter: VacancyFilter = {}, perPage = 5) => {
  return useInfiniteQuery({
    queryKey: ['infiniteVacancies', filter, perPage],
    queryFn: ({ pageParam }) => fetchVacanciesPage({ pageParam, filter, perPage }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useVacanciesQuery = (filter: VacancyFilter = {}, page = 0, perPage = 5) => {
  return useInfiniteQuery({
    queryKey: ['infiniteVacancies', filter, perPage],
    queryFn: ({ pageParam }) => fetchVacanciesPage({ pageParam, filter, perPage }),
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};