import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GPURenterDashboard from './pages/gpu-renter-dashboard';
import GPUProviderDashboard from './pages/gpu-provider-dashboard';
import PaymentBillingManagement from './pages/payment-billing-management';
import UserProfileAccountSettings from './pages/user-profile-account-settings';
import GPUMarketplaceBrowse from './pages/gpu-marketplace-browse';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GPUMarketplaceBrowse />} />
        <Route path="/gpu-renter-dashboard" element={<GPURenterDashboard />} />
        <Route path="/gpu-provider-dashboard" element={<GPUProviderDashboard />} />
        <Route path="/payment-billing-management" element={<PaymentBillingManagement />} />
        <Route path="/user-profile-account-settings" element={<UserProfileAccountSettings />} />
        <Route path="/gpu-marketplace-browse" element={<GPUMarketplaceBrowse />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
