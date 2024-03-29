import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from '../../user'
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { HttpClient } from '@angular/common/http';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-dog',
  templateUrl: './upload-dog.component.html',
  styleUrls: ['./upload-dog.component.css']
})
export class UploadDogComponent implements OnInit {

  userDB: User | undefined;
  newDog = new Dog();

  dogName = new FormControl();
  dogImageUrl = new FormControl();
  dogSex = new FormControl();
  dogAge = new FormControl();
  dogBreed = new FormControl();
  dogDescription = new FormControl();
  dogSummary = new FormControl();

  dogAgeList: string[] = [
    "Please Select Age in Years...",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    ];


    selectedFile!: File;
    fd = new FormData();
    imagePath!: string;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dogService: DogService) { }

  ngOnInit(): void {
    this.dogAge.setValue("Please Select Age in Years...")
    const id = Number(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUserById(id).subscribe({
      next: data => {
        this.userDB = data
        // this.dogLocation.setValue(data.LocationId);
      }
    }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.value) {
      this.selectedFile = <File>event.target.files[0];
      this.fd.append('file', this.selectedFile, this.selectedFile.name);
      const dogImage = document.getElementById("dogImage") as HTMLImageElement;
      const imgString = URL.createObjectURL(this.selectedFile);
      dogImage.src = imgString
      this.imagePath = this.selectedFile.name;
    }
  }

  postImage(): void {
    this.http.post(`${this.dogService.anotherDogUrl}/images`, this.fd)
    .subscribe( result => {
      console.log(result)
    });
  }

  cancel(): void {
    if (this.userDB) {
      this.router.navigateByUrl(`/user/${this.userDB.id}`);
    }
  }

  submitDog(): void {
    console.log("clicked!")
    if (this.userDB) {
      this.newDog.name = this.dogName.value;
      const ds = this.dogSex.value;
      if (ds == 1) {
        this.newDog.sex = "M"
      } else {
        this.newDog.sex = "F"
      }
      if (this.dogAge.value == "Please Select Age in Years...") {
        this.newDog.age = 0;
      } else {
        this.newDog.age = parseInt(this.dogAge.value);
      }
      this.newDog.breed = this.dogBreed.value
      this.newDog.summary = this.dogSummary.value
      this.newDog.description = this.dogDescription.value
      this.postImage();
      this.newDog.imageURL = `${this.dogService.anotherDogUrl}/images/${this.imagePath}`; 
      this.newDog.LocationId = this.userDB.LocationId;
      this.newDog.UserId = this.userDB.id;
      console.log(this.newDog)
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(this.newDog);
      console.log(body)
      this.http.post<Dog>(`http://localhost:3000/api/dogs`, body, {'headers':headers})
      .subscribe(result => { console.log("Posted" + JSON.stringify(result)); }, error => console.error(error));
      this.router.navigateByUrl('/dogs')
    }

  }

}
