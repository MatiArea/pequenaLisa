import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
import { Product } from '../../../models/product';
registerLocaleData(localeIt, 'it');


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  productToEdit: Product;
  products: any;
  cargandoCreateProduct: boolean;
  cargandoUpdateProduct: boolean;
  page: number
  condition: boolean = false;

  constructor(private productoService: ProductService, private router: Router, private toastr: ToastrService) {
    this.product = new Product()
    this.productToEdit = new Product()
  }

  @ViewChild('editProductModal', { static: false }) public editProductModal: ModalDirective;
  @ViewChild('newProductModal', { static: false }) public newProductModal: ModalDirective;



  ngOnInit(): void {
    this.page = 0
    this.getAllProducts()
  }

  changePage(numPage: number) {
    if (numPage >= 0) {
      this.page = numPage
      this.getAllProducts()
    }
  }

  getAllProducts() {
    this.productoService.getAllProductsTable(this.page).subscribe(products => {
      this.products = products['products']
    });
  }

  createProduct(createForm: any) {
    this.cargandoCreateProduct = true
    this.productoService.createProduct(this.product).subscribe(data => {
      this.cargandoCreateProduct = false
      this.toastr.success('Producto creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newProductModal.hide();
      createForm.reset();
      this.page = 0
      this.getAllProducts();

    }, (error) => {
      if (error) {
        this.cargandoCreateProduct = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude crear el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  openEditProduct(productEdit: any) {
    this.productoService.getOneProduct(productEdit.id_product).subscribe(productToEdit => {
      this.productToEdit = productToEdit['product'];
    })
    this.editProductModal.show();
  }

  editProduct(editForm: any) {
    this.cargandoUpdateProduct = true
    this.productoService.editProduct(this.productToEdit).subscribe(data => {
      this.cargandoUpdateProduct = false
      this.toastr.success('Producto actualizado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.editProductModal.hide();
      editForm.reset();
      this.page = 0
      this.getAllProducts();

    }, (error) => {
      if (error) {
        this.cargandoUpdateProduct = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude actualizar el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteProduct(productDelete: any) {
    this.productoService.deleteProduct(productDelete.id_product).subscribe(data => {
      this.toastr.success('Producto eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllProducts();
    }, (error) => {
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }


}
