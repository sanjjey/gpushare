import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonBar = ({ comparedGPUs, onRemoveFromComparison, onCompare, onClearAll }) => {
  if (comparedGPUs?.length === 0) {
    return null;
  }

  return (
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
            >
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onCompare}
              disabled={comparedGPUs?.length < 2}
            >
              Compare ({comparedGPUs?.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;