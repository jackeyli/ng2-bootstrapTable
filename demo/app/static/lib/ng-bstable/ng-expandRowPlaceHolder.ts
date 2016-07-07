/**
 * Created by LIJA3 on 6/29/2016.
 */
import {ComponentResolver,ViewChild,HostListener,Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,Input} from "angular2/core";
@Component({
    selector : "ngBsTableExpandHolder",
    inputs: [
        'colspan:colspan',
        'data:data',
        'expandRowHandler:expandRowHandler'
        ],
    template:`
        <td [attr.colspan]="colspan">
        <myFixedPosition #v_container></myFixedPosition>
        </td>
    `
})
export class ng_BsExpandRowPlaceHolder{
    @ViewChild('v_container', {read: ViewContainerRef}) mV_Container;
    @Input() private expandRowHandler:any;
    @Input() private data:any;
    @Input() private colspan:number;
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader,private _renderer:Renderer,private _resolver:ComponentResolver){
       _ngEl.nativeElement.style.display = 'table-row';
    }
    ngAfterViewInit() {
        this.expandRowHandler(this,this.mV_Container,this._resolver,this.data);
    }
}