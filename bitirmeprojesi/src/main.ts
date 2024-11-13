import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth-interceptor.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),  // Ensure this is provided
    provideRouter(routes,withComponentInputBinding())
  ]
}).catch(err => console.error(err));