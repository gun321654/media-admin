import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { empty } from 'rxjs';


interface config {
  resourceUrl: string
}
interface json {
  code: number;
  msg: string
  result: any;
  page?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CfService {
  constructor(private http: HttpClient) { }
  taskopenUrl = "/qczl/admin/task/list"; //任务一览
  taskownlistUrl = "/qczl/admin/task/ownlist";//我的任务
  taskclaimUrl = "/qczl/admin/task/claim";//认领任务
  taskfinishUrl = "/qczl/admin/task/finish" //完成任务
  taskexecuteUrl = "/qczl/admin/task/execute";    //执行任务
  taskinfoUrl = "/qczl/admin/task/info"; //任务详情


  taskrefusefinishUrl = "/qczl/admin/task/refusefinish"; //拒绝完成任务
  taskagreefinishUrl = "/qczl/admin/task/agreefinish"; //通过完成任务

  taskgetestablishUrl = "/qczl/admin/task/getestablish"; //获取我创建的任务
  taskeditUrl = "/qczl/admin/task/edit";  //修改任务
  taskmonitorUrl = "/qczl/admin/task/monitor";

  mediumUrl = "/qczl/admin/medium/getByUser";
  configUrl = "./assets/config.json";

  deleteUrl: string = "/qczl/admin/task/delete";  //删除任务

  taskgetfinishUrl = "/qczl/admin/task/getfinish";  //未完结任务
  taskgetendUrl = "/qczl/admin/task/getend";

  getTaskgetend(page: number, limit: number, status?: string, starttime?: number, endtime?: number, title?: string) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    status && (params = params.set('status', status.toString()));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    title && (params = params.set('title', title));
    return this.http.get<json>(this.taskgetendUrl, { params });
  }
  getTaskgetfinish(page: number, limit: number, status?: string, starttime?: number, endtime?: number, title?: string) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    status && (params = params.set('status', status.toString()));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    title && (params = params.set('title', title));
    return this.http.get<json>(this.taskgetfinishUrl, { params });
  }


  getDel(taskid) {
    const params = new HttpParams()
      .set("taskid", taskid.toString());
    return this.http.post<json>(this.deleteUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getTaskmonitor(taskId, mediumIds) {
    const params = new HttpParams()
      .set('taskId', taskId.toString())
      .set('mediumIds', mediumIds.toString())
    return this.http.get<json>(this.taskmonitorUrl, { params });
  }
  getMedium() {
    return this.http.get<json>(this.mediumUrl)
  }


  getTaskedit(taskId, recordId, title, musers, address, content, open, starttime, endtime, channelId, xaxis?: string, yaxis?: string) {
    console.log("recordId", recordId)
    const params = new HttpParams()
      .set("taskId", taskId.toString())
      .set("recordId", recordId.toString())
      .set("title", title.toString())
      .set("musers", musers.toString())
      .set("address", address.toString())
      .set("content", content.toString())
      .set("open", open.toString())
      .set("starttime", starttime.toString())
      .set("endtime", endtime.toString())
      .set("channelId", channelId.toString());
    //taskeditUrl
    return this.http.post<json>(this.taskeditUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }



  getTaskgetestablish(page: number, limit: number, status?: string, starttime?: number, endtime?: number, title?: string) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    status && (params = params.set('status', status.toString()));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    title && (params = params.set('title', title));
    return this.http.get<json>(this.taskgetestablishUrl, { params });
  }
  getTaskrefusefinish(recordId, explain) {
    const params = new HttpParams()
      .set('taskId', recordId)
      .set('explain', explain)
    return this.http.post<json>(this.taskrefusefinishUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getTaskagreefinish(recordId, explain) {
    const params = new HttpParams()
      .set('taskId', recordId)
      .set('explain', explain)
    return this.http.post<json>(this.taskagreefinishUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getConfig() {
    return this.http.get<config>(this.configUrl);
  }
  getTaskinfo(taskid) {
    const params = new HttpParams()
      .set('taskid', taskid)
    return this.http.get<json>(this.taskinfoUrl, { params });
  }

  getTaskexeaute(arr, taskid, explain) {
    let formdata = new FormData();
    arr.forEach(item => {
      formdata.append(item.name, item);
    });
    formdata.append("taskid", taskid);
    formdata.append("explain", explain);

    return this.http.post<json>(this.taskexecuteUrl, formdata);
  }
  getTaskclaim(taskid) {
    const params = new HttpParams()
      .set('taskid', taskid)
    return this.http.post<json>(this.taskclaimUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getTaskfinish(taskid) {
    const params = new HttpParams()
      .set('taskid', taskid)
    return this.http.post<json>(this.taskfinishUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getTaskopen(page: number, limit: number, status?: string, starttime?: number, endtime?: number, title?: string) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    status && (params = params.set('status', status.toString()));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    title && (params = params.set('title', title));
    return this.http.get<json>(this.taskopenUrl, { params });
  }


  getTaskownlist(page: number, limit: number, status?: string, starttime?: number, endtime?: number, title?: string) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    status && (params = params.set('status', status.toString()));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    title && (params = params.set('title', title));
    return this.http.get<json>(this.taskownlistUrl, { params });
  }




}
