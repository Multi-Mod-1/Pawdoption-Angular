import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
// import { AuthButtonComponent } from './login/auth-login.component';

@NgModule({
  declarations: [AppComponent, 
    FooterComponent, 
    NavigationBarComponent, 
    // AuthButtonComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AuthModule.forRoot({
      domain: 'dev-ptb9wvr7.us.auth0.com',
      clientId: 'sHk8l4keXD84veqaqD9EvicqCljzYNmr'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
