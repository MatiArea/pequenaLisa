import { Component, OnInit, ViewChild } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';
import { each, forEachOf } from 'async'
import localeIt from '@angular/common/locales/it'
import { Sale } from '../../../models/sale';
registerLocaleData(localeIt, 'it');


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sale: Sale
  sales: any
  products: any
  clients: any
  indexProductSelect: number
  quantity: number
  items: any
  id_client: number
  saleView: Sale
  cargandoCreateSale: boolean
  sale_price: number
  page: number

  constructor(private saleService: SaleService, private router: Router, private productService: ProductService, private toastr: ToastrService) {
    this.sale = new Sale()
    this.saleView = new Sale()
  }


  @ViewChild('viewSaleModal', { static: false }) public viewSaleModal: ModalDirective;
  @ViewChild('newSaleModal', { static: false }) public newSaleModal: ModalDirective;

  ngOnInit(): void {
  }

  // changePage(numPage:number){
  //   if(numPage >= 0){
  //     this.page = numPage
  //     this.getAllSales()
  //   }
  // }

  // getAllSales() {
  //   this.sales = []
  //   this.saleService.getAllsales(this.page).subscribe(sales => {
  //     this.sales = sales['sales']
  //   })
  // }


  // getAllProducts() {
  //   this.products = []
  //   this.productService.getAllProducts().subscribe(products => {
  //     this.products = products['products']
  //   })
  // }

  // getOneSale(idSale: number) {
  //   var indexProduct
  //   var bandera

  //   this.saleView.items = []
  //   this.saleService.getOneSale(idSale).subscribe(sale => {
  //     this.saleView.number = sale['sale'].number
  //     this.saleView.date = sale['sale'].date.split('T')[0]
  //     this.saleView.name_client = sale['sale'].client.name
  //     each(sale['sale'].productsales, (itemProducto) => {
  //       forEachOf(sale['sale'].products, (element, index) => {
  //         if (element.id_product === itemProducto.id_product) {
  //           indexProduct = index
  //         }
  //       })
  //       if (this.saleView.items.length === 0) {
  //         const item = {
  //           product: sale['sale'].products[indexProduct],
  //           quantity: itemProducto.quantity,
  //           sale_price: itemProducto.sale_price
  //         }
  //         this.saleView.items.push(item)
  //       }
  //       else {
  //         bandera = true
  //         each(this.saleView.items, (itemView) => {
  //           if (itemView.product.id_product === itemProducto.id_product) {
  //             bandera = false
  //             itemView.quantity += itemProducto.quantity
  //           }
  //         })
  //         if (bandera === true) {
  //           const item = {
  //             product: sale['sale'].products[indexProduct],
  //             quantity: itemProducto.quantity,
  //             sale_price: itemProducto.sale_price
  //           }
  //           this.saleView.items.push(item)
  //         }
  //       }
  //     });
  //     this.saleView.total = sale['sale'].total
  //     this.saleView.payment = sale['sale'].payment
  //     this.viewSaleModal.show()
  //   })
  // }

  // openNewSaleModal() {
  //   this.getAllProducts()
  //   this.items = []
  //   this.sale.total = 0
  //   this.sale.date = new Date().toISOString().split('T')[0]
  //   this.newSaleModal.show()
  // }

  // productSelected(index: number) {
  //   this.indexProductSelect = index
  // }

  // clientSelected(idClient: number) {
  //   this.sale.id_client = idClient
  // }

  // addItem(form: any) {
  //   let bandera
  //   if (this.quantity > 0) {
  //     if (this.products[this.indexProductSelect].stock < this.quantity) {
  //       this.toastr.error('No hay stock suficiente', 'Error!', {
  //         closeButton: true,
  //         progressBar: true
  //       });
  //       form.reset()
  //     } else {
  //       if (this.items.length === 0) {
  //         const item = {
  //           product: this.products[this.indexProductSelect],
  //           quantity: this.quantity,
  //           sale_price: this.sale_price
  //         }
  //         this.items.push(item)
  //         this.sale.total += item.quantity * item.sale_price
  //       }
  //       else {
  //         bandera = false
  //         this.items.forEach(element => {
  //           if (element.product.id_product === this.products[this.indexProductSelect].id_product) {
  //             element.quantity += this.quantity
  //             this.sale.total += this.quantity * element.sale_price
  //             bandera = true
  //           }
  //         });
  //         if (bandera == false) {
  //           {
  //             const item = {
  //               product: this.products[this.indexProductSelect],
  //               quantity: this.quantity,
  //               sale_price: this.sale_price
  //             }
  //             this.items.push(item)
  //             this.sale.total += item.quantity * item.sale_price
  //           }
  //         }
  //       }
  //       this.products[this.indexProductSelect].stock -= this.quantity
  //       form.reset()
  //     }
  //   } else {
  //     this.toastr.error('La cantidad no puede ser 0', 'Error!', {
  //       closeButton: true,
  //       progressBar: true
  //     });
  //     form.reset()
  //   }
  // }

  // deleteItem(item: any) {
  //   this.products[this.indexProductSelect].stock += item.quantity
  //   this.sale.total -= item.quantity * item.sale_price
  //   this.items.pop(item)
  // }

  // createSale(createForm: any) {
  //   this.cargandoCreateSale = true
  //   let newSale = {
  //     date: this.sale.date,
  //     id_client: this.sale.id_client,
  //     total: this.sale.total,
  //     payment: this.sale.payment,
  //     items: this.items
  //   }
  //   this.saleService.createSale(newSale).subscribe(data => {
  //     this.cargandoCreateSale = false
  //     this.toastr.success('Venta creada con exito', 'Exito!', {
  //       closeButton: true,
  //       progressBar: true
  //     });
  //     this.newSaleModal.hide();
  //     createForm.reset();
  //     this.getAllSales();

  //   }, (error) => {
  //     if (error) {
  //       this.cargandoCreateSale = false
  //       if (error.code === 403) {
  //         this.router.navigate(['login']);
  //       }
  //       this.toastr.error('No se pude crear la venta', 'Error!', {
  //         closeButton: true,
  //         progressBar: true
  //       });
  //     }
  //   })
  // }

  // daleteSale(idSale: number) {
  //   this.saleService.deleteSale(idSale).subscribe(
  //     data => {
  //       this.toastr.success('Venta eliminada con exito', 'Exito!', {
  //         closeButton: true,
  //         progressBar: true
  //       });
  //       this.getAllSales();

  //     }, (error) => {
  //       if (error) {
  //         if (error.code === 403) {
  //           this.router.navigate(['login']);
  //         }
  //         this.toastr.error('No se pude eliminar la venta', 'Error!', {
  //           closeButton: true,
  //           progressBar: true
  //         });
  //       }
  //     })
  // }

}