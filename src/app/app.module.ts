import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Components */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LifeComponent } from './component/life/life.component';
import { OptionsComponent } from './component/options/options.component';
import { DialogRulesDialog } from './component/dialogs/rules-dialog.component';
import { DialogResultDialog } from './component/dialogs/result-dialog.component';

/* Service */
import { StoreResultService } from './services/store-result.service';
import { StoreOptionsService } from './services/store-options.service';
import { CanvasService } from './services/canvas.service';
import { LifeService } from './services/life.service';

/* Angular Material */
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AppMaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LifeComponent,
    OptionsComponent,
    DialogRulesDialog,
    DialogResultDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    MatNativeDateModule,
  ],
  entryComponents: [
    DialogRulesDialog,
    DialogResultDialog
  ],
  providers: [
    StoreResultService,
    StoreOptionsService,
    CanvasService,
    LifeService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
