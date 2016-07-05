/**
 * Created by jackeyli on 2016/6/24.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";

export interface editComponent {
    init( _ngEl: ElementRef, option:any);
    onCommit: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    getElementRef() : ElementRef;
}
@Component({
    selector:'div',
    template:`<div class="popover fade top in editable-container editable-popup" role="tooltip"
     style="display: block;">
    <div class="popover-content">
        <div>
            <div class="editableform-loading" style="display: none;"></div>
            <form class="form-inline editableform" style="">
                <div class="control-group form-group">
                    <div>
                        <div class="editable-input" style="position: relative;display:inline-block" >
                            <input type="text" class="form-control input-sm" style="padding-right: 24px;" [(ngModel)]="inputVal" />
                            <span class="editable-clear-x"></span>
                        </div>
                        <div class="editable-buttons" style="display:inline-block">
                            <button type="button" (click)= "commit($event)" class="btn btn-primary btn-sm editable-submit">
                                <i class="glyphicon glyphicon-ok"></i>
                            </button>
                            <button type="button" (click)="cancel($event)" class="btn btn-default btn-sm editable-cancel">
                                <i class="glyphicon glyphicon-remove"></i>
                            </button>
                        </div>
                    </div>
                    <div class="editable-error-block help-block" style="display: none;"></div>
                </div>
            </form>
        </div>
    </div>
</div>`
})
export class defaultEditComponent implements editComponent
{
    @Output('commit') public onCommit: EventEmitter<any> = new EventEmitter<any>();
    @Output('cancel') public onCancel: EventEmitter<any> = new EventEmitter<any>();
    private inputVal:string;
    init(targetEl: ElementRef,option){

    }
    getElementRef()
    {
        return this._ngEl;
    }
    commit($evt){
        this.onCommit.emit(this.inputVal);
    }
    cancel($e)
    {
        this.onCancel.emit($e)
    }
    constructor(private _ngEl:ElementRef){

    }
}