import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsCreatorViewComponent } from './models-creator-view.component';

describe('ModelsCreatorViewComponent', () => {
  let component: ModelsCreatorViewComponent;
  let fixture: ComponentFixture<ModelsCreatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsCreatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsCreatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
