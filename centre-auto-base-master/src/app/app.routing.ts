import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HomeViewComponent} from "./views/home-view/home-view.component";
import {SignBaseViewComponent} from './views/sign-base-view/sign-base-view.component';
import {DashboardViewComponent} from './views/dashboard-view/dashboard-view.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {BrandsViewComponent} from './views/brands-view/brands-view.component';
import {BrandEditorViewComponent} from './views/brand-editor-view/brand-editor-view.component';
import {BrandCreatorViewComponent} from './views/brand-creator-view/brand-creator-view.component';
import {ModelsEditorViewComponent} from './views/models-editor-view/models-editor-view.component';
import {ModelsCreatorViewComponent} from './views/models-creator-view/models-creator-view.component';
import {ModelsViewComponent} from './views/models-view/models-view.component';
import {CarCreatorViewComponent} from './views/car-creator-view/car-creator-view.component';
import {CarEditorViewComponent} from './views/car-editor-view/car-editor-view.component';

const redirectLoggedInToDashboard = ()=> redirectLoggedInTo(['dashboard']);
const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['signin']);

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeViewComponent},
    {
        path: 'signin',
        component: SignBaseViewComponent,
      //  canActivate:[AngularFireAuthGuard],
      //  data : {autGuardPipe : redirectLoggedInToDashboard}
    },
    {
        path: 'signup',
        component: SignBaseViewComponent,
      //  canActivate:[AngularFireAuthGuard],
     //   data : {autGuardPipe : redirectLoggedInToDashboard}
    },
    {
         path: 'dashboard',
         component: DashboardViewComponent,
      //   canActivate:[AngularFireAuthGuard],
      //   data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'brands',
        component: BrandsViewComponent,
      //  canActivate:[AngularFireAuthGuard],
      //  data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'brand/new',
        component: BrandCreatorViewComponent,
     //   canActivate:[AngularFireAuthGuard],
     //   data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'brand/edit/:id',
        component: BrandEditorViewComponent,
   //     canActivate:[AngularFireAuthGuard],
   //     data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'model/edit/:id',
        component:ModelsEditorViewComponent,
     //   canActivate:[AngularFireAuthGuard],
     //   data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'model/new',
        component: ModelsCreatorViewComponent,
     //   canActivate:[AngularFireAuthGuard],
     //   data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'models',
        component: ModelsViewComponent,
     //   canActivate:[AngularFireAuthGuard],
    //    data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'car/new',
        component: CarCreatorViewComponent,
       // canActivate:[AngularFireAuthGuard],
       // data:{autGuardPipe : redirectUnauthorizedToLogin}
    },
    {
        path: 'car/edit/:id',
        component: CarEditorViewComponent,
     //   canActivate:[AngularFireAuthGuard],
    //    data:{autGuardPipe : redirectUnauthorizedToLogin}
    }

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
