import type { Module } from 'ag-grid-enterprise';
import { AllEnterpriseModule, ValidationModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';

export const agGridModules: Module[] = [
  AllEnterpriseModule.with(AgChartsEnterpriseModule),
  ValidationModule,
];
