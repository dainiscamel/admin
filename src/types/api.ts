interface ProductBase {
  name: string;
  image: string;
  artistUuid: string;
  artistName: string;
  salePrice: number;
  discountRate: number;
  review: {
    count: number;
    rate: number;
    rateLabel: string;
    contents: string;
    starFull: boolean;
  };
  badges: Array<{
    displayType: string;
    label: string;
    colorFont: string;
    colorBackground: string;
    image: string | null;
  }>;
  promotion: {
    colorBackground: string;
    labels: Array<{
      types: string[];
      text: string;
      colorFont: string;
      size: number;
    }>;
  };
}

export interface ProductRequest
  extends Partial<Omit<ProductBase, "review" | "badges" | "promotion">> {
  review?: ProductBase["review"];
  badges?: ProductBase["badges"];
  promotion?: ProductBase["promotion"];
}

export interface Product extends ProductBase {
  uuid: string;
  artistId: number;
}

export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}
