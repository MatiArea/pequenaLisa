import { Component, OnInit, ɵConsole } from '@angular/core';
import { each } from 'async'
import { Report } from '../../../models/report';
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
  public labels = ['Ventas', 'Compras', 'Gastos'];
  public type = 'bar';
  public legend = true;
  public data = [];

  total: Report
  ganancia: number
  reportSelect: string
  day: string
  year:string
  init: string
  finish: string
  month: string
  show: boolean
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


  constructor(private reportService: ReportService) {
    this.total = new Report()
  }

  ngOnInit(): void {
  }

  reportSelected(number: string) {
    this.show = false

    this.reportSelect = number
  }

  monthSelected(number: string) {
    this.month = number
    this.generateMonthReport()
  }

  generateDayReport() {
    this.total = new Report()
    this.show = true
    // let dateSplit = this.day.split('/')
    // const dateNow = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]


    this.reportService.dayReport(this.day).subscribe(data => {
      each(data['sales'], (sale) => {
        this.total.totalSales += sale.total
        each(sale.productsales, (item) => {
          this.total.totalCostProducts += item.quantity * item.cost_price
        })
      });

      each(data['purchases'], (purchase) => {
        this.total.totalPurchases += purchase.total
      });
      each(data['expenses'], (expense) => {
        this.total.totalExpenses += expense.amount
      });
      this.data = [
        { data: [this.total.totalSales, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
      ];

      this.total.gananciaBruta = this.total.totalSales
      this.total.gananciaNeta = this.total.totalSales - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

    })
  }

  // generateWeekReport(){
  //   this.total = new Report()
  //   this.show = true

  //   this.reportService.weekReport(this.init,this.finish).subscribe(data => {
  //     each(data['sales'], (sale) => {
  //       this.total.totalSales += sale.total
  //       each(sale.productsales, (item) => {
  //         this.total.totalCostProducts += item.quantity * item.cost_price
  //       })
  //     });
  //     each(data['purchases'], (purchase) => {
  //       this.total.totalPurchases += purchase.price * purchase.quantity
  //     });
  //     each(data['expenses'], (expense) => {
  //       this.total.totalExpenses += expense.amount
  //     });
  //     this.data = [
  //       { data: [this.total.totalSales, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
  //     ];

  //     this.total.gananciaBruta = this.total.totalSales
  //     this.total.gananciaNeta = this.total.totalSales - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

  //   })
  // }


  generateMonthReport() {
    this.total = new Report()
    this.show = true


    this.reportService.monthReport(this.month).subscribe(data => {
      each(data['sales'], (sale) => {
        this.total.totalSales += sale.total
        each(sale.productsales, (item) => {
          this.total.totalCostProducts += item.quantity * item.cost_price
        })
      });
      each(data['purchases'], (purchase) => {
        this.total.totalPurchases += purchase.total
      });
      each(data['expenses'], (expense) => {
        this.total.totalExpenses += expense.amount
      });
      this.data = [
        { data: [this.total.totalSales, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
      ];

      this.total.gananciaBruta = this.total.totalSales
      this.total.gananciaNeta = this.total.totalSales - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

    })
  }

  generateYearReport() {
    this.total = new Report()
    this.show = true


    this.reportService.yearReport(this.year).subscribe(data => {
      console.log(data)
      each(data['sales'], (sale) => {
        this.total.totalSales += sale.total
        each(sale.productsales, (item) => {
          this.total.totalCostProducts += item.quantity * item.cost_price
        })
      });
      each(data['purchases'], (purchase) => {
        this.total.totalPurchases += purchase.total
      });
      each(data['expenses'], (expense) => {
        this.total.totalExpenses += expense.amount
      });
      this.data = [
        { data: [this.total.totalSales, this.total.totalPurchases, this.total.totalExpenses], label: 'Movimientos' }
      ];

      this.total.gananciaBruta = this.total.totalSales
      this.total.gananciaNeta = this.total.totalSales - this.total.totalCostProducts - this.total.totalExpenses - this.total.totalPurchases

    })
  }

}
