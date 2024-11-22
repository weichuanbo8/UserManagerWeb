
/*
    格式化日期
*/
export function dateFormat( pinYin: Date, showType : number |undefined) {
    if(!pinYin){ return '' }
    let date = new Date(pinYin);
    let year = date.getFullYear();
    let month = dateIfAddZero(date.getMonth()+1);
    let day = dateIfAddZero(date.getDate());
    let hour = date.getHours();
    let minite = date.getMinutes();
    let second = date.getSeconds();
    switch (showType) {
        case 0 : {
            return year + '-' + month + '-' + day;
        }
        case 1 : {
            return year + '-' + month + '-' + day+ ' ' + hour + ':' + minite + ':' + second;
        }
        default : {
            return year + '-' + month + '-' + day;
        }
    }
}

const dateIfAddZero = (time : number) => {
    return time < 10 ? '0'+ time : time
}
/*
    export excel
*/

import XLSX from 'xlsx';
//1、 demo
 export function exportToExcel_demo() {//data : string[], header : string[], filename : string
    let data = [ ['姓名', '年龄'], ['张三', 30], ['李四', 25] ]; // 示例数据
    let ws = XLSX.utils.aoa_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, 'test.xlsx');
}
//2、根据aoa导出成excel文件：
 export function exportToExcel_aoa(data : string[][], header : string[], sheetName : string, filename : string) {
    const wb = XLSX.utils.book_new(); // 创建文件
    const ws = XLSX.utils.aoa_to_sheet([header,...data||[]]); // 将数据和表头转换为工作表
    XLSX.utils.book_append_sheet(wb, ws, sheetName); // 工作表Sheet1
    XLSX.writeFile(wb , filename + ".xlsx", { bookType: "xlsx", type: "buffer" }); // 保存为Excel文件
}
//3、json数据（数组）导出成excel文件：
 export function exportToExcel_json(data : object[], headers : string[], sheetName : string, filename : string) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data, {header: headers}); // 将数据和表头转换为工作表
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename  +".xlsx", { bookType: "xlsx", type: "buffer" }); // 保存为Excel文件
}

/*
    MD5
*/
import {Md5} from 'ts-md5';
export function get_Md5 (str : string) {
    //镜像，例如“123”转换成“321”
    let tmp : string = str.split('').reverse().join('');
    //MD5加密
    var key = Md5.hashStr(tmp);
    return key; 
}

