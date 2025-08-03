import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onFilterRemove, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // GPU Types
    if (filters?.gpuTypes?.length) {
      filters?.gpuTypes?.forEach(type => {
        chips?.push({
          key: `gpuTypes-${type}`,
          label: type?.toUpperCase()?.replace('-', ' '),
          onRemove: () => onFilterRemove('gpuTypes', type)
        });
      });
    }

    // Performance Tiers
    if (filters?.performanceTiers?.length) {
      filters?.performanceTiers?.forEach(tier => {
        const tierLabels = {
          'flagship': 'Flagship',
          'high-end': 'High-End',
          'mid-range': 'Mid-Range',
          'entry-level': 'Entry Level'
        };
        chips?.push({
          key: `performanceTiers-${tier}`,
          label: tierLabels?.[tier] || tier,
          onRemove: () => onFilterRemove('performanceTiers', tier)
        });
      });
    }

    // Price Ranges
    if (filters?.priceRanges?.length) {
      filters?.priceRanges?.forEach(range => {
        const rangeLabels = {
          '0-5': '$0-$5/hr',
          '5-10': '$5-$10/hr',
          '10-20': '$10-$20/hr',
          '20-50': '$20-$50/hr',
          '50+': '$50+/hr'
        };
        chips?.push({
          key: `priceRanges-${range}`,
          label: rangeLabels?.[range] || range,
          onRemove: () => onFilterRemove('priceRanges', range)
        });
      });
    }

    // Location
    if (filters?.location) {
      const locationLabels = {
        '10': 'Within 10 miles',
        '25': 'Within 25 miles',
        '50': 'Within 50 miles',
        '100': 'Within 100 miles',
        'anywhere': 'Anywhere'
      };
      chips?.push({
        key: 'location',
        label: locationLabels?.[filters?.location] || filters?.location,
        onRemove: () => onFilterRemove('location')
      });
    }

    // Availability
    if (filters?.availability) {
      const availabilityLabels = {
        'now': 'Available Now',
        'today': 'Available Today',
        'week': 'This Week',
        'month': 'This Month'
      };
      chips?.push({
        key: 'availability',
        label: availabilityLabels?.[filters?.availability] || filters?.availability,
        onRemove: () => onFilterRemove('availability')
      });
    }

    // Minimum Rating
    if (filters?.minRating > 0) {
      chips?.push({
        key: 'minRating',
        label: `${filters?.minRating}+ Stars`,
        onRemove: () => onFilterRemove('minRating')
      });
    }

    // Verified Only
    if (filters?.verifiedOnly) {
      chips?.push({
        key: 'verifiedOnly',
        label: 'Verified Only',
        onRemove: () => onFilterRemove('verifiedOnly')
      });
    }

    // Instant Book
    if (filters?.instantBook) {
      chips?.push({
        key: 'instantBook',
        label: 'Instant Booking',
        onRemove: () => onFilterRemove('instantBook')
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 border-b border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">
          Active Filters ({filterChips?.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterChips?.map(chip => (
          <div
            key={chip?.key}
            className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{chip?.label}</span>
            <button
              onClick={chip?.onRemove}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;