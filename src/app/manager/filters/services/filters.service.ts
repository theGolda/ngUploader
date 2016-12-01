import { Injectable } from '@angular/core';
import { FILETYPES } from './../../mock-filetypes';

@Injectable()
export class FiltersService {
	getFileTypes(): FileTypes[] {
		return FILETYPES;
	};
}