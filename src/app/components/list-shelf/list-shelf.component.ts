import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-shelf',
    templateUrl: './list-shelf.component.html',
    styleUrls: ['./list-shelf.component.css']
})

export class ListShelfComponent {
    imageWidth: number = 200;
    imageMargin: number = 2;

    @Input() name: string = '';
    @Input() summary: string = '';
    @Input() imagePath: string = '';
}