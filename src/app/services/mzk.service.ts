import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const url = window['mzkUrl'];



@Injectable({
  providedIn: 'root'
})
export class MzkService {
  folderUrl: string = url + "/razuna/global/api2/folder.cfc";  //添加选题
  uploadUrl: string = url + "/razuna/raz2/dam/index.cfm";
  mzkImgUrl: string = url + "/razuna/global/api2/search.cfc";

  delTaskmzUrl: string = "/qczl/admin/resource/deleteTask";
  delXtmzUrl: string = "/qczl/admin/resource/deleteRecord";

  getDelTaskmz(taskid, mediaids) {
    let params = new HttpParams();
    params = params.set('taskid', taskid);
    params = params.set('mediaids', mediaids);
    return this.http.post<any>(this.delTaskmzUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getDelXtmz(recordid, mediaids) {
    let params = new HttpParams();
    params = params.set('recordid', recordid);
    params = params.set('mediaids', mediaids);
    return this.http.post<any>(this.delXtmzUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getMzkImg(method, api_key, data) {
    let params = new HttpParams();
    params = params.set('method', method)
    params = params.set('api_key', api_key);
    params = params.set('searchfor', `id:(${data})`);
    return this.http.post<any>(this.mzkImgUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }


  getMzkSearch(method, api_key, data, show) {
    let params = new HttpParams();
    params = params.set('method', method)
    params = params.set('api_key', api_key);
    params = params.set('searchfor', data);
    params = params.set('show', show);


    return this.http.post<any>(this.mzkImgUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getMzkUpload(fa, api_key, destfolderid, filedata) {
    let formdata = new FormData();
    formdata.append("fa", fa);
    formdata.append("api_key", api_key);
    formdata.append("destfolderid", destfolderid);
    formdata.append("filedata", filedata);
    return this.http.post(this.uploadUrl, formdata, { responseType: 'text' })
  }

  getFolder(method: string, api_key: string, folderid?: string) {
    let params = new HttpParams();
    params = params.set('method', method);
    params = params.set('api_key', api_key);
    folderid && (params = params.set('folderid', folderid));
    return this.http.post<any>(this.folderUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }




  constructor(private http: HttpClient) { }
}
