import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private router: Router, private productService: ProductService, private toastr: ToastrService) {
  }

  products: any
  idProductSelect: any
  items: any
  purchase: any
  total: number
  purchases: any
  cargandoCreatePurchase:boolean
  page:number

  @ViewChild('editPurchaseModal', { static: false }) public editPurchaseModal: ModalDirective;
  @ViewChild('newPurchaseModal', { static: false }) public newPurchaseModal: ModalDirective;

  ngOnInit(): void {
  }

  // changePage(numPage:number){
  //   if(numPage >= 0){
  //     this.page = numPage
  //     this.getAllPurchase()
  //   }
  // }

  // getAllProducts() {
  //   this.productService.getAllProducts().subscribe(data => {
  //     this.products = data['products']
  //   })
  // }

  // getAllPurchase() {
  //   this.purchases = []
  //   this.purchaseService.getAllPurchase(this.page).subscribe(data => {
  //     this.purchases = data['purchases']
  //   })

  // }

  // opentNewPurchaseModal() {
  //   this.idProductSelect = 0
  //   this.getAllProducts()
  //   this.purchase.date = new Date().toISOString().split('T')[0]
  //   this.newPurchaseModal.show()
  // }

  // productSelected(id_product: number) {
  //   this.idProductSelect = id_product
  // }

  // createPurchase(createForm: any) {
  //   this.cargandoCreatePurchase = true
  //   const purchase = {
  //     date: this.purchase.date,
  //     price: this.purchase.price,
  //     quantity: this.purchase.quantity,
  //     idProduct: this.idProductSelect
  //   }
  //   this.purchaseService.createPurchase(purchase).subscribe(data => {
  //     this.cargandoCreatePurchase = false
  //     this.toastr.success('Producto creado con exito', 'Exito!', {
  //       closeButton: true,
  //       progressBar: true
  //     });
  //     this.newPurchaseModal.hide();
  //     createForm.reset();
  //     this.getAllPurchase();

  //   }, (error) => {
  //     if (error) {
  //       this.cargandoCreatePurchase = false
  //       if (error.code === 403) {
  //         this.router.navigate(['login']);
  //       }
  //       this.toastr.error('No se pude crear la compra', 'Error!', {
  //         closeButton: true,
  //         progressBar: true
  //       });
  //     }
  //   })
  // }

  // deletePurchase(idPurchase: number) {
  //   this.purchaseService.deletePurchase(idPurchase).subscribe(data => {
  //     this.toastr.success('Compra eliminada con exito', 'Exito!', {
  //       closeButton: true,
  //       progressBar: true
  //     });
  //     this.getAllPurchase();
  //   }, (error) => {
  //     if (error) {
  //       if (error.code === 403) {
  //         this.router.navigate(['login']);
  //       }
  //       this.toastr.error('No se pude eliminar la compra', 'Error!', {
  //         closeButton: true,
  //         progressBar: true
  //       });
  //     }
  //   })
  // }

}
