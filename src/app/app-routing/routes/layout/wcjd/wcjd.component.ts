import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CfService } from '../../../../services/cf.service';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XtService } from './../../../../services/xt.service';
import { MzkService } from './../../../../services/mzk.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
@Component({
  selector: 'app-wcjd',
  templateUrl: './wcjd.component.html',
  styleUrls: ['./wcjd.component.css']
})
export class WcjdComponent implements OnInit {
  data: Array<any> = [];
  pageIndex: number = 1;
  limit: number = 6;
  status: string; //
  searchTime: Array<any>;
  // starttime
  // endtime: number;
  title: string = "";
  total: number = 0;
  getData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    setTimeout(() => {
      let starttime = null;
      let endtime = null;
      if (this.searchTime) {
        starttime = this.datePipe.transform(this.searchTime[0], 'yyyy-MM-dd HH:mm:ss')
        endtime = this.datePipe.transform(this.searchTime[1], 'yyyy-MM-dd HH:mm:ss')
      }
      this.CfService.getTaskgetestablish(this.pageIndex, this.limit, this.status, starttime, endtime, this.title).subscribe((json) => {
        console.log("data", json);
        if (json.code === 0) {
          this.total = json.result.totalCount;
          this.data = json.result.list;
        } else {
          this.message.error(json.msg);
        }
      });
    });
  }
  searchReset() {
    this.searchTime = undefined;
    this.status = "";
    this.title = "";
  }

  del(item) {

    this.modalService.create({
      nzTitle: '提示',
      nzContent: "确认要删除吗",
      nzClosable: false,
      nzOnOk: () => this.CfService.getDel(item.taskId).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.getData();
        } else {
          this.message.error(json.msg);
        }
      })
    });

  }
  //认领  0、未完成1、未认领2、已完成
  getTaskclaim(data) {
    this.CfService.getTaskclaim(data.taskId).subscribe(json => {
      if (json.code === 0) {
        data.status = 0;
        this.message.info(json.msg);
      } else {
        this.message.error(json.msg);
      }
    })
  }

  getTaskfinish(data) {
    this.CfService.getTaskfinish(data.taskId, "").subscribe(json => {
      if (json.code === 0) {
        data.status = 2;
        this.message.info(json.msg);
      } else {
        this.message.error(json.msg);
      }
    })
  }


  //展示素材
  resourcesShow: boolean = false;
  resources: Array<any> = [];
  taskId: number = null;
  taskText: string = "";
  show(item) {
    // console.log("item", item);
    this.taskId = item.taskId;
    this.resources = item.resources;
    this.resourcesShow = true;

  }
  hide() {
    this.taskFile = [];
    this.taskId = null;
    this.taskText = "";
    this.resources = [];
    this.resourcesShow = false;
    this.error = "";
  }

  //上传素材
  @ViewChild("taskfile") taskFileEl: ElementRef;
  error: string = "";
  taskFile: Array<any> = [];
  closeTaskfile(item) {
    this.taskFile.splice(this.taskFile.findIndex(data => data === item), 1);
  }
  addTaskChange() {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    this.taskFileEl.nativeElement.dispatchEvent(event);
  }
  taskFileChange(ev: any) {
    this.taskFile.push(...ev.target.files); ev.target.value = "";
  }





  //查看详情
  detailVisible: boolean = false;
  detail: any = {};
  his: Array<any> = [];
  detailClose() {
    this.imgs = [];
    this.detail = {};
    this.detailVisible = false;
  }
  showDetail(item) {
    console.log(item);
    this.getMzkImg(item);

    this.CfService.getTaskinfo(item.taskId).subscribe(json => {
      console.log("detail", json);
      if (json.code === 0) {
        this.getMzkImg(json.result);
        this.detail = json.result;
        this.detailVisible = true;
        this.resources = json.result.resources;
        this.his = json.result.historys;
      } else {
        this.message.error(json.msg);
      }
    })
  }

  getTaskexeaute() {
    if (this.taskText === "") {
      this.error = "请填写留言";
    } else {
      this.error = "";
      this.CfService.getTaskexeaute(this.taskFile, this.taskId, this.taskText).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.CfService.getTaskinfo(this.taskId).subscribe(json => {
            console.log("info", json)
            if (json.code === 0) {
              this.data[this.data.findIndex(item => item.taskId === this.taskId)] = json.result;
              this.taskText = "";
              this.taskId = json.result.taskId;
              this.resources = json.result.resources;
              this.taskFile = [];


            } else {
              this.message.error(json.msg);
            }
          })
        } else {
          this.message.error(json.msg);
        }
      })
    }
  }
  getAddtask() {
    const mediaids = this.needFile.map(item => item.id).toString();
    mediaids && this.XtService.getAddtask(this.taskId, mediaids).subscribe(json => {
      if (json.code === 0) {
        this.mzkFile = this.mzkFile.map(item => (item.checked = false, item));
        this.message.info(json.msg);
        this.needFile = [];
        this.getData();
      } else {
        this.message.error(json.msg);
      }
    });
  }


  @ViewChild("examine") private examine: TemplateRef<{}>;
  examineModal: NzModalRef;
  examineText: string = "";
  getTaskagreefinish(taskId: number) {
    this.examineText = "";
    this.examineModal = this.modalService.create({
      nzTitle: '输入同意完成任务留言',
      nzContent: this.examine,
      nzClosable: false,
      nzOnOk: () => this.CfService.getTaskagreefinish(taskId, this.examineText).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.data.find(data => data.taskId === taskId).recordStatus = 3;
          console.log(this.data);
        } else {
          this.message.error(json.msg);
        }
      })
    });
  }
  getTaskrefusefinish(taskId: number) {
    this.examineText = "";
    this.examineModal = this.modalService.create({
      nzTitle: '输入拒绝完成任务留言',
      nzContent: this.examine,
      nzClosable: false,
      nzOnOk: () => this.CfService.getTaskrefusefinish(taskId, this.examineText).subscribe(json => {
        if (json.code === 0) {
          this.message.info(json.msg);
          this.data.find(data => data.taskId === taskId).recordStatus = 4;
          console.log(this.data);
        } else {
          this.message.error(json.msg);
        }
      })
    });
  }

  //修改任务

  // <nz-modal nzWidth="950" [nzStyle]="{ top: '20px',right:'20px' }" [(nzVisible)]="editVisible" nzTitle="修改任务" (nzOnOk)="editSub()"
  // (nzOnCancel)="editClose()"></nz-modal>

  editVisible: boolean = false;
  form: FormGroup;
  editSub() {
    const musers = this.form.controls.musers.value.filter(data => data.checked === true).map(data => data.value);
    this.CfService.getTaskedit(
      this.form.controls.taskId.value,
      this.form.controls.recordId.value,
      this.form.controls.title.value,
      musers,
      this.form.controls.address.value,
      this.form.controls.content.value,
      Number(this.form.controls.open.value),
      this.datePipe.transform(this.form.controls.starttime.value, 'yyyy-MM-dd HH:mm:ss'),
      this.datePipe.transform(this.form.controls.endtime.value, 'yyyy-MM-dd HH:mm:ss'),
      this.form.controls.channelId.value,
    ).subscribe(json => {
      console.log("提交编辑", json);
      if (json.code === 0) {
        this.editClose();
        this.getData();
        this.message.info(json.msg);
      } else {
        this.message.error(json.msg);
      }
    })

  }
  editClose() {
    this.editVisible = false;
    this.taskId = null;
    this.form.reset();
  }
  userList: Array<any> = [];
  getUserall() {
    this.XtService.getUserall().subscribe(json => {
      console.log("userList", json)
      if (json.code === 0) {
        this.userList = json.result;
      } else {
        this.message.error(json.msg);
      }
    })
  }
  channel: Array<any> = [];
  getChannel() {
    this.XtService.getChannel().subscribe((json) => {
      console.log("channel", json)
      this.channel = json.result;
    })
  }





  editTask(item) {
    this.taskId = item.taskId;
    this.CfService.getTaskinfo(item.taskId).subscribe(json => {
      console.log("detail", json);
      if (json.code === 0) {
        //getUserall
        this.detail = json.result;
        this.form.controls.taskId.setValue(json.result.taskId)
        this.form.controls.recordId.setValue(json.result.record.recordId)
        this.form.controls.title.setValue(json.result.taskTitle)
        this.form.controls.content.setValue(json.result.taskContent)
        this.form.controls.address.setValue(json.result.taskAddress)
        this.form.controls.open.setValue(Boolean(json.result.taskOpen))
        this.form.controls.starttime.setValue(new Date(json.result.taskStarttime))
        this.form.controls.endtime.setValue(new Date(json.result.taskEndtime))
        this.form.controls.channelId.setValue(json.result.channel.channelId)


        const musers = this.userList.map(item => {
          const index = json.result.aUsers.findIndex(data => data.userId === item.userId)
          if (index === -1) {
            return {
              value: item.userId,
              label: item.name,
              checked: false
            }
          } else {
            return {
              value: item.userId,
              label: item.name,
              checked: true
            }
          }
        });

        // json.result.aUsers.map(item => ({
        //   value: item.userId,
        //   label: item.name,
        //   checked: true
        // }));

        this.form.controls.musers.setValue(musers)
        this.editVisible = true;

      } else {
        this.message.error(json.msg);
      }
    })

  }
  down(item) {
    console.log(item);
    this.resources = item.resources;
    this.downVisible = true;
    this.taskId = item.taskId;

  }
  downVisible: boolean = false;
  downClose() {
    this.resources = [];
    this.downVisible = false;
    this.taskId = null;
    this.error = "";
  }


  downFile() {
    const arr = this.medium.filter(data => data.checked === true).map(data => data.value);
    if (arr.length === 0) {
      this.error = "请选择渠道";
    } else {
      this.error = "";
      this.CfService.getTaskmonitor(this.taskId, arr).subscribe(json => {
        console.log(json);
        console.log(this.fileUrl);

        // for (let index = 0; index < this.fileUrl.length; index++) {
        //   download(this.fileUrl[index].name, this.fileUrl[index].url);
        // }
        this.fileUrl.map(item => {
          var save_link: HTMLAnchorElement
          save_link = document.createElement('a');
          save_link.href = item.url;
          save_link.download = item.name;
          console.log(save_link);
          var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        });
        setTimeout(() => {
          this.fileUrl = [];
        });

      })
    }
  }
  medium: Array<any> = [];
  getMedium() {
    this.CfService.getMedium().subscribe((json) => {
      console.log("Medium", json)
      this.medium = json.result.map(item => ({
        value: item.id,
        label: item.value,
        checked: false
      }));
    })
  }
  fileUrl: Array<any> = [];
  changedown(data) {
    this.fileUrl = data
    // console.log(1213);
    console.log(data);
  }
  // <nz-modal [(nzVisible)]="downVisible" nzTitle="下载" (nzOnCancel)="downClose()" (nzOnOk)="downFile()">




  // resourceUrl

  resourceUrl: string = "";
  constructor(private ngxXml2jsonService: NgxXml2jsonService, private MzkService: MzkService, private XtService: XtService, private fb: FormBuilder, private modalService: NzModalService, private datePipe: DatePipe, private CfService: CfService, private message: NzMessageService) {
    this.form = fb.group({
      taskId: [null, Validators.required],
      recordId: [null, Validators.required],
      musers: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      address: [null, Validators.required],
      open: [null, Validators.required],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      channelId: [null, Validators.required],
    })


  }






  getMzkFolder(folder?: any) {
    folder && this.mzkFloor.push(folder);
    this.mzkFile = [];
    this.MzkService.getFolder("getfolders", this.apik, folder.folder_id)
      .subscribe(json => {
        console.log("mzkjson", json);
        //totalassetscount
        this.mzkFolder = json.DATA.map(item =>
          (json.COLUMNS.reduce((accumulator, currentValue, index) => ((accumulator[currentValue] = item[index]), accumulator), {}))
        );

        console.log("文件夹", this.mzkFolder);
      });
    folder.folder_id && this.getMzkFile(folder.folder_id);
  }
  getMzkFile(folderid?: string) {
    this.MzkService.getFolder("getassets", this.apik, folderid)
      .subscribe(json => {
        console.log("mzkjson", json);
        this.mzkFile = json.DATA.map(item =>
          (json.COLUMNS.reduce((accumulator, currentValue, index) => ((accumulator[currentValue] = item[index]), accumulator), { checked: false }))
        ).filter(item => item.totalassetscount !== 0);
        console.log("文件", this.mzkFile);
      });
  }
  getAddTask() {
    this.needFile = this.mzkFile.filter(item => item.checked === true).map(item => (item.checked = false, item));
    this.mzkClose();
  }

  fileType(item) {
    switch (item.kind) {
      case "vid": return item.local_url_thumb;
      case "aud": return "./assets/aud.png";
      case "img": return item.local_url_thumb;
      case "doc": return "./assets/doc.png";
      default: return "./assets/other.png";
    }
  }


  mzkUpload(ev) {
    console.log(ev.target.files);
    (ev.target.files.length > 0) && this.MzkService.getMzkUpload("c.apiupload", this.apik, this.mzkFloor[this.mzkFloor.length - 1].folder_id, ev.target.files[0]).subscribe(text => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const json: any = this.ngxXml2jsonService.xmlToJson(xml);
      console.log("xml to json", json);
      if (json.Response.responsecode === "0") {
        this.message.info("处理成功");
        this.getMzkFile(this.mzkFloor[this.mzkFloor.length - 1].folder_id);
      } else {
        this.message.error(json.Response.message);
      }
    });
  }

  goFloor(folder, i) {
    this.mzkFloor.splice(i, this.mzkFloor.length);
    this.getMzkFolder(folder);
  }
  mzkLoading: boolean = false;
  getMzkImg(item) {
    const data = item.resources.map(item => item.mediaId).toString();
    data && (this.mzkLoading = true) && this.MzkService.getMzkImg("searchassets", this.apik, data).subscribe(json => {
      const imgdata = json.DATA.map(item =>
        (json.COLUMNS.reduce((accumulator, currentValue, index) => ((accumulator[currentValue] = item[index]), accumulator), { checked: false }))
      )
      console.log("imgdata", imgdata);
      this.imgs = imgdata;
      this.mzkLoading = false;
    });
    //  ids:(1,2,3,4,5)
  }

  // getMzkAllImg(data) {
  //   const length = data.map(item => item.resources.length);
  //   const 
  // }

  imgs: Array<any> = [];
  mzkFile: Array<any> = [];
  mzkFolder: Array<any> = [];
  mzkFloor: Array<any> = [];
  mzkVisible: boolean = false;
  selectFile: Array<any> = [];
  needFile: Array<any> = [];

  mzkClose() {
    this.mzkVisible = false;
  }
  mzkOpen() {
    this.mzkFloor = [];
    this.getMzkFolder({ folder_name: "全部", folder_id: null });
    this.mzkVisible = true;
  }

















  ngOnInit() {
    this.getChannel();
    this.getUserall();
    this.getMedium();
    this.CfService.getConfig().subscribe(json => {
      this.resourceUrl = json.resourceUrl;

    })
    this.getData();
    this.getApik();
  }

  apik: string = "";
  getApik() {
    this.XtService.getApik().subscribe(json => {
      console.log("apik", json);
      this.apik = json.result;
    })
  }
  pp(data) {
    return data.map(item => (item.name + " ")).toString();
  }

  msg(item) {
    this.CfService.getMsg(item.taskId).subscribe(json => {
      if (json.code === 0) {
        this.message.info("通知已发送");
      } else {
        this.message.info("通知已发送");
      }
    })
  }

  caozuo(content) {
    this.modalService.create({
      nzTitle: null,
      nzContent: content,
      nzClosable: true,
      nzFooter: null
    });
  }


  previewData: any;
  @ViewChild("preview") private preview: TemplateRef<{}>;
  look(data) {
    this.previewData = data;
    this.modalService.create({
      nzTitle: null,
      nzContent: this.preview,
      nzClosable: true,
      nzFooter: null,
      nzOnCancel: () => (this.previewData = null)
    });
  }



  isSpinning: boolean = false;
  removeFile() {
    this.needFile = this.needFile.filter(item => item.checked === false);
    const file2 = this.imgs.filter(item => item.checked === true).map(item => item.id).toString();
    file2 && this.MzkService.getDelTaskmz(this.taskId, file2).subscribe(json => {
      console.log(json);
      if (json.code === 0) {
        this.getData();
        this.imgs = this.imgs.filter(item => item.checked === false);
        this.message.info(json.msg);
      } else {
        this.message.error(json.msg);
      }
    });
  }



  mzkFileName: string = "";
  radioValue: string = "all";
  tabchange(e) {
    console.log("e", e);
    this.mzkFile = [];
    this.mzkFloor = [];
    if (e === 0) {
      this.getMzkFolder({ folder_name: "全部", folder_id: null });
    }
  }
  getMzkSearch() {
    this.isSpinning = true;
    this.mzkFile = [];
    const mzkFileName = this.mzkFileName === encodeURIComponent(this.mzkFileName) ? this.mzkFileName + "*" : encodeURIComponent(this.mzkFileName);
    console.log(mzkFileName);
    this.MzkService.getMzkSearch("searchassets", this.apik, mzkFileName, this.radioValue).subscribe(json => {
      this.isSpinning = false;
      if (json.COLUMNS[0] === "id" && json.DATA.length !== 0) {
        this.mzkFile = json.DATA.map(item =>
          (json.COLUMNS.reduce((accumulator, currentValue, index) => ((accumulator[currentValue] = item[index]), accumulator), { checked: false }))
        ).filter(item => item.totalassetscount !== 0);
      } else {
        this.message.info("没有该文件");
      }
      console.log(json);
    })
  }
}