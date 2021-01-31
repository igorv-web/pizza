import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css'],
})
export class AdminBlogComponent implements OnInit {
  adminBlog: Array<IBlog> = [];
  blogID: number = 1;
  blogTitle: string;
  blogAuthor: string;
  blogText: string;
  blogImage =
    'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80';
  isRed: boolean = false;

  editStatus: boolean;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getServerBlogs();
  }

  private getServerBlogs(): void {
    this.blogService.getJSONBlog().subscribe(
      (data) => {
        this.adminBlog = data;
      },
      (err) => console.log(err)
    );
  }

  addBlog(): void {
    if (this.blogAuthor && this.blogText && this.blogTitle) {
      const NEW_BLOG = new Blog(
        this.blogID,
        this.blogTitle,
        this.blogText,
        this.blogAuthor,
        this.blogImage
      );
      delete NEW_BLOG.id;
      this.blogService.postJSONBlog(NEW_BLOG).subscribe(
        () => {
          this.getServerBlogs();
        },
        (err) => console.log(err)
      );
      this.resetForm();
      this.isRed = false;
    } else {
      alert('Write info');
      this.isRed = true;
    }
  }

  deleteBlog(blog: IBlog): void {
    this.blogService.deleteJSONBlog(blog.id).subscribe(
      () => {
        this.getServerBlogs();
      },
      (err) => console.log(err)
    );
  }

  editBlog(blog: IBlog): void {
    this.blogID = blog.id;
    this.blogTitle = blog.title;
    this.blogAuthor = blog.author;
    this.blogText = blog.text;
    this.editStatus = true;
  }

  saveBlog(): void {
    const UPDATE_BLOG = new Blog(
      this.blogID,
      this.blogTitle,
      this.blogText,
      this.blogAuthor,
      this.blogImage
    );
    this.blogService.updateJSONBlog(UPDATE_BLOG).subscribe(
      () => {
        this.getServerBlogs();
      },
      (err) => console.log(err)
    );
    this.resetForm();
    this.editStatus = false;
  }

  private resetForm(): void {
    this.blogID = 1;
    this.blogTitle = '';
    this.blogAuthor = '';
    this.blogText = '';
  }
}
