import { Component, OnInit } from '@angular/core';
import { ExportService } from './services/export.service';
import { Info } from './model/info.model';
import jsPDF from 'jsPDF';
import $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ExportService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Export JSON to PDF';
  information: Info;

  constructor(private _export: ExportService) {
  }

   ngOnInit(){
       this._export.getJSON().subscribe(data => {
            this.information = data;
        });
   }

  exportPDF() {
    if(this.information) {
      var doc = new jsPDF();

      doc.fromHTML($('#pdf-container').get(0), 15, 15, {
          'width': 170
      });

      doc.save('TextExportPDF.pdf');
    } else {
      console.log('no data to export');
    }
  }

}
