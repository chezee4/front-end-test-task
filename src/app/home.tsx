import React, { useMemo } from 'react';

import CatCard from '@/components/CatCard';
import Chart from '@/components/Chart';
import { InputField } from '@/components/Input';
import { useFilteredCats } from '@/hooks/useFilteredCats';
import { useGetBreedsQuery } from '@/store/services/breedsApi';

const HomePage: React.FC = () => {
  const { data: cats = [], isLoading, error } = useGetBreedsQuery();
  const { filteredData, filters, updateFilters } = useFilteredCats(cats);

  const adaptabilityData = useMemo(
    () =>
      filteredData.map((cat) => ({
        name: cat.name,
        value: Math.random() * 10,
      })),
    [filteredData],
  );

  const affectionData = useMemo(
    () =>
      filteredData.map((cat) => ({
        name: cat.name,
        value: Math.random() * 10,
      })),
    [filteredData],
  );

  const originData = useMemo(
    () =>
      filteredData.map((cat) => ({
        name: cat.origin || 'Unknown',
        value: Math.random() * 10,
      })),
    [filteredData],
  );

  const indoorData = useMemo(() => {
    const indoorCount = filteredData.reduce(
      (acc, cat) => {
        if (cat.indoor === 1) {
          acc.indoor += 1;
        } else {
          acc.outdoor += 1;
        }
        return acc;
      },
      { indoor: 0, outdoor: 0 },
    );

    return [
      { name: 'Indoor', value: indoorCount.indoor },
      { name: 'Outdoor', value: indoorCount.outdoor },
    ];
  }, [filteredData]);

  const lapData = useMemo(
    () => [
      { name: 'Lap Cat', value: Math.random() * 100 },
      { name: 'Not Lap Cat', value: Math.random() * 100 },
    ],
    [],
  );

  const lifeSpanData = useMemo(
    () =>
      filteredData.map((cat) => ({
        name: cat.name,
        years: Math.random() * 2000,
      })),
    [filteredData],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading cats data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Chart
          title="Adaptability Distribution"
          type="bar"
          data={adaptabilityData}
          dataKey="value"
        />
        <Chart
          title="Affection Levels"
          type="bar"
          data={affectionData}
          dataKey="value"
        />
        <Chart
          title="Top Origins"
          type="pie"
          data={originData.slice(0, 10)}
          dataKey="value"
          nameKey="name"
        />
        <Chart
          title="Indoor vs Outdoor Preference"
          type="pie"
          data={indoorData}
          dataKey="value"
          nameKey="name"
        />
        <Chart
          title="Lap Cat Distribution"
          type="pie"
          data={lapData}
          dataKey="value"
          nameKey="name"
        />
        <Chart
          title="Life Span Distribution"
          type="line"
          data={lifeSpanData}
          dataKey="years"
        />
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          type="text"
          label="Search by name"
          id="name"
          className="py-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter cat name"
          value={filters.name}
          onChange={(e) => updateFilters('name', e.target.value)}
        />
        <div>
          <label htmlFor="origin" className="block text-sm font-medium mb-2">
            Filter by Origin
          </label>
          <select
            id="origin"
            className="py-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.origin}
            onChange={(e) => updateFilters('origin', e.target.value)}
          >
            <option value="">All Origins</option>
            {[...new Set(cats.map((cat) => cat.origin))].map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((cat) => (
          <CatCard
            key={cat.name}
            name={cat.name}
            origin={cat.origin}
            description={cat.description}
            adaptability={cat.adaptability}
            affectionLevel={cat.affection_level}
            lifeSpan={cat.life_span}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
