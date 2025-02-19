import { IdusApi } from "@/api";
import { Product, ProductRequest } from "@/types/api";

export const getProductsRoute = () => "/products";
export const getProductRoute = (uuid: string) => `/products/${uuid}`;

export const createProduct = async (product: ProductRequest) => {
  const response = await IdusApi(getProductsRoute(), {
    method: "POST",
    body: JSON.stringify(product),
  });
  const { data } = await response.json();
  return data as Product;
};

export const updateProduct = async (
  uuid: string,
  product: Partial<ProductRequest>
) => {
  const response = await IdusApi(getProductRoute(uuid), {
    method: "PUT",
    body: JSON.stringify(product),
  });
  const { data } = await response.json();
  return data as Product;
};

export const deleteProduct = async (uuid: string) => {
  const response = await IdusApi(getProductRoute(uuid), {
    method: "DELETE",
  });
  return response.ok;
};
