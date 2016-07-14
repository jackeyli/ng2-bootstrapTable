/**
 * Created by LIJA3 on 6/17/2016.
 */
import { ViewContainerRef,TemplateRef,Component,Type, Directive,ComponentFactory} from "angular2/core";
import {ng_bstable} from "./ng-bstable/ng-bstable.ts";
import {defaultCellTemplate} from './ng-bstable/defaultExtraComponents/defaultCellTemplate.ts';
@Component({
        selector: "app",
    directives: [ng_bstable],
    template:`
        <ng_bstable (edit)="onMyTableEdit($event)" [option]="bsOption" [data]="data" (cellClick)="onTableCellClick($event)" (cellDblClick)="onTableCellDBlClick($event)"></ng_bstable>
        <ng_bstable (edit)="onMyTableEdit($event)" [option]="bsOption2" [data]="data2" (cellClick)="onTableCellClick($event)" (cellDblClick)="onTableCellDBlClick($event)"></ng_bstable>
    `
    }
)
export class app {
    private data:any;
    private data2:any;
    private bsOption:any;
    private bsOption2:any;
    onTableCellClick()
    {

    }
    onTableCellDBlClick()
    {

    }
    constructor(private _viewContainerRef:ViewContainerRef) {
        this.data = {url:'/remoteUrl',method:'get'};
        this.data2 = Array.from({length:8},(x,i)=>i).map(i=>({
            "namex": "ng-bsTable",
                "column1": {myColumnValue:i},
                "column2": i + Math.floor(Math.random() * 12),
                "column3": {columnValue:{trueValue:i + Math.floor(Math.random() * 14)}},
                "column4": i + Math.floor(Math.random() * 20)
        }));
        this.bsOption = {
            downloadDetail:{filename:'Excel_Downloading_Example.xls'},
            columns:[
                [{"title":"REMOTE DATA EXAMPLE","colspan":3}],
                [{
                    "field": "namex",
                    "title": "Name",
                    "colspan": 1,
                    "rowspan": 2
                }, {
                    "title": "GroupedColumn",
                    "colspan": 2,
                    "rowspan": 1
                }],
                [{
                    "field": "column1",
                    "title": "Column1",
                    "colspan": 1,
                    "rowspan": 1,
                    sortable:true
                }, {
                    "field": "column2",
                    "title": "Column2",
                    "colspan": 1,
                    "rowspan": 1,
                    filterable:true,
                    editable:true,
                    formatter:(value,row,index)=>{
                        if(value > row['column1'])
                        {
                            return '<span>' + value + '</span><i class="glyphicon glyphicon-arrow-up"></i>'
                        } else
                        {
                            return  '<span>' + value + '</span><i class="glyphicon glyphicon-arrow-down"></i>'
                        }
                    }
                }]
            ],
            onExpandRow:(holder,ngEl,resolver,rdata)=>{
                resolver.resolveComponent((<Type>ng_bstable)).then((factory:ComponentFactory) => {
                    let cmp = ngEl.createComponent(factory)
                    cmp.instance.option={
                        columns:[
                            {"field":"name",title:"name"},
                            {"field":"name2",title:"name2"}
                        ]
                    },
                    cmp.instance.data=[{"name":"A","name2":"B"},{"name":"A","name2":"B"}];
                });
            },
            onCollapseRow:function(){
                console.log('collapsed');
            },
            detailView:true,
            pagination:true,
            pageSize:20
        }
        this.bsOption2 = {
            columns:[
                [{"title":"RAW DATA EXAMPLE","colspan":5}],
                    [{
                    "field": "namex",
                    "title": "Name",
                    "colspan": 1,
                    "rowspan": 2
                }, {
                    "title": "GroupedColumn",
                    "colspan": 3,
                    "rowspan": 1
                },{"title": "column4",
                        "colspan": 1,
                        "rowspan": 2,
                        "field":"column4"}],
                [{
                    "field": "column1.myColumnValue",
                    "title": "Column1",
                    "colspan": 1,
                    "rowspan": 1,
                    sortable:true
                }, {
                    "field": "column2",
                    "title": "Column2",
                    "colspan": 1,
                    "rowspan": 1,
                    filterable:true,
                    editable:true,
                    cellComponent:{
                        type:defaultCellTemplate,
                        init:(cmp,cell,cfg,data)=>{
                            cmp.instance.data = data.column2;
                        }
                    }
                },{
                    "field":"column3.columnValue.trueValue",
                    "title":"Column3",
                    "colspan": 1,
                    "rowspan": 1,
                    filterable:true,
                    sortable:true,
                    editable:true,
                    formatter:(value,row,index)=>{
                        if(value > row['column2'])
                        {
                            return '<span>' + value + '</span><i class="glyphicon glyphicon-arrow-up"></i>'
                        } else
                        {
                            return  '<span>' + value + '</span><i class="glyphicon glyphicon-arrow-down"></i>'
                        }
                    }
                }]
            ],
            onExpandRow:(holder,ngEl,resolver,rdata)=>{
                resolver.resolveComponent((<Type>ng_bstable)).then((factory:ComponentFactory) => {
                    let cmp = ngEl.createComponent(factory)
                    cmp.instance.option={
                        columns:[
                            {"field":"name",title:"name"},
                            {"field":"name2",title:"name2"}
                        ]
                    },
                    cmp.instance.data=[{"name":"A","name2":"B"},{"name":"A","name2":"B"}];
                });
            },
            onCollapseRow:function(){
                console.log('collapsed');
            },
            detailView:true,
            pagination:true,
            pageSize:20
        }
    }
    onMyTableEdit(evt)
    {
        let alertMsg = 'editedRow:' + evt.row + ' editedCol:' + evt.col + ' oldVal:' + evt.originVal + ' newVal:'
        + evt.newVal;
        alert(alertMsg);
    }
}