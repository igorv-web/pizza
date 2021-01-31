import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  modalRef: BsModalRef;
  adminProducts: Array<IProduct> = [];
  adminCategories: Array<ICategory> = [];
  prodName: string;
  prodDesc: string;
  prodURLName: string;
  prodPrice: number;
  prodImage: string;
  currentCategory: ICategory;
  editStatus: boolean;
  prodCount: number;
  upload: any;
  uploadProgress: Observable<number>;
  uploadStatus: boolean;

  constructor(
    private modalService: BsModalService,
    private apiService: ApiService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories(): void {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.adminCategories = data;
      },
      (err) => console.log(err)
    );
  }

  private getProducts(): void {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.adminProducts = data;
      },
      (err) => console.log(err)
    );
  }

  addProduct(): void {
    const NEW_PRODUCT = new Product(
      this.prodName,
      this.prodURLName,
      this.prodDesc,
      this.prodPrice,
      this.currentCategory,
      this.prodCount,
      this.prodImage
    );
    this.apiService.postProduct(NEW_PRODUCT).subscribe(
      () => {
        this.getProducts();
      },
      (err) => console.log(err)
    );
    this.resetForm();
    this.modalRef.hide();
  }

  deleteProduct(product: IProduct): void {
    this.apiService.deleteProduct(product.id).subscribe(
      () => {
        this.getProducts();
      },
      (err) => console.log(err)
    );
    this.afStorage.storage.refFromURL(this.prodImage).delete()
      .then(() => {
        this.uploadStatus = false;
      })
      .catch(err => console.log(err));
  }

  editProduct(product: IProduct, template: TemplateRef<any>): void {
    this.currentCategory = product.category;
    this.prodName = product.name;
    this.prodURLName = product.urlName;
    this.prodDesc = product.description;
    this.prodPrice = product.price;
    this.prodImage = product.image;
    this.editStatus = true;
    this.uploadStatus = true;
    this.uploadStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  saveProduct(): void {
    const UPDATE_PRODUCT = new Product(
      this.prodName,
      this.prodURLName,
      this.prodDesc,
      this.prodPrice,
      this.currentCategory,
      this.prodCount,
      this.prodImage
    );
    this.apiService.updateProduct(UPDATE_PRODUCT).subscribe(
      () => {
        this.getProducts();
      },
      (err) => console.log(err)
    );
    this.resetForm();
    this.modalRef.hide();
    this.uploadStatus = false;
    this.editStatus = false;
  }

  private resetForm(): void {
    this.prodName = '';
    this.prodURLName = '';
    this.prodDesc = '';
    this.prodPrice = 0;
    this.uploadStatus = false;
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    this.upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = this.upload.percentageChanges();
    this.upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.prodImage = url;
        this.uploadStatus = true;
        event.target.files = null;
      });
    });
  }

  deleteImage(): void {
    this.afStorage.storage.refFromURL(this.prodImage).delete()
      .then(() => {
        this.uploadStatus = false;
      })
      .catch(err => console.log(err));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
