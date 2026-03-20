import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const CampaignForm = ({ campaign, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    description: campaign?.description || '',
    status: campaign?.status || 'borrador',
    start_date: campaign?.start_date || '',
    end_date: campaign?.end_date || '',
    budget: campaign?.budget || '',
    target_audience: campaign?.target_audience || ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Nombre de la campaña"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha inicio"
          type="date"
          value={formData.start_date}
          onChange={(e) => handleChange('start_date', e.target.value)}
          required
        />
        <Input
          label="Fecha fin"
          type="date"
          value={formData.end_date}
          onChange={(e) => handleChange('end_date', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Presupuesto"
          type="number"
          value={formData.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
          placeholder="0.00"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="borrador">Borrador</option>
            <option value="activa">Activa</option>
            <option value="pausada">Pausada</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Audiencia objetivo
        </label>
        <textarea
          value={formData.target_audience}
          onChange={(e) => handleChange('target_audience', e.target.value)}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Segmentación demográfica, intereses, ubicación, etc."
        />
      </div>
      
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {campaign ? 'Actualizar' : 'Crear Campaña'}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;