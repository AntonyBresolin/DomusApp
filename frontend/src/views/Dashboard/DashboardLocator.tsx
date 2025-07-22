import { useState } from 'react';
import {
  HiHome,
  HiCreditCard,
  HiLightningBolt,
  HiDocumentText,
  HiShieldCheck
} from 'react-icons/hi';
import {
  DashboardHeader,
  DashboardTabs,
  OverviewTab,
  PaymentsTab,
  UtilitiesTab,
  ContractsTab,
  LegalTab,
  mockTenants,
  mockPaymentHistory,
  mockUtilities,
  mockContracts,
  type Tab,
  type DashboardStats
} from '../../components/Dashboard/utils';

function DashboardLocator() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats: DashboardStats = {
    totalRevenue: mockTenants.reduce((sum, tenant) => 
      tenant.paymentStatus === 'paid' ? sum + tenant.rentAmount + tenant.utilitiesAmount : sum, 0
    ),
    totalTenants: mockTenants.length,
    pendingPayments: mockTenants.filter(t => t.paymentStatus === 'pending').length,
    latePayments: mockTenants.filter(t => t.paymentStatus === 'late').length
  };

  const tabs: Tab[] = [
    { id: 'overview', name: 'Visão Geral', icon: HiHome },
    { id: 'payments', name: 'Pagamentos', icon: HiCreditCard },
    { id: 'utilities', name: 'Utilidades', icon: HiLightningBolt },
    { id: 'contracts', name: 'Contratos', icon: HiDocumentText },
    { id: 'legal', name: 'Legal', icon: HiShieldCheck }
  ];

  const handleTenantClick = (tenantId: string) => {
    console.log('Tenant clicked:', tenantId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            tenants={mockTenants} 
            stats={stats} 
            onTenantClick={handleTenantClick}
          />
        );
      case 'payments':
        return (
          <PaymentsTab 
            paymentHistory={mockPaymentHistory} 
            tenants={mockTenants}
          />
        );
      case 'utilities':
        return <UtilitiesTab utilities={mockUtilities} />;
      case 'contracts':
        return (
          <ContractsTab 
            contracts={mockContracts} 
            tenants={mockTenants}
          />
        );
      case 'legal':
        return <LegalTab tenants={mockTenants} />;
      default:
        return (
          <OverviewTab 
            tenants={mockTenants} 
            stats={stats} 
            onTenantClick={handleTenantClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default DashboardLocator;
