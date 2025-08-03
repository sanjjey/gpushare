import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, isMobile }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const gpuTypeOptions = [
    { value: 'rtx-4090', label: 'RTX 4090' },
    { value: 'rtx-4080', label: 'RTX 4080' },
    { value: 'rtx-4070', label: 'RTX 4070' },
    { value: 'rtx-3090', label: 'RTX 3090' },
    { value: 'rtx-3080', label: 'RTX 3080' },
    { value: 'rtx-3070', label: 'RTX 3070' },
    { value: 'gtx-1080', label: 'GTX 1080' },
    { value: 'rx-7900', label: 'RX 7900 XTX' },
    { value: 'rx-6800', label: 'RX 6800 XT' }
  ];

  const performanceTierOptions = [
    { value: 'flagship', label: 'Flagship (90-100)' },
    { value: 'high-end', label: 'High-End (80-89)' },
    { value: 'mid-range', label: 'Mid-Range (70-79)' },
    { value: 'entry-level', label: 'Entry Level (60-69)' }
  ];

  const priceRangeOptions = [
    { value: '0-5', label: '$0 - $5/hour' },
    { value: '5-10', label: '$5 - $10/hour' },
    { value: '10-20', label: '$10 - $20/hour' },
    { value: '20-50', label: '$20 - $50/hour' },
    { value: '50+', label: '$50+/hour' }
  ];

  const locationOptions = [
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: '100', label: 'Within 100 miles' },
    { value: 'anywhere', label: 'Anywhere' }
  ];

  const availabilityOptions = [
    { value: 'now', label: 'Available Now' },
    { value: 'today', label: 'Available Today' },
    { value: 'week', label: 'Available This Week' },
    { value: 'month', label: 'Available This Month' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCheckboxChange = (key, value, checked) => {
    const currentValues = localFilters?.[key] || [];
    const updatedValues = checked 
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    handleFilterChange(key, updatedValues);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      gpuTypes: [],
      performanceTiers: [],
      priceRanges: [],
      location: '',
      availability: '',
      minRating: 0,
      verifiedOnly: false,
      instantBook: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.gpuTypes?.length) count += localFilters?.gpuTypes?.length;
    if (localFilters?.performanceTiers?.length) count += localFilters?.performanceTiers?.length;
    if (localFilters?.priceRanges?.length) count += localFilters?.priceRanges?.length;
    if (localFilters?.location) count += 1;
    if (localFilters?.availability) count += 1;
    if (localFilters?.minRating > 0) count += 1;
    if (localFilters?.verifiedOnly) count += 1;
    if (localFilters?.instantBook) count += 1;
    return count;
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-medium text-foreground">{title}</h3>
          <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </button>
        {isOpen && <div className="space-y-3">{children}</div>}
      </div>
    );
  };

  const panelContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* GPU Type */}
        <FilterSection title="GPU Type">
          <div className="grid grid-cols-1 gap-2">
            {gpuTypeOptions?.map(option => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={localFilters?.gpuTypes?.includes(option?.value) || false}
                onChange={(e) => handleCheckboxChange('gpuTypes', option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Performance Tier */}
        <FilterSection title="Performance Tier">
          <div className="grid grid-cols-1 gap-2">
            {performanceTierOptions?.map(option => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={localFilters?.performanceTiers?.includes(option?.value) || false}
                onChange={(e) => handleCheckboxChange('performanceTiers', option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="grid grid-cols-1 gap-2">
            {priceRangeOptions?.map(option => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={localFilters?.priceRanges?.includes(option?.value) || false}
                onChange={(e) => handleCheckboxChange('priceRanges', option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection title="Location">
          <Select
            placeholder="Select distance"
            options={locationOptions}
            value={localFilters?.location || ''}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <Select
            placeholder="Select availability"
            options={availabilityOptions}
            value={localFilters?.availability || ''}
            onChange={(value) => handleFilterChange('availability', value)}
          />
        </FilterSection>

        {/* Provider Options */}
        <FilterSection title="Provider Options">
          <div className="space-y-3">
            <Checkbox
              label="Verified Providers Only"
              checked={localFilters?.verifiedOnly || false}
              onChange={(e) => handleFilterChange('verifiedOnly', e?.target?.checked)}
            />
            <Checkbox
              label="Instant Booking Available"
              checked={localFilters?.instantBook || false}
              onChange={(e) => handleFilterChange('instantBook', e?.target?.checked)}
            />
          </div>
        </FilterSection>

        {/* Minimum Rating */}
        <FilterSection title="Minimum Rating">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map(rating => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="minRating"
                  value={rating}
                  checked={localFilters?.minRating === rating}
                  onChange={() => handleFilterChange('minRating', rating)}
                  className="text-primary"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground">& up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose} />
        )}
        <div className={`fixed top-0 right-0 bottom-0 w-80 bg-card border-l border-border shadow-elevation-3 z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {panelContent}
        </div>
      </>
    );
  }

  return (
    <div className={`w-80 bg-card border-r border-border ${isOpen ? 'block' : 'hidden'}`}>
      {panelContent}
    </div>
  );
};

export default FilterPanel;