import React from 'react';
import Prototype1 from './Prototype1';
import Prototype2 from './Prototype2';

export interface Prototype {
  id: string;
  name: string;
  component: React.ComponentType;
}

export const prototypes: Prototype[] = [
  { id: 'proto1', name: 'Prototype 1', component: Prototype1 },
  { id: 'proto2', name: 'Prototype 2', component: Prototype2 },
];
