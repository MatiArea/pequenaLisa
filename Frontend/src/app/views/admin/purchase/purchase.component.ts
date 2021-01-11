import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
import { Purchase } from '../../../models/purchase';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private router: Router, private productService: ProductService, private toastr: ToastrService) {
    this.purchase = new Purchase()
  }

  products: any
  items: any
  unit_price: number
  quantity: number
  purchase: Purchase
  total: number
  purchases: any
  cargandoCreatePurchase: boolean
  indexProductSelect: number
  page: number

  @ViewChild('editPurchaseModal', { static: false }) public editPurchaseModal: ModalDirective;
  @ViewChild('newPurchaseModal', { static: false }) public newPurchaseModal: ModalDirective;

  ngOnInit(): void {
    this.page = 0
    this.getAllPurchase()
  }

  changePage(numPage: number) {
    if (numPage >= 0) {
      this.page = numPage
      this.getAllPurchase()
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data['products']
    })
  }

  getAllPurchase() {
    this.purchases = []
    this.purchaseService.getAllPurchase(this.page).subscribe(data => {
      this.purchases = data['purchases']
    })
  }

  opentNewPurchaseModal() {
    this.getAllProducts()
    this.items = []
    this.purchase.total = 0
    this.purchase.date = new Date().toISOString().split('T')[0]
    this.newPurchaseModal.show()
  }

  productSelected(index: number) {
    this.indexProductSelect = index
  }

  addItem(form: any) {
    let bandera
    if (this.quantity > 0) {
      if (this.items.length === 0) {
        const item = {
          product: this.products[this.indexProductSelect],
          quantity: this.quantity,
          unit_price: this.unit_price
        }
        this.items.push(item)
        this.purchase.total += item.quantity * item.unit_price
      }
      else {
        bandera = false
        this.items.forEach(element => {
          if (element.product.id_product === this.products[this.indexProductSelect].id_product) {
            element.quantity += this.quantity
            this.purchase.total += this.quantity * element.unit_price
            bandera = true
          }
        });
        if (bandera == false) {
          {
            const item = {
              product: this.products[this.indexProductSelect],
              quantity: this.quantity,
              unit_price: this.unit_price
            }
            this.items.push(item)
            this.purchase.total += item.quantity * item.unit_price
          }
        }
      }
      form.reset()
    } else {
      this.toastr.error('La cantidad no puede ser 0', 'Error!', {
        closeButton: true,
        progressBar: true
      });
      form.reset()
    }
  }

  deleteItem(item: any) {
    this.purchase.total -= item.quantity * item.unit_price
    this.items.pop(item)
  }

  createPurchase(createForm: any) {
    this.cargandoCreatePurchase = true
    const purchase = {
      date: this.purchase.date,
      items: this.items,
      total: this.purchase.total
    }
    this.purchaseService.createPurchase(purchase).subscribe(data => {
      this.cargandoCreatePurchase = false
      this.toastr.success('Producto creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newPurchaseModal.hide();
      createForm.reset();
      this.getAllPurchase();

    }, (error) => {
      if (error) {
        this.cargandoCreatePurchase = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude crear la compra', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deletePurchase(idPurchase: number) {
    this.purchaseService.deletePurchase(idPurchase).subscribe(data => {
      this.toastr.success('Compra eliminada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllPurchase();
    }, (error) => {
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar la compra', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}
