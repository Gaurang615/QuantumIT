import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialInterfaceModule } from './material-interface.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SchoolClassModule } from './school-classes/school-class.module';
import { StudentModule } from './student/student.module';
import { HttpErrorInterceptor } from './core/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialInterfaceModule,
    HttpClientModule,
    SchoolClassModule,
    StudentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
