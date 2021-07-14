import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roles/roles.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  constructor(public roleService : RoleService) { }

  moduleList=[];
  moduleSelected;
  userName;
  HighlightUserRoles:any;
  showForm:any;
  Sidenav:any;

  settings = {
    text: "Select ",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 1,
    enableSearchFilter: true,
    singleSelection:true
  };

  ngOnInit() {
    this.getRoles();
  }

  onItemSelect() {

  }
  OnItemDeSelect() {

  }
  onSelectAll() {

  }
  onDeSelectAll() {

  }
  ItemsSelect() {

  }

  ItemsDeSelect() {

  }

  getRoles(){
    this.roleService.getRoles().then(data=>{
    let List =[];
    console.log("data",data);
    List = data.Module;
    List.map((item)=>{
      this.moduleList.push({id:item.moduleId,itemName:item.privilageName,data:item});
    })
    })
  }

  save(){
    let mapData = {
      "roleName":this.userName,
      "module":this.moduleSelected[0].data
    }
    console.log("mapData",mapData,this.moduleSelected);
    this.roleService.saveModuleToUser(mapData).then(data=>{
      if(data.responseStatus == true){
        console.log(data);
      }else{
        console.log(data);
      }   
    })
  }
}
