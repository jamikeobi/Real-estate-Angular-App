import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private modalRef: ComponentRef<ModalComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  open(content: any) {
    if (this.modalRef) return;

    // Create the modal component dynamically
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.modalRef = componentFactory.create(this.injector);

    // Append the modal component to the body
    this.appRef.attachView(this.modalRef.hostView);

    // Create a wrapper for dynamic content
    const contentWrapper = document.createElement('div');
    contentWrapper.innerHTML = content;

    // Attach the content wrapper to the modal
    (this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0].appendChild(contentWrapper);

    // Append the modal to the body
    document.body.appendChild((this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    // Close the modal when clicking outside
    this.modalRef.instance.closeModal.subscribe(() => this.close());
  }

  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      (this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0].remove();
      this.modalRef = null;
    }
  }
}
