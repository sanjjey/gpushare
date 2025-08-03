import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MapView = ({ gpus, onGPUSelect }) => {
  const [selectedGPU, setSelectedGPU] = useState(null);

  // Mock coordinates for demonstration
  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

  const handleMarkerClick = (gpu) => {
    setSelectedGPU(gpu);
  };

  const handleGPUSelect = (gpu) => {
    onGPUSelect(gpu);
    setSelectedGPU(null);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="GPU Locations Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=10&output=embed`}
        className="border-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-card rounded-lg shadow-elevation-2 p-2">
        <div className="flex flex-col space-y-2">
          <Button variant="outline" size="icon">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-card rounded-lg shadow-elevation-2 p-3">
        <h4 className="font-medium text-foreground mb-2">Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">In Use</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Offline</span>
          </div>
        </div>
      </div>
      {/* GPU Markers (Simulated) */}
      <div className="absolute inset-0 pointer-events-none">
        {gpus?.slice(0, 10)?.map((gpu, index) => (
          <div
            key={gpu?.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${30 + Math.floor(index / 5) * 20}%`,
            }}
            onClick={() => handleMarkerClick(gpu)}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
              gpu?.availability === 'available' ? 'bg-success' :
              gpu?.availability === 'busy' ? 'bg-warning' : 'bg-error'
            }`}>
            </div>
          </div>
        ))}
      </div>
      {/* GPU Details Popup */}
      {selectedGPU && (
        <div className="absolute bottom-4 left-4 right-4 bg-card rounded-lg shadow-elevation-3 p-4 max-w-sm mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded overflow-hidden">
                <Image
                  src={selectedGPU?.image}
                  alt={`${selectedGPU?.brand} ${selectedGPU?.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {selectedGPU?.brand} {selectedGPU?.model}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedGPU?.memory}GB VRAM
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedGPU(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground">{selectedGPU?.location}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Distance:</span>
              <span className="text-foreground">{selectedGPU?.distance} miles</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-foreground font-medium">
                ${selectedGPU?.pricing?.hourly}/hour
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Provider:</span>
              <div className="flex items-center space-x-1">
                <span className="text-foreground">{selectedGPU?.provider?.name}</span>
                <div className="flex items-center">
                  {renderStars(selectedGPU?.provider?.rating)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => handleGPUSelect(selectedGPU)}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Contact provider:', selectedGPU?.provider?.id)}
            >
              <Icon name="MessageCircle" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Results Counter */}
      <div className="absolute bottom-4 right-4 bg-card rounded-lg shadow-elevation-2 px-3 py-2">
        <span className="text-sm font-medium text-foreground">
          {gpus?.length} GPUs found
        </span>
      </div>
    </div>
  );
};

export default MapView;