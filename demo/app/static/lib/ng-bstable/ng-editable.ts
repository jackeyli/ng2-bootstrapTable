/**
 * Created by jackeyli on 2016/6/24.
 */
import {HostListener,Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,Input} from "angular2/core";
@Directive({
    selector:"[ng2_editable]",
    inputs:['ng2_editable:ng2_editable'],
    host:{'(click)':'_onEdit($event)'}
})
export class ng2Editable{
    @Output('editCommit')  public onEditCommit: EventEmitter<any> = new EventEmitter<any>();
    @Output('beginEdit') public onEditBegin: EventEmitter<any> = new EventEmitter<any>();
    @Input() private ng2_editable:any
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader){
    }
    _onEdit($event) {
            this._loader.loadNextToLocation(this.ng2_editable.editCmpType, this._containerRef).then(function (cmp) {
                //cmp.init(this._ngEl,this.ng2_editable.editCmpOption);
                this.onEditBegin.emit({editCmp: cmp});
                cmp.instance.onCommit.subscribe(function (value) {
                    this.onEditCommit.emit({cancelEdit: false, value: value, refData: this.ng2_editable.refData});
                    cmp.dispose();
                }.bind(this));
                cmp.instance.onCancel.subscribe(function (evt) {
                    this.onEditCommit.emit({cancelEdit: true});
                    cmp.dispose();
                }.bind(this));
            }.bind(this));
    }
    ngOnDestroy(){

    }
    public getElement(): ElementRef {
        return this._ngEl;
    }
}