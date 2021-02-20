import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsEditorViewComponent } from './models-editor-view.component';

describe('ModelsEditorViewComponent', () => {
  let component: ModelsEditorViewComponent;
  let fixture: ComponentFixture<ModelsEditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsEditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
