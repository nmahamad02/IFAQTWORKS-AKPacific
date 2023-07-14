import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { ServiceDetailsComponent } from './services/service-details/service-details.component';
import { RouterModule } from '@angular/router';
import { LookupComponent } from './lookup/lookup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTableModule, MatButtonModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatDividerModule, MatSortModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

export const inventoryRoutes = [
  {
    path: 'product-list',
    component: ProductsListComponent
  },
  {
    path: 'product/details/:id',
    component: ProductsDetailsComponent
  },
  {
    path: 'service-list',
    component: ServicesListComponent
  },
  {
    path: 'service/details/:id',
    component: ServiceDetailsComponent
  },
  {
    path: 'lookup',
    component: LookupComponent
  },
];

@NgModule({
  declarations: [
    ProductsListComponent, 
    ProductsDetailsComponent, 
    ServicesListComponent, 
    ServiceDetailsComponent, LookupComponent
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
    RouterModule.forChild(inventoryRoutes)
  ]
})
export class InventoryModule { }
