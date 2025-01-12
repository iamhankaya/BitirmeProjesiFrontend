import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-admin-user-component',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-user-component.component.html',
  styleUrl: './admin-user-component.component.css'
})
export class AdminUserComponentComponent implements OnInit{
  users:User[];
  constructor(private userService:UserServiceService){}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(response => {
      this.users = response.data
    })
  }
}
