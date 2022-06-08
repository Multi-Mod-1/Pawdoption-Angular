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

  selectedFile!: ImageSnippet;

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

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dogService: DogService) { }

  ngOnInit(): void {
    this.dogAge.setValue("Please Select Age in Years...")
    const email = String(this.route.snapshot.paramMap.get('email'));
    this.userService.getUserByEmail(email).subscribe({
      next: data => {
        this.userDB = data
        // this.dogLocation.setValue(data.LocationId);
      }
    }
    );
  }

  updateImage(): void {
    const dogImage = document.getElementById("dogImage") as HTMLImageElement;
    if (this.dogImageUrl.value != "") {
      dogImage.style.display = "block"
    } else {
      dogImage.style.display = "none"
    }
    dogImage.src = this.dogImageUrl.value
    console.log(this.dogImageUrl.value);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      console.log(this.selectedFile.file)
      // const formData = new FormData();

      // formData.append('image', this.selectedFile.file);

      // console.log(formData)
    });

    reader.readAsDataURL(file);
  }

  submitDog(): void {
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
      // this.newDog.imageURL = this.dogImageUrl.value; 
      this.newDog.imageURL = this.selectedFile.file; 
      this.newDog.LocationId = this.userDB.LocationId;
      this.newDog.UserId = this.userDB.id;
      // console.log(this.newDog)
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(this.newDog);
      console.log(body)
      this.http.post<Dog>(`http://localhost:3000/api/dogs`, body, {'headers':headers})
      .subscribe(result => { console.log("Posted" + JSON.stringify(result)); }, error => console.error(error));
      this.router.navigateByUrl('/dogs')
    }

  }

}
