import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  adminCategories: Array<ICategory> = [];
  catName: string;
  catURLName: string;
  catID: number;
  editStatus: boolean;

  constructor(
    private modalService: BsModalService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.adminCategories = data;
      },
      (err) => console.log(err)
    );
  }

  addCategory(): void {
    const NEW_CATEGORY = new Category(this.catName, this.catURLName);
    this.apiService.postCategory(NEW_CATEGORY).subscribe(
      () => {
        this.getCategories();
      },
      (err) => console.log(err)
    );
    this.resetForm();
    this.modalRef.hide();
  }

  deleteCategory(category: ICategory): void {
    this.apiService.deleteCategory(category.id).subscribe(
      () => {
        this.getCategories();
      },
      (err) => console.log(err)
    );
  }

  editCategory(category: ICategory, template: TemplateRef<any>): void {
    this.catName = category.name;
    this.catURLName = category.urlName;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  saveCategory(): void {
    const NEW_CATEGORY = new Category(this.catName, this.catURLName);
    this.apiService.updateCategory(NEW_CATEGORY).subscribe(
      () => {
        this.getCategories();
      },
      (err) => console.log(err)
    );
    this.resetForm();
    this.modalRef.hide();
    this.editStatus = false;
  }

  private resetForm(): void {
    this.catID = 1;
    this.catName = '';
    this.catURLName = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
