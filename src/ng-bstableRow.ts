/**
 * Created by jackeyli on 2016/6/28.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output} from "angular2/core";
import {ng_bstable} from './ng-bstable.ts';
import {ng_bsTableItem} from "./ng-bstableItem.ts";
import {columingPipe} from './ng-tablePipes.ts';
import {ng_BsExpandRowPlaceHolder} from './ng-expandRowPlaceHolder.ts';
import {bsTableEvt} from './ng-bstableEvt.ts';
@Component({
     selector : "ngBsTableRow",
     inputs: ['columns:columns','data:data','defaultEditComponentType:defaultEditComponentType','onRowExpand:onRowExpand','detailView:detailView','expandHolderColspan:expandHolderColspan'],
     directives:[ng_bsTableItem],
     pipes:[columingPipe],
     template:`
            <td *ngIf="detailView">
                <a class="detail-icon" href="javascript:"(click)="onClickExpandHandler($event)"><i [ngClass]="getExpandIndicateClass()"></i></a>
            </td>
            <td *ngFor = "#column of (columns |columning : 'dataColumning')" style="position:relative">
                <ngBsTableItem (cellClick)="onCellClickEmitter.emit($event);"
                (celldblClick) = "onCellDblClickEmitter.emit($event)"
                (editCommit)="onEditCommit($event);"
                (beginEdit) = "beginEdit($event);"
                [defaultEditComponentType]="defaultEditComponentType"
                [config]="column" [data]="data"
                >
                </ngBsTableItem>
            </td>
     `
})
export class ng_bsTableRow{
    @Output('editCommit')  public commitEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output('beginEdit') public beginEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output('expand') public expandRowEmitter:EventEmitter<any> = new EventEmitter<any>();
    @Output('collapse') public collapseRowEmitter:EventEmitter<any> = new EventEmitter<any>();
    @Output('cellClick') public onCellClickEmitter:EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    @Output('celldblClick') public onCellDblClickEmitter:EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    private expanded:boolean;
    private expandedRowComponent:any;
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
    getExpandIndicateClass()
    {
        return {
            'glyphicon':true,
            'icon-plus':!this.expanded,
            'glyphicon-plus':!this.expanded,
            'glyphicon-minus':this.expanded,
            'icon-minus':this.expanded
        }
    }
    expand()
    {
        this._loader.loadNextToLocation((<Type>ng_BsExpandRowPlaceHolder), this._ngEl).then(function (cmp) {
            this.expandedRowComponent = cmp;
            cmp.instance.expandRowHandler = this.onRowExpand;
            cmp.instance.data = this.data;
            cmp.instance.colspan = this.expandHolderColspan;
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