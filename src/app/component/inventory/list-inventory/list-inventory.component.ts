import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.scss']
})
export class ListInventoryComponent implements OnInit {
  baseEndPoint =  'http://10.43.100.180:3740/products';
  constructor(public inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.obtenerProducts();
  }


  eliminarProduct(id?:string | any){
    if(confirm('Esta seguro que desea eliminar el registro?')){
        this.inventoryService.eliminarProduct(id).subscribe(data =>{
          //this.toastr.warning('Registro Eliminado', 'El cliente fue eliminado');
          this.inventoryService.obtenerProducts();
      })
    }
  }

  editar(id?:string | any, product?: any){
    this.inventoryService.actualizar(id, product);

  }


}
