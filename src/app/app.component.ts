import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {}

  logout(): void {
    this.keycloakService.logout();
  }

  get userName(): string {
    return this.keycloakService.getUsername();
  }
}