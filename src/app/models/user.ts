import {Deserializable} from './deserializable';

export class User implements Deserializable {
  pwd: string;
  role: string;
  name: string;
  user: string;
  newpwd: string;
  confpwd: string;

   deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
