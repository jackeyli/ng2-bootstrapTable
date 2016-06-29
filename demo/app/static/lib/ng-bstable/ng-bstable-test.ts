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
    `
})
export class app {
    constructor() {
        this.data = Array.from(new Array(100),(x,i)=>i).map(
          item=>({
              "namex": "ng-bsTable",
              "column1": item,
              "column2": item + 12
          })
        );
        this.bsOption = {
            columns:[
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