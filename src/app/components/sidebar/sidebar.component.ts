import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: string;

}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  roleuser: any;
  userstorage: string;
  rolecurr: string;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(localStorage);
    this.userstorage = localStorage.getItem('currentUser');
    this.roleuser  = JSON.stringify(JSON.parse(this.userstorage).user.role);
    console.log('avant', JSON.parse(this.userstorage).user.role);
    console.log('hani hné' , this.roleuser);

    this.rolecurr = JSON.parse(this.userstorage).user.role;

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }


}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'admin'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'doctor'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'chefService'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'télésuivi'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'Admin de l’hopital'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'Interne'},
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , role: 'Résident'},

  { path: '/addpatient', title: 'Ajout patient',  icon: 'ni-circle-08 text-pink', class: '' , role: 'doctor'},
  { path: '/addpatient', title: 'Ajout patient',  icon: 'ni-circle-08 text-pink', class: '' , role: 'chefService'},
  { path: '/addpatient', title: 'Ajout patient',  icon: 'ni-circle-08 text-pink', class: '' , role: 'Résident'},
  { path: '/addpatient', title: 'Ajout patient',  icon: 'ni-circle-08 text-pink', class: '' , role: 'Interne'},

  { path: '/addchef', title: 'Ajout chef service',  icon: 'ni-circle-08 text-pink', class: '' , role: 'Admin de l’hopital'},
  { path: '/addsurvey', title: 'Ajout télésuiveur',  icon: 'ni-circle-08 text-pink', class: '' , role: 'Admin de l’hopital'},




  { path: '/dssbadmin', title: 'Ajout dssb/admin',  icon: 'ni-circle-08 text-pink', class: '' , role: 'admin' },

  { path: '/adddoc', title: 'Ajout Docteur/Résident/Interne',  icon: 'ni-circle-08 text-pink', class: '' , role: 'chefService'},
  { path: '/addinres', title: 'Ajout Résident/Interne',  icon: 'ni-circle-08 text-info', class: '' , role: 'doctor'},


  { path: '/addadminhop', title: 'Ajout admin de l\'hôpital',  icon: 'ni-circle-08 text-orange', class: '' , role: 'admin' },


  { path: '/allpatient', title: 'Liste des patients',  icon: 'ni ni-bullet-list-67 text-pink', class: ''  , role : 'chefService' },
  { path: '/tables', title: 'Liste des patients par docteur',  icon: 'ni ni-bullet-list-67 text-pink', class: ''  , role : 'chefService' },

  { path: '/alldocbyhop', title: 'Liste des docteurs par hôpital ',  icon: 'ni ni-bullet-list-67 text-red', class: ''  , role : 'Admin de l’hopital' },
  { path: '/allpatient', title: 'Liste des patients',  icon: 'ni ni-bullet-list-67 text-pink', class: ''  , role : 'doctor' },
  { path: '/tables', title: 'Liste des patients par docteur',  icon: 'ni ni-bullet-list-67 text-pink', class: ''  , role : 'doctor' },

  { path: '/listhop', title: 'Liste des Hôpitaux ',  icon: 'ni ni-bullet-list-67 text-orange', class: ''  , role : 'admin' },

  { path: '/alldoc', title: 'Liste des Docteurs',  icon: 'ni ni-bullet-list-67 text-red', class: ''  , role : 'chefService' },
  { path: '/allres', title: 'Liste des Résidents ',  icon: 'ni ni-bullet-list-67 text-info', class: ''  , role : 'chefService' },
  { path: '/allres', title: 'Liste des Résidents par docteur',  icon: 'ni ni-bullet-list-67 text-info', class: ''  , role : 'doctor' },

  { path: '/allint', title: 'Liste des Internes',  icon: 'ni ni-bullet-list-67 text-info', class: ''  , role : 'chefService' },
  { path: '/allint', title: 'Liste des Internes par docteur',  icon: 'ni ni-bullet-list-67 text-info', class: ''  , role : 'doctor' },


  { path: '/listepatient', title: 'liste patients à contacter',  icon: 'ni ni-bullet-list-67 text-red', class: '', role : 'télésuivi'  },

  { path: '/listenoncontacter', title: 'liste contacté',  icon: 'ni ni-bullet-list-67 text-red', class: '', role : 'télésuivi'  },

];

