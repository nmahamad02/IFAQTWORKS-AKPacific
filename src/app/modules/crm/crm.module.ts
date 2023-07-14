import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { QuotationsListComponent } from './quotations/quotations-list/quotations-list.component';
import { QuotationsDetailsComponent } from './quotations/quotations-details/quotations-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

export const crmRoutes = [
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'customer/details/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'quotation-list',
    component: QuotationsListComponent
  },
  {
    path: 'quotation/details/:id',
    component: QuotationsDetailsComponent
  },
];

@NgModule({
  declarations: [
    CustomerListComponent, 
    CustomerDetailsComponent, 
    QuotationsListComponent, 
    QuotationsDetailsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
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
  ]
})
export class CrmModule { }
