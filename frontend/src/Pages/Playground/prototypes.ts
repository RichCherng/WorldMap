import { lazy, ComponentType } from 'react';

export interface PrototypeConfig {
  id: string;
  title: string;
  component: ComponentType;
  description?: string;
}

export const prototypes: PrototypeConfig[] = [
  {
    id: 'example',
    title: 'Example Prototype',
    component: lazy(() => import('./prototypes/ExamplePrototype')),
    description: 'A sample prototype to demonstrate the switcher',
  },
  {
    id: 'data-viz',
    title: 'Data Visualization',
    component: lazy(() => import('./prototypes/DataVisualization')),
    description: 'Experiment with charts and data visualization',
  },
  {
    id: 'interactive',
    title: 'Interactive Demo',
    component: lazy(() => import('./prototypes/InteractiveDemo')),
    description: 'Test interactive components and state',
},
];
