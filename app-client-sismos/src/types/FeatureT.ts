export type FeatureT = {
   data:dataT[]
   pagination:PaginationT
  };

  export type PaginationT={

      current_page: number;
      total: number;
      per_page: number;
    
  }

  export type dataT={
    id: number;
    type: string;
    attributes: {
      external_id: string;
      magnitude: number;
      place: string;
      time: string;
      tsunami: boolean;
      mag_type: string;
      title: string;
      coordinates: {
        longitude: number;
        latitude: number;
      };  
    };
    links: {
      external_url: string;
    };
  }

  export type EarthquakeDataT= {
    id: number;
    title: string;
    url: string;
    code: string;
    place: string;
    mag: number;
    magType: string;
    longitude: number;
    latitude: number;
    created_at: string;
    updated_at: string;
  };
  
  
  export type CommentT = {
    body: string;
}

export type CommentRequestT = {
    comment: CommentT;
}