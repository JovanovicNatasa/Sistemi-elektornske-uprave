import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private jmbgValue: string | null = null;





  getJmbgValue(): string | null {
    return this.jmbgValue ?? '';
  }

  setJmbgValue(value: string|null): void {

    this.jmbgValue = value;
  }
}
