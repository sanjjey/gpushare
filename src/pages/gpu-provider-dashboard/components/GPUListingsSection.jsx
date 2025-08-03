import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import GPUListingCard from './GPUListingCard';

const GPUListingsSection = ({ gpus, onToggleAvailability, onEdit, onViewAnalytics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'rented', label: 'Rented' },
    { value: 'offline', label: 'Offline' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'hourlyRate', label: 'Hourly Rate' },
    { value: 'totalEarned', label: 'Total Earned' },
    { value: 'status', label: 'Status' }
  ];

  const filteredAndSortedGPUs = gpus?.filter(gpu => {
      const matchesSearch = gpu?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           gpu?.model?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = filterStatus === 'all' || gpu?.status === filterStatus;
      return matchesSearch && matchesStatus;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'hourlyRate':
          return b?.hourlyRate - a?.hourlyRate;
        case 'totalEarned':
          return b?.totalEarned - a?.totalEarned;
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const getStatusCount = (status) => {
    if (status === 'all') return gpus?.length;
    return gpus?.filter(gpu => gpu?.status === status)?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">GPU Listings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your {gpus?.length} GPU{gpus?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => console.log('Add new GPU')}
        >
          Add New GPU
        </Button>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search GPUs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label} ({getStatusCount(option?.value)})
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statusOptions?.slice(1)?.map(status => (
          <div key={status.value} className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">{getStatusCount(status.value)}</p>
            <p className="text-sm text-muted-foreground">{status.label}</p>
          </div>
        ))}
      </div>
      {/* GPU Cards */}
      <div className="space-y-4">
        {filteredAndSortedGPUs?.length > 0 ? (
          filteredAndSortedGPUs?.map((gpu) => (
            <GPUListingCard
              key={gpu?.id}
              gpu={gpu}
              onToggleAvailability={onToggleAvailability}
              onEdit={onEdit}
              onViewAnalytics={onViewAnalytics}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No GPUs found</p>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filters' :'Get started by adding your first GPU listing'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => console.log('Add first GPU')}
              >
                Add Your First GPU
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Load More */}
      {filteredAndSortedGPUs?.length > 0 && filteredAndSortedGPUs?.length >= 10 && (
        <div className="mt-6 text-center">
          <Button variant="outline">
            Load More GPUs
          </Button>
        </div>
      )}
    </div>
  );
};

export default GPUListingsSection;