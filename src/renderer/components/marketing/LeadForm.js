import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const LeadForm = ({ lead, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: lead?.name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    status: lead?.status || 'nuevo',
    source: lead?.source || '',
    notes: lead?.notes || ''
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
        label="Nombre completo"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
      />
      <Input
        label="Teléfono"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
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
          <option value="nuevo">Nuevo</option>
          <option value="contactado">Contactado</option>
          <option value="calificado">Calificado</option>
          <option value="perdido">Perdido</option>
        </select>
      </div>
      
      <Input
        label="Origen"
        value={formData.source}
        onChange={(e) => handleChange('source', e.target.value)}
        placeholder="Web, Referido, Evento, etc."
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {lead ? 'Actualizar' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;