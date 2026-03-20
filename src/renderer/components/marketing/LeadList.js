import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const LeadList = ({ leads, onSelectLead, onDeleteLead, onAddNew }) => {
  const getStatusColor = (status) => {
    const colors = {
      nuevo: 'bg-blue-100 text-blue-800',
      contactado: 'bg-yellow-100 text-yellow-800',
      calificado: 'bg-green-100 text-green-800',
      perdido: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card title="Leads">
      <div className="mb-4 flex justify-end">
        <Button onClick={onAddNew} size="sm">
          + Nuevo Lead
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Teléfono</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Estado</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Origen</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">{lead.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{lead.email}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{lead.phone || '-'}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{lead.source || '-'}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectLead(lead)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => onDeleteLead(lead.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeadList;