import { Component, Input }  from '@angular/core';
import { IList } from 'src/app/shared/interfaces/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

    @Input() list: IList[] = [];
    @Input() labelA: string;
    @Input() labelB: string;

    constructor(
    ) {}
}
