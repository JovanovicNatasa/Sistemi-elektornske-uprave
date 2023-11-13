import { Component } from '@angular/core';
import { SharedService } from 'src/shared.service';
import {MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
date: string;
region: string;
pol: string;
rbr: number;
}
/*
const ELEMENT_DATA: PeriodicElement[] = [
  {date: this.extractDate(jmbgValue), region: 'Hydrogen', pol: 1.0079, rbr: 'H'}
];*/

@Component({
  selector: 'app-validation-results',
  templateUrl: './validation-results.component.html',
  styleUrls: ['./validation-results.component.css']
})
export class ValidationResultsComponent {




  jmbgValue: string | null = 'null';

  displayedColumns: string[] = ['date', 'region', 'pol', 'rbr'];
  dataSource: PeriodicElement[] = [];

  constructor(private sharedService: SharedService) {
    this.jmbgValue = this.sharedService.getJmbgValue();
    this.dataSource = [
      { date: this.extractDate(this.jmbgValue ?? ''), region: this.extractRegion(this.jmbgValue ?? ''), pol: this.extractGender(this.jmbgValue ?? ''), rbr: this.extractNumber(this.jmbgValue ?? '') }
    ];
  }
 extractDate(jmbg: string): string  {
  const value = jmbg;

  const day=+value.slice(0,2);
  const month=+value.slice(2,4);
  const yearIndicator=+value.slice(4,5);
  const threeYear=value.substring(4,7);
  var year='';



  if(yearIndicator!=0)
  {
     year= '1'+threeYear
  }
  else{
     year= '2'+threeYear;
  }


  const date= day+'/'+month+'/'+year;

      return (date);



}

extractRegion(jmbg: string): string {
  const value = jmbg;

    // Extract RR segment
    const rr = +value.slice(7, 9);

    // Define region mappings
    const regionMappings: { [key: number]: string } = {
      1: 'Stranci u BiH',
      2: 'Stranci u Crnoj Gori',
      3: 'Stranci u Hrvatskoj',
      4: 'Stranci u Makedoniji',
      5: 'Stranci u Sloveniji',
      7: 'Stranci u Srbiji (bez pokrajina)',
      8: 'Stranci u Vojvodini',
      9: 'Stranci na Kosovu i Metohiji',
      10: 'Bosna i Hercegovina, Banja Luka',
      11: 'Bosna i Hercegovina, Bihać',
      12: 'Bosna i Hercegovina, Doboj',
      13: 'Bosna i Hercegovina, Goražde',
      14: 'Bosna i Hercegovina, Livno',
      15: 'Bosna i Hercegovina, Mostar',
      16: 'Bosna i Hercegovina, Prijedor',
      17: 'Bosna i Hercegovina, Sarajevo',
      18: 'Bosna i Hercegovina, Tuzla',
      19: 'Bosna i Hercegovina, Zenica',
      20: 'Crna Gora, Podgorica',
      26: 'Crna Gora, Nikšić',
      29: 'Crna Gora, Pljevlja',
      30: 'Osijek, Slavonija region',
      31: 'Hrvatska, Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region',
      32: 'Hrvatska, Varaždin, Međimurje region',
      33: 'Hrvatska, Zagreb',
      34: 'Hrvatska, Karlovac',
      35: 'Hrvatska, Gospić, Lika region',
      36: 'Hrvatska, Rijeka, Pula, Istra and Primorje region',
      37: 'Hrvatska, Sisak, Banovina region',
      38: 'Hrvatska, Split, Zadar, Dubrovnik, Dalmacija region',
      39: 'Hrvatska, Ostalo',
      41: 'Makedonija, Bitola',
      42: 'Makedonija, Kumanovo',
      43: 'Makedonija, Ohrid',
      44: 'Makedonija, Prilep',
      45: 'Makedonija, Skopje',
      46: 'Makedonija, Strumica',
      47: 'Makedonija, Tetovo',
      48: 'Makedonija, Veles',
      49: 'Makedonija, Štip',
      50: 'Slovenija',
      71: 'Centralna Srbija, Beograd region',
      72: 'Centralna Srbija, Šumadija',
      73: 'Centralna Srbija, Niš region',
      74: 'Centralna Srbija, Južna Morava',
      75: 'Centralna Srbija, Zaječar',
      76: 'Centralna Srbija, Podunavlje',
      77: 'Centralna Srbija, Podrinje i Kolubara',
      78: 'Centralna Srbija, Kraljevo region',
      79: 'Centralna Srbija, Užice region',
      80: 'Vojvodina, Novi Sad region',
      81: 'Vojvodina, Sombor region',
      82: 'Vojvodina, Subotica region',
      85: 'Vojvodina, Zrenjanin region',
      86: 'Vojvodina, Pančevo region',
      87: 'Vojvodina, Kikinda region',
      88: 'Vojvodina, Ruma region',
      89: 'Vojvodina, Sremska Mitrovica region',
      91: 'Kosovo i Metohija, Priština region',
      92: 'Kosovo i Metohija, Kosovska Mitrovica region',
      93: 'Kosovo i Metohija, Peć region',
      94: 'Kosovo i Metohija, Đakovica region',
      95: 'Kosovo i Metohija, Prizren region',
      96: 'Kosovo i Metohija, Kosovsko Pomoravski okrug',
    };


      // Return the corresponding region
      return String(regionMappings[rr]);

}
extractGender(jmbg: string): string {
  const value = jmbg;

  // Extract BBB segment
  const BBB = +value.slice(9, 12);

  if (BBB >= 0 && BBB <= 499) {
    return "Muško"; // Male
  } else {
    return "Žensko"; // Female
  }
}
extractNumber(jmbg: string): number {
  const value = jmbg;

  // Extract BB segment
  const BB = +value.slice(10, 12);

  if (BB === 0) {
    return 1;
  } else {
    // Increment BB by 1 to get the desired result
    return BB + 1;
  }
}


}
