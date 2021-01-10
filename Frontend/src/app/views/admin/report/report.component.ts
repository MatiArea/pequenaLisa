import { Component, OnInit, ɵConsole } from '@angular/core';
import { each } from 'async'
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public labels = ['Ventas', 'Pago de Clientes', 'Movimientos de Clientes', 'Compras', 'Gastos'];
  public type = 'bar';
  public legend = true;
  public data = [];

  total: any
  ganancia: number
  reportSelect: string
  day: string
  init: string
  finish: string
  month: string
  show:boolean
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

  // reportSelected(number: string) {
  //   this.show = false

  //   this.reportSelect = number
  // }

  // monthSelected(number: string) {
  //   this.month = number
  //   this.generateMonthReport()
  // }

  // generateDayReport() {
  //   this.show = true
  //   // let dateSplit = this.day.split('/')
  //   // const dateNow = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]


  //   this.reportService.dayReport(this.day).subscribe(data => {
  //     each(data['sales'], (sale) => {
  //       this.total.totalSales += sale.total
  //       this.total.totalPayment += sale.payment
  //       each(sale.productsales, (item) => {
  //         this.total.totalCostProducts += item.quantity * item.cost_price
  //       })
  //     });
  //     each(data['movements'], (movement) => {
  //       this.total.totalMovements += movement.amount
  //     });
  //     each(data['purchases'], (purchase) => {
  //       this.total.totalPurchases += purchase.price * purchase.quantity
  //     });
  //     each(data['expenses'], (expense) => {
  //       this.total.totalExpenses += expense.amount
  //     });
  //     this.data = [
  //       { data: [this.total.totalSales, this.total.totalPayment, this.total.totalMovements, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
  //     ];

  //     this.total.gananciaBruta = this.total.totalSales + this.total.totalMovements
  //     this.total.gananciaNeta = this.total.totalPayment + this.total.totalMovements - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

  //   })
  // }

  // generateWeekReport(){
  //   this.show = true


  //   this.reportService.weekReport(this.init,this.finish).subscribe(data => {
  //     each(data['sales'], (sale) => {
  //       this.total.totalSales += sale.total
  //       this.total.totalPayment += sale.payment
  //       each(sale.productsales, (item) => {
  //         this.total.totalCostProducts += item.quantity * item.cost_price
  //       })
  //     });
  //     each(data['movements'], (movement) => {
  //       this.total.totalMovements += movement.amount
  //     });
  //     each(data['purchases'], (purchase) => {
  //       this.total.totalPurchases += purchase.price * purchase.quantity
  //     });
  //     each(data['expenses'], (expense) => {
  //       this.total.totalExpenses += expense.amount
  //     });
  //     this.data = [
  //       { data: [this.total.totalSales, this.total.totalPayment, this.total.totalMovements, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
  //     ];

  //     this.total.gananciaBruta = this.total.totalSales + this.total.totalMovements
  //     this.total.gananciaNeta = this.total.totalPayment + this.total.totalMovements - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

  //   })
  // }


  // generateMonthReport() {
  //   this.show = true


  //   this.reportService.monthReport(this.month).subscribe(data => {
  //     each(data['sales'], (sale) => {
  //       this.total.totalSales += sale.total
  //       this.total.totalPayment += sale.payment
  //       each(sale.productsales, (item) => {
  //         this.total.totalCostProducts += item.quantity * item.cost_price
  //       })
  //     });
  //     each(data['movements'], (movement) => {
  //       this.total.totalMovements += movement.amount
  //     });
  //     each(data['purchases'], (purchase) => {
  //       this.total.totalPurchases += purchase.price * purchase.quantity
  //     });
  //     each(data['expenses'], (expense) => {
  //       this.total.totalExpenses += expense.amount
  //     });
  //     this.data = [
  //       { data: [this.total.totalSales, this.total.totalPayment, this.total.totalMovements, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
  //     ];

  //     this.total.gananciaBruta = this.total.totalSales + this.total.totalMovements
  //     this.total.gananciaNeta = this.total.totalPayment + this.total.totalMovements - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

  //   })
  // }

}
