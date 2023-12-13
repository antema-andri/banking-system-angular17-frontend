import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columnLabels!:any[];
  @Input() currentPage:number=0;
  @Input() pageNumber:number=0;
  @Input() jsons!:{}[];
  @Input() linkColumns!:string[];
  @Input() linkColumnContents!:string[];
  @Input() displayColumns!:string[];
  @Input() buttonColumn!:string;
  @Input() buttonColumnIcon!:string;
  @Input() buttonColumnClass!:string;
  
  datas!:string[][];
  colNumber:number=0;
  rowNumber:number=0;
  fields!:string[];

  @Output() clickEvent = new EventEmitter<any>();
  @Output() paginateEvent = new EventEmitter<any>();
  @Output() buttonColumnEvent = new EventEmitter<any>();
  valueClic: any;

  constructor(){}

  ngOnInit(): void {
    this.initColRow();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsons']) {
      this.updateJsons(changes['jsons'].currentValue);
    }
  }
  
  private updateJsons(newJsons: any[]) {
    this.jsons=newJsons;
    this.initColRow();
    this.datas=this.toDataStrDisplay(this.jsons);
  }

  initColRow(){
    this.datas=this.toDataStr(this.jsons);
    this.rowNumber=this.datas.length;
    this.colNumber=this.columnLabels.length;
    this.fields=this.jsons.length==0 ? [] : Object.keys(this.jsons[0]);
  }

  toDataStr(jsonObjects:{}[]):string[][]{
    const result: string[][] = [];
    jsonObjects.forEach((jsonObject) => {
      let row:string[]=Object.values(jsonObject);
      result.push(row);
    });
    return result;
  }

  toDataStrDisplay(jsonObjects:{}[]):string[][]{
    const diplayDatas:string[][]=[];
    const allDatas:string[][]=this.toDataStr(jsonObjects);
    let indexes:number[]=[];

    for(let j=0;j<this.displayColumns.length;j++){
      if(this.fields.includes(this.displayColumns[j])){
        const indexField=this.fields.indexOf(this.displayColumns[j]);
        indexes.push(indexField);
      }
    }

    indexes=indexes.sort((a, b) => a - b);

    for(const dataRow of allDatas){
      const row: string[] = indexes.map(index => dataRow[index]);
      diplayDatas.push(row);
    }

    return diplayDatas;
  }

  emitClickEvent(val:any) {
    this.valueClic=val;
    this.clickEvent.emit(this.valueClic);
  }

  emitPaginateEvent(val:any){
    this.currentPage=val;
    this.paginateEvent.emit(this.currentPage);
  }

  emitButtonColumnEvent(val:any){
    const idJson:String=val;
    this.buttonColumnEvent.emit(idJson);
  }
}
