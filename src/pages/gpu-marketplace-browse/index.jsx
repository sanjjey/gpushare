import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import GPUCard from './components/GPUCard';
import SortDropdown from './components/SortDropdown';
import ActiveFilters from './components/ActiveFilters';
import ViewToggle from './components/ViewToggle';
import ComparisonBar from './components/ComparisonBar';
import MapView from './components/MapView';
import LoadingSpinner from './components/LoadingSpinner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GPUMarketplaceBrowse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentView, setCurrentView] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(true);
  const [comparedGPUs, setComparedGPUs] = useState([]);
  const [filters, setFilters] = useState({
    gpuTypes: [],
    performanceTiers: [],
    priceRanges: [],
    location: '',
    availability: '',
    minRating: 0,
    verifiedOnly: false,
    instantBook: false
  });

  // Mock GPU data
  const [gpus, setGpus] = useState([]);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Simulate loading GPUs
    setTimeout(() => {
      const mockGPUs = [
        {
          id: 1,
          brand: 'NVIDIA',
          model: 'RTX 4090',
          memory: 24,
          architecture: 'Ada Lovelace',
          image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
          availability: 'available',
          performanceScore: 98,
          powerConsumption: 450,
          temperature: 65,
          clockSpeed: 2520,
          bandwidth: 1008,
          cudaCores: 16384,
          rtCores: 128,
          tensorCores: 512,
          memoryType: 'GDDR6X',
          location: 'San Francisco, CA',
          distance: 2.5,
          pricing: {
            hourly: 12.50,
            daily: 250.00,
            monthly: 6500.00
          },
          provider: {
            id: 1,
            name: 'TechGuru92',
            rating: 4.9,
            reviewCount: 127,
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          instantBooking: true,
          uptime: 99.2,
          lastActive: '2 mins ago'
        },
        {
          id: 2,
          brand: 'NVIDIA',
          model: 'RTX 4080',
          memory: 16,
          architecture: 'Ada Lovelace',
          image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
          availability: 'available',
          performanceScore: 89,
          powerConsumption: 320,
          temperature: 62,
          clockSpeed: 2505,
          bandwidth: 717,
          cudaCores: 9728,
          rtCores: 76,
          tensorCores: 304,
          memoryType: 'GDDR6X',
          location: 'Los Angeles, CA',
          distance: 8.2,
          pricing: {
            hourly: 8.75,
            daily: 175.00,
            monthly: 4500.00
          },
          provider: {
            id: 2,
            name: 'GPUMaster',
            rating: 4.7,
            reviewCount: 89,
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          instantBooking: false,
          uptime: 97.8,
          lastActive: '15 mins ago'
        },
        {
          id: 3,
          brand: 'AMD',
          model: 'RX 7900 XTX',
          memory: 24,
          architecture: 'RDNA 3',
          image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop',
          availability: 'busy',
          performanceScore: 85,
          powerConsumption: 355,
          temperature: 68,
          clockSpeed: 2500,
          bandwidth: 960,
          cudaCores: 6144,
          rtCores: 96,
          tensorCores: 192,
          memoryType: 'GDDR6',
          location: 'Seattle, WA',
          distance: 12.7,
          pricing: {
            hourly: 7.25,
            daily: 145.00,
            monthly: 3800.00
          },
          provider: {
            id: 3,
            name: 'RedTeamFan',
            rating: 4.5,
            reviewCount: 56,
            verified: false,
            avatar: null
          },
          instantBooking: true,
          uptime: 95.5,
          lastActive: '1 hour ago'
        },
        {
          id: 4,
          brand: 'NVIDIA',
          model: 'RTX 4070',
          memory: 12,
          architecture: 'Ada Lovelace',
          image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop',
          availability: 'available',
          performanceScore: 78,
          powerConsumption: 200,
          temperature: 58,
          clockSpeed: 2475,
          bandwidth: 504,
          cudaCores: 5888,
          rtCores: 46,
          tensorCores: 184,
          memoryType: 'GDDR6X',
          location: 'Portland, OR',
          distance: 18.3,
          pricing: {
            hourly: 5.50,
            daily: 110.00,
            monthly: 2800.00
          },
          provider: {
            id: 4,
            name: 'BuilderPro',
            rating: 4.8,
            reviewCount: 203,
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
          },
          instantBooking: true,
          uptime: 98.7,
          lastActive: '5 mins ago'
        },
        {
          id: 5,
          brand: 'NVIDIA',
          model: 'RTX 3090',
          memory: 24,
          architecture: 'Ampere',
          image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
          availability: 'offline',
          performanceScore: 82,
          powerConsumption: 350,
          temperature: 70,
          clockSpeed: 1695,
          bandwidth: 936,
          cudaCores: 10496,
          rtCores: 82,
          tensorCores: 328,
          memoryType: 'GDDR6X',
          location: 'Denver, CO',
          distance: 25.1,
          pricing: {
            hourly: 6.75,
            daily: 135.00,
            monthly: 3500.00
          },
          provider: {
            id: 5,
            name: 'CryptoMiner',
            rating: 4.2,
            reviewCount: 34,
            verified: false,
            avatar: null
          },
          instantBooking: false,
          uptime: 92.3,
          lastActive: '2 hours ago'
        },
        {
          id: 6,
          brand: 'NVIDIA',
          model: 'RTX 3080',
          memory: 10,
          architecture: 'Ampere',
          image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
          availability: 'available',
          performanceScore: 75,
          powerConsumption: 320,
          temperature: 72,
          clockSpeed: 1710,
          bandwidth: 760,
          cudaCores: 8704,
          rtCores: 68,
          tensorCores: 272,
          memoryType: 'GDDR6X',
          location: 'Austin, TX',
          distance: 32.8,
          pricing: {
            hourly: 4.25,
            daily: 85.00,
            monthly: 2200.00
          },
          provider: {
            id: 6,
            name: 'GameDevStudio',
            rating: 4.6,
            reviewCount: 78,
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
          },
          instantBooking: true,
          uptime: 96.8,
          lastActive: '10 mins ago'
        }
      ];
      setGpus(mockGPUs);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterRemove = (filterType, value) => {
    const updatedFilters = { ...filters };
    
    if (Array.isArray(updatedFilters?.[filterType])) {
      updatedFilters[filterType] = updatedFilters?.[filterType]?.filter(item => item !== value);
    } else {
      updatedFilters[filterType] = filterType === 'minRating' ? 0 : '';
    }
    
    setFilters(updatedFilters);
  };

  const handleClearAllFilters = () => {
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
    setFilters(clearedFilters);
  };

  const handleCompareToggle = (gpu) => {
    const isAlreadyCompared = comparedGPUs?.find(g => g?.id === gpu?.id);
    
    if (isAlreadyCompared) {
      setComparedGPUs(comparedGPUs?.filter(g => g?.id !== gpu?.id));
    } else if (comparedGPUs?.length < 3) {
      setComparedGPUs([...comparedGPUs, gpu]);
    }
  };

  const handleRemoveFromComparison = (gpu) => {
    setComparedGPUs(comparedGPUs?.filter(g => g?.id !== gpu?.id));
  };

  const handleCompare = () => {
    if (comparedGPUs?.length >= 2) {
      // The comparison functionality is now handled by the ComparisonBar component
      console.log('Comparison functionality activated');
    }
  };

  const handleClearComparison = () => {
    setComparedGPUs([]);
  };

  const handleNavigation = (navData) => {
    if (navData?.path) {
      navigate(navData?.path);
    } else if (navData?.action === 'logout') {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/user-registration-login');
    } else if (navData?.action === 'profile') {
      navigate('/user-profile-account-settings');
    } else if (navData?.action === 'dashboard') {
      // Navigate to appropriate dashboard based on user role
      const userRole = user?.role || 'renter';
      if (userRole === 'provider') {
        navigate('/gpu-provider-dashboard');
      } else {
        navigate('/gpu-renter-dashboard');
      }
    }
  };

  const filteredGPUs = gpus?.filter(gpu => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const matchesSearch = 
        gpu?.brand?.toLowerCase()?.includes(query) ||
        gpu?.model?.toLowerCase()?.includes(query) ||
        gpu?.architecture?.toLowerCase()?.includes(query) ||
        gpu?.location?.toLowerCase()?.includes(query);
      
      if (!matchesSearch) return false;
    }

    // GPU type filter
    if (filters?.gpuTypes?.length > 0) {
      const gpuType = `${gpu?.brand?.toLowerCase()}-${gpu?.model?.toLowerCase()}`?.replace(/\s+/g, '-');
      if (!filters?.gpuTypes?.some(type => gpuType?.includes(type))) return false;
    }

    // Availability filter
    if (filters?.availability) {
      const availabilityMap = {
        'now': 'available',
        'today': 'available',
        'week': ['available', 'busy'],
        'month': ['available', 'busy', 'offline']
      };
      
      const allowedStatuses = Array.isArray(availabilityMap?.[filters?.availability]) 
        ? availabilityMap?.[filters?.availability] 
        : [availabilityMap?.[filters?.availability]];
      
      if (!allowedStatuses?.includes(gpu?.availability)) return false;
    }

    // Price range filter
    if (filters?.priceRanges?.length > 0) {
      const hourlyPrice = gpu?.pricing?.hourly;
      const matchesPrice = filters?.priceRanges?.some(range => {
        switch (range) {
          case '0-5': return hourlyPrice >= 0 && hourlyPrice <= 5;
          case '5-10': return hourlyPrice > 5 && hourlyPrice <= 10;
          case '10-20': return hourlyPrice > 10 && hourlyPrice <= 20;
          case '20-50': return hourlyPrice > 20 && hourlyPrice <= 50;
          case '50+': return hourlyPrice > 50;
          default: return false;
        }
      });
      if (!matchesPrice) return false;
    }

    // Minimum rating filter
    if (filters?.minRating > 0) {
      if (gpu?.provider?.rating < filters?.minRating) return false;
    }

    // Verified only filter
    if (filters?.verifiedOnly && !gpu?.provider?.verified) return false;

    // Instant booking filter
    if (filters?.instantBook && !gpu?.instantBooking) return false;

    return true;
  });

  const sortedGPUs = [...filteredGPUs]?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a?.pricing?.hourly - b?.pricing?.hourly;
      case 'price-high':
        return b?.pricing?.hourly - a?.pricing?.hourly;
      case 'performance':
        return b?.performanceScore - a?.performanceScore;
      case 'distance':
        return a?.distance - b?.distance;
      case 'rating':
        return b?.provider?.rating - a?.provider?.rating;
      case 'availability':
        const availabilityOrder = { 'available': 0, 'busy': 1, 'offline': 2 };
        return availabilityOrder?.[a?.availability] - availabilityOrder?.[b?.availability];
      case 'newest':
        return b?.id - a?.id; // Assuming higher ID means newer
      default:
        return 0; // relevance - keep original order
    }
  });

  const getGridColumns = () => {
    switch (currentView) {
      case 'list':
        return 'grid-cols-1';
      case 'map':
        return 'grid-cols-1';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        user={user} 
        onNavigate={handleNavigation}
        notificationCount={3}
      />
      <div className="pt-16">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterToggle={handleFilterToggle}
          isFilterOpen={isFilterOpen}
        />

        <ActiveFilters
          filters={filters}
          onFilterRemove={handleFilterRemove}
          onClearAll={handleClearAllFilters}
        />

        <div className="flex">
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isMobile={window.innerWidth < 768}
          />

          <main className="flex-1 p-6">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Browse GPUs
                </h1>
                <span className="text-muted-foreground">
                  {sortedGPUs?.length} results
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />
              </div>
            </div>

            {/* Content */}
            {isLoading ? (
              <LoadingSpinner />
            ) : currentView === 'map' ? (
              <div className="h-96 lg:h-[600px]">
                <MapView
                  gpus={sortedGPUs}
                  onGPUSelect={(gpu) => console.log('Selected GPU:', gpu)}
                />
              </div>
            ) : (
              <>
                {sortedGPUs?.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No GPUs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button variant="outline" onClick={handleClearAllFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${getGridColumns()}`}>
                    {sortedGPUs?.map(gpu => (
                      <GPUCard
                        key={gpu?.id}
                        gpu={gpu}
                        onCompareToggle={handleCompareToggle}
                        isInComparison={comparedGPUs?.some(g => g?.id === gpu?.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Load More Button */}
            {!isLoading && sortedGPUs?.length > 0 && sortedGPUs?.length >= 6 && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    // Simulate loading more GPUs
                    alert('Loading more GPUs... (This would fetch additional results in a real implementation)');
                  }}
                >
                  Load More GPUs
                </Button>
              </div>
            )}
          </main>
        </div>

        <ComparisonBar
          comparedGPUs={comparedGPUs}
          onRemoveFromComparison={handleRemoveFromComparison}
          onCompare={handleCompare}
          onClearAll={handleClearComparison}
        />
      </div>
    </div>
  );
};

export default GPUMarketplaceBrowse;