import { createFilteredSearch } from './useFilteredSearchData';
import { getEventsFromFilteredSearch } from '../store/events-api';
import { IEventSearchFilter } from '@/interfaces/common-interfaces';

export const useEventSearch = createFilteredSearch<IEventSearchFilter, any[]>(
  getEventsFromFilteredSearch
);

