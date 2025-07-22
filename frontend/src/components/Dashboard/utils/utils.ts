// Utility functions for Dashboard components
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'paid': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'late': return 'bg-red-100 text-red-800';
    case 'normal': return 'bg-blue-100 text-blue-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'alert': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'paid': return 'Pago';
    case 'pending': return 'Pendente';
    case 'late': return 'Atrasado';
    case 'normal': return 'Normal';
    case 'high': return 'Alto';
    case 'alert': return 'Alerta';
    case 'active': return 'Ativo';
    case 'expired': return 'Expirado';
    case 'completed': return 'Concluído';
    default: return status;
  }
};
