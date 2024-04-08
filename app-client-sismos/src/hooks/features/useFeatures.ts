import { useQuery } from '@tanstack/react-query';
import { getFeature } from '../../api/feature';

export const KEY_QUERY_FEATURE = 'features';


export function useFetchFeature(feature_id: number | string | undefined) {
  const id = parseInt(feature_id as string);
  return useQuery({
    queryKey: [KEY_QUERY_FEATURE, id],
    queryFn: () => getFeature(id),
  });
}


