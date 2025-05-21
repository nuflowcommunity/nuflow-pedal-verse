
import React from 'react';
import { EntidadesAdminContainer } from './EntidadesAdminContainer';
import { mockEntities } from '@/components/admin/entities/mockData';

const EntidadesAdmin = () => {
  return <EntidadesAdminContainer initialEntities={mockEntities} />;
};

export default EntidadesAdmin;
