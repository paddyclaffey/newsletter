import { Component, ViewChildren, ElementRef } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageService } from "./components/image.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChildren('main') main: DynamicFormComponent;
  @ViewChildren('item1') item1: DynamicFormComponent;
  @ViewChildren('item2') item2: DynamicFormComponent;
  @ViewChildren('item3') item3: DynamicFormComponent;
  @ViewChildren('item4') item4: DynamicFormComponent;
  @ViewChildren('item5') item5: DynamicFormComponent;
  mainConfig: FieldConfig[];
  itemConfig1: FieldConfig[];
  itemConfig2: FieldConfig[];
  itemConfig3: FieldConfig[];
  itemConfig4: FieldConfig[];
  itemConfig5: FieldConfig[];
  showFrame = true;
  selectedFile: ImageSnippet;
  filesToUpload: File[] = [];
  currentIndex = 1;
  chosedItemStyle = [[{}]];
  jsonObj = { main: {file: []}, item1: {file: []}, item2: {file: []}, item3: {file: []}, item4: {file: []}, item5: {file: []} }

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { 
    this.initForm();
  }
  
  handleFileInput(files: FileList, item, index, maxLen) {
      this.filesToUpload.push(files.item(0));
      if (this.jsonObj[item].file.length < maxLen) {
        for (let i = 0; i < maxLen; i++) {
          this.jsonObj[item].file.push('');
        }
      }
      this.jsonObj[item].file[index] = files.item(0).name;
  }

  uploadFileToActivity() {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.imageService.postFile(this.filesToUpload[i]).subscribe(data => {
        // do something, if upload success
        }, error => {
          console.log(error);
        });
    }
  }

  trustSrcUrl = function(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  show() {
    this.showFrame = true;
  }

  hide() {
    this.showFrame = false;
  }

  addSingleColumn() {
    if (this.currentIndex <= 5) {
      this['itemConfig' + this.currentIndex] = [{
        type: "radiobutton",
        label: "Colour Border",
        name: "Colour",
        options: ["#5091cf", "#ea712b", "#ffb806", "#65a33e"]//blue, orange, yellow, green
      },{
        type: "input",
        label: "Header",
        inputType: "text",
        name: "Header"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah"
      }];
      this.chosedItemStyle.push([{}]);
    }
    this.currentIndex++;
  }

  addDoubleColumn() {
    if (this.currentIndex <= 5) {
      this['itemConfig' + this.currentIndex] = [{
        type: "radiobutton",
        label: "Colour Border",
        name: "Colour",
        options: ["#5091cf", "#ea712b", "#ffb806", "#65a33e"]//blue, orange, yellow, green
      },{
        type: "input",
        label: "Header",
        inputType: "text",
        name: "Header"
      },{
        type: "input",
        label: "Sub Header1 ",
        inputType: "text",
        name: "SubHeader1"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah1"
      },{
        type: "input",
        label: "Sub Header 2",
        inputType: "text", 
        name: "SubHeader2"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah2"
      }];
      this.chosedItemStyle.push([{}, {}]);
    }
    this.currentIndex++;
  }

  addTripleColumn() {
    if (this.currentIndex <= 5) {
      this['itemConfig' + this.currentIndex] = [{
        type: "input",
        label: "Header",
        inputType: "text",
        name: "Header"
      },{
        type: "input",
        label: "Sub Header1",
        inputType: "text",
        name: "SubHeader1"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah1"
      },{
        type: "input",
        label: "Sub Header2",
        inputType: "text",
        name: "SubHeader2"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah2"
      },{
        type: "input",
        label: "Sub Header3",
        inputType: "text",
        name: "SubHeader3"
      },{
        type: "input",
        label: "Paragrah",
        inputType: "text",
        name: "Paragrah3"
      }];
      this.chosedItemStyle.push([{}, {}, {}]);
    }
    this.currentIndex++;
  }

  initForm() {
    this.mainConfig = [
    {
      type: "input",
      label: "Sub Heading",
      inputType: "text",
      name: "subHeading",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "subHeading Required"
        },
      ]
    },
    {
      type: "input",
      label: "Email Address from&to",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    }
    ];
  }

  send() {
    this.uploadFileToActivity();
    this.jsonObj.main['values'] = this.main['first'].form.value;
    if (this.item1['first']) {
      this.jsonObj.item1['values'] = this.item1['first'].form.value;
    }
    if (this.item2['first']) {
      this.jsonObj.item2['values'] = this.item2['first'].form.value;
    }
    if (this.item3['first']) {
      this.jsonObj.item3['values'] = this.item3['first'].form.value;
    }
    if (this.item4['first']) {
      this.jsonObj.item4['values'] = this.item4['first'].form.value;
    }
    if (this.item5['first']) {
      this.jsonObj.item5['values'] = this.item5['first'].form.value;
    }
    this.imageService.generate(this.jsonObj).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
  }
}
