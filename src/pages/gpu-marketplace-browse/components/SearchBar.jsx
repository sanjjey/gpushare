import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onFilterToggle, isFilterOpen }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e?.target?.value);
    // Real-time search for better UX
    onSearchChange(e?.target?.value);
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  return (
    <div className="bg-card border-b border-border p-4 sticky top-16 z-40">
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Icon name="Search" size={20} />
          </div>
          <Input
            type="text"
            placeholder="Search GPUs by model, brand, or specifications..."
            value={localQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={onFilterToggle}
          className={`flex items-center space-x-2 ${isFilterOpen ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <Icon name="Filter" size={18} />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;