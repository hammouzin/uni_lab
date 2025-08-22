import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-space',
  standalone: false,
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.css'
})
export class UserSpaceComponent {
  constructor(private router: Router) {}

  logout() {
    console.log('Déconnexion en cours...');
    
    // Supprimer les données de session
    localStorage.removeItem('isLoggedIn');
    
    // Afficher un message de confirmation
    alert('Vous avez été déconnecté avec succès.');
    
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
