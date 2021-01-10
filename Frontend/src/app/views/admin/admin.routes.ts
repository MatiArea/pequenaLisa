import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//import Components
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component'
import { ExpenseComponent } from './expense/expense.component';
import { ReportComponent } from './report/report.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ventas',
    pathMatch: 'full',
  },
  {
    path: 'ventas',
    component: SaleComponent,
    data: {
      title: 'Ventas'
    }
  },
  {
    path: 'compras',
    component: PurchaseComponent,
    data: {
      title: 'Compras'
    }
  },
  {
    path: 'productos',
    component: ProductComponent,
    data: {
      title: 'Productos'
    }
  },
  {
    path: 'gastos',
    component: ExpenseComponent,
    data: {
      title: 'Gastos'
    }
  },
  {
    path: 'informes',
    component: ReportComponent,
    data: {
      title: 'Register Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
