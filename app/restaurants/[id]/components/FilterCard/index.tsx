'use client';
import './index.scss';

interface FilterCardProps {
  value: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  isSelected: boolean;
}

const FilterCard = ({ value, setFilter, isSelected }: FilterCardProps) => {
  return (
    <div
      className={`filter-card ${isSelected ? 'selected' : ''}`}
      onClick={() => setFilter(value)}
    >
      {value}
    </div>
  );
};

export default FilterCard;
