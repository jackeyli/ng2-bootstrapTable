/**
 * Created by jackeyli on 2016/6/28.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output} from "angular2/core";
import {ng_bstable} from './ng-bstable.ts';
import {ng_bsTableItem} from "./ng-bstableItem.ts";
import {ng2Editable} from './ng-editable.ts';
import {columingPipe} from './ng-tablePipes.ts';
import {ng_BsExpandRowPlaceHolder} from './ng-expandRowPlaceHolder.ts';
@Component({
     selector : "ngBsTableRow",
     inputs: ['columns:columns','data:data','editComponentType:editComponentType','onRowExpand:onRowExpand'],
     directives:[ng_bsTableItem,ng2Editable],
     pipes:[columingPipe],
     template:`
            <td>
                <a class="detail-icon" href="javascript:"(click)="onClickExpandHandler($event)"><i class="glyphicon glyphicon-plus icon-plus"></i></a>
            </td>
            <td *ngFor = "#column of (columns |columning : 'dataColumning')" style="position:relative">
                <ngBsTableItem (editCommit)="onEditCommit($event);" (beginEdit) = "beginEdit($event)" [ng2_editable]="{editCmpType:editComponentType,refData:{data:data,column:column}}" [config]="column" [data]="data">
                </ngBsTableItem>
            </td>
     `
})
export class ng_bsTableRow{
    @Output('editCommit')  public commitEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output('beginEdit') public beginEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output('expand') public expandRowEmitter:EventEmitter<any> = new EventEmitter<any>();
    @Output('collapse') public collapseRowEmitter:EventEmitter<any> = new EventEmitter<any>();
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader){
        this.expanded = false;
    }
    onClickExpandHandler()
    {
        if(this.expanded)
        {
           this.collapse();
        } else {
            this.expand();
        }
    }
    expand()
    {
        this._loader.loadNextToLocation((<Type>ng_BsExpandRowPlaceHolder), this._ngEl).then(function (cmp) {
            this.expandedRowComponent = cmp;
            cmp.instance.expandRowHandler = this.onRowExpand;
            cmp.instance.data = this.data;
            this.expandRowEmitter.emit({row:this})
        }.bind(this));
        this.expanded = true;
    }
    collapse()
    {
        if(this.expandedRowComponent)
        {
            this.expandedRowComponent.dispose();
            this.expandedRowComponent = null;
            this.collapseRowEmitter.emit({row:this})
        }
        this.expanded = false;
    }
    ngOnDestroy()
    {
        this.collapse();
    }
    onEditCommit(evt)
    {
        this.commitEditEmitter.emit(evt);
    }
    beginEdit(evt)
    {
        this.beginEditEmitter.emit(evt);
    }
}