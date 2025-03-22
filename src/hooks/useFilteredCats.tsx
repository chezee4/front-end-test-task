import { useState, useMemo } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

interface CatFilter {
  name: string;
  origin: string;
}

export const useFilteredCats = <T extends CatFilter>(cats: T[]) => {
  const [filters, setFilters] = useState<CatFilter>({
    name: '',
    origin: '',
  });

  const debouncedSearchTerm = useDebounce<string>(filters.name, 300);

  const filteredData = useMemo(() => {
    return cats.filter((cat) => {
      const matchesName = cat.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesOrigin = filters.origin
        ? cat.origin === filters.origin
        : true;
      return matchesName && matchesOrigin;
    });
  }, [cats, debouncedSearchTerm, filters.origin]);

  const updateFilters = (key: keyof CatFilter, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return {
    filteredData,
    filters,
    updateFilters,
  };
};
