import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyAr', standalone: true, pure: true })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';

    return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0 }).format(value) + ' Ar';
  }
}
