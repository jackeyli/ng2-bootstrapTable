/**
 * Created by LIJA3 on 6/29/2016.
 */
import {ViewChild,HostListener,Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,OnDestroy} from "angular2/core";
@Component({
    selector : "ngBsTableExpandHolder",
    inputs: [
        'colspan:colspan',
        'data:data',
        'expandRowHandler:expandRowHandler',
        'colspan:colspan'
        ],
    template:`
        <td [attr.colspan]="colspan">
        <myFixedLocation #v_container></myFixedLocation>
        </td>
    `
})
export class ng_BsExpandRowPlaceHolder{
    @ViewChild('v_container') mV_Container: ElementRef;
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader,private _renderer:Renderer){
       _ngEl.nativeElement.style.display = 'table-row';
    }
    ngAfterViewInit() {
        this.expandRowHandler(this.mV_Container,this._loader,this.data);
    }
}