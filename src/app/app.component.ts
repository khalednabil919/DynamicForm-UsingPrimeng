import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormField, FormFieldJSON } from './form-fields';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DynamicForm-UsingPrimeng';
  formFields: FormFieldJSON [] = [];
  dynamicForm = this.fb.group({});
  constructor(private appService:AppService,private fb:FormBuilder){}
  ngOnInit()
  {
    this.getDynamicFormFields();
  }
  getDynamicFormFields(){
    this.appService.getFormFields().subscribe((response:FormField)=>{
      console.log(response);
      this.formFields = response.data;
      this.setDynamicForm(this.formFields);
    })
  }
  setDynamicForm(controls:FormFieldJSON[])
  {
    for(const control of controls)
    {
      const validators = [];
      if(control.validators?.required)
      {
        validators.push(Validators.required);
      }
      this.dynamicForm.addControl(control.name, this.fb.control(control.value,validators));
    }
  }
  saveForm(){
    console.log(this.dynamicForm.value);
  }
}
