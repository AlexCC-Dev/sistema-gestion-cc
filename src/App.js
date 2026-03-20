import React, { useState, useEffect } from 'react';
import Sidebar from './renderer/components/layout/Sidebar';
import Header from './renderer/components/layout/Header';
import LeadList from './renderer/components/marketing/LeadList';
import LeadForm from './renderer/components/marketing/LeadForm';
import LeadDetail from './renderer/components/marketing/LeadDetail';
import CampaignList from './renderer/components/marketing/CompaignList';
import CampaignForm from './renderer/components/marketing/CompaignForm';
import Modal from './renderer/components/common/Modal';

function App() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'newLead', 'editLead', 'newCampaign'

  // Datos de ejemplo para UI
  const sampleLeads = [
    { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', phone: '555-1234', status: 'contactado', source: 'Web', notes: 'Cliente interesado', created_at: new Date().toISOString() },
    { id: 2, name: 'María García', email: 'maria@ejemplo.com', phone: '555-5678', status: 'nuevo', source: 'Referido', notes: 'Busca opciones', created_at: new Date().toISOString() }
  ];

  const sampleCampaigns = [
    { id: 1, name: 'Campaña Verano 2026', description: 'Promoción especial para temporada de verano', status: 'activa', start_date: '2026-06-01', end_date: '2026-08-31', budget: '50000', target_audience: 'Familias con niños' },
    { id: 2, name: 'Lanzamiento Nuevo Desarrollo', description: 'Presentación de nuevos desarrollos inmobiliarios', status: 'borrador', start_date: '2026-04-01', end_date: '2026-04-30', budget: '30000', target_audience: 'Inversionistas' }
  ];

  useEffect(() => {
    setLeads(sampleLeads);
    setCampaigns(sampleCampaigns);
  }, []);

  const handleNewLead = () => {
    setSelectedLead(null);
    setModalType('newLead');
    setModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setModalType('editLead');
    setModalOpen(true);
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setModalType('viewLead');
    setModalOpen(true);
  };

  const handleSaveLead = (leadData) => {
    if (modalType === 'newLead') {
      const newLead = { ...leadData, id: Date.now(), created_at: new Date().toISOString() };
      setLeads([...leads, newLead]);
    } else if (modalType === 'editLead') {
      setLeads(leads.map(l => l.id === selectedLead.id ? { ...selectedLead, ...leadData } : l));
    }
    setModalOpen(false);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const handleNewCampaign = () => {
    setSelectedCampaign(null);
    setModalType('newCampaign');
    setModalOpen(true);
  };

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setModalType('viewCampaign');
    setModalOpen(true);
  };

  const handleSaveCampaign = (campaignData) => {
    const newCampaign = { ...campaignData, id: Date.now() };
    setCampaigns([...campaigns, newCampaign]);
    setModalOpen(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'newLead':
        return <LeadForm onSubmit={handleSaveLead} onCancel={() => setModalOpen(false)} />;
      case 'editLead':
        return <LeadForm lead={selectedLead} onSubmit={handleSaveLead} onCancel={() => setModalOpen(false)} />;
      case 'viewLead':
        return <LeadDetail lead={selectedLead} onEdit={() => handleEditLead(selectedLead)} onClose={() => setModalOpen(false)} />;
      case 'newCampaign':
        return <CampaignForm onSubmit={handleSaveCampaign} onCancel={() => setModalOpen(false)} />;
      case 'viewCampaign':
        return (
          <div>
            <h3 className="font-semibold">{selectedCampaign?.name}</h3>
            <p className="text-gray-600 mt-2">{selectedCampaign?.description}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cerrar</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'leads': return 'Gestión de Leads';
      case 'campaigns': return 'Campañas de Marketing';
      case 'reports': return 'Reportes';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 ml-64">
        <Header title={getHeaderTitle()} />
        
        <main className="p-6">
          {activeTab === 'leads' && (
            <LeadList
              leads={leads}
              onSelectLead={handleViewLead}
              onDeleteLead={handleDeleteLead}
              onAddNew={handleNewLead}
            />
          )}
          
          {activeTab === 'campaigns' && (
            <CampaignList
              campaigns={campaigns}
              onSelectCampaign={handleViewCampaign}
              onAddNew={handleNewCampaign}
            />
          )}
          
          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Reportes de Marketing</h2>
              <p className="text-gray-600">Próximamente: Reportes de conversión, rendimiento de campañas y análisis de leads.</p>
            </div>
          )}
        </main>
      </div>
      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalType === 'newLead' ? 'Nuevo Lead' :
          modalType === 'editLead' ? 'Editar Lead' :
          modalType === 'viewLead' ? 'Detalle de Lead' :
          modalType === 'newCampaign' ? 'Nueva Campaña' :
          modalType === 'viewCampaign' ? 'Detalle de Campaña' : ''
        }
        width={modalType === 'viewLead' ? 'max-w-2xl' : 'max-w-md'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default App;