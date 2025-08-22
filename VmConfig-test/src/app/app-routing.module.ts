import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSpaceComponent } from './user-space/user-space.component';
import { AuthGuard } from './auth/auth.guard';
import { AddVMComponent } from './add-vm/add-vm.component';
import { ShowVMComponent } from './show-vm/show-vm.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'user', 
        component: UserSpaceComponent, 
        canActivate: [AuthGuard],
        children: [
            {
                path: '', 
                redirectTo: 'dashboard/accueil', 
                pathMatch: 'full'
            },
            {
                path: 'dashboard/accueil',
                component: HomeComponent
            },
            {
                path: 'dashboard/vm',
                component: ShowVMComponent
            },
            {
                path: 'dashboard/cours',
                component: CoursesComponent
            }
        ]
    },
    {
        path: 'add-vm', component: AddVMComponent, canActivate: [AuthGuard]
    },
    {
        path: 'show-vm', component: ShowVMComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
