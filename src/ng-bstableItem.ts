/**
 * Created by LIJA3 on 6/17/2016.
 */
import {bsTableEvt} from "./ng-bstableEvt.ts";
import {ViewChild,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,Input} from "angular2/core";
import {ng2Editable} from './ng-editable.ts';
@Component({
    selector : "ngBsTableItem",
    inputs: ['config: config','data:data','defaultEditComponentType:defaultEditComponentType'],
    directives:[ng2Editable],
    template:
    `
    <div [ngSwitch]="(config.editable || false).toString()" >
         <template ngSwitchWhen="true">
            <div [ngSwitch]="(config.cellComponent != null).toString()">
            <template ngSwitchWhen="false">
                <div style="float:left;display:inline-block"
                [ng2_editable]="{editCmpType:(config.editComponent ? config.editComponent : defaultEditComponentType),refData:{data:data,column:config}}"
                (editCommit)="commitEditEmitter.emit($event)" (beginEdit)="beginEditEmitter.emit($event)">
                <i class="glyphicon icon-edit glyphicon-edit" style="font-size:5px;cursor:pointer"></i></div>
                <div style="float:left;display:inline-block;margin-left:5px" [ngClass]="config.class" [innerHTML] =
                "config.formatter ? config.formatter(data.data[config.field],data.data,i) :data.data[config.field]"
                (click)="onCellClick()" (dblclick)="onCellDblClick()">
                </div>
             </template>
                 <template #v_ComponentHolder ngSwitchWhen="true">
             </template>
            </div>
        </template>
        <template ngSwitchDefault>
            <div [ngClass]="config.class" [innerHTML] =
                "config.formatter ? config.formatter(data.data[config.field],data.data,i) :data.data[config.field]" (click)="onCellClick()" (dblclick)="onCellDblClick()">
            </div>
        </template>
    </div>
    `
})
export class ng_bsTableItem{
    @Output('cellClick') cellClick : EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    @Output('celldblClick') cellDblClick : EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    @Output('editCommit')  public commitEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output('beginEdit') public beginEditEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Input() private config : any;
    @Input() private data:any;
    @Input() private defaultEditComponentType:any;
    @ViewChild('v_ComponentHolder', {read: ViewContainerRef}) private itemComponentHolder:ViewContainerRef;
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader){
    }
    ngAfterViewInit()
    {if(this.config.cellComponent)
        {
            let cfg =  this.config,
                data = this.data.data,
                me = this;
            this._loader.loadNextToLocation((cfg.cellComponent.type),this.itemComponentHolder).then(function(cmp){
                if(cfg.cellComponent.init)
                {
                    cfg.cellComponent.init(cmp,me,cfg,data);
                }
            });
        }
    }
    getEditCellStyle(){
       if(this.config.editable)
       {
           return {
               'margin-top':'-8px'
           }
       }
    }
    onCellClick()
    {
        this.cellClick.emit(this._getEvt());
    }
    onCellDblClick()
    {
        this.cellDblClick.emit(this._getEvt());
    }
    _getEvt()
    {
        return <bsTableEvt>({
            value:this.data.data[this.config.field],
            row:this.data.row,
            col:this.config,
            data:null,
            table:null,
            originVal:null,
            newVal:null
        });
    }
}