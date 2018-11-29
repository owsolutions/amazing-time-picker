import { Route, RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './presentation/example/example.component';
import { ApiComponent } from './presentation/api/api.component';

export const appRoutes: Routes = [
  {
    path: 'Examples',
    component: ExampleComponent
  },
  {
    path: 'API',
    component: ApiComponent
  },
  {
    path: '',
    redirectTo: '/Examples',
    pathMatch: 'full'
  }
];

export function appRoutersGenerator() {
  return RouterModule.forRoot(appRoutes, { useHash: true });
}
