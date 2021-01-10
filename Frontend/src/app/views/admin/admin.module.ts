import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routes';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { SaleComponent } from './sale/sale.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PurchaseComponent } from './purchase/purchase.component';
import { ExpenseComponent } from './expense/expense.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    ProductComponent,
    SaleComponent,
    PurchaseComponent,
    ExpenseComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ChartsModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }
