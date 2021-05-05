import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedSignUpComponent } from './invited-sign-up.component';

describe('InvitedSignUpComponent', () => {
  let component: InvitedSignUpComponent;
  let fixture: ComponentFixture<InvitedSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
