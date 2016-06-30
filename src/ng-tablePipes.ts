/**
 * Created by LIJA3 on 6/29/2016.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output} from "angular2/core";
@Pipe({
    name:"paging",
    pure : false
})
export class pageFilter{
    transform(input,args){
        if(!input)
            return [];
        if(!args[2])
            return input;
        let pageSize = args[0],
            currPage = args[1],
            startIndex = pageSize * (currPage - 1),
            endIndex = pageSize * currPage < input.length ?
            pageSize *  currPage : input.length;
        if(pageSize != null && currPage != null) {
            return input.slice(startIndex, endIndex);
        }
        return input;
    }
}
@Pipe({
    name:"sorting",
    pure : false
})
export class sortFilter{
    transform(input,args){
        if(!input)
            return [];
        let field = args[0],
            direction = args[1];
        if(field != null)
        {
            return input.sort((a,b)=>{return a.data[field] > b.data[field] ? (direction == 'asc' ? 1 : -1) :
                (direction == 'asc' ? -1 : 1);});
        }
        return input;
    }
}
@Pipe({
    name:'columning'
})
export class columingPipe{
    transform(input,arg){
        if(!input)
            return [];
        if(arg[0] == 'columning') {
            return Array.isArray(input[0]) ? input : [input]
        }
        if(arg[0] == 'dataColumning') {
            let resolveGrp = function(grp){
                return Array.isArray(grp) ? (grp.reduce(function(a, b){
                    return (Array.isArray(resolveGrp(a)) ? resolveGrp(a) : [resolveGrp(a)])
                        .concat(Array.isArray(resolveGrp(b)) ? resolveGrp(b) : [resolveGrp(b)])
                })) : grp;
            }
            return resolveGrp(input).filter(function(item){return item.field});
        }
    }
}
@Pipe({
    name:'filtering',
    pure : false
})
export class filteringPipe{
    transform(input,arg){
        if(!input)
            return [];
        let filteringFields = arg[0];
        if(filteringFields == null)
            return input;
        let allFilters = Object.keys(filteringFields).map((item)=>({
            key:item,
            value:filteringFields[item]
        });
        return (Array.isArray(allFilters) && allFilters.length > 0 )? input.filter(function(item){
            return allFilters.length == 1 ? (allFilters[0].value == null ? true :
                ((''+item.data[allFilters[0].key]).startsWith(allFilters[0].value) ?
                    true : false)) :  allFilters.reduce(function(filtera,filterb){
                return (filtera.value == null ? true :
                        (('' + item.data[filtera.key]).startsWith(filtera.value) ?
                            true : false)) &&
                    (filterb.value == null ? true :
                        (('' + item.data[filterb.key]).startsWith(filterb.value) ?
                            true : false))
            });
        }) : input;
    }
}
@Pipe({
    name:'expandingFilter',
    pure : false
})
export class expandFilterPipe{
    transform(input){
        if(Array.isArray(input) && input.length == 1)
        {
            return (input[0].isExpanded ? [this.getExpandedRowData(input[0]),this.getExpandedSubRowData(input[0])] : [input[0]]);
        }
        return input.reduce(function(data1,data2){
            let data1Arr = Array.isArray(data1) ? data1 :
                (data1.isExpanded ? [this.getExpandedRowData(data1),this.getExpandedSubRowData(data1)] : [data1]);
            return data1Arr.concat((data2.isExpanded ? [this.getExpandedRowData(data2),this.getExpandedSubRowData(data2)] : [data2]));
        }.bind(this));
    }
    getExpandedRowData(data1)
    {
        data1.subRowData = {isExpandedSubRow:true,parentNode:data1};
        return data1;
    }
    getExpandedSubRowData(data1)
    {
        return {isExpandedSubRow:true,parentData:data1}
    }
}