/**
 * Created by LIJA3 on 6/17/2016.
 */
import {Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,Input} from "angular2/core";
import {bsTablePageEvent} from "./ng-bstableEvt.ts";
@Pipe({
    name:"pageBtnPipe",
    pure : false
})
export class pageBtnPipe{
    transform(input,pageSize,currPage){
        if(pageSize == undefined ||
            currPage == undefined ||
            input == undefined)
            return[];
        let pageBtn = [],
            minPage = currPage - 3 > 0 ? currPage - 3 : 1,
            maxPage = currPage + 3 <= input ? currPage + 3 : input;
        if(minPage != maxPage - 6)
        {
            if(maxPage == input)
                minPage = maxPage - 6 > 0 ? maxPage - 6 : 1;
            else
                maxPage = minPage + 6 <= input ? minPage + 6 : input;
        }
        for(var i = minPage; i <=maxPage; i ++)
        {
            pageBtn.push(i);
        }
        return pageBtn;
    }
}
@Pipe({
    name:"pageSizePipe",
    pure : false
})
export class pageSizePipe{
    transform(oriPageSize){
        if(!oriPageSize)
            return [1];
        return [Math.floor((oriPageSize) / 2),oriPageSize,oriPageSize * 2];
    }
}
@Component({
    selector : "ngBsTablePaging",
    inputs: ['pageSize:pageSize','currPage:currPage','table:table','totalRecords:totalRecords','totalPage:totalPage'],
    pipes:[pageBtnPipe,pageSizePipe],
template:
    `<div>
            <div class="pull-left pagination-detail">
                <span class="pagination-info"> Showing {{currPage}} to {{totalPage}} of {{totalPage}}</span>
                <span class="page-list">
                    <span class="btn-group dropup">
                        <button type="button" class="btn btn-default  dropdown-toggle" data-toggle="dropdown">
                            <span class="page-size">{{pageSize}}</span>
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li *ngFor="let pageSizeItem of (oriPageSize|pageSizePipe)"
                                (click)="pageSizeListClick($event,pageSizeItem)">
                                    <a href="javascript:void(0)">{{pageSizeItem}}</a>
                            </li>
                        </ul>
                    </span> records per page
                </span>
            </div>
            <div class="pull-right pagination" [ngStyle]="style">
                <ul class="pagination">
                    <li class="page-pre">
                        <a href="javascript:void(0)" (click)="pageBtnClick($event,currPage > 1 ? currPage - 1:currPage)">‹</a>
                    </li>
                    <li *ngFor="let pageBtn of (totalPage|pageBtnPipe:pageSize:currPage);" [ngClass]="pageClass(pageBtn)">
                        <a href="javascript:void(0)" (click)="pageBtnClick($event,pageBtn)">{{pageBtn}}</a>
                    </li>
                    <li class="page-next">
                        <a href="javascript:void(0)" (click)="pageBtnClick($event,currPage < totalPage ? currPage + 1 : currPage)">›</a>
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class ngBsTablePaging{
    @Output('pageSizeChange') public onPageSizeChange: EventEmitter<bsTablePageEvent> = new EventEmitter<bsTablePageEvent>();
    @Output('pageChange') public onPageChange: EventEmitter<bsTablePageEvent> = new EventEmitter<bsTablePageEvent>();
    private _pageSize:number;
    private _totalRecords:number;
    private oriPageSize:number;
    @Input() private currPage:number;
    @Input() private totalPage:number;
    activeClass:any = {
        'page-number':true,
        'active':true
    };
    pageNumClass:any = {
        'page-number':true,
        'active':false
    };
    set pageSize(v)
    {
        this._pageSize = v
        this.oriPageSize = this.oriPageSize || v;
        if(this.totalRecords != null) {
            this.totalPage = Math.floor((this.totalRecords + this.pageSize - 1) / this.pageSize);
        }
    }
    set totalRecords(v)
    {
        this._totalRecords = v;
        if(this.pageSize != null) {
            this.totalPage = Math.floor((this.totalRecords + this.pageSize - 1) / this.pageSize);
        }
        this._totalRecords = v;
    }
    get totalRecords()
    {
        return this._totalRecords;
    }
    get pageSize()
    {
        return this._pageSize;
    }
    pageClass(pageBtn)
    {
        if(pageBtn == this.currPage)
        {
            return this.activeClass;
        }
        return this.pageNumClass;
    }
    getPageBtns()
    {
        return Array.from(new Array(this.totalPage), (x,i) => i)
    }
    pageBtnClick(evt,j)
    {
        this.currPage = j;
        this.onPageChange.emit(this.getPageEvt())
    }
    pageSizeListClick(evt,j)
    {
        this.pageSize = j;
        let maxPage = Math.floor((this.totalRecords + this.pageSize - 1) / this.pageSize);
        if(this.currPage > maxPage)
            this.currPage = maxPage;
        this.onPageSizeChange.emit(this.getPageEvt());
    }
    getPageEvt()
    {
        return <bsTablePageEvent>({
            size:this.pageSize,
            currPage:this.currPage,
            target:this
        });
    }
}