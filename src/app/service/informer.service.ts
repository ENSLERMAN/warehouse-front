import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorFromServer } from '../helpers/error.interceptor';

@Injectable({
  providedIn: 'root'
})
export class InformerService {
  constructor(private toastr: ToastrService) {
  }

  info(message: string): void {
    this.toastr.info(message, 'Информация');
  }

  success(message: string): void {
    this.toastr.success(message, 'Успешная операция');
  }

  error(err: ErrorFromServer): void {
    this.toastr.error(`
    \n
    Error from db: ${err.error}.\n
    Error from server: ${err.description}.\n
    `, 'Ошибка!');
  }

  warn(err: string): void {
    this.toastr.warning(err, 'Предупреждение!');
  }
}
