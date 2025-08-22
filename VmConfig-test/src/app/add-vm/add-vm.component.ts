import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-vm',
  standalone: false,
  templateUrl: './add-vm.component.html',
  styleUrls: ['./add-vm.component.css']
})
export class AddVMComponent {
  @Output() vmCreated = new EventEmitter<void>();
  vmForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  isoOptions: string[] = [
    'ubuntu-22.04.5-live-server-amd64.iso',
    
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.vmForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cores: [1, [Validators.required, Validators.min(1), Validators.max(32)]],
      sockets: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
      memory: [1024, [Validators.required, Validators.min(512), Validators.max(32768)]],
      diskSize: [20, [Validators.required, Validators.min(10), Validators.max(1000)]],
      iso: ['', Validators.required]
    });
  }

  createVM() {
    if (this.vmForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = this.vmForm.value;
    
    // Utiliser le même port que ShowVMComponent (8082)
    this.http.post('http://localhost:8082/api/vms', data).subscribe({
      next: () => {
        this.isLoading = false;
        alert('VM ajoutée avec succès !');
        this.vmCreated.emit();
        this.vmForm.reset({
          cores: 1,
          sockets: 1,
          memory: 1024,
          diskSize: 20
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur lors de l\'ajout de la VM:', err);
        
        if (err.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez que le serveur backend est démarré sur le port 8082.';
        } else if (err.status === 400) {
          this.errorMessage = 'Données invalides. Vérifiez les valeurs saisies.';
        } else if (err.status === 409) {
          this.errorMessage = 'Une VM avec ce nom existe déjà.';
        } else {
          this.errorMessage = `Erreur serveur (${err.status}): ${err.message || 'Erreur inconnue'}`;
        }
      }
    });
  }

  // Méthode pour réinitialiser les erreurs quand l'utilisateur modifie le formulaire
  onFormChange() {
    this.errorMessage = '';
  }
}
