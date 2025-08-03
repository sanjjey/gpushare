import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import EarningsSummaryCard from './components/EarningsSummaryCard';
import GPUListingsSection from './components/GPUListingsSection';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';

const GPUProviderDashboard = () => {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@email.com",
      role: "provider",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    setUser(mockUser);
  }, []);

  // Mock earnings data
  const earningsData = {
    totalRevenue: 2847.50,
    revenueChange: 12.5,
    pendingPayouts: 425.75,
    nextPayoutDate: "Jan 15, 2025",
    activeRentals: 3,
    hourlyRate: 4.25,
    chartData: [120, 180, 150, 220, 280, 240, 320, 290, 350, 380, 420, 450]
  };

  // Mock GPU listings data
  const gpuListings = [
    {
      id: 1,
      name: "NVIDIA RTX 4090",
      model: "Founders Edition",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
      status: "rented",
      isAvailable: true,
      memory: "24GB GDDR6X",
      cudaCores: "16,384",
      baseClock: "2.2 GHz",
      power: "450W",
      hourlyRate: 5.50,
      totalEarned: 1247.80,
      currentRenter: "Sarah Chen",
      sessionDuration: "2h 45m"
    },
    {
      id: 2,
      name: "NVIDIA RTX 4080",
      model: "ASUS ROG Strix",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
      status: "available",
      isAvailable: true,
      memory: "16GB GDDR6X",
      cudaCores: "9,728",
      baseClock: "2.5 GHz",
      power: "320W",
      hourlyRate: 4.25,
      totalEarned: 892.40,
      currentRenter: null,
      sessionDuration: null
    },
    {
      id: 3,
      name: "NVIDIA RTX 4070 Ti",
      model: "MSI Gaming X Trio",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
      status: "offline",
      isAvailable: false,
      memory: "12GB GDDR6X",
      cudaCores: "7,680",
      baseClock: "2.3 GHz",
      power: "285W",
      hourlyRate: 3.75,
      totalEarned: 567.20,
      currentRenter: null,
      sessionDuration: null
    },
    {
      id: 4,
      name: "NVIDIA RTX 4060 Ti",
      model: "EVGA FTW3 Ultra",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
      status: "rented",
      isAvailable: true,
      memory: "16GB GDDR6",
      cudaCores: "4,352",
      baseClock: "2.5 GHz",
      power: "165W",
      hourlyRate: 2.95,
      totalEarned: 423.60,
      currentRenter: "Mike Johnson",
      sessionDuration: "1h 20m"
    }
  ];

  // Mock recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "payment_received",
      title: "Payment Received",
      description: "Payment for RTX 4090 rental session",
      amount: 27.50,
      gpuName: "RTX 4090",
      renterName: "Sarah Chen",
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 2,
      type: "rental_started",
      title: "Rental Session Started",
      description: "New rental session began",
      gpuName: "RTX 4060 Ti",
      renterName: "Mike Johnson",
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 3,
      type: "rental_request",
      title: "New Rental Request",
      description: "Someone wants to rent your RTX 4080",
      gpuName: "RTX 4080",
      renterName: "Emma Wilson",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: "rental_ended",
      title: "Rental Session Ended",
      description: "Rental session completed successfully",
      amount: 42.75,
      gpuName: "RTX 4070 Ti",
      renterName: "David Kim",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 5,
      type: "gpu_updated",
      title: "GPU Listing Updated",
      description: "Successfully updated RTX 4090 specifications",
      gpuName: "RTX 4090",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "rental_request",
      title: "New Rental Request",
      message: "Emma Wilson wants to rent your RTX 4080",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Processed",
      message: "You received $27.50 for RTX 4090 rental",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: "system",
      title: "GPU Status Update",
      message: "RTX 4070 Ti is now offline",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ];

  // Set notification count
  useEffect(() => {
    setNotificationCount(notifications?.filter(n => !n?.read)?.length);
  }, []);

  // Event handlers
  const handleNavigation = (navigationData) => {
    console.log('Navigation:', navigationData);
  };

  const handleToggleAvailability = (gpuId, isAvailable) => {
    console.log(`Toggle availability for GPU ${gpuId}:`, isAvailable);
  };

  const handleEditGPU = (gpuId) => {
    console.log('Edit GPU:', gpuId);
  };

  const handleViewAnalytics = (gpuId) => {
    console.log('View analytics for GPU:', gpuId);
  };

  const handleAddGPU = () => {
    console.log('Add new GPU');
  };

  const handleBulkManage = () => {
    console.log('Bulk manage GPUs');
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        user={user}
        onNavigate={handleNavigation}
        notificationCount={notificationCount}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || 'Provider'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your GPU rentals today.
            </p>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-8">
              {/* Earnings Summary */}
              <EarningsSummaryCard earnings={earningsData} />

              {/* GPU Listings */}
              <GPUListingsSection
                gpus={gpuListings}
                onToggleAvailability={handleToggleAvailability}
                onEdit={handleEditGPU}
                onViewAnalytics={handleViewAnalytics}
              />

              {/* Recent Activity Feed */}
              <RecentActivityFeed activities={recentActivities} />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <QuickActionsPanel
                onAddGPU={handleAddGPU}
                onBulkManage={handleBulkManage}
                notifications={notifications}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GPUProviderDashboard;