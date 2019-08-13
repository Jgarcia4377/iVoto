import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEventoVotacionPage } from './registro-evento-votacion.page';

describe('RegistroEventoVotacionPage', () => {
  let component: RegistroEventoVotacionPage;
  let fixture: ComponentFixture<RegistroEventoVotacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEventoVotacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEventoVotacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
