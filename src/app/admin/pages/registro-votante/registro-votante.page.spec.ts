import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVotantePage } from './registro-votante.page';

describe('RegistroVotantePage', () => {
  let component: RegistroVotantePage;
  let fixture: ComponentFixture<RegistroVotantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroVotantePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVotantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
