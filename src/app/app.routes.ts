import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { ReadComponent } from './pages/read/read.component';
import { StorageComponent } from './pages/storage/storage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'read',
        component: ReadComponent
    },
    {
        path: 'update',
        component: UpdateComponent
    },
    {
        path: 'delete',
        component: DeleteComponent
    },
    {
        path: 'storage',
        component: StorageComponent
    },
];
