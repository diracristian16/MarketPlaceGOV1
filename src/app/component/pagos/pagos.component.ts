import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/service/payments.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentsService.obtenerPagos();
  }

}
