import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilters = ({ onSearch, onFilterChange, isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gpuType: '',
    priceRange: '',
    location: '',
    performance: '',
    availability: 'available',
    provider: ''
  });

  const gpuTypeOptions = [
    { value: '', label: 'All GPU Types' },
    { value: 'rtx-4090', label: 'RTX 4090' },
    { value: 'rtx-4080', label: 'RTX 4080' },
    { value: 'rtx-4070', label: 'RTX 4070' },
    { value: 'rtx-3080', label: 'RTX 3080' },
    { value: 'rtx-3070', label: 'RTX 3070' },
    { value: 'rx-7900-xtx', label: 'RX 7900 XTX' },
    { value: 'rx-7800-xt', label: 'RX 7800 XT' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-2', label: '$0 - $2/hour' },
    { value: '2-4', label: '$2 - $4/hour' },
    { value: '4-6', label: '$4 - $6/hour' },
    { value: '6+', label: '$6+/hour' }
  ];

  const locationOptions = [
    { value: '', label: 'Any Location' },
    { value: 'us-west', label: 'US West Coast' },
    { value: 'us-east', label: 'US East Coast' },
    { value: 'us-central', label: 'US Central' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia Pacific' }
  ];

  const performanceOptions = [
    { value: '', label: 'Any Performance' },
    { value: '90+', label: '90+ Score' },
    { value: '80-90', label: '80-90 Score' },
    { value: '70-80', label: '70-80 Score' },
    { value: '60-70', label: '60-70 Score' }
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available Now' },
    { value: 'all', label: 'All GPUs' },
    { value: 'busy', label: 'Currently Busy' }
  ];

  const providerOptions = [
    { value: '', label: 'Any Provider' },
    { value: 'verified', label: 'Verified Only' },
    { value: '4.5+', label: '4.5+ Rating' },
    { value: '4.0+', label: '4.0+ Rating' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      gpuType: '',
      priceRange: '',
      location: '',
      performance: '',
      availability: 'available',
      provider: ''
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'available')?.length;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search GPUs by model, provider, or location..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>
      {/* Filter Toggle for Mobile */}
      {isMobile && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconPosition="left"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>
      )}
      {/* Filters */}
      <div className={`${isMobile ? (showFilters ? 'block' : 'hidden') : 'block'} space-y-4`}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Select
            label="GPU Type"
            options={gpuTypeOptions}
            value={filters?.gpuType}
            onChange={(value) => handleFilterChange('gpuType', value)}
            placeholder="Select GPU"
          />

          <Select
            label="Price Range"
            options={priceRangeOptions}
            value={filters?.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            placeholder="Select price"
          />

          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder="Select location"
          />

          <Select
            label="Performance"
            options={performanceOptions}
            value={filters?.performance}
            onChange={(value) => handleFilterChange('performance', value)}
            placeholder="Select performance"
          />

          <Select
            label="Availability"
            options={availabilityOptions}
            value={filters?.availability}
            onChange={(value) => handleFilterChange('availability', value)}
          />

          <Select
            label="Provider"
            options={providerOptions}
            value={filters?.provider}
            onChange={(value) => handleFilterChange('provider', value)}
            placeholder="Select provider"
          />
        </div>

        {/* Desktop Clear Filters */}
        {!isMobile && getActiveFilterCount() > 0 && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All Filters ({getActiveFilterCount()})
            </Button>
          </div>
        )}
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">Quick filters:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('gpuType', 'rtx-4090')}
          className="text-xs"
        >
          RTX 4090
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('priceRange', '0-2')}
          className="text-xs"
        >
          Budget (&lt; $2/hr)
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('performance', '90+')}
          className="text-xs"
        >
          High Performance
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('provider', 'verified')}
          className="text-xs"
        >
          Verified Providers
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilters;