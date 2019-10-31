import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossSearchComponent } from './boss-search.component';

describe('BossSearchComponent', () => {
  let component: BossSearchComponent;
  let fixture: ComponentFixture<BossSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
