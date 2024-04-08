import { apiFetch } from ".";
import { FeatureT, EarthquakeDataT } from "../types/FeatureT";

const url = '/api/features';

export async function getFeatures(page: number, perPage: number) {
  const response: FeatureT = await apiFetch({
    method: 'GET',
    url: `${url}?page=${page}&per_page=${perPage}`, 
  });
  return response;
}

export async function getFeature(id: number) {
  const response: EarthquakeDataT = await apiFetch({
    method: 'GET',
    url: `${url}/${id}`,
  });
  return response;
}


