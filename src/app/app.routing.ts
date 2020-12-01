import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AuthorComponent } from './author/author.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'author/:fileName', component: AuthorComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
