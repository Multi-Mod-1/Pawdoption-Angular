// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { IDog } from './dog';
// import { ProductService } from './product.service';

// @Component({
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css']
// })
// export class ProductDetailComponent implements OnInit {
//   pageTitle = 'Product Detail';
//   errorMessage = '';
//   product: IDog | undefined;

//   constructor(private route: ActivatedRoute,
//               private router: Router,
//               private productService: ProductService) {
//   }

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     if (id) {
//       this.getProduct(id);
//     }
//   }

//   getProduct(id: number): void {
//     this.productService.getProduct(id).subscribe({
//       next: product => this.product = product,
//       error: err => this.errorMessage = err
//     });
//   }

//   onBack(): void {
//     this.router.navigate(['/products']);
//   }
// }
