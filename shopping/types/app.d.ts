export interface IProduct {
  name?: string;
  slug?: string;
  quantity?: number;
  category?: string;
  image?: string;
  price?: number;
  brand?: string;
  rating?: number;
  numReviews?: number;
  countInStock?: number;
  description?: string;
}

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
