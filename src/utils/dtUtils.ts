/**
 * Created by jackeyli on 2016/7/13.
 */

export class dtUtil{
   getDataWithKey(dt,keys) {
        let key = keys.split('.');
        return key.length == 1 ?
            dt[key[0]] : [].concat(dt).concat(key).reduce((v1,v2)=>{
                return v1[v2];
            });
    }
    ToExcel(dataArr,filename){
        var uri = 'data:application/vnd.ms-excel;charset=UTF-8;base64,',
            template = `<?xml version="1.0"?>
            <?mso-application progid="Excel.Sheet"?>
                <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                    xmlns:o="urn:schemas-microsoft-com:office:office"
                    xmlns:x="urn:schemas-microsoft-com:office:excel"
                    xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                    xmlns:html="http://www.w3.org/TR/REC-html40">
                <Worksheet ss:Name="tt">
                <Table>{content}</Table>
                </Worksheet>
                </Workbook>`,
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) };
        var htmlStr = '';
        dataArr.forEach(function(item){
            htmlStr += '<Row>';
            item.forEach(function(itm){
                htmlStr += '<Cell><Data ss:Type="String"><![CDATA[' + itm + ']]></Data></Cell>';
            });
            htmlStr += '</Row>';
        })
        var DownloadLink = document.createElement('a');
        if (DownloadLink) {
            DownloadLink.style.display = 'none';
            DownloadLink.download = filename;
            DownloadLink.href = uri + base64(template.replace(/\{content\}/g,htmlStr));
            document.body.appendChild(DownloadLink);
            var DownloadEvt;
            if (document.createEvent) {
                if (DownloadEvt == null)
                    DownloadEvt = document.createEvent('MouseEvents');

                DownloadEvt.initEvent('click', true, false);
                DownloadLink.dispatchEvent(DownloadEvt);
            }
            else if (document.createEventObject)
                DownloadLink.fireEvent('onclick');
            else if (typeof DownloadLink.onclick == 'function')
                DownloadLink.onclick();
            document.body.removeChild(DownloadLink);
        }
    }
}