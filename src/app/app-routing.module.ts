import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './pages/blog/blog.component';
import { ProductsComponent } from './pages/products/products.component';

import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blog' },
  { path: 'blog', component: BlogComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'blogs', component: AdminBlogComponent },
    { path: 'categories', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
