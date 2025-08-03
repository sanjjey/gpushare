import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonBar = ({ comparedGPUs, onRemoveFromComparison, onCompare, onClearAll }) => {
  const [showComparison, setShowComparison] = useState(false);

  if (comparedGPUs?.length === 0) {
    return null;
  }

  const handleCompare = () => {
    setShowComparison(true);
  };

  const ComparisonModal = () => (
    showComparison && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e?.stopPropagation()}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">GPU Comparison</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComparison(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b border-border text-foreground font-semibold">Specification</th>
                    {comparedGPUs?.map(gpu => (
                      <th key={gpu?.id} className="text-center p-4 border-b border-border">
                        <div className="space-y-2">
                          <div className="w-16 h-16 mx-auto rounded overflow-hidden">
                            <Image
                              src={gpu?.image}
                              alt={`${gpu?.brand} ${gpu?.model}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{gpu?.brand} {gpu?.model}</p>
                            <p className="text-sm text-muted-foreground">{gpu?.memory}GB VRAM</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Price (Hourly)', getValue: gpu => `$${gpu?.pricing?.hourly}` },
                    { label: 'Performance Score', getValue: gpu => gpu?.performanceScore },
                    { label: 'Architecture', getValue: gpu => gpu?.architecture },
                    { label: 'CUDA Cores', getValue: gpu => gpu?.cudaCores },
                    { label: 'RT Cores', getValue: gpu => gpu?.rtCores },
                    { label: 'Tensor Cores', getValue: gpu => gpu?.tensorCores },
                    { label: 'Memory Type', getValue: gpu => gpu?.memoryType },
                    { label: 'Clock Speed', getValue: gpu => `${gpu?.clockSpeed} MHz` },
                    { label: 'Bandwidth', getValue: gpu => `${gpu?.bandwidth} GB/s` },
                    { label: 'Power Consumption', getValue: gpu => `${gpu?.powerConsumption}W` },
                    { label: 'Temperature', getValue: gpu => `${gpu?.temperature}°C` },
                    { label: 'Location', getValue: gpu => gpu?.location },
                    { label: 'Distance', getValue: gpu => `${gpu?.distance} miles` },
                    { label: 'Availability', getValue: gpu => gpu?.availability },
                    { label: 'Uptime', getValue: gpu => `${gpu?.uptime}%` },
                    { label: 'Provider', getValue: gpu => gpu?.provider?.name },
                    { label: 'Provider Rating', getValue: gpu => `${gpu?.provider?.rating}/5` },
                    { label: 'Instant Booking', getValue: gpu => gpu?.instantBooking ? 'Yes' : 'No' },
                  ]?.map(spec => (
                    <tr key={spec?.label} className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">{spec?.label}</td>
                      {comparedGPUs?.map(gpu => (
                        <td key={gpu?.id} className="p-4 text-center text-foreground">
                          {spec?.getValue(gpu)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowComparison(false)}
              >
                Close
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  alert('Comparison results could be exported or shared here');
                }}
              >
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation-3 z-40 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="GitCompare" size={20} className="text-primary" />
                <span className="font-medium text-foreground">
                  Compare GPUs ({comparedGPUs?.length}/3)
                </span>
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto">
                {comparedGPUs?.map(gpu => (
                  <div
                    key={gpu?.id}
                    className="flex items-center space-x-2 bg-muted rounded-lg p-2 min-w-0"
                  >
                    <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={gpu?.image}
                        alt={`${gpu?.brand} ${gpu?.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {gpu?.brand} {gpu?.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${gpu?.pricing?.hourly}/hr
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveFromComparison(gpu)}
                      className="text-muted-foreground hover:text-foreground p-1"
                      title="Remove from comparison"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                title="Clear all comparisons"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleCompare}
                disabled={comparedGPUs?.length < 2}
                title="Compare selected GPUs"
              >
                Compare ({comparedGPUs?.length})
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ComparisonModal />
    </>
  );
};

export default ComparisonBar;