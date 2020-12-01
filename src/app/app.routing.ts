import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AuthorComponent } from './author/author.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'author/:fileName', component: AuthorComponent },
  { path: 'editor', component: EditorComponent, outlet: 'editor' },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
