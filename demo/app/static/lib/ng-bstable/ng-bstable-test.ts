/**
 * Created by LIJA3 on 6/17/2016.
 */
import { Component,View, Directive} from "angular2/core";
import {ng_bstable} from "./ng-bstable.ts";
@Component({
        selector: "app"
    }
)
@View({
    directives: [ng_bstable],
    template:`
       <ng_bstable [option]="bsOption" [data]="data"></ng_bstable>
        <ng_bstable [option]="bsOption2" [data]="data2"></ng_bstable>
    `
})
export class app {
    constructor() {
        this.data = {url:'/remoteUrl',method:'get'};
        this.data2 = Array.from({length:100},(x,i)=>i).map(i=>({
            "namex": "ng-bsTable",
                "column1": i,
                "column2": i + 12
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
                    filterable:true
                }]
            ],
            onExpandRow:function(ngEl,_loader,rdata){
                _loader.loadNextToLocation((<Type>ng_bstable),ngEl).then(function(cmp){
                    cmp.instance.option = {
                        columns:[
                            {"field":"name",title:"name"},
                            {"field":"name2",title:"name2"}
                        ]
                    }
                    cmp.instance.data = [{"name":"A","name2":"B"},{"name":"A","name2":"B"}]
                }.bind(this));
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
                [{"title":"RAW DATA EXAMPLE","colspan":3}],
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
                    filterable:true
                }]
            ],
            onExpandRow:function(ngEl,_loader,rdata){
                _loader.loadNextToLocation((<Type>ng_bstable),ngEl).then(function(cmp){
                    cmp.instance.option = {
                        columns:[
                            {"field":"name",title:"name"},
                            {"field":"name2",title:"name2"}
                        ]
                    }
                    cmp.instance.data = [{"name":"A","name2":"B"},{"name":"A","name2":"B"}]
                }.bind(this));
            },
            onCollapseRow:function(){
                console.log('collapsed');
            },
            detailView:true,
            pagination:true,
            pageSize:20
        }
    }
}