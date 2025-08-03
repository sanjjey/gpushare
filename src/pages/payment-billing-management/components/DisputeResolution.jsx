import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DisputeResolution = ({ disputes, onCreateDispute, onUpdateDispute }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [newDispute, setNewDispute] = useState({
    transactionId: '',
    type: 'billing_error',
    description: '',
    amount: '',
    evidence: []
  });

  const disputeTypes = [
    { value: 'billing_error', label: 'Billing Error' },
    { value: 'unauthorized_charge', label: 'Unauthorized Charge' },
    { value: 'service_not_received', label: 'Service Not Received' },
    { value: 'quality_issue', label: 'Quality Issue' },
    { value: 'refund_request', label: 'Refund Request' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-warning bg-warning/10';
      case 'in_review':
        return 'text-primary bg-primary/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'closed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'billing_error':
        return 'AlertTriangle';
      case 'unauthorized_charge':
        return 'Shield';
      case 'service_not_received':
        return 'XCircle';
      case 'quality_issue':
        return 'ThumbsDown';
      case 'refund_request':
        return 'RotateCcw';
      default:
        return 'MessageSquare';
    }
  };

  const handleCreateDispute = () => {
    onCreateDispute(newDispute);
    setNewDispute({
      transactionId: '',
      type: 'billing_error',
      description: '',
      amount: '',
      evidence: []
    });
    setShowCreateForm(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target?.files);
    setNewDispute(prev => ({
      ...prev,
      evidence: [...prev?.evidence, ...files?.map(file => ({
        name: file?.name,
        size: file?.size,
        type: file?.type
      }))]
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Dispute Resolution</h2>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowCreateForm(true)}
        >
          Create Dispute
        </Button>
      </div>
      {/* Create Dispute Form */}
      {showCreateForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Create New Dispute</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCreateForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Transaction ID"
              type="text"
              placeholder="TXN-123456789"
              description="The transaction ID you want to dispute"
              value={newDispute?.transactionId}
              onChange={(e) => setNewDispute({ ...newDispute, transactionId: e?.target?.value })}
            />

            <Select
              label="Dispute Type"
              description="Select the type of issue you're experiencing"
              options={disputeTypes}
              value={newDispute?.type}
              onChange={(value) => setNewDispute({ ...newDispute, type: value })}
            />

            <Input
              label="Disputed Amount"
              type="number"
              placeholder="0.00"
              description="Amount you're disputing (if applicable)"
              value={newDispute?.amount}
              onChange={(e) => setNewDispute({ ...newDispute, amount: e?.target?.value })}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Please provide detailed information about your dispute..."
                value={newDispute?.description}
                onChange={(e) => setNewDispute({ ...newDispute, description: e?.target?.value })}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Supporting Evidence
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-2">
                  Upload screenshots, receipts, or other supporting documents
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidence-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('evidence-upload')?.click()}
                >
                  Choose Files
                </Button>
              </div>

              {/* Uploaded Files */}
              {newDispute?.evidence?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {newDispute?.evidence?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="File" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{file?.name}</span>
                        <span className="text-xs text-muted-foreground">({formatFileSize(file?.size)})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setNewDispute(prev => ({
                            ...prev,
                            evidence: prev?.evidence?.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateDispute}>
                Submit Dispute
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Existing Disputes */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Your Disputes</h3>

        {disputes?.length > 0 ? (
          <div className="space-y-4">
            {disputes?.map((dispute) => (
              <div key={dispute?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(dispute?.type)} size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Dispute #{dispute?.id}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {dispute?.type?.replace('_', ' ')} • Transaction: {dispute?.transactionId}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(dispute?.status)}`}>
                    {dispute?.status?.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{dispute?.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      Created: {new Date(dispute.createdAt)?.toLocaleDateString()}
                    </span>
                    {dispute?.amount && (
                      <span className="text-sm font-medium text-foreground">
                        Amount: ${dispute?.amount}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDispute(dispute)}
                    >
                      View Details
                    </Button>
                    {dispute?.status === 'open' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageSquare"
                      >
                        Add Comment
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Timeline */}
                {dispute?.timeline && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                      {dispute?.timeline?.map((event, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{event.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.timestamp)?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No disputes found</p>
            <p className="text-sm text-muted-foreground">
              If you have any issues with transactions, you can create a dispute above.
            </p>
          </div>
        )}
      </div>
      {/* Help Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Dispute Guidelines</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn about our dispute resolution process and what information to provide.
            </p>
            <Button variant="ghost" size="sm" className="mt-2">
              Read Guidelines
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="MessageCircle" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Contact Support</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Get direct help from our support team for complex issues.
            </p>
            <Button variant="ghost" size="sm" className="mt-2">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;