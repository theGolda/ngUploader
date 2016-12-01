import 'lib/zone.js/dist/zone.js';
import 'lib/reflect-metadata/Reflect.js';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/components/header.component';
import { UploaderComponent } from './uploader/components/uploader.component';
import { ManagerFileListComponent } from './manager/file-list/components/file-list.component';
import { ManagerFiltersComponent } from './manager/filters/components/filters.component';
import { FileManagerComponent } from './manager/manager';

import { FiltersService } from './manager/filters/services/filters.service';

@NgModule({
	declarations: [ 
		AppComponent,
		HeaderComponent,
		UploaderComponent,
		ManagerFileListComponent,
		ManagerFiltersComponent,
		FileManagerComponent
	],
	imports: [ BrowserModule ],
	bootstrap: [ AppComponent ],
	providers: [ FiltersService]
})
class AppModule {}

platformBrowserDynamic()
	.bootstrapModule(AppModule);