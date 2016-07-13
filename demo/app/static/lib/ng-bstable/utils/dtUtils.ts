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
}