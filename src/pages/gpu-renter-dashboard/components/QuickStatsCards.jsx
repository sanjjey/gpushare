import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = () => {
  const [stats, setStats] = useState({
    activeRentals: 0,
    totalSpent: 0,
    hoursUsed: 0,
    favoriteGPUs: 0
  });

  useEffect(() => {
    // Mock stats data
    const mockStats = {
      activeRentals: 2,
      totalSpent: 1247.50,
      hoursUsed: 156,
      favoriteGPUs: 8
    };
    
    // Simulate loading with animation
    setTimeout(() => {
      setStats(mockStats);
    }, 500);
  }, []);

  const statsCards = [
    {
      id: 'active-rentals',
      title: 'Active Rentals',
      value: stats?.activeRentals,
      icon: 'Monitor',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+1 from yesterday',
      changeType: 'positive'
    },
    {
      id: 'total-spent',
      title: 'Total Spent',
      value: `$${stats?.totalSpent?.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+$18.00 this week',
      changeType: 'neutral'
    },
    {
      id: 'hours-used',
      title: 'Hours Used',
      value: stats?.hoursUsed,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+6 hours this week',
      changeType: 'positive'
    },
    {
      id: 'favorite-gpus',
      title: 'Favorite GPUs',
      value: stats?.favoriteGPUs,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '+2 this month',
      changeType: 'positive'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-minimal hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-xs ${getChangeColor(card?.changeType)}`}>
              <Icon name={getChangeIcon(card?.changeType)} size={12} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card?.title}
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {card?.value}
            </div>
            <p className={`text-xs ${getChangeColor(card?.changeType)}`}>
              {card?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;