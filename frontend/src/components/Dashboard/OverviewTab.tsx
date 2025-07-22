import React from 'react';
import StatsCards from './StatsCards';
import TenantsList from './TenantsList';
import type { Tenant, DashboardStats } from './utils/types';

interface OverviewTabProps {
  tenants: Tenant[];
  stats: DashboardStats;
  onTenantClick?: (tenantId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  tenants, 
  stats, 
  onTenantClick 
}) => {
  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <TenantsList tenants={tenants} onTenantClick={onTenantClick} />
    </div>
  );
};

export default OverviewTab;
