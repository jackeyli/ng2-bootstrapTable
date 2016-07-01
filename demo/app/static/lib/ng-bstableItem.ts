/**
 * Created by LIJA3 on 6/17/2016.
 */
import {bsTableEvt} from "./ng-bstableEvt.ts";
import { Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
@Component({
    selector : "ngBsTableItem",
    inputs: ['config: config','data:data'],
    template:
    `
    <div [ngSwitch]="config.type">
        <template ngSwitchWhen="edit">
            <div [ngClass]="config.class" [innerHTML] =
            "config.formatter ? config.formatter(data.data[config.field],data,i) :data.data[config.field]">
            </div>
        </template>
        <template ngSwitchDefault>
            <div [ngClass]="config.class" [innerHTML] =
                "config.formatter ? config.formatter(data.data[config.field],data,i) :data.data[config.field]">
            </div>
        </template>
    </div>
    `
})
export class ng_bsTableItem{
    constructor(){
    }
    _getEvt()
    {
       /* return <bsTableEvt>({
            value:this.data[config.field],
            row:this.data,
            col:this.config.col
        });*/
    }
}