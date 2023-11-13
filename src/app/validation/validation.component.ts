import { SharedService } from './../../shared.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from '../app.component';


// Update the jmbgLengthValidator function
function jmbgLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  const numericPattern = /^[0-9]+$/;

  if (value && value.length === 13 && numericPattern.test(value)) {
    return null; // Valid
  } else {
    return { jmbgLengthError: true }; // Invalid, use a custom error key
  }
}


function validateDateOfBirth(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (value) {
    const day = +value.slice(0, 2);
    const month = +value.slice(2, 4);
    const year = +value.slice(4, 7);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return { invalidDateFormat: true }; // Invalid format
    }

    // Check if the date is valid
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      return { invalidDate: true }; // Invalid date
    }
  }

  return null; // Valid
}

function validatePoliticalRegion(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (value) {
    const invalidRegions = [6, 22, 23, 24, 25, 27, 28, 40, ...Array.from({ length: 20 }, (_, i) => 51 + i), 83, 84, 90, 97, 98, 99];
    const region = +value;

    if (isNaN(region) || invalidRegions.includes(region)) {
      return { invalidRegion: true }; // Invalid region
    }
  }

  return null; // Valid
}

function validateControlDigit(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (value) {
    // Extract individual digits
    const digits = value.split('').map(Number);

    // Check if there are exactly 13 digits
    if (digits.length !== 13) {
      return { invalidJmbgLength: true };
    }

    // Calculate the control digit
    const weights = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const sum = digits.slice(0, 12).reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const controlDigit = (11 - (sum % 11)) % 11;

    // Check if the calculated control digit matches the last digit of JMBG
    if (digits[12] === controlDigit || (controlDigit > 9 && digits[12] === 0)) {
      return null; // Valid
    } else {
      return { invalidControlDigit: true }; // Invalid control digit
    }
  }

  return null; // Valid (if value is empty)
}

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],

})
export class ValidationComponent implements OnInit{
  jmbgForm = new FormGroup({
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    jmbg: new FormControl('', [
      Validators.required,
      jmbgLengthValidator,
      validateDateOfBirth,
      validatePoliticalRegion,
      validateControlDigit
    ]),
  });

  constructor(private toastr: ToastrService, private router: Router, private snackBar: MatSnackBar, private sharedService: SharedService) {}
  ngOnInit(): void {}

  onSubmit() {
    const jmbgControl = this.jmbgForm.get('jmbg');

    if (jmbgControl && jmbgControl.valid) {
      const jmbgValue = jmbgControl.value;
      if (jmbgValue !== null) {
        this.sharedService.setJmbgValue(jmbgValue);
        this.router.navigate(['/rezultati']);
      } else {
        // Handle the case where jmbgValue is null (optional)
        console.error('JMBG value is null.');
      }
    }else {
      this.snackBar.open('Invalid data'), undefined, {
        duration:2000
      }
    }
  }
}

