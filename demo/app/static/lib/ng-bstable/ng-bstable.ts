/**
 * Created by LIJA3 on 6/17/2016.
 */
import {Injectable,IContentChildren,Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output} from "angular2/core";
import {ngBsTablePaging} from './ng-bstablePaging.ts';
import {defaultEditComponent} from './ng-editComponent.ts';
import {ng_bsTableRow} from './ng-bstableRow.ts';
import {pageFilter,sortFilter,columingPipe,filteringPipe,expandFilterPipe} from './ng-tablePipes.ts';
import {ng_bsTableDataProvider} from './ng-tableDataProvider.ts';
import {bsTablePageEvent,bsTableEvt} from "./ng-bstableEvt.ts";
@Injectable()
@Component({
    selector : "ng_bstable",
    inputs : ["option:option","data:data"],
    directives:[ngBsTablePaging,ng_bsTableRow],
    pipes:[pageFilter,sortFilter,columingPipe,filteringPipe,expandFilterPipe],
    providers:[ng_bsTableDataProvider],
    template:`
        <div class="bootstrap-table">
            <div class="fixed-table-container">
                <div class="fixed-table-body">
                    <table  data-toggle="table" class="table table-hover">
                        <thead>
                        <tr *ngFor="#columnRow of (option.columns|columning:'columning');#j=index">
                            <th *ngIf="option.detailView && j==0" [attr.rowspan]="getDetailViewRowSpan(option.columns)" class = "tableHeader">
                                <div class="fht-cell"></div>
                            </th>
                            <th *ngFor="#column of columnRow"  class="fht-cell"[attr.colspan]="column.colspan ? column.colspan : 1" [attr.rowspan]="column.rowspan? column.rowspan : 1" unselectable="on">
                                 <div [ngClass]="genHeaderClass(column,column.sortDirection)" class = "tableHeader" (click)="onHeaderClick($event,column)">{{column.title}}
                                    <input type="text" *ngIf = "column.filterable && column.field!=null" class="form-control input-sm" style="padding-right: 24px;" (input)="onFilterInput($event,column.field)"/>
                                 </div>
                                 <div class="fht-cell" unselectable="on"></div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <ngBsTableRow [detailView]="option.detailView" (expand)="onRowExpand($event)" (collapse)="onRowCollapse($event)" style="display:table-row" [ngClass]="option.rowStyle" [onRowExpand]="option.onExpandRow"
                                *ngFor="#rdata of (datas|filtering:filteringFields|paging:pageSize:currPage:option.pagination|sorting:sortField:sortDirection)"
                            [data]="rdata" (editCommit)="onEditCommit($event);" (beginEdit) = "beginEdit($event)"  [defaultEditComponentType]="getEditComponentType()" [columns]="option.columns"
                            [expandHolderColspan]="(option.columns|columning:'dataColumning').length + (option.detailView ? 1 : 0)"
                            (cellClick)=" onTableCellClick($event)" (celldblClick)="onTableCellDblClick($event)"
                            >
                            </ngBsTableRow>
                        </tbody>
                    </table>
                </div>
            </div>
            <ngBsTablePaging *ngIf = "option.pagination"
            (pageSizeChange)="_onPageSizeChange($event)" (pageChange)="_onPageChange($event)" [pageSize]="option.pageSize"
            [currPage]="currPage" [totalRecords]="(datas|filtering:filteringFields).length" >
            </ngBsTablePaging>
        </div>
     `
})
export class ng_bstable implements AfterContentInit{
    @Output("edit") public editEmitter : EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    @Output("cellClick") public cellClickEmitter:EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    @Output("celldblClick") public celldblClickEmitter:EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>();
    constructor(private dataProvider:ng_bsTableDataProvider){
    }
    onTableCellClick(evt)
    {
        evt.table = this;
        this.cellClickEmitter.emit(evt);
    }
    onTableCellDblClick(evt)
    {
        evt.table = this;
        this.celldblClickEmitter.emit(evt);
    }
    set data(v:data)
    {
        this.dataProvider.provideData(v).then(function(v){
            this.pageSize = this.option ? this.option.pageSize : 100;
            this.currPage = 1;
            this.datas = this.generateGridDatas(v);
        }.bind(this));
    }
    onRowExpand(evt)
    {
        this.expandedRows = this.expandedRows == null ? [] : this.expandedRows
        this.expandedRows.push(evt.row);
    }
    onRowCollapse(evt)
    {
        this.expandedRows = this.expandedRows == null ? [] : this.expandedRows
        this.expandedRows = this.expandedRows.filter(function(item){
            return item != evt.row
        });
    }
    generateGridDatas(v:data){
        return v.map((i,row)=>({
          data:i,row:row
        }));
    }
    getEditComponentType(){
        return (<Type>defaultEditComponent)
    }

    getIsShowClass(show){
        return {
           display:show ? '' : 'none'
        }
    }
    onExpandIconClick(evt,data,subRowData)
    {
        if(data.isExpanded) {
            data.isExpanded = false;
        } else
        {
            data.isExpanded = true;
        }
    }
    beginEdit(evt) {
        if(this.editingCmp)
        {
            this.editingCmp.dispose();
        }
            this.editingCmp = evt.editCmp;
    }
    onEditCommit(evt){
        if(!evt.cancelEdit) {
            let outEvt = <bsTableEvt>({});
            outEvt.row = evt.refData.data.row;
            outEvt.col = evt.refData.column;
            outEvt.data = evt.refData.data.data;
            outEvt.originVal = evt.refData.data.data[evt.refData.column.field];
            outEvt.newVal = evt.value;
            evt.refData.data.data[evt.refData.column.field] = evt.value;
            this.editEmitter.emit(outEvt);
        }
        this.editingCmp = null;
    }
    onFilterInput(evt,field)
    {
       this.filteringFields = this.filteringFields == null ? {} : this.filteringFields;
       this.filteringFields[field] = evt.target.value;
       this.currPage = 1;
       this.expandedRows.forEach(function(rowItem){
            rowItem.collapse();
        })
    }
    getDetailViewRowSpan(columns){
        if(Array.isArray(columns[0]))
        {
            return columns.reduce(function(a,b){
                return (Array.isArray(a) ? (a.length == 1 ? (a.rowspan ? a.rowspan : 1) :  a.reduce(function(a,b){
                    return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                        (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
                })) : a) + (b.length == 1 ? (b.rowspan ? b.rowspan : 1) : b.reduce(function(a,b){
                        return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                            (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
                    }));
            })
        } else
        {
            return columns.reduce(function(a,b){
                return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                    (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
            })
        }
    }
    getTotalPage() {
        return Math.floor((this.datas.length + this.option.pageSize - 1) / this.option.pageSize));
    }
    genHeaderClass(column,sortDirection){
        return {
            'th-inner':true,
            'sortable':column.sortable,
            'asc':sortDirection == 'asc' && column.sortable,
            'desc':sortDirection == 'desc' && column.sortable,
            'both':(sortDirection == null || sortDirection == '') && column.sortable
        }
    }
    _onPageSizeChange(event){
        this.pageSize = event.size;
        this.currPage = 1;
    }
    _onPageChange(event) {
        this.pageSize = event.size;
        this.currPage = event.currPage;
    }
    onHeaderClick(event,column){
        if(column.sortable) {
            switch (column.sortDirection) {
                case 'asc':
                    column.sortDirection = 'desc'
                    break;
                case 'desc':
                    column.sortDirection = 'asc'
                    break;
                default:
                    column.sortDirection = 'asc'
            }
            this._onSortChange(column.field, column.sortDirection);
        }
        event.stopPropagation();
        event.preventDefault();
    }
    _onSortChange(field,direction,sortable){
        this.sortField = field;
        this.sortDirection = direction;
        this.expandedRows.forEach(function(rowItem){
            rowItem.collapse();
        })
    }
    onCellClick(evt)
    {
        this.cellClickEmitter.emit(evt);
    }
    onCellDbClick(evt)
    {
        this.celldblClickEmitter.emit(evt)
    }
    getTableData()
    {
        return this.datas.map(i=>i.data);
    }
}
