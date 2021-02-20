export class Survey {
  _id: string;
  name: string;
  date: Date;
  dyspnea: boolean;
  chestPain: boolean;
  cough: boolean;
  asthenia: boolean;
  ageusia: boolean;
  anosmia: boolean;
  nausea: boolean;
  diarrhea: boolean;
  vomit: boolean;
  respiratoryDistress: boolean;
  headache: boolean;
  myalgia: boolean;
  confusion: boolean;
  rhinitis: boolean;
  abdominalPain: boolean;
  odynophagia: boolean;
  temperatur: number;
  pas: number;
  pad: number;
  user: {
    _id: string;
  };
  patient: {
    _id: string
  };
}
