import { apiFetch } from ".";
import { FeatureT, EarthquakeDataT, CommentRequestT } from "../types/FeatureT";
import { ZERO } from "../utils/Constants";

const url = '/api/features';

export async function getFeatures(page: number, perPage: number, magTypes: string[]) {
  if (magTypes.length == ZERO) {
    const response: FeatureT = await apiFetch({
      method: 'GET',
      url: `${url}?page=${page}&per_page=${perPage}`,
    });
    return response;
  } else {
    const magTypeParams = magTypes.map(type => `mag_type[]=${type}`).join('&');
    const response: FeatureT = await apiFetch({
      method: 'GET',
      url: `${url}?page=${page}&per_page=${perPage}&${magTypeParams}`,
    });
    return response;
  }
}

export async function getFeature(id: number) {
  const response: EarthquakeDataT = await apiFetch({
    method: 'GET',
    url: `${url}/${id}`,
  });
  return response;
}

export async function createCommentFeature(id: number,data:CommentRequestT) {
  const response: any[] = await apiFetch({
    method: 'POST',
    url: `${url}/${id}/comments`,
    body:data
  });
  return response;
}



