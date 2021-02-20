import {Deserializable} from './deserializable';
export class Hopital implements Deserializable{
  name: String ;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
