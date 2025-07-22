import React from 'react';
import { HiCash, HiUsers, HiClock, HiExclamation } from 'react-icons/hi';
import type { DashboardStats } from './utils/types';
import { formatCurrency } from './utils';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      icon: HiCash,
      color: 'green'
    },
    {
      title: 'Total de Inquilinos',
      value: stats.totalTenants.toString(),
      icon: HiUsers,
      color: 'blue'
    },
    {
      title: 'Pagamentos Pendentes',
      value: stats.pendingPayments.toString(),
      icon: HiClock,
      color: 'yellow'
    },
    {
      title: 'Pagamentos Atrasados',
      value: stats.latePayments.toString(),
      icon: HiExclamation,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      red: 'text-red-600 bg-red-100'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colorClasses = getColorClasses(card.color);
        
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold mt-2 ${colorClasses.split(' ')[0]}`}>
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
