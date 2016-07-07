/**
 * Created by LIJA3 on 7/6/2016.
 */
import {setBaseTestProviders} from 'angular2/testing';
import {
    TEST_BROWSER_PLATFORM_PROVIDERS,
    TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
import {
        describe,
        expect,
        it,
        inject,
    ComponentFixture, TestComponentBuilder
} from 'angular2/testing';
import {ngBsTablePaging,pageBtnPipe,pageSizePipe} from '../src/ng-bstablePaging.ts';
describe('the paging buttons',()=>{
    it('should display the page button correctly',
    inject([TestComponentBuilder],(tcb:TestComponentBuilder)=>{
        return tcb.createAsync(ngBsTablePaging).then((fixture:ComponentFixture,done)=>{
            fixture.componentInstance.pageSize = 100;
            fixture.componentInstance.totalRecords = 500;
            fixture.componentInstance.currPage = 4;
            fixture.detectChanges();
            let pgBtnEle = fixture.nativeElement.querySelectorAll('.pagination li');
            expect(pgBtnEle.length).toBe(7);
            expect(pgBtnEle[4].className).toContain('active');
        })
    }));
})
