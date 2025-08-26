export const getContainerStatusText = (statusId) => {
  const statusMap = {
    1: 'Pendiente',
    2: 'Vinculado',
    3: 'En Tránsito',
    4: 'Entregado',
    5: 'Abierto',
    6: 'Cancelado',
    7: 'Expirado',
    8: 'Error de Ruta'
  };
  return statusMap[statusId] || 'Desconocido';
};

export const getContainerStatusColor = (statusId) => {
  const colorMap = {
    1: 'bg-orange-100 text-orange-800',
    2: 'bg-green-100 text-green-800',
    3: 'bg-green-100 text-green-800',
    4: 'bg-blue-100 text-blue-800',
    5: 'bg-cyan-100 text-cyan-800',
    6: 'bg-slate-100 text-slate-800',
    7: 'bg-slate-100 text-slate-800',
    8: 'bg-red-100 text-red-800'
  };
  return colorMap[statusId] || 'bg-gray-100 text-gray-800';
};
