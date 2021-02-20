import {User} from './user';
import {Hopital} from './hopital';
import {Deserializable} from './deserializable';

export class Doctor implements Deserializable {
  name: string ;
  cnom: string ;
  parentid:string;
  user: User;
  hopital: Hopital;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
