import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { SuppliersDetailsComponent } from './suppliers/suppliers-details/suppliers-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

export const crmRoutes = [
  {
    path: 'supplier-list',
    component: SuppliersListComponent
  },
  {
    path: 'supplier/details/:id',
    component: SuppliersDetailsComponent
  }
];

@NgModule({
  declarations: [SuppliersListComponent, SuppliersDetailsComponent],
  imports: [
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule.forChild(crmRoutes)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SupplyChainModule { }
