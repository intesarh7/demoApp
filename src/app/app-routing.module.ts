import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'app',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{ 
		path: 'search',
		loadChildren: './pages/search/search.module#SearchPageModule'
	},
	{ 
		path: 'news-detail',
		loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
	},
  	{ 
	  path: 'login', 
	  loadChildren: './public/login/login.module#LoginPageModule' 
	},
  	{ 
	  path: 'signup', 
	  loadChildren: './public/signup/signup.module#SignupPageModule' 
	},
  	{ 
		path: 'intro', 
		loadChildren: './intro/intro.module#IntroPageModule' 
	}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
