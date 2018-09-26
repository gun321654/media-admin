import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { XtService } from '../../../../services/xt.service';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

import { NzNotificationService } from 'ng-zorro-antd';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface his {
  historyId: number;
  historyExplain: string;
  cUser: Array<any>
}
interface tasks {
  taskTitle: string;
  aUsers: Array<any>
}

// import * as moment from 'moment';
// import { pipe } from 'rxjs';


@Component({
  selector: 'app-wdxt',
  templateUrl: './wdxt.component.html',
  styleUrls: ['./wdxt.component.css']
})
export class wdxtComponent implements OnInit {
  //数据
  all: Array<any> = [];
  channel: Array<any> = []; //
  userall: Array<any> = [];
  typeall: Array<any> = [];
  getUserall() {
    this.XtService.getUserall().subscribe((json) => {
      console.log("userall", json);
      //userId  name
      this.userall = json.result.map(item => ({
        label: item.name,
        value: item.userId,
        checked: false
      }));


      this.form.controls.assignor.setValue(this.userall);
      console.log(" this.userall ", this.userall);
    })
  }
  // loading: boolean = false;

  //搜索所用数据
  searchText: string = "";
  startTime: number;
  endTime: number;
  searchStatus: number;
  searchChannelid: number;
  pageIndex: number = 1;
  limit: number = 10;
  total: number = 0;

  //按钮状态
  allChecked: boolean = false;
  indeterminate: boolean = false;
  disabledButton: boolean = true;
  checkedNumber: number = 0;

  // 通过过审核数据
  tplModal: NzModalRef;
  examineText: string = "你好";
  @ViewChild("tplContent") private tplContent: TemplateRef<{}>;
  @ViewChild("details") private details: TemplateRef<{}>;



  //添加选题数据
  @ViewChild("file") private fileEl: ElementRef;
  fileList: Array<any> = [];
  recordId: number = null;
  form: FormGroup;
  addVisible: boolean = false;
  typeId: number;

  fileChange(ev: any) {
    console.log("files", ev.target);
    this.fileList.push(...ev.target.files);
    ev.target.value = "";

    // console.log(this.fileList);
  }
  addChange() {
    // console.log(this.fileEl.nativeElement);
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    this.fileEl.nativeElement.dispatchEvent(event);
  }
  upload() {
    // this.XtService.
    this.XtService.getUpload(this.recordId.toString(), this.fileList).subscribe(json => {
      if (json.code === 0) {
        this.fileList = [];
        this.message.info(json.msg);
      } else {
        this.message.error(json.msg);
      }
    });
  }
  close(item) {
    this.fileList.splice(this.fileList.findIndex(data => data === item), 1);
  }
  add() {
    console.log("userall", this.userall)
    this.addVisible = true;
  }
  addCancel() {
    this.addVisible = false;
    this.resetForm();
  }
  resetForm() {
    // e.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
    this.userall = this.userall.map(item => ({
      label: item.label,
      value: item.value,
      checked: false
    }))
    this.form.controls.assignor.setValue(this.userall);
    this.recordId = null;
    this.fileList = [];
    console.log("333", this.form.controls.assignor.value);
  }

  checkChange(data) {
    console.log(data);
  }


  editFrom(json) {
    const assignor = this.form.controls.assignor.value.map(item => {
      const index = json.result.aUser.findIndex(data => data.userId === item.value)
      if (index === -1) {
        return {
          value: item.value,
          label: item.label,
          checked: false
        }
      } else {
        return {
          value: item.value,
          label: item.label,
          checked: true
        }
      }
    });
    this.form = this.fb.group({
      mUser: [json.result.mUser.userId, [Validators.required]],
      title: [json.result.recordTitle],
      abstracts: [json.result.recordAbstracts],
      content: [json.result.recordContent, Validators.required],
      keys: [json.result.recordKeys],
      dominatingFigure: [json.result.recordDominatingfigure],
      occurTime: [json.result.recordOccurtime ? new Date(json.result.recordOccurtime) : "", Validators.required],
      channelId: [json.result.channel.channelId],
      playTime: [json.result.recordPlaytime ? new Date(json.result.recordPlaytime) : ""],
      importance: [json.result.recordImportance ? json.result.recordImportance.toString() : json.result.recordImportance],
      isInterview: [Boolean(json.result.recordIsinterview)],
      address: [json.result.recordAddress],
      typeId: [json.result.type.typeId],
      preAssignment: [json.result.recordPreassignment ? json.result.recordPreassignment.toString() : json.result.recordPreassignment],
      assignor: [assignor],
      // assignor: [],
      link: [json.result.recordLink],
      open: [Boolean(json.result.recordOpen)],
    });
  }
  edit(recordId) {
    this.recordId = recordId;
    this.XtService.getInfo(recordId).subscribe(json => {
      console.log("info", json);
      this.editFrom(json);
    });
    this.addVisible = true;
  }
  submitForm() {
    console.log("recordId", this.recordId);
    // console.log(this.form.controls.preAssignment.value);
    let params = [];
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
      if (i === "occurTime") {
        params.push(this.datePipe.transform(this.form.controls[i].value, 'yyyy-MM-dd'));
      } else if (i === "playTime") {
        this.form.controls[i].value ? params.push(this.datePipe.transform(this.form.controls[i].value, 'yyyy-MM-dd HH:mm:ss')) : params.push(this.form.controls[i].value);
      } else if (i === "isInterview") {
        params.push(Number(this.form.controls[i].value));
      } else if (i === "open") {
        params.push(Number(this.form.controls[i].value));
      } else if (i === "assignor") {
        let arr = [];
        this.form.controls[i].value.forEach(item => {
          if (item.checked === true) {
            arr.push(item.value);
          }
        })
        params.push(arr.toString());
      } else {
        params.push(this.form.controls[i].value);
      }
    }
    // console.log("getRawValue", this.form.getRawValue());
    if (this.form.valid) {
      // console.log(1)
      if (this.recordId) {
        console.log(1)

        //@ts-ignore
        this.XtService.getUpdate(this.recordId, ...params).subscribe(json => {
          if (json.code === 0) {
            this.message.info(json.msg);
            // this.recordId = json.recordId;
          } else {
            this.message.error(json.msg);
          }
        });

      } else {
        console.log(2)
        //@ts-ignore
        this.XtService.getAdd(...params).subscribe(json => {
          if (json.code === 0) {
            this.getData();
            this.message.info(json.msg);
            this.recordId = json.recordId;
          } else {
            this.message.error(json.msg);
          }
        });

      }

    }
  }
  //指派任务
  @ViewChild("taskfile") taskFileEl: ElementRef;
  taskFile: Array<any> = [];
  taskVisible: boolean = false;
  taskForm: FormGroup;
  closeTaskfile(item) {
    this.taskFile.splice(this.taskFile.findIndex(data => data === item), 1);
  }
  addTaskChange() {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    this.taskFileEl.nativeElement.dispatchEvent(event);
  }
  taskFileChange(ev: any) {
      this.taskFile.push(...ev.target.files);ev.target.value = "";
  }
  createTaskform(json) {
    const musers = this.userall.map(item => {
      const index = json.result.aUser.findIndex(data => data.userId === item.value)
      if (index === -1) {
        return {
          value: item.value,
          label: item.label,
          checked: false
        }
      } else {
        return {
          value: item.value,
          label: item.label,
          checked: true
        }
      }
    });
    this.taskForm = this.fb.group({
      recordId: [json.result.recordId, Validators.required],
      title: [json.result.recordTitle, Validators.required],
      musers: [musers, Validators.required],
      address: [json.result.recordAddress, Validators.required],
      content: [json.result.recordContent, Validators.required],
      open: [Boolean(json.result.recordOpen)],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      channelId: [json.result.recordChannelid, Validators.required]
    });



  }
  create(recordId) {
    console.log("指派", recordId);
    this.XtService.getInfo(recordId).subscribe(json => {
      this.createTaskform(json);
    })
    this.taskVisible = true;
  }
  taskSub() {
    console.log("taskForm", this.taskForm.getRawValue());
    let params = [];
    for (const i in this.taskForm.controls) {

      this.taskForm.controls[i].markAsDirty();
      this.taskForm.controls[i].updateValueAndValidity();
      if (i === "starttime") {
        params.push(this.datePipe.transform(this.taskForm.controls[i].value, 'yyyy-MM-dd HH:mm:ss'));
      } else if (i === "endtime") {
        params.push(this.datePipe.transform(this.taskForm.controls[i].value, 'yyyy-MM-dd HH:mm:ss'));
      } else if (i === "musers") {
        let arr = [];
        this.taskForm.controls[i].value.forEach(item => {
          if (item.checked === true) {
            arr.push(item.value);
          }
        })
        params.push(arr.toString());
      } else if (i === "open") {
        params.push(Number(this.form.controls[i].value));
      } else {
        params.push(this.taskForm.controls[i].value);
      }
    }
    console.log("params", params);


    if (this.taskForm.valid) {
      //@ts-ignore
      this.XtService.getTaskadd(this.taskFile, ...params).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.taskClose();
        } else {
          this.message.error(json.msg);
        }
      })
    }

  }
  taskClose() {
    this.taskFile = [];
    this.taskForm.reset();
    this.taskVisible = false;
    this.userall = this.userall.map(item => ({
      label: item.label,
      value: item.value,
      checked: false
    }));
    this.taskForm.controls.musers.setValue(this.userall);
  }




  constructor(private notification: NzNotificationService, private message: NzMessageService, private datePipe: DatePipe, private fb: FormBuilder, private XtService: XtService, private modalService: NzModalService) {
    this.taskForm = fb.group({
      recordId: [null, Validators.required],
      title: [null, Validators.required],
      musers: [[], Validators.required],
      address: [null, Validators.required],
      content: [null, Validators.required],
      open: [true],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      channelId: [null, Validators.required]
    })

    this.form = fb.group({
      mUser: [null, Validators.required],
      title: ["", Validators.required],
      abstracts: [""],
      content: ["", Validators.required],
      keys: [""],
      dominatingFigure: [""],
      occurTime: ["", Validators.required],
      channelId: [""],
      playTime: [""],
      importance: [""],
      isInterview: [true],
      address: [""],
      typeId: [""],
      preAssignment: [""],
      assignor: [],
      link: [""],
      open: [true],
    });
  }

  refreshStatus(): void {
    const allChecked = this.all.every(value => value.checked === true);
    const allUnChecked = this.all.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.all.some(value => value.checked);
    this.checkedNumber = this.all.filter(value => value.checked).length;

  }

  checkAll(value: boolean): void {
    this.all.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  del() {
    const arr = this.all.filter(data => data.checked === true).map(data => data.recordId);
    this.modalService.create({
      nzTitle: '警告',
      nzContent: "删除此选题会将此选题下面所有任务一并删除",
      nzClosable: false,
      nzOnOk: () => this.XtService.getDeletebatch(arr).subscribe(json => {
        if (json.code === 0) {
          this.getData();
        } else {
          this.message.error(json.msg);
        }
      })
    });


  }
  getReject(recordId: number) {
    this.examineText = "";
    this.tplModal = this.modalService.create({
      nzTitle: '输入过审留言',
      nzContent: this.tplContent,
      nzClosable: false,
      nzOnOk: () => this.XtService.getReject(recordId, this.examineText).subscribe(json => {
        if (json.code === 0) {
          this.all.find(data => data.recordId === recordId).recordStatus = 4;
          console.log(this.all);
        }
      })
    });
  }

  getAdopt(recordId: number) {
    this.examineText = "";
    this.tplModal = this.modalService.create({
      nzTitle: '输入过审留言',
      nzContent: this.tplContent,
      nzClosable: false,
      nzOnOk: () => this.XtService.getAdopt(recordId, this.examineText).subscribe(json => {
        if (json.code === 0) {
          this.all.find(data => data.recordId === recordId).recordStatus = 3;
          console.log(this.all);
        }
      })
    });
  }

  getSubmission(recordId: number) {
    this.examineText = "";
    this.tplModal = this.modalService.create({
      nzTitle: '输入留言',
      nzContent: this.tplContent,
      nzClosable: false,
      nzOnOk: () => this.XtService.getSubmission(recordId, this.examineText).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.all.find(data => data.recordId === recordId).recordStatus = 2;
          console.log(this.all);
        } else {
          this.message.error(json.msg);
        }
      })
    });
  }




  getData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    let startTime = null;
    let endTime = null;
    if (this.searchTime.length) {
      startTime = this.datePipe.transform(this.searchTime[0].getTime(), 'yyyy-MM-dd');
      endTime = this.datePipe.transform(this.searchTime[1].getTime(), 'yyyy-MM-dd');

    }


    setTimeout(() => {
      this.XtService.getOwnlist(this.pageIndex, this.limit, this.searchText, startTime, endTime, this.searchChannelid, this.searchStatus).subscribe((json) => {
        console.log("all", json);
        this.total = json.result.totalCount;
        this.all = json.result.list;
        this.refreshStatus();
      });
    });
  }


  getChannel() {
    this.XtService.getChannel().subscribe((json) => {
      console.log("channel", json)
      this.channel = json.result;
    })
  }

  getTypeall() {
    this.XtService.getTypeall().subscribe((json) => {
      console.log("typeall", json)
      this.typeall = json.result;
    })
  }



  //详情
  state: boolean = false;
  detailVisible: boolean = false;
  tasks: Array<tasks> = [];
  his: Array<his> = [];
  read(recordId) {

    this.recordId = recordId;
    this.XtService.getInfo(recordId).subscribe(json => {
      console.log("json.result.recordStatus", json.result.recordStatus)
      if (json.result.recordStatus !== 1 && json.result.recordStatus !== 4) {
        this.state = true;
      }

      this.tasks = json.result.tasks;
      this.his = json.result.historys;
      console.log(" this.tasks", this.tasks);
      console.log(" this.his", this.his);
      // this.createTaskform(json);
      this.editFrom(json);
      // this.form.controls.title.disable

      // this.form.controls.mUser.set
      this.detailVisible = true;
    });

  }
  readClose() {

    this.state = false;
    this.detailVisible = false;
    this.resetForm();
  }
  asd(data) {
    console.log("asd", data);
    return data.taskTitle;
  }
  searchTime: Array<any> = [];
  ngOnInit() {
    this.getTypeall();
    this.getChannel();
    this.getUserall();
    this.getData(true);
  }

}