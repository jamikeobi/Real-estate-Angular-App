import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxMessagesComponent } from './inbox-messages.component';

describe('InboxMessagesComponent', () => {
  let component: InboxMessagesComponent;
  let fixture: ComponentFixture<InboxMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxMessagesComponent]
    });
    fixture = TestBed.createComponent(InboxMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
