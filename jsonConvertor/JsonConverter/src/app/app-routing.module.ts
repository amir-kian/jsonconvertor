import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/formula/list/list.component';
import { EditComponent } from './components/formula/edit/edit.component';
import { AddComponent } from './components/formula/add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: AddComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
