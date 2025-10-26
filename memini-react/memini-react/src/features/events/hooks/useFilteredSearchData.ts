// useFilteredSearch.ts
import { useState, useCallback, useEffect } from 'react';
import { IPaginationState, IPaginatedSearchResponse } from '@/interfaces/common-interfaces';
import { ApiResponse } from '@/interfaces/api-response';

type Listener<TData> = (
  data: TData | null,
  loading: boolean,
  error: string | null,
  pagination: IPaginationState
) => void;

export function createFilteredSearch<TFilter extends { pagination: IPaginationState }, TData>(
  apiMethod: (filter: TFilter) => Promise<ApiResponse<IPaginatedSearchResponse<TData>>>
) {
  let data: TData | null = null;
  let loading = false;
  let error: string | null = null;
  
  // Store the last filter (without pagination) for pagination navigation
  let lastFilterInput: Omit<TFilter, 'pagination'> | null = null;
  
  let pagination: IPaginationState = {
    currentPage: 1,
    pageSize: 20,
    totalPages: 0,
    totalItems: 0
  };
  
  const listeners = new Set<Listener<TData>>();

  const notify = () => {
    listeners.forEach(listener => listener(data, loading, error, pagination));
  };

  const search = async (
    filterInput: Omit<TFilter, 'pagination'>, 
    paginationState?: Partial<IPaginationState>
  ) => {
    loading = true;
    error = null;
    
    // Save filter input for future pagination calls
    lastFilterInput = filterInput;
    
    // Build pagination state separately
    const paginationData: IPaginationState = {
      currentPage: paginationState?.currentPage ?? 1,
      pageSize: paginationState?.pageSize ?? pagination.pageSize,
      totalPages: paginationState?.totalPages ?? 0,
      totalItems: paginationState?.totalItems ?? 0
    };
    
    // Merge filter with nested pagination structure
    const fullFilter: TFilter = {
      ...filterInput,
      pagination: paginationData
    } as TFilter;
    
    notify();
    
    try {
      const response = await apiMethod(fullFilter);

      if (response.Success && response.ResponseObject) {
        data = response.ResponseObject.Data;
        pagination = {
          currentPage: fullFilter.pagination.currentPage,
          pageSize: fullFilter.pagination.pageSize,
          totalItems: response.ResponseObject.TotalItems ?? 0,
          totalPages: response.ResponseObject.TotalPages ?? 0
        };
        error = null;
      } else {
        error = response.Message || 'Failed to fetch data';
        data = null;
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to fetch data';
      console.error(err);
    } finally {
      loading = false;
      notify();
    }
  };

  // Reuse last filter for page navigation
  const goToPage = async (page: number) => {
    if (!lastFilterInput || page < 1) return;
    await search(lastFilterInput, { currentPage: page, pageSize: pagination.pageSize });
  };

  // Reuse last filter when changing page size
  const setPageSize = async (newPageSize: number) => {
    if (!lastFilterInput || newPageSize < 1) return;
    await search(lastFilterInput, { currentPage: 1, pageSize: newPageSize });
  };

  return function useFilteredSearch() {
    const [state, setState] = useState({ 
      data, 
      loading, 
      error,
      pagination 
    });

    useEffect(() => {
      const listener: Listener<TData> = (newData, newLoading, newError, newPagination) => {
        setState({ 
          data: newData, 
          loading: newLoading, 
          error: newError,
          pagination: newPagination
        });
      };

      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);

    const handleGoToPage = useCallback((page: number) => {
      goToPage(page);
    }, []);

    const handleSetPageSize = useCallback((pageSize: number) => {
      setPageSize(pageSize);
    }, []);

    const nextPage = useCallback(() => {
      const totalPages = state.pagination.totalPages ?? 0;
      if (state.pagination.currentPage < totalPages) {
        goToPage(state.pagination.currentPage + 1);
      }
    }, [state.pagination.currentPage, state.pagination.totalPages]);

    const prevPage = useCallback(() => {
      if (state.pagination.currentPage > 1) {
        goToPage(state.pagination.currentPage - 1);
      }
    }, [state.pagination.currentPage]);

    return [
      { 
        data: state.data, 
        loading: state.loading, 
        error: state.error,
        pagination: state.pagination
      },
      { 
        search,
        goToPage: handleGoToPage,
        nextPage,
        prevPage,
        setPageSize: handleSetPageSize
      }
    ] as const;
  };
}