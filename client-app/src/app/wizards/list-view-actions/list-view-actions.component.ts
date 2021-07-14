import { OnInit, Component, Input, Output } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "list-view-actions",
  templateUrl: "./list-view-actions.component.html",
  styleUrls: ["./list-view-actions.component.scss"],
  inputs: ["actions", "rowData"],
})
export class ListViewActionItemsComponent implements OnInit {
  constructor(public _openCard: OpencardsService) {}
  @Input()
  actions: any;
  rowData: any;

  @Output()
  isRead = false;
  isNavigate = false;
  isTrash = false;
  isEdit = false;
  isUpload = false;
  isDownload = false;
  isCreate = false;

  CISFormDownloadList: any = [];
  isDataReady = false;
  isReadPromptOpen = false;
  CISFormDowloadActions = "D";
  isDownloadPromptOpen = false;
  isDownloadBtnDisable = false;
  currentModule = "download";
  infoText = "";

  readBtnLabel = "Read";
  navigateBtnLabel = "Navigate";
  trashBtnLabel = "Trash";
  editBtnLabel = "Edit";
  downloadBtnLabel = "Download";
  uploadBtnLabel = "Upload";
  createBtnLabel = "Create";

  ngOnInit() {
    this.defineActionsForList();
  }

  defineActionsForList() {
    let splitedActions = this.actions.split("");
    return splitedActions.filter((item: any) => {
      switch (item) {
        case "R": //Read (open the records in prompt)
          this.isRead = true;
          break;
        case "N": //Navigate
          this.isNavigate = true;
          break;
        case "T": //Trash
          this.isTrash = true;
          break;
        case "E": //Edit
          this.isEdit = true;
          break;
        case "D": //Download
          this.isDownload = true;
          break;
        case "U": //Upload
          this.isUpload = true;
          break;
        case "C": //Create
          this.isCreate = true;
          break;
        default:
          break;
      }
    });
  }

  async onRead() {
    this.readBtnLabel = "Loading...";
    this.CISFormDownloadList = await this.getCISForm();
    this.isDataReady = true;
    this.isReadPromptOpen = true;
    this.readBtnLabel = "Read";
  }

  getCISForm() {
    return new Promise((resolve) => {
      let req = {
        baDocID: this.rowData["baDocID"],
        beginPagination: 1,
        endPagination: 100,
      };
      this._openCard.getCISForm(req).then((data: any) => {
        resolve(data.scannedDocumentList);
      });
    });
  }

  onDownload() {
    this.downloadBtnLabel = "Loading...";
    this.getCISFormDownload();
    this.downloadBtnLabel = "Download";
  }

  getCISFormDownload() {
    let timeStampValue = new Date().getTime();
    let filePath = environment.blob,
      fileDownloadHeaders = `${environment.SAS}&timestamp=${timeStampValue}`,
      downloadURL: string;
    // if (environment.name === 'live') filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/scanneddocumentfs/';
    // if (environment.name === 'prod') filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/stg-scanneddocumentfs/';
    // if (environment.name === 'dev') filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/dev-scanneddocumentfs/';
    // if (environment.name === 'pre-prod') filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/preprd-scanneddocumentfs/';
    downloadURL = `${filePath}${this.rowData["fileName"]}${fileDownloadHeaders}`;
    return window.open(downloadURL);
  }
}
