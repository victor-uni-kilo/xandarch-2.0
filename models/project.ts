import { BSONType, ObjectId } from "mongodb";

export default class Project {
  constructor(
    public title: string,
    public naslov: string,
    public location: string,
    public lokacija: string,
    public descriptions: string,
    public opis: string,

    public area: number,
    public projDate: Date,

    public categories: string[],
    public kategorije: string[],

    public projImages: ObjectId[],

    public coverImage: ObjectId,
    public id?: ObjectId
  ) {}
}
