/**
 * Created by LIJA3 on 6/17/2016.
 */
import { Component,Type, Directive,ComponentFactory} from "angular2/core";
import {ng_bstable} from "./ng-bstable.ts";
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
    constructor() {
        this.data = {url:'/remoteUrl',method:'get'};
        this.data2 = Array.from({length:8},(x,i)=>i).map(i=>({
            "namex": "ng-bsTable",
                "column1": i,
                "column2": i + 12,
                "column3": i + 14,
                "column4": i + 20
        }));
        this.bsOption = {
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
                    editable:true
                }]
            ],
            onExpandRow:function(holder,ngEl,resolver,rdata){
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
                    editable:true
                },{
                    "field":"column3",
                    "title":"Column3",
                    "colspan": 1,
                    "rowspan": 1,
                    filterable:true,
                    sortable:true,
                    editable:true
                }]
            ],
            onExpandRow:function(holder,ngEl,resolver,rdata){
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