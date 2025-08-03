import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GPUMarketplaceGrid = ({ onRentGPU, onViewDetails, onToggleFavorite, filters = {} }) => {
  const [gpuListings, setGpuListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const mockGPUListings = [
      {
        id: 1,
        model: 'NVIDIA RTX 4090',
        vram: '24GB GDDR6X',
        performanceScore: 98,
        provider: 'TechGuru_92',
        providerRating: 4.8,
        location: 'San Francisco, CA',
        hourlyRate: 4.50,
        dailyRate: 95.00,
        monthlyRate: 2850.00,
        availability: 'available',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
        specs: {
          cudaCores: 16384,
          baseClock: '2230 MHz',
          boostClock: '2520 MHz',
          memoryBandwidth: '1008 GB/s'
        },
        tags: ['Gaming', 'AI/ML', 'Rendering'],
        verified: true
      },
      {
        id: 2,
        model: 'NVIDIA RTX 4080',
        vram: '16GB GDDR6X',
        performanceScore: 89,
        provider: 'CloudMiner_Pro',
        providerRating: 4.6,
        location: 'Austin, TX',
        hourlyRate: 3.75,
        dailyRate: 78.00,
        monthlyRate: 2340.00,
        availability: 'available',
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
        specs: {
          cudaCores: 9728,
          baseClock: '2205 MHz',
          boostClock: '2505 MHz',
          memoryBandwidth: '716.8 GB/s'
        },
        tags: ['Gaming', 'AI/ML'],
        verified: true
      },
      {
        id: 3,
        model: 'NVIDIA RTX 3080',
        vram: '10GB GDDR6X',
        performanceScore: 82,
        provider: 'GPUHost_Elite',
        providerRating: 4.9,
        location: 'Seattle, WA',
        hourlyRate: 3.25,
        dailyRate: 65.00,
        monthlyRate: 1950.00,
        availability: 'busy',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop',
        specs: {
          cudaCores: 8704,
          baseClock: '1440 MHz',
          boostClock: '1710 MHz',
          memoryBandwidth: '760.3 GB/s'
        },
        tags: ['Gaming', 'Streaming'],
        verified: true
      },
      {
        id: 4,
        model: 'AMD RX 7900 XTX',
        vram: '24GB GDDR6',
        performanceScore: 85,
        provider: 'RedTeam_Builder',
        providerRating: 4.4,
        location: 'Denver, CO',
        hourlyRate: 3.50,
        dailyRate: 70.00,
        monthlyRate: 2100.00,
        availability: 'available',
        lastSeen: new Date(Date.now() - 8 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop',
        specs: {
          streamProcessors: 6144,
          baseClock: '1855 MHz',
          boostClock: '2500 MHz',
          memoryBandwidth: '960 GB/s'
        },
        tags: ['Gaming', 'Content Creation'],
        verified: false
      },
      {
        id: 5,
        model: 'NVIDIA RTX 3070',
        vram: '8GB GDDR6',
        performanceScore: 75,
        provider: 'BudgetGPU_Hub',
        providerRating: 4.2,
        location: 'Phoenix, AZ',
        hourlyRate: 2.75,
        dailyRate: 55.00,
        monthlyRate: 1650.00,
        availability: 'available',
        lastSeen: new Date(Date.now() - 3 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
        specs: {
          cudaCores: 5888,
          baseClock: '1500 MHz',
          boostClock: '1725 MHz',
          memoryBandwidth: '448 GB/s'
        },
        tags: ['Gaming', 'Budget'],
        verified: true
      },
      {
        id: 6,
        model: 'NVIDIA RTX 4070',
        vram: '12GB GDDR6X',
        performanceScore: 80,
        provider: 'NextGen_Rigs',
        providerRating: 4.7,
        location: 'Miami, FL',
        hourlyRate: 3.00,
        dailyRate: 60.00,
        monthlyRate: 1800.00,
        availability: 'available',
        lastSeen: new Date(Date.now() - 1 * 60 * 1000),
        thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=300&fit=crop',
        specs: {
          cudaCores: 5888,
          baseClock: '1920 MHz',
          boostClock: '2475 MHz',
          memoryBandwidth: '504.2 GB/s'
        },
        tags: ['Gaming', 'AI/ML'],
        verified: true
      }
    ];

    setTimeout(() => {
      setGpuListings(mockGPUListings);
      setLoading(false);
    }, 1000);
  }, []);

  const getAvailabilityStatus = (availability, lastSeen) => {
    const minutesAgo = Math.floor((Date.now() - lastSeen?.getTime()) / 60000);
    
    switch (availability) {
      case 'available':
        return {
          status: 'Available',
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle'
        };
      case 'busy':
        return {
          status: 'Busy',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'Clock'
        };
      case 'offline':
        return {
          status: 'Offline',
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'XCircle'
        };
      default:
        return {
          status: 'Unknown',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'HelpCircle'
        };
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleToggleFavorite = (gpuId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites?.has(gpuId)) {
      newFavorites?.delete(gpuId);
    } else {
      newFavorites?.add(gpuId);
    }
    setFavorites(newFavorites);
    if (onToggleFavorite) {
      onToggleFavorite(gpuId, newFavorites?.has(gpuId));
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-minimal animate-pulse">
            <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Available GPUs</h2>
        <span className="text-sm text-muted-foreground">
          {gpuListings?.filter(gpu => gpu?.availability === 'available')?.length} available
        </span>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gpuListings?.map((gpu) => {
          const availabilityInfo = getAvailabilityStatus(gpu?.availability, gpu?.lastSeen);
          const isFavorite = favorites?.has(gpu?.id);

          return (
            <div key={gpu?.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-minimal hover:shadow-lg transition-shadow">
              {/* GPU Image */}
              <div className="relative">
                <div className="w-full h-32 overflow-hidden">
                  <Image
                    src={gpu?.thumbnail}
                    alt={gpu?.model}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleToggleFavorite(gpu?.id)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className={isFavorite ? 'text-error fill-current' : 'text-white'} 
                  />
                </button>
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${availabilityInfo?.bgColor} ${availabilityInfo?.color}`}>
                  <div className="flex items-center space-x-1">
                    <Icon name={availabilityInfo?.icon} size={12} />
                    <span>{availabilityInfo?.status}</span>
                  </div>
                </div>
              </div>
              {/* GPU Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">{gpu?.model}</h3>
                  {gpu?.verified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">VRAM</span>
                    <span className="font-medium text-foreground">{gpu?.vram}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Performance</span>
                    <span className={`font-medium ${getPerformanceColor(gpu?.performanceScore)}`}>
                      {gpu?.performanceScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground truncate ml-2">{gpu?.location}</span>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground truncate">{gpu?.provider}</span>
                  <div className="flex items-center">
                    <Icon name="Star" size={10} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground ml-1">{gpu?.providerRating}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {gpu?.tags?.slice(0, 2)?.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="text-lg font-bold text-foreground">
                    ${gpu?.hourlyRate}/hour
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${gpu?.dailyRate}/day • ${gpu?.monthlyRate}/month
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    disabled={gpu?.availability !== 'available'}
                    onClick={() => onRentGPU(gpu)}
                    iconName="Play"
                    iconPosition="left"
                  >
                    {gpu?.availability === 'available' ? 'Rent Now' : 'Unavailable'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(gpu)}
                    iconName="Eye"
                  >
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GPUMarketplaceGrid;