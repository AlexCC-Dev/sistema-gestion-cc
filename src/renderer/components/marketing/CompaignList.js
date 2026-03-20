import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const CampaignList = ({ campaigns, onSelectCampaign, onAddNew }) => {
  const getStatusColor = (status) => {
    const colors = {
      borrador: 'bg-gray-100 text-gray-800',
      activa: 'bg-green-100 text-green-800',
      pausada: 'bg-yellow-100 text-yellow-800',
      finalizada: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card title="Campañas de Marketing">
      <div className="mb-4 flex justify-end">
        <Button onClick={onAddNew} size="sm">
          + Nueva Campaña
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => onSelectCampaign(campaign)}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{campaign.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Inicio: {new Date(campaign.start_date).toLocaleDateString()}</span>
              <span>Fin: {new Date(campaign.end_date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CampaignList;