import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ItemsState } from './core/states/items.state';
import { MyFavoritesComponent } from './feature-components/my-favorites/my-favorites.component';
import { SearchHomeComponent } from './feature-components/search-home/search-home.component';
import { AppSharedModule } from './shared/shared.module';
import { AppCoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    MyFavoritesComponent,
    SearchHomeComponent,
  ],
  imports: [
    AppCoreModule,
    AppRoutingModule,
    AppSharedModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ItemsState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
