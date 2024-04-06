import { apiFetch } from ".";
import { FeatureT } from "../types/FeatureT";

const url = '/api/features';

export async function getFeature(page: number, perPage: number) {
  const response: any = await apiFetch({
    method: 'GET',
    url: `${url}?page=${page}&per_page=${perPage}`, 
  });
  console.log(response)
  return response;
}
