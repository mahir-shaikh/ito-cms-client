import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, {useHash: true});
