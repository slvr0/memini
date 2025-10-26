
import { useState, useEffect } from 'react';
import { createFilteredSearch } from './useFilteredSearchData';
import { getPointsOfInterestFromFilteredSearch } from '../store/events-api';
import { IPointOfInterestFilter } from '@/interfaces/common-interfaces';
import { getPointsOfInterestCategoriesApi } from '../store/events-api';
const usePointOfInterestSearchBase = createFilteredSearch<IPointOfInterestFilter, any[]>(
  getPointsOfInterestFromFilteredSearch
);

export const usePointOfInterestSearch = () => {
  const [poiCategories, setPoiCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  
  // Call the base hook to get search functionality
  const searchHook = usePointOfInterestSearchBase();

  // Fetch categories on mount
  useEffect(() => {
    const fetchPoiCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await getPointsOfInterestCategoriesApi();
  
        setPoiCategories(response?.ResponseObject?.categoricalEnums || []);
      } catch (error) {
        console.error('Failed to fetch POI categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchPoiCategories();
  }, []);

  // Return the original hook results plus the categories
  return [
    {
      ...searchHook[0],  // data, loading, error, pagination
      poiCategories,
      categoriesLoading
    },
    searchHook[1]  // search, goToPage, nextPage, prevPage, setPageSize
  ] as const;
};