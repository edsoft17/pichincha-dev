import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
    },
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    }
];
