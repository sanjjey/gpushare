import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';


const VerificationTab = ({ user, onUpdateVerification }) => {
  const [verificationData, setVerificationData] = useState({
    identityStatus: user?.verification?.identityStatus || 'pending',
    hardwareStatus: user?.verification?.hardwareStatus || 'not_started',
    documentsUploaded: user?.verification?.documentsUploaded || [],
    trustScore: user?.verification?.trustScore || 0,
    badges: user?.verification?.badges || []
  });

  const [uploadingDocument, setUploadingDocument] = useState(null);
  const [hardwareTest, setHardwareTest] = useState({
    isRunning: false,
    progress: 0,
    results: null
  });

  // Mock verification requirements
  const verificationSteps = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Verify your identity to build trust with renters',
      status: verificationData?.identityStatus,
      icon: 'User',
      requirements: [
        'Government-issued photo ID (Driver\'s License, Passport, etc.)',
        'Proof of address (Utility bill, Bank statement, etc.)',
        'Clear, well-lit photos of documents'
      ]
    },
    {
      id: 'hardware',
      title: 'Hardware Verification',
      description: 'Verify your GPU specifications and performance',
      status: verificationData?.hardwareStatus,
      icon: 'Cpu',
      requirements: [
        'Run automated hardware detection test',
        'Provide GPU serial numbers',
        'Complete performance benchmark'
      ]
    }
  ];

  const trustBadges = [
    {
      id: 'identity_verified',
      name: 'Identity Verified',
      description: 'Identity has been verified with official documents',
      icon: 'ShieldCheck',
      earned: verificationData?.badges?.includes('identity_verified'),
      color: 'text-success'
    },
    {
      id: 'hardware_verified',
      name: 'Hardware Verified',
      description: 'GPU specifications have been verified',
      icon: 'Cpu',
      earned: verificationData?.badges?.includes('hardware_verified'),
      color: 'text-primary'
    },
    {
      id: 'trusted_provider',
      name: 'Trusted Provider',
      description: 'Consistently high ratings and reliable service',
      icon: 'Star',
      earned: verificationData?.badges?.includes('trusted_provider'),
      color: 'text-warning'
    },
    {
      id: 'power_user',
      name: 'Power User',
      description: 'Active community member with extensive platform usage',
      icon: 'Zap',
      earned: verificationData?.badges?.includes('power_user'),
      color: 'text-accent'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'rejected':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      case 'not_started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const handleDocumentUpload = (documentType, event) => {
    const file = event.target?.files?.[0];
    if (file) {
      setUploadingDocument(documentType);
      // Simulate upload process
      setTimeout(() => {
        setVerificationData(prev => ({
          ...prev,
          documentsUploaded: [...prev?.documentsUploaded, {
            type: documentType,
            filename: file?.name,
            uploadedAt: new Date(),
            status: 'pending'
          }]
        }));
        setUploadingDocument(null);
      }, 2000);
    }
  };

  const handleHardwareTest = () => {
    setHardwareTest({ isRunning: true, progress: 0, results: null });
    
    // Simulate hardware test progress
    const interval = setInterval(() => {
      setHardwareTest(prev => {
        const newProgress = prev?.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            isRunning: false,
            progress: 100,
            results: {
              gpu: 'NVIDIA RTX 4090',
              memory: '24GB GDDR6X',
              clockSpeed: '2520 MHz',
              computeScore: 28450,
              verified: true
            }
          };
        }
        return { ...prev, progress: newProgress };
      });
    }, 300);
  };

  const documentTypes = [
    {
      id: 'photo_id',
      label: 'Photo ID',
      description: 'Driver\'s license, passport, or government ID',
      required: true
    },
    {
      id: 'proof_of_address',
      label: 'Proof of Address',
      description: 'Utility bill or bank statement (last 3 months)',
      required: true
    },
    {
      id: 'selfie',
      label: 'Selfie with ID',
      description: 'Photo of yourself holding your ID',
      required: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Verification Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Verification Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {verificationSteps?.map((step) => (
            <div key={step?.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon name={step?.icon} size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step?.title}</h4>
                    <p className="text-sm text-muted-foreground">{step?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(step?.status)} 
                    size={16} 
                    className={getStatusColor(step?.status)} 
                  />
                  <span className={`text-sm font-medium ${getStatusColor(step?.status)}`}>
                    {getStatusText(step?.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Score */}
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Trust Score</h4>
              <p className="text-sm text-muted-foreground">
                Your overall trustworthiness rating based on verification and activity
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">{verificationData?.trustScore}/100</div>
              <div className="w-24 h-2 bg-muted rounded-full mt-1">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${verificationData?.trustScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Identity Verification */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Identity Verification</h3>
        
        <div className="space-y-6">
          {documentTypes?.map((docType) => {
            const uploaded = verificationData?.documentsUploaded?.find(doc => doc?.type === docType?.id);
            const isUploading = uploadingDocument === docType?.id;
            
            return (
              <div key={docType?.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center space-x-2">
                      <span>{docType?.label}</span>
                      {docType?.required && (
                        <span className="text-xs text-destructive">*Required</span>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{docType?.description}</p>
                  </div>
                  
                  {uploaded ? (
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getStatusIcon(uploaded?.status)} 
                        size={16} 
                        className={getStatusColor(uploaded?.status)} 
                      />
                      <span className={`text-sm ${getStatusColor(uploaded?.status)}`}>
                        {getStatusText(uploaded?.status)}
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`upload-${docType?.id}`)?.click()}
                      disabled={isUploading}
                      iconName={isUploading ? 'Loader2' : 'Upload'}
                      iconPosition="left"
                      loading={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  )}
                </div>
                {uploaded && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{uploaded?.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded {uploaded?.uploadedAt?.toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" iconName="Trash2">
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
                <input
                  id={`upload-${docType?.id}`}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleDocumentUpload(docType?.id, e)}
                  className="hidden"
                />
              </div>
            );
          })}
        </div>

        {verificationData?.identityStatus === 'rejected' && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive mt-1" />
              <div>
                <h4 className="font-medium text-destructive">Verification Rejected</h4>
                <p className="text-sm text-destructive/80 mt-1">
                  Your identity verification was rejected. Please ensure documents are clear, 
                  valid, and match your profile information. You can resubmit after addressing the issues.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Resubmit Documents
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Hardware Verification */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Hardware Verification</h3>
        
        <div className="space-y-6">
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Automated Hardware Detection</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Run our automated test to verify your GPU specifications and performance capabilities.
            </p>
            
            {!hardwareTest?.results ? (
              <div>
                {hardwareTest?.isRunning ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Testing hardware...</span>
                      <span className="text-sm text-muted-foreground">{hardwareTest?.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${hardwareTest?.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleHardwareTest}
                    iconName="Play"
                    iconPosition="left"
                  >
                    Start Hardware Test
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <h5 className="font-medium text-success">Hardware Verified</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">GPU:</span>
                      <span className="ml-2 font-medium text-foreground">{hardwareTest?.results?.gpu}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="ml-2 font-medium text-foreground">{hardwareTest?.results?.memory}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Clock Speed:</span>
                      <span className="ml-2 font-medium text-foreground">{hardwareTest?.results?.clockSpeed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compute Score:</span>
                      <span className="ml-2 font-medium text-foreground">{hardwareTest?.results?.computeScore}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setHardwareTest({ isRunning: false, progress: 0, results: null })}>
                  Run Test Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Trust Badges</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trustBadges?.map((badge) => (
            <div 
              key={badge?.id} 
              className={`p-4 rounded-lg border ${
                badge?.earned 
                  ? 'bg-accent/5 border-accent/20' :'bg-muted border-border opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  badge?.earned ? 'bg-accent/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={badge?.icon} 
                    size={20} 
                    className={badge?.earned ? badge?.color : 'text-muted-foreground'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{badge?.name}</h4>
                    {badge?.earned && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{badge?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;