export type Project = {
  _id: string;
  title: string;
  dateCreated: string;
  description: string;
  industry?: string;
  featured?: boolean;
  urlPath?: string;
  images: Array<{
    _key: string;
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  }>;
  skills?: string[];
};
