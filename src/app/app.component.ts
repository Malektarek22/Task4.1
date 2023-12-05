import { Component } from '@angular/core';
import { CrudHttpService } from '../crud-http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CrudHttpService],


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-service-app';

  todoList: any = [];

  constructor(private crudHttpService: CrudHttpService) { }

  ngOnInit(): void {
    this.listTodos();
  }

  listTodos() {
    this.crudHttpService.list().subscribe((response) => {
      this.todoList = response;
    }, (error => {

    }));
  }

  createTodo() {
    let todo = {
      id: new Date().getTime(),
      title: `Some Todo`
    }
    this.crudHttpService.create(todo).subscribe((response) => {
      this.listTodos();
    }, (error => {

    }));
  }

  editTodo(todo: any) {
    const newTitle = prompt("Please enter the title")
    let data = {
      id: new Date().getTime(),
      title: newTitle
    }
    this.crudHttpService.update(todo.id, data).subscribe((response) => {
      this.listTodos();
    }, (error => {

    }));
  }

  deleteTodo(id: any) {
    this.crudHttpService.delete(id).subscribe((response) => {
      this.listTodos();
    }, (error => {
    }));
  }
}