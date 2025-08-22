import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses = [
    {
      id: 1,
      title: 'Introduction aux Machines Virtuelles',
      description: 'Apprenez les bases de la virtualisation et des VMs',
      instructor: 'Dr. Smith',
      duration: '8 semaines',
      status: 'En cours'
    },
    {
      id: 2,
      title: 'Administration Linux',
      description: 'Maîtrisez l\'administration des systèmes Linux',
      instructor: 'Prof. Johnson',
      duration: '12 semaines',
      status: 'Disponible'
    },
    {
      id: 3,
      title: 'Sécurité Informatique',
      description: 'Protection et sécurisation des systèmes',
      instructor: 'Dr. Brown',
      duration: '10 semaines',
      status: 'Terminé'
    }
  ];

  constructor() {}
} 