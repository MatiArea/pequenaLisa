import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../../services/expense.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
import { Expense } from '../../../models/expense';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses: any
  expense: Expense
  viewExpense: Expense
  typeSelect: number
  viewType: number
  cargandoExpense: boolean
  page: number


  @ViewChild('viewExpenseModal', { static: false }) public viewExpenseModal: ModalDirective;
  @ViewChild('newExpenseModal', { static: false }) public newExpenseModal: ModalDirective;

  constructor(private expenseService: ExpenseService, private router: Router, private toastr: ToastrService) {
    this.expense = new Expense()
    this.viewExpense = new Expense()
  }

  ngOnInit(): void {
    this.page = 0
    this.getAllExpense()
  }

  changePage(numPage: number) {
    if (numPage >= 0) {
      this.page = numPage
      this.getAllExpense()
    }
  }

  getAllExpense() {
    this.expenses = []
    this.expenseService.getAllExpenses(this.page).subscribe(expenses => {
      this.expenses = expenses['expenses']
    })
  }

  openNewExpense() {
    this.expense.date = new Date().toISOString().split('T')[0]
    this.newExpenseModal.show()
  }

  openViewModal(expense: any) {
    this.viewType = 0
    this.viewExpense = expense
    this.viewExpenseModal.show()
  }


  createExpense(createForm: any) {
    this.cargandoExpense = true
    this.expenseService.createExpense(this.expense).subscribe(data => {
      this.cargandoExpense = false
      this.toastr.success('Gasto cargado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      createForm.reset();
      this.newExpenseModal.hide();
      this.getAllExpense();

    }, (error) => {
      if (error) {
        this.cargandoExpense = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude cargar el gasto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteExpense(idExpense: number) {
    this.expenseService.deleteExpense(idExpense).subscribe(data => {
      this.toastr.success('Gasto eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllExpense();
    }, (error) => {
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar el gasto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}
