import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import WalletWidget from './components/WalletWidget';
import ActiveRentalsSection from './components/ActiveRentalsSection';
import GPUMarketplaceGrid from './components/GPUMarketplaceGrid';
import SearchAndFilters from './components/SearchAndFilters';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickStatsCards from './components/QuickStatsCards';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const GPURenterDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check for user authentication
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData?.role !== 'renter') {
        // Redirect to appropriate dashboard if wrong role
        navigate('/gpu-provider-dashboard');
        return;
      }
      setUser(userData);
    } else {
      // Redirect to login if not authenticated
      navigate('/user-registration-login');
      return;
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRentGPU = (gpu) => {
    // Navigate to detailed GPU view or rental process
    navigate(`/gpu-marketplace-browse?gpu=${gpu?.id}`);
  };

  const handleViewGPUDetails = (gpu) => {
    // Navigate to GPU details page
    navigate(`/gpu-marketplace-browse?details=${gpu?.id}`);
  };

  const handleToggleFavorite = (gpuId, isFavorite) => {
    console.log(`GPU ${gpuId} ${isFavorite ? 'added to' : 'removed from'} favorites`);
  };

  const handleExtendRental = (rental) => {
    console.log('Extending rental:', rental?.id);
  };

  const handleStopRental = (rental) => {
    console.log('Stopping rental:', rental?.id);
  };

  const handleRemoteAccess = (rental) => {
    window.open(rental?.remoteAccessUrl, '_blank');
  };

  const handleWalletTopUp = () => {
    navigate('/payment-billing-management?action=topup');
  };

  const handleViewAllActivity = () => {
    navigate('/user-profile-account-settings?tab=activity');
  };

  const handleNavigation = (navigationData) => {
    console.log('Navigation:', navigationData);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        user={user} 
        onNavigate={handleNavigation}
        notificationCount={3}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          {showWelcome && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-6 mb-8 relative">
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Icon name="Zap" size={32} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Ready to harness the power of cloud GPUs? Browse available hardware or manage your active rentals.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      onClick={() => navigate('/gpu-marketplace-browse')}
                      iconName="Search"
                      iconPosition="left"
                    >
                      Browse GPUs
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/user-profile-account-settings')}
                      iconName="Settings"
                      iconPosition="left"
                    >
                      Account Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mb-8">
            <QuickStatsCards />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Active Rentals */}
              <ActiveRentalsSection
                onExtendRental={handleExtendRental}
                onStopRental={handleStopRental}
                onRemoteAccess={handleRemoteAccess}
              />

              {/* Search and Filters */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
                <h2 className="text-xl font-semibold text-foreground mb-4">Find GPUs</h2>
                <SearchAndFilters
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  isMobile={isMobile}
                />
              </div>

              {/* GPU Marketplace Grid */}
              <GPUMarketplaceGrid
                onRentGPU={handleRentGPU}
                onViewDetails={handleViewGPUDetails}
                onToggleFavorite={handleToggleFavorite}
                filters={filters}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Wallet Widget */}
              <WalletWidget
                balance={245.50}
                onTopUp={handleWalletTopUp}
              />

              {/* Recent Activity Feed */}
              <RecentActivityFeed
                onViewAll={handleViewAllActivity}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/gpu-marketplace-browse')}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Browse All GPUs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/payment-billing-management')}
                    iconName="CreditCard"
                    iconPosition="left"
                  >
                    Billing & Payments
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/user-profile-account-settings')}
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Account Settings
                  </Button>
                </div>
              </div>

              {/* Support */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
                <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get support or learn more about GPU rentals.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    iconName="HelpCircle"
                    iconPosition="left"
                  >
                    Help Center
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GPURenterDashboard;