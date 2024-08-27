import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentToListPropertyComponent } from './agent-to-list-property.component';

describe('AgentToListPropertyComponent', () => {
  let component: AgentToListPropertyComponent;
  let fixture: ComponentFixture<AgentToListPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentToListPropertyComponent]
    });
    fixture = TestBed.createComponent(AgentToListPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
