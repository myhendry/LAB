export interface IListing {
  sys: {
    id: string;
  };
  fields: {
    images: IImage[];
    property: string;
    slug: string;
  };
}

export interface IImage {
  fields: {
    file: {
      url: string;
    };
  };
  sys: {
    id: string;
  };
}
