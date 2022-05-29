export interface itemInterface {
  title: string;
  link: string;
}

export interface headerInterface {
  dataBtn: itemInterface[];
  setLink: (link:string) => void;
}
