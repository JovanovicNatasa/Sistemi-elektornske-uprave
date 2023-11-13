import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationComponent } from './validation/validation.component';
import { ValidationResultsComponent } from './validation-results/validation-results.component';

const routes: Routes = [
  {
    path:'',
    component: ValidationComponent
  },
  {
    path:'rezultati',
    component: ValidationResultsComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
