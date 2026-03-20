import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const LeadDetail = ({ lead, onEdit, onClose }) => {
  const getStatusColor = (status) => {
    const colors = {
      nuevo: 'bg-blue-100 text-blue-800',
      contactado: 'bg-yellow-100 text-yellow-800',
      calificado: 'bg-green-100 text-green-800',
      perdido: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!lead) return null;

  return (
    <Card title="Detalle de Lead">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Nombre</label>
            <p className="text-gray-800 mt-1">{lead.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-800 mt-1">{lead.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Teléfono</label>
            <p className="text-gray-800 mt-1">{lead.phone || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Estado</label>
            <p className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Origen</label>
            <p className="text-gray-800 mt-1">{lead.source || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Fecha creación</label>
            <p className="text-gray-800 mt-1">
              {new Date(lead.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Notas</label>
          <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded-lg">
            {lead.notes || 'Sin notas'}
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onEdit}>
            Editar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LeadDetail;