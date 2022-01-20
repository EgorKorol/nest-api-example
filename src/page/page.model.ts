import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopCategory {
  Courses,
  Services,
  Books,
  Products,
}

class HH {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

class Advantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

export interface PageModel extends Base {}

@index({ title: 'text', seoText: 'text' })
export class PageModel extends TimeStamps {
  @prop({ enum: TopCategory })
  firstCategory: TopCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => Advantage })
  hh?: HH;

  @prop({ type: () => [Advantage] })
  advantages: Advantage[];

  @prop()
  seoText: string;

  @prop({ type: () => [String] })
  tags: string[];

  @prop()
  tagsTitle: string;
}
