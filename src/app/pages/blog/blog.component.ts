import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Array<IBlog> = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getServerBlogs();
  }

  private getServerBlogs(): void {
    this.blogService.getJSONBlog().subscribe(
      data => {
        this.blogs = data;
      },
      err => console.log(err)
    );
  }
}
