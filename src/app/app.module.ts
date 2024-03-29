import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutes } from './app.routing';
import { UploadService } from './services/upload.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './author/author.component';
import { AuthorService } from './services/author.service';
import { PreviewComponent } from './preview/preview/preview.component';


import { PinComponent } from './preview/pin/pin.component';
import { InfoUpdateComponent } from './preview/info-update/info-update.component';
import { CitationsComponent } from './preview/citations/citations.component';
import { ColumnMultiDragComponent } from './preview/column-multi-drag/column-multi-drag.component';
import { ColumnMultiSelectComponent } from './preview/column-multi-select/column-multi-select.component';
import { DragdropComponent } from './preview/dragdrop/dragdrop.component';
import { FeedbackGenericComponent } from './preview/feedback-generic/feedback-generic.component';
import { FixedHeaderTemplateComponent } from './preview/fixed-header-template/fixed-header-template.component';
import { InputTextCount } from './preview/input-text-count/itc.component';
import { MatrixComponent } from './preview/matrix/matrix.component';
import { MultiselectAccordionComponent } from './preview/multiselect-accordion/multiselect-accordion.component';
import { SingleSelectRadioComponent } from './preview/single-select-radio/single-select-radio.component';
import { EditorComponent } from './editor/editor.component';
import { ContextMenuService } from './services/context-menu.service';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuDirective } from './directives/context-menu.directive';
import { CommunicatorService } from './services/communicator.service';
import { StateManagementService } from './services/state-management.service';
import { NotesComponent } from './preview/notes/notes.component';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ReviewPageComponent } from './preview/review/review.component';
import { CustomPinComponent } from './preview/custom-pin/custom-pin.component';
import { NewSceneComponent } from './new-scene/new-scene.component';


const pinComponents = [PinComponent, InfoUpdateComponent, CitationsComponent, ColumnMultiDragComponent, ColumnMultiSelectComponent, DragdropComponent, FeedbackGenericComponent, FixedHeaderTemplateComponent, InputTextCount, MatrixComponent, MultiselectAccordionComponent, SingleSelectRadioComponent, ReviewPageComponent]

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [	
    AppComponent,
    UploadComponent,
    AuthorComponent,
    PreviewComponent,
    pinComponents,
    EditorComponent,
    ContextMenuComponent,
    ContextMenuDirective,
    ContentEditableDirective,
    NotesComponent,
    SanitizePipe,
    CustomPinComponent,
      NewSceneComponent
   ],
  providers: [UploadService, AuthorService, ContextMenuService, CommunicatorService, StateManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
