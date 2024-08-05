import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ListStudentComponent } from './components/list-student/list-student.component';

const routes: Routes = [

  { path: '', redirectTo: 'view-student',pathMatch: 'full' },
  { path: 'view-student', component: ListStudentComponent },
  { path: 'add-student', component: AddStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
