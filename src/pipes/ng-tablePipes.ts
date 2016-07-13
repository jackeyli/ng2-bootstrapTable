/**
 * Created by LIJA3 on 6/29/2016.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output} from "angular2/core";
import {dtUtil} from './../utils/dtUtils.ts'
@Pipe({
    name:"paging",
    pure : false
})
export class pageFilter{
    transform(input,pageSize,currPage,isPaging){
        if(!input)
            return [];
        if(pageSize == null ||
        currPage == null)
            return input;
        if(!isPaging)
            return input;
            let startIndex = pageSize * (currPage - 1),
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
    transform(input,field,direction){
        if(!input)
            return [];
        if(direction == null)
            return input;
        if(field != null)
        {
            let _dtUtil = new dtUtil();
            return input.sort((a,b)=>{return _dtUtil.getDataWithKey(a.data,field)> _dtUtil.getDataWithKey(b.data,field) ? (direction == 'asc' ? 1 : -1) :
                (direction == 'asc' ? -1 : 1);});
        }
        return input;
    }
}
@Pipe({
    name:'columning'
})
export class columingPipe{
    transform(input,columningType){
        if(!input)
            return [];
        if(columningType == 'columning') {
            return Array.isArray(input[0]) ? input : [input]
        }
        if(columningType == 'dataColumning') {
            let dataColumnArr = [];
            if(!Array.isArray(input[0]))
            {
                dataColumnArr = input.filter(item=>item.field)
            } else
            {
                let maxColspan = 0,
                    maxRows = input.length;
                input[0].forEach((item)=>{
                    maxColspan += (item.colspan ? item.colspan : 1);
                })
                let columnHeaderM = new Array(maxRows);
                for(var k = 0; k < columnHeaderM.length; k ++)
                {
                    columnHeaderM[k] = new Array(maxColspan);
                }
                input.forEach(function(item,rowIndex){
                    let thisline = columnHeaderM[rowIndex],
                        startCol = 0,
                        curCol = 0;
                    for(var i = 0; i < thisline.length; i ++)
                    {
                        if(thisline[i] != 1)
                        {
                            startCol = i;
                            break;
                        }
                    }
                    item.forEach((itm)=>{
                        if(itm.field)
                        {
                            let thiscolspan = itm.colspan ? itm.colspan : 1,
                                thisrowspan = itm.rowspan ? itm.rowspan : 1;
                            dataColumnArr.push({item:itm,colpos:startCol + curCol});
                            for(var i = rowIndex,j = 0; j < thisrowspan; i ++,j++)
                            {
                                for(var ix = startCol + curCol,jx = 0;jx < thiscolspan;ix ++,jx ++)
                                {
                                    columnHeaderM[i][ix] = 1;
                                }
                            }
                        }
                        curCol += (itm.colspan ? itm.colspan : 1);
                    })
                });
                dataColumnArr = dataColumnArr.sort((itema,itemb)=>{
                    return itema.colpos - itemb.colpos
                }).map(item=>item['item']);
            }
            return dataColumnArr
        }
    }
}
@Pipe({
    name:'filtering',
    pure : false
})
export class filteringPipe {
    transform(input, filteringFields) {
        if (!input)
            return [];
        if (filteringFields == null)
            return input;
        let allFilters = Object.keys(filteringFields).map((item)=>({
            key: item,
            value: filteringFields[item]
        }));
        let _dtUtil = new dtUtil();
        return (Array.isArray(allFilters) && allFilters.length > 0 ) ? input.filter(function (item) {
            return allFilters.length == 1 ? (allFilters[0].value == null ? true :
                (('' + _dtUtil.getDataWithKey(item.data,allFilters[0].key)).startsWith(allFilters[0].value) ?
                    true : false)) : allFilters.reduce(function (filtera, filterb) {
                return (filtera.value == null ? true :
                        (('' + _dtUtil.getDataWithKey(item.data,filtera.key)).startsWith(filtera.value) ?
                            true : false)) &&
                    (filterb.value == null ? true :
                        (('' + _dtUtil.getDataWithKey(item.data,filterb.key)).startsWith(filterb.value) ?
                            true : false))
            });
        }) : input;
    }
}