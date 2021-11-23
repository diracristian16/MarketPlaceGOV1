import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.scss']
})
export class CreateInventoryComponent implements OnInit {
  form: FormGroup;
  suscription: Subscription | any;
  product: Product | any;
  id: 0 | any;
  constructor(private formBuilder: FormBuilder,
    private inventoryService: InventoryService) {
      this.form = this.formBuilder.group({
         id: 0,
         nombre:['',[Validators.required]],
         precio:['',[Validators.required]],
         cantidad:['',[Validators.required]],
         descripcion:['',[Validators.required]],
         categoria:['',[Validators.required]],
         archivo:['',[Validators.required]]
       })
    }
  ngOnInit(): void {
    this.suscription = this.inventoryService.obtenerInventory$().subscribe(data=>{
      console.log(data);
      this.product = data;
      this.form.patchValue({
        archivo: this.product.archivo,
        nombre: this.product.nombre,
        precio: this.product.precio,
        cantidad: this.product.cantidad,
        descripcion: this.product.descripcion,
        categoria: this.product.categoria

      });
      this.id = this.product.id;
    });
  }

  guardarInventory(){
    this.agregar();
  }

  agregar(){
    const product: Product={
      archivo: this.form.get('archivo')?.value,
      nombre: this.form.get('nombre')?.value,
      precio: this.form.get('precio')?.value,
      cantidad: this.form.get('cantidad')?.value,
      descripcion: this.form.get('descripcion')?.value,
      categoria: this.form.get('categoria')?.value,

    }
    this.inventoryService.guardarProduct(product).subscribe(data=>{
      //this.toastr.success('Registro Agregado','El cliente fue agregado');
      this.inventoryService.obtenerProducts();
      this.form.reset();
    })
  }
}
