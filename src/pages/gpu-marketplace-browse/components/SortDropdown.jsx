import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'performance', label: 'Performance Score' },
    { value: 'distance', label: 'Distance: Nearest First' },
    { value: 'rating', label: 'Provider Rating' },
    { value: 'availability', label: 'Available First' },
    { value: 'newest', label: 'Newest Listings' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        className="min-w-40"
      />
    </div>
  );
};

export default SortDropdown;