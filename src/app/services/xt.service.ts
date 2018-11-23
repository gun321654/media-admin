import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { empty } from 'rxjs';

interface json {
  code: number;
  msg: string
  result: any;
  page?: any;
}

@Injectable({
  providedIn: 'root'
})
export class XtService {
  constructor(private http: HttpClient) { }
  addUrl: string = "/qczl/admin/record/add";  //添加选题
  adoptUrl: string = "/qczl/admin/record/adopt";  //通过审核
  allUrl: string = "/qczl/admin/record/all";  //所有选题列表
  deleteUrl: string = "/qczl/admin/record/delete";  //删除选题
  deletebatchUrl: string = "/qczl/admin/record/deletebatch";//批量删除
  infoUrl: string = "/qczl/admin/record/info";  //选题详情
  ownlistUrl: string = "/qczl/admin/record/ownlist";  //我的选题列表
  rejectUrl: string = "/qczl/admin/record/reject";  //退回选题
  submissionUrl: string = "/qczl/admin/record/submission";  //提交审核
  updateRecordUrl: string = "/qczl/admin/record/updateRecord";  //修改选题
  waitlistUrl: string = "/qczl/admin/record/waitlist";  //待审选题列表
  getChannelUrl: string = "/qczl/api/channel/getChannel";  //待审选题列表

  userallUrl: string = "/qczl/admin/user/all";
  typeallUrl: string = "/qczl/admin/recordtype/all";

  uploadUrl: string = "/qczl/admin/resource/upload";

  taskaddUrl: string = "/qczl/admin/task/add";
  addRecordUrl: string = "/qczl/admin/resource/addRecord";
  addtaskUrl: string = "/qczl/admin/resource/addTask";
  assignlistUrl: string = "/qczl/admin/record/assignlist";
  apikUrl: string = "/qczl/admin/user/media";

  getApik() {
    return this.http.get<any>(this.apikUrl);
  }



  getAssignlist(page: number, limit: number, search?: string, starttime?: number, endtime?: number, channelid?: number, status?: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    search && (params = params.set('search', search));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    channelid && (params = params.set('channelid', channelid.toString()));
    status && (params = params.set('status', status.toString()));
    return this.http.get<json>(this.assignlistUrl, { params });
  }


  getAddtask(taskid, mediaids) {
    let params = new HttpParams();
    params = params.set('taskid', taskid)
      .set('mediaids', mediaids);
    return this.http.post<json>(this.addtaskUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getAddRecord(taskid, mediaids) {
    let params = new HttpParams();
    params = params.set('recordid', taskid)
      .set('mediaids', mediaids);
    return this.http.post<json>(this.addRecordUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }



  getTaskadd(arr, recordId, title, musers, address, content, open, starttime, endtime, channelId, cuser, taskId, xaxis, yaxis) {
    // let formdata = new FormData();



    let formdata = new FormData();
    arr.forEach(item => {
      formdata.append(item.name, item);
    });
    formdata.append('recordId', recordId);
    formdata.append('title', title);
    formdata.append('musers', musers);
    formdata.append('address', address);
    formdata.append('content', content);
    formdata.append('open', open);
    formdata.append('starttime', starttime);
    formdata.append('endtime', endtime);
    formdata.append('channelId', channelId);

    // let params = new HttpParams()
    //   .set('recordId', recordId)
    //   .set('title', title)
    //   .set('musers', musers)
    //   .set('address', address)
    //   .set('content', content)
    //   .set('open', open)
    //   .set('starttime', starttime)
    //   .set('endtime', endtime)
    //   .set('channelId', channelId)

    // taskId, xaxis, yaxis
    // cuser && (params = params.set("cuser", cuser));
    // taskId && (params = params.set("taskId", taskId));
    // xaxis && (params = params.set("xaxis", xaxis));
    // yaxis && (params = params.set("yaxis", yaxis));
    return this.http.post<json>(this.taskaddUrl, formdata);

  }
  getUpload(recordId: string, data: Array<any>) {
    let formdata = new FormData();
    formdata.append("recordId", recordId);
    for (let i = 0; i < data.length; i++) {
      formdata.append(data[i].name, data[i])
    }

    return this.http.post<json>(this.uploadUrl, formdata);
  }
  getUpdate(recordId, mUser, title, abstracts, content, keys, dominatingFigure, occurTime, channelId,
    playTime, importance, isInterview, address, typeId, preAssignment, assignor, link, open) {

    let params = new HttpParams()


    params = params.set('recordId', recordId)
      .set('mUser', mUser)
      .set('title', title)
      .set('abstracts', abstracts)
      .set('content', content)
      .set('keys', keys)
      .set('dominatingFigure', dominatingFigure)
      .set('occurTime', occurTime)
      .set('playTime', playTime)
      .set('importance', importance)
      .set('isInterview', isInterview)
      .set('address', address)
      .set('assignor', assignor)
      .set('link', link)
      .set('open', open);

    channelId && (params = params.set("channelId", channelId));
    typeId && (params = params.set("typeId", typeId));
    preAssignment && (params = params.set("preAssignment", preAssignment));

    return this.http.post<json>(this.updateRecordUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }

  getAdd(mUser, title, abstracts, content, keys, dominatingFigure, occurTime, channelId,
    playTime, importance, isInterview, address, typeId, preAssignment, assignor, link, open) {
    const params = new HttpParams()
      .set('mUser', mUser)
      .set('title', title)
      .set('abstracts', abstracts || "")
      .set('content', content)
      .set('keys', keys || "")
      .set('dominatingFigure', dominatingFigure || "")
      .set('occurTime', occurTime)
      .set('channelId', channelId || "")
      .set('playTime', playTime || "")
      .set('importance', importance || "")
      .set('isInterview', isInterview)
      .set('address', address || "")
      .set('typeId', typeId || "")
      .set('preAssignment', preAssignment || "")
      .set('assignor', assignor || "")
      .set('link', link || "")
      .set('open', open)
    return this.http.post<json>(this.addUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }

  getSubmission(recordId, explain) {
    const params = new HttpParams()
      .set('recordId', recordId)
      .set('explain', explain)
    return this.http.post<json>(this.submissionUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getReject(recordId, explain) {
    const params = new HttpParams()
      .set('recordId', recordId)
      .set('explain', explain)
    return this.http.post<json>(this.rejectUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getAdopt(recordId, explain) {
    const params = new HttpParams()
      .set('recordId', recordId)
      .set('explain', explain)
    return this.http.post<json>(this.adoptUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getDeletebatch(arr: Array<number>) {
    return this.http.post<json>(this.deletebatchUrl, JSON.stringify(arr), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  getTypeall() {
    return this.http.get<json>(this.typeallUrl)
  }

  getUserall() {
    return this.http.get<json>(this.userallUrl)
  }
  getChannel() {
    return this.http.get<json>(this.getChannelUrl);
  }

  getAll(page: number, limit: number, search?: string, starttime?: number, endtime?: number, channelid?: number, status?: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    search && (params = params.set('search', search));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    channelid && (params = params.set('channelid', channelid.toString()));
    status && (params = params.set('status', status.toString()));
    return this.http.get<json>(this.allUrl, { params });
  }
  getInfo(recordId: number) {
    let params = new HttpParams().set("recordId", recordId.toString());
    return this.http.get<json>(this.infoUrl, { params });
  }
  getOwnlist(page: number, limit: number, search?: string, starttime?: number, endtime?: number, channelid?: number, status?: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    search && (params = params.set('search', search));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    channelid && (params = params.set('channelid', channelid.toString()));
    status && (params = params.set('status', status.toString()));
    return this.http.get<json>(this.ownlistUrl, { params });
  }
  getWaitlist(page: number, limit: number, search?: string, starttime?: number, endtime?: number, occurstarttime?: number, occurendtime?: number, cuser?: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    search && (params = params.set('search', search));
    starttime && (params = params.set('starttime', starttime.toString()));
    endtime && (params = params.set('endtime', endtime.toString()));
    occurstarttime && (params = params.set('occurstarttime', occurstarttime.toString()));
    occurendtime && (params = params.set('occurendtime', occurendtime.toString()));
    cuser && (params = params.set('cuser', cuser.toString()));
    return this.http.get<json>(this.waitlistUrl, { params });
  }




}
