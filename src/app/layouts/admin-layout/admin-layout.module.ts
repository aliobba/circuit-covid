import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AjoutchefserviceComponent } from '../../pages/ajoutchefservice/ajoutchefservice.component';
import { FichepatientComponent } from '../../pages/fichepatient/fichepatient.component';
import { AjoutsurveyComponent } from '../../pages/ajoutsurvey/ajoutsurvey.component';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ListepatientComponent} from '../../pages/listepatient/listepatient.component';
import {ListenoncontacterComponent} from '../../pages/listenoncontacter/listenoncontacter.component';
import {RegisterComponent} from '../../pages/register/register.component';

import { ListallpatientComponent } from '../../pages/listallpatient/listallpatient.component';
import { ListalldocComponent } from '../../pages/listalldoc/listalldoc.component';
import { ListallresComponent } from '../../pages/listallres/listallres.component';
import { ListallinternComponent } from '../../pages/listallintern/listallintern.component';
import { ManageprofilComponent } from '../../pages/manageprofil/manageprofil.component';


import { DoctorComponent } from '../../pages/doctor/doctor.component';
import { AjoutpatientComponent } from '../../pages/ajoutpatient/ajoutpatient.component';
import {NgpSortModule} from 'ngp-sort-pipe';
import {UpdatepatientComponent} from '../../pages/updatepatient/updatepatient.component';
import {AjoutresinterComponent} from '../../pages/ajoutresinter/ajoutresinter.component';
import {AjoutadminhopComponent} from '../../pages/ajoutadminhop/ajoutadminhop.component';
import {ListhopComponent} from '../../pages/listhop/listhop.component';
import {SortableDirective} from '../../directive/sortable.directive';
import {DocbyhopComponent} from '../../pages/docbyhop/docbyhop.component';
import {PatientbyhopComponent} from '../../pages/patientbyhop/patientbyhop.component';
import {DssbAdminComponent} from '../../pages/dssb-admin/dssb-admin.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgpSortModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    ListepatientComponent,
    ListenoncontacterComponent, RegisterComponent, DoctorComponent, AjoutpatientComponent, ManageprofilComponent,
    AjoutsurveyComponent , AjoutchefserviceComponent , FichepatientComponent,   UpdatepatientComponent,
    ListallpatientComponent,
    ListalldocComponent,
    ListallresComponent,
    ListallinternComponent, AjoutresinterComponent, AjoutadminhopComponent, ListhopComponent,
    DocbyhopComponent,
    PatientbyhopComponent, DssbAdminComponent




  ]
})

export class AdminLayoutModule {}
