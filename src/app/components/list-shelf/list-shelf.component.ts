import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-shelf',
    templateUrl: './list-shelf.component.html'
})

export class ListShelfComponent {
    @Input() name: string = '';
    @Input() summary: string = '';
    @Input() imagePath: string = '';
}