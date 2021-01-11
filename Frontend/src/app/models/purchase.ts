import { Json } from "sequelize/types/lib/utils";

export class Purchase {
    id:number;
    date:string;
    items:Array<Json>;
    total:number;
}