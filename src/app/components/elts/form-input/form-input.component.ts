import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ],
  template: `
    @if(show){
      <div [formGroup]="this.fg" >
        <div class="mb-3">
          <label class="form-label">{{label}}</label>
          @if(currentForm==forms[0]){
            <input [type]="this.type" [ngClass]="this.css" [formControlName]="this.name">
          }@else if(currentForm==forms[1]){
            <textarea [ngClass]="this.css" [formControlName]="this.name" style='resize: none;'></textarea>
          }@else {
            <select [class]="'form-select'" [formControlName]="this.name">
              <ng-content></ng-content>
            </select>
          }
        </div>
      </div>
    }
  `,
  styles: [
  ]
})
export class FormInputComponent implements ControlValueAccessor, OnInit, OnChanges {
  forms:string[]=['input','textarea','select'];
  @Input() currentForm:string=this.forms[0];
  @Input() fg!:FormGroup;
  @Input() name!:string;
  @Input() type: string='text';
  @Input() val!:any;
  @Input() css:string='form-control';
  @Input() show:boolean=false;
  @Input() label!:string;

  ngOnInit(): void {
    this.settingForm();
    this.updateFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const key=this.name;
    if (changes['show']) {
      this.updateFormGroup();
    }
  }

  settingForm(){
    if(this.currentForm==this.forms[2]){
      this.css=='form-select';
    }
  }

  updateFormGroup(){
    if(this.show==true){
        this.fg.addControl(this.name,new FormControl(this.val,[Validators.required]));
    }else if(this.fg.contains(this.name)){
      this.fg.removeControl(this.name);
    }
  }

  writeValue(value: string): void {
    this.val=value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

}
