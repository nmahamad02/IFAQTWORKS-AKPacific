import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { RouterModule } from '@angular/router';

export const analysisRoutes = [
  {
    path: 'report-list',
    component: ReportsListComponent
  }
];

@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(analysisRoutes)
  ]
})
export class AnalysisModule { }
