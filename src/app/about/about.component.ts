import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
    public pageTitle = 'About Us';
    constructor(private meta: Meta){}
    meta_tag = this.meta.addTag({name:"description", content:"The about page for the creators of Pawdoption."});  

    ngOnInit(): void {
        this.meta_tag;
    }
}