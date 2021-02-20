import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';

// @ts-ignore
@Component({
  selector: 'app-ajoutadminhop',
  templateUrl: './ajoutadminhop.component.html',
  styleUrls: ['./ajoutadminhop.component.css']
})
export class AjoutadminhopComponent  implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private doctorService:  DoctorService) {}

  gouvernerat = [ 'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];
  delegations = [ { list: ['Ariana Ville - أريانة المدينة', 'Soukra - سكرة', 'Raoued - روّاد', 'Kalaât El Andalous - قلعة الأندلس', 'Sidi Thabet - سيدي ثابت', 'Cité Ettadhamen - حي التضامن', 'El Mnihla - المنيهلة']}, { list : ['Béja Nord - باجة الشمالية', 'Béja Sud - باجة الجنوبية', 'Amdoun - عمدون', 'Nefza - نفزة', 'Teboursouk - تبرسق', 'Tibar - تيبار', 'Testour - تستور', 'Goubellat - قبلاط', 'Medjez El Bab - مجاز الباب']}, {list: ['Ben Arous - بن عروس', 'La Nouvelle Medina - المدينة الجديدة', 'El Mourouj - المروج', 'Hammam Lif - حمام الأنف', 'Hammam Chôtt - حمام الشط', 'Bou Mhel El Bassatine - بومهل البساتين', 'Ezzahra - الزهراء', 'Radès - رادس', 'Megrine - مقرين', 'Mohamedia - المحمدية', 'Fouchana - فوشانة', 'Mornag - مرناق']}, {list: ['Bizerte Nord - بنزرت الشمالية', 'Zarzouna - جرزونة', 'Bizerte Sud - بنزرت الجنوبية', 'Sedjnane - سجنان', 'Djoumine - جومين', 'Mateur - ماطر', 'Ghezala - غزالة', 'Menzel Bourguiba - منزل بورقيبة', 'Tinja - تينجة', 'Utique - أوتيك', 'Ghar El Meleh - غار الملح', 'Menzel Djemil - منزل جميل', 'El Alia - العالية', 'Ras Djebel - راس الجبل']}, {list: ['Gabes Medina - قابس المدينة', 'Gabes Ouest - قابس الغربية', 'Gabes Sud - قابس الجنوبية', 'Ghanouch - غنوش', 'El Metouia - المطوية', 'Menzel El Habib - منزل الحبيب', 'El Hamma - الحامة', 'Matmata - مطماطة', 'Nouvelle Matmata - مطماطة الجديدة', 'Mareth - مارث']}, {list: ['Gafsa Nord - قفصة الشمالية', 'Sidi Aïch - سيدي عيش', 'El Ksar - القصر', 'Gafsa Sud - قفصة الجنوبية', 'Oum El Araies - أم العرائس', 'Redeyef - الرديف', 'Metlaoui - المتلوي', 'Mdhila - المضيلة', 'EL Guetar - القطار', 'Belkhir - بلخير', 'Sned - السند']}, {list: ['Jendouba - جندوبة', 'Jendouba Nord - جندوبة الشمالية', 'Bou Salem - بوسالم', 'Tabarka - طبرقة', 'Ain Draham - عين دراهم', 'Fernana - فرنانة', 'Ghardimaou - غار الدماء', 'Oued Meliz - وادي مليز', 'Balta Bou Aouane - بلطة بوعوان']}, {list: ['Kairouan Nord - القيروان الشمالية', 'Kairouan Sud - القيروان الجنوبية', 'Echebika - الشبيكة', 'Sbikha - السبيخة', 'EL Ouslatia - الوسلاتية', 'Haffouz - حفوز', 'El Alâa - العلاء', 'Hajeb el Ayoun - حاجب العيون', 'Nasrallah - نصر الله', 'Echrarda - الشراردة', 'Bouhajla - بوحجلة']}, {list: ['Kasserine Nord - القصرين الشمالية', 'Kasserine Sud - القصرين الجنوبية', 'Ezzouhour - الزهور', 'Hassi Ferid - حاسي الفريد' , 'Sbeitla - سبيطلة', 'Sbiba - سبيبة', 'Djedeliane - جدليان', 'El Ayoun - العيون', 'Thala - تالة', 'Hidra - حيدرة', 'Foussana - فوسانة', 'Feriana - فريانة', 'Majel Bel Abbès - ماجل بالعباس']}, {list: ['Kebeli Nord - قبلي الشمالية', 'Kebili Sud - قبلي الجنوبية', 'Souk El Ahed - سوق الأحد', 'Douz Nord - دوز الشمالية', 'Douz Sud - دوز الجنوبية', 'Faouar - فوار']}, {list: ['kef Est - الكاف الشرقية', 'Kef Ouest - الكاف الغربية', 'Nebeur - نبر', 'Sakiet Sidi Youssef - ساقية سيدي يوسف', 'Tajerouine - تاجروين', 'Kalâat Snan - قلعة سنان', 'Kalâat Khasbah - القلعة الخصباء', 'Djerissa - الجريصة', 'El Ksour - القصور', 'Dahmani - الدهماني', 'Es-Sers - السرس']}, {list: ['Mahdia - المهدية', 'Bou Merdès - بومرداس', 'Ouled Chamekh - أولاد شامخ', 'Chorbane - شربان', 'Hebira - هبيرة', 'Essouassi - السواسي', 'El Djem - الجم', 'Chebba - الشابة', 'Melloulech - ملولش', 'Sidi Alouane - سيدي علوان', 'Ksour Essef - قصور الساف']}, {list: ['Mannouba - منوبة', 'Douar Hicher - دوار هيشر', 'Oued Ellil - وادي الليل', 'Mornaguia - المرناقية', 'Borj Amri - برج العامري', 'Djedeida - الجديدة', 'Tebourba - طبربة', 'El Battane - البطان']}, {list: ['Medenine Nord - مدنين الشمالية', 'Medenine Sud - مدنين الجنوبية', 'Beni Khedech - بني خداش', 'Ben Guerdane - بنقردان', 'Zarzis - جرجيس', 'Djerba Houmet Souk - جربة حومة السوق', 'Djerba Midoun - جربة ميدون', 'Djerba Ajim - جربة أجيم', 'Sidi Makhloulf - سيدي مخلوف']}, {list: ['Monastir - المنستير', 'Ouerdanine - الوردانين', 'Sahline - الساحلين', 'Zermadine - زرمدين', 'Beni Hassen - بني حسان', 'Jammel - جمال', 'Bembla - بنبلة', 'Moknine - المكنين', 'Bekalta - البقالطة', 'Teboulba - طبلبة', 'Ksar Helal - قصر هلال', 'Ksibet El Mediouni - قصيبة المديوني', 'Sayada-Lamta Bou-Hjar - صيادة - لمطة - بوحجر']}, {list: ['Nabeul - نابل', 'Dar Châabane El Fehri - دار شعبان الفهري', 'Beni khiar - بني خيار', 'Korba - قربة', 'Menzel Temime - منزل تميم', 'El Mida - الميدة', 'Kelibia - قليببية', 'Hammam El Guezaz - حمام الأغزاز', 'El Haouaria - الهوارية', 'Takelsa - تاكلسة', 'Soliman - سليمان', 'Menzel Bouzelfa - منزل بوزلفة', 'Beni Khalled - بني خلاد', 'Grombalia - قرمبالية', 'Bou Argoub - بوعرقوب', 'Hammamet - الحمامات']}, {list: ['Sfax Ville - صفاقس المدينة', 'Sfax Ouest - صفاقس الغريبة', 'Sakiet Ezzit - ساقية الزيت', 'Sakiet Eddaïer - ساقية الدائر', 'Sfax Sud - صفاقس الجنوبية', 'Tina - طينة', 'Agareb - عقارب', 'Djebeniana - جبنيانة', 'El Amra - العامرة', 'El Hencha - الحنشة', 'Menzel Chaker - منزل شاكر', 'Ghraiba - الغريبة', 'Bir ali Ben Kelifa - بئر علي بن خليفة', 'Skhira - الصخيرة', 'Mahres - المحرس', 'Kerkenah - قرقنة']}, {list: ['Sidi Bouzid Ouest - سيدي بوزيد الغربية', 'Sidi Bouzid Est - سيدي بوزيد الشرقية', 'Jilma - جلمة', 'Cebalet Ouled Asker - سبالة أولاد عسكر', 'Bir El Hafey - بئر الحفي', 'Sidi Ali Ben Aoûn - سيدي علي بن عون', 'Menzel Bouzaïenne - منزل بوزيان', 'Meknassy - المكناسي', 'Souk Jedid - سوق الجديد', 'Mezzouna - المزونة', 'Regueb - الرقاب', 'Ouled Haffouz - أولاد حفوز']}, {list: ['Siliana Nord - سليانة الشمالية', 'Siliana Sud - سليانة الجنوبية', 'Bou Arada - بوعرادة', 'Gaâfour - قعفور', 'El Krib - الكريب', 'Bourouis - بورويس', 'Makthar - مكثر', 'Er-Rouhia - الروحية', 'Kesra - كسرى', 'Bargou - برقو', 'El Aroussa - العروسة']}, {list: ['Sousse Medina - سوسة المدينة', 'Sousse Riadh - سوسة الرياض', 'Sousse Jawhara - سوسة جوهرة', 'Sousse Sidi Abdelhamid - سوسة سيدي عبد الحميد', 'Hammam Sousse - حمام سوسة', 'Akouda - اكودة', 'Kalaâ Kebira - القلعة الكبرى', 'Sidi Bou Ali - سيدي بوعلي', 'Hergla - هرقلة', 'Enfidha - النفيضة', 'Bouficha - بوفيشة', 'Kondar - كندار', 'Sidi El Héni - سيدي الهاني', 'M’saken - مساكن', 'Kalaâ Seghira - القلعة الصغرى', 'Zaouia - Ksiba - Thrayet - الزاوية - القصيبة - الثريات']}, {list: ['Tataouine Nord - تطاوين الشمالية', 'Tataouine Sud - تطاوين الجنوبية', 'Smâr  - الصمار', 'Bir Lahmar - بئر الأحمر', 'Ghomrassen - غمراسن', 'Dhehiba - ذهيبة', 'Remada - رمادة']}, {list: ['Tozeur - توزر', 'Degach - دقاش', 'Tameghza - تمغزة', 'Nefta - نفطة', 'Hazoua - حزوة']}, {list: ['Carthage - قرطاج', 'La Medina - المدينة', 'Bab El Bhar - باب البحر', 'Bab Souika  - باب سويقة', 'El Omrane - العمران', 'El Omrane Supérieur - العمران الاعلى', 'Ettahrir - التحرير', 'El Menzah - المنزه', 'Cité El Khadhra - حي الخضراء', 'Le Bardo - باردو', 'Sijoumi - السيجومي', 'Ezzouhour - الزهور', 'El Hrairia - الحرائرية', 'Sidi Hassine - سيدي حسين', 'El Ouardia - الوردية', 'El Kabaria - الكبارية', 'Sidi El Béchir - سيدي البشير', 'Djebel Djelloud - جبل الجلود', 'La Goulette - حلق الوادي', 'Le Kram - الكرم', 'La Marsa - المرسى']}, {list: ['Zaghouan - زغوان', 'Ez-Zeriba - الزريبة', 'Bir Mchergua - بئر مشارقة', 'El Fahs - الفحص', 'En-Nadhour - الناظور', 'Saouaf - صواف']}];
  private delegation: [];
  public copy: string;
  private selectedname ;
  error = '';
  loading = false;
  AddForm: FormGroup;
  submitted: boolean;
  ngOnInit(): void {
    this.createForm();
  }

  //methode création du formulaire avec les validations requises
  createForm() {
    this.AddForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      Adress: ['', [Validators.minLength(10)]],
      gouvernorat: ['', Validators.required],
      delegation: ['', Validators.required],
      codepost: ['', Validators.required],
      typehop: ['', Validators.required],
      us: ['', Validators.required],
      pwd: ['', Validators.required],
      rl: ['', Validators.required],
      hop: ['', Validators.required],
    });
  }
  get f() { return this.AddForm.controls; }

  //methode ajout administrateur hopital
  ajouter() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.AddForm.invalid) {
      return;
    }
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.doctorService.createAdminHop(this.f.nom.value, this.f.prenom.value, this.f.username.value, this.f.pwd.value, this.f.hop.value, this.f.typehop.value , this.f.gouvernorat.value, this.f.delegation.value , this.f.Adress.value , this.f.codepost.value)
      .subscribe( data => {
        alert('ines hello : DOC créé avec succès.');
        this.router.navigate(['/listhop']);
      },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  //affecter les délégations du gouvernement séléctionné
  onChangeName($event) {
    for (let i = 0; i < this.gouvernerat.length; i++) {
      if (this.gouvernerat[i] === this.selectedname) {

        this.delegation = JSON.parse(JSON.stringify(this.delegations[i])).list;
      }
    }

  }

}

