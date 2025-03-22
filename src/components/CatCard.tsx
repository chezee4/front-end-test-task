import React from 'react';

interface CatCardProps {
  name: string;
  origin: string;
  description: string;
  adaptability: number;
  affectionLevel: number;
  lifeSpan: string;
}

const CatCard: React.FC<CatCardProps> = ({
  name,
  origin,
  description,
  adaptability,
  affectionLevel,
  lifeSpan,
}) => {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
          Origin: {origin || 'Unknown'}
        </span>
        <p className="mt-3 text-gray-500 line-clamp-3">
          {description || 'No description available'}
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Adaptability:</span>
            <span>{adaptability}/5</span>
          </div>
          <div className="flex justify-between">
            <span>Affection Level:</span>
            <span>{affectionLevel}/5</span>
          </div>
          <div className="flex justify-between">
            <span>Life Span:</span>
            <span>{lifeSpan} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
