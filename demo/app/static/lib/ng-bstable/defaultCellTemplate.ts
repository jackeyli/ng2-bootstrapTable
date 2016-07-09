/**
 * Created by jackeyli on 2016/7/9.
 */
import {ViewChild,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,Input} from "angular2/core";
@Component({
    selector:"defaultCellTemplate",
    template:`
        <span *ngIf="showData">
        {{data}}
        </span>
            <input type="checkbox" [(ngModel)]="showData">
            <span *ngIf="!showData">Click To Show Data</span>
            <span *ngIf="showData">Unclick To Hide Data</span>
    `,
    inputs:['data:data']
})
export class defaultCellTemplate
{
    private showData:boolean;
    constructor(){
    }
}