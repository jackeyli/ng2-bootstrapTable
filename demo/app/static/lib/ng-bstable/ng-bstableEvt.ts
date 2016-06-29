/**
 * Created by LIJA3 on 6/17/2016.
 */
export interface bsTableEvt {
    col: number;
    row: number;
    data:any;
    target:any;
}
export interface bsTablePageEvent{
    size:number;
    currPage:number;
    target:any;
}