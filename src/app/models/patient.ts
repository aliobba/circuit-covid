export class Patient {
  _id: string;
  pendingSurvey: string;
  patientState: string;
  name: string;
  familyName: string;
  birthday: string;
  gender: string;
  email: string;
  cin: string;
  phone: string;
  secondPhone: string;
  address: string;
  gouvernorat: string;
  nationality: string;
  risky: string;
  alert: string;
  symptomsStartDate: string;
  firstSymptoms: string;
  pcr: string;
  datePcr: string;
  tdm: string;
  healthCareWorker: string;
  localCase: string;
  orientation: string;
  typeOfContact: {
    familyMembers: number
    };

  constructor() {}


}
