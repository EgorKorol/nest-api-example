export const enum TopCategory {
  Courses,
  Services,
  Books,
  Products,
}

interface HH {
  count: number;
  salary: {
    junior: number;
    middle: number;
    senior: number;
  };
}

interface Advantage {
  title: string;
  description: string;
}

export class PageModel {
  _id: string;
  firstCategory: TopCategory;
  secondCategory: string;
  title: string;
  category: string;
  hh?: HH;
  advantages: Advantage[];
  seoText: string;
  tags: string[];
  tagsTitle: string;
}
