/**
 * Created by jackeyli on 2016/6/30.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
@Injectable()
export class ng_bsTableDataProvider
{
    constructor(private http:Http)
    {
    }
    provideData(data)
    {
        if(Array.isArray(data))
        {
            return new Promise(function(resolve,reject){
                return resolve(data);
            });
        } else
        {
            return new Promise(function(resolve,reject){
                let method = data.method || 'GET';
                switch(method)
                {
                    case 'GET':
                        return this.http.get(data.url).subscribe(function(response){
                            resolve(response.json());
                        });
                        break;
                    case 'POST':
                        return this.http.post(data.url).subscribe(function(response){
                            resolve(response.json());
                        });
                        break;
                    default:
                        return this.http.get(data.url).subscribe(function(response){
                            resolve(response.json());
                        });
                }
            }.bind(this))
        }
    }
}