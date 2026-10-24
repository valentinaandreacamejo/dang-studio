import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraggableFolder } from './draggable-folder';

describe('DraggableFolder', () => {
  let component: DraggableFolder;
  let fixture: ComponentFixture<DraggableFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableFolder],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableFolder);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', '[01_VIRAL_REELS]');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit opened on click', () => {
    let opened = false;
    component.opened.subscribe(() => (opened = true));
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    expect(opened).toBe(true);
  });
});
