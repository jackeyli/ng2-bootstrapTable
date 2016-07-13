/**
 * Created by jackeyli on 2016/7/5.
 */
import {pageFilter,sortFilter,columingPipe,filteringPipe} from '../src/pipes/ng-tablePipes.ts';
import {pageBtnPipe,pageSizePipe} from '../src/paging/ng-bstablePaging.ts';
describe('test PageFilter',function(){
    var filter = new pageFilter();
    it('should return none value when input is undefined',function(){
        let input = undefined;
        expect(filter.transform(input,1,1,true).length).toBe(0);
    });
    it('should return input when pageSize or currPage is null or paging is false',function(){
        let input = Array.from(new Array(100),(x,i)=>i);
        expect(filter.transform(input,null,1,true).length).toBe(input.length);
        expect(filter.transform(input,10,null,true).length).toBe(input.length);
        expect(filter.transform(input,10,2,false).length).toBe(input.length);
    })
    it('should return the sliced page when pageSize or currPage is not null and paging is true',function(){
        let input = Array.from(new Array(100),(x,i)=>i);
        let result_1 = filter.transform(input,10,1,true);
        expect(result_1.length).toBe(10);
        expect(result_1[0]).toBe(0);
        expect(result_1[9]).toBe(9);
        let result_2 = filter.transform(input,10,4,true);
        expect(result_2.length).toBe(10);
        expect(result_2[0]).toBe(30);
        expect(result_2[9]).toBe(39);
        let result_3 = filter.transform(input,14,8,true);
        expect(result_3.length).toBe(2);
        expect(result_3[0]).toBe(98);
        expect(result_3[1]).toBe(99);
    })
})
describe('test sortFilter',function(){
    var filter = new sortFilter();
    it('should return originFilter when sortField is null or sortDirection is undefined',function(){
        let input = Array.from(new Array(100),(x,i)=>({data:{sortingField:i,unsortingField:100-i}}));
        let result_1 = filter.transform(input,null,'asc');
        expect(result_1[0].data.sortingField).toBe(0);
        expect(result_1[99].data.sortingField).toBe(99);
        let result_2 = filter.transform(input,'sortingField',undefined);
        expect(result_2[0].data.sortingField).toBe(0);
        expect(result_2[99].data.sortingField).toBe(99);
    })
    it('should sort as requested',function(){
        let input = Array.from(new Array(100),(x,i)=>({data:{sortingField:i,unsortingField:100-i}}));
        let result_1 = filter.transform(input,'sortingField','desc');
        expect(result_1[0].data.sortingField).toBe(99);
        expect(result_1[99].data.sortingField).toBe(0);
        let result_2 = filter.transform(input,'unsortingField','asc');
        expect(result_2[0].data.unsortingField).toBe(1);
        expect(result_2[99].data.unsortingField).toBe(100);
    })
})
describe('test columnFilter-columing',function(){
    var filter = new columingPipe();
    it('should return simple column when there is no grouping column',function(){
        let input = [{"title":"REMOTE DATA EXAMPLE - 2","colspan":2},
            {"title":"REMOTE DATA EXAMPLE - 1","colspan":1}];
        let result = filter.transform(input,'columning');

        expect(result[0][0].title).toEqual("REMOTE DATA EXAMPLE - 2");
        expect(result[0][1].title).toEqual("REMOTE DATA EXAMPLE - 1");
        expect(result.length).toBe(1);
        expect(result[0].length).toBe(2);
    })
    it('should return one column when there is only one column',function(){
        let input = [{"title":"REMOTE DATA EXAMPLE - 2","colspan":2}]
        let result = filter.transform(input,'columning');
        expect(result[0][0].title).toEqual("REMOTE DATA EXAMPLE - 2");
        expect(result.length).toBe(1);
        expect(result[0].length).toBe(1);
    })
    it('should return grouped columns as requested when there got grouped columns ',function(){
        let input = [[{"title":"subGroupedColumn","colspan":2},{"title":"noneGroupedColumn","colspan":1,"rowspan":2}],
            [{"title":"subColumn1","colspan":1},{"title":"subColumn","colspan":1}]];
        let result = filter.transform(input,'columning');
        expect(result[0][0].title).toEqual("subGroupedColumn");
        expect(result[0][1].title).toEqual("noneGroupedColumn");
        expect(result[1][0].title).toEqual("subColumn1");
        expect(result[1][1].title).toEqual("subColumn");
    })
})

describe('test columnFilter-dataColuming',function(){
    var filter = new columingPipe();
    it('should return simple data',function(){
        let input = [{"title":"REMOTE DATA EXAMPLE - 2","colspan":2,"field":"field1"},
            {"title":"REMOTE DATA EXAMPLE - 1","colspan":1,"field":"field1"}]
        let result = filter.transform(input,'dataColumning');
        expect(result[0].title).toEqual("REMOTE DATA EXAMPLE - 2");
        expect(result[1].title).toEqual("REMOTE DATA EXAMPLE - 1");
        expect(result.length).toBe(2);
    })
    it('should return one column when there is only one column',function(){
        let input = [{"title":"REMOTE DATA EXAMPLE - 2","colspan":2,"field":"field0"}]
        let result = filter.transform(input,'dataColumning');
        expect(result[0].title).toEqual("REMOTE DATA EXAMPLE - 2");
        expect(result.length).toBe(1);
    })
    it('should return grouped columns as requested when there got grouped columns ',function(){
        let input = [[{"title":"totalGroupedColumn","colspan":4}],[{"title":"subColumn1","rowspan":2,field:"subColumn1"},
            {"title":"subGroupedColumn","colspan":2},{"title":"subColumn4","colspan":1,"rowspan":2,"field":"subColumn4"}],
            [{"title":"subColumn2","colspan":1,"field":"subColumn2"},{"title":"subColumn3","colspan":1,"field":"subColumn3"}]];
        let result = filter.transform(input,'dataColumning');
        expect(result[0].title).toEqual("subColumn1");
        expect(result[1].title).toEqual("subColumn2");
        expect(result[2].title).toEqual("subColumn3");
        expect(result[3].title).toEqual("subColumn4");
    })
})
describe('test Filtering Pipe',function(){
    var filter = new filteringPipe();
    it ('should return origin input when there is no filter',function(){
       let input = [{"filterField1":"field1"},{"filterField1":"field2"},{"filterField1":"field2"}],
           result = filter.transform(input,null);
        expect(result.length).toBe(3);
    });
    it('should return filtered data when there has got filter',function(){
        let input = [{data:{"filterField1":"fixld2","filterField2":123}},
            {data:{"filterField1":"fixld1","filterField2":124}},
                {data:{"filterField1":"fiyld1","filterField2":253}},
            {data:{"filterField1":"fixld3","filterField2":133}}],
            result_1 = filter.transform(input,{"filterField1":"fix"});
        expect(result_1.length).toBe(3);
        let result_2 = filter.transform(input,{"filterField1":"fix","filterField2":"12"});
        expect(result_2.length).toBe(2);
        let result_3 = filter.transform(input,{"filterField1":"b","filterField2":"12"});
        expect(result_3.length).toBe(0);
    });
});
describe('test pageSizePipe',function(){
    var pipe = new pageSizePipe();
    it('should return 3 pipe',function(){
        let result_1 = pipe.transform(3)
        expect(result_1[0]).toBe(1);
        expect(result_1[1]).toBe(3);
        expect(result_1[2]).toBe(6);
        expect(result_1.length).toBe(3);
    })
    it('should return 1 pipe',function(){
        let result_1 = pipe.transform(null)
        expect(result_1[0]).toBe(1);
        expect(result_1.length).toBe(1);
    })
})