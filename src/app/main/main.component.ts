import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  userId?: string;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.keycloakService.loadUserProfile().then(profile => {
      this.userId = profile.id;
    });

    
  }
}
