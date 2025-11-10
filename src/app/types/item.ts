export interface BaseItem {
  _id?: { $oid: string };
  type: string;
  title: string;
  date?: string;
  url?: string;
  image?: string;
}
  