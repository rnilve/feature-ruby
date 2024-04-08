import { useEffect, useState } from "react";
import { dataT } from "../../types/FeatureT";
import BaseIcon from "../../components/BaseIcon";
import { mdiEye, mdiPencil } from "@mdi/js";
import { Link } from "react-router-dom";

type Props = {
  data: dataT[] | undefined;
};

export function DetailFeature({ data }: Props) {
  const [detailFeatures, setDetailFeatures] = useState<dataT[]>([]);

  useEffect(() => {
    if (data) setDetailFeatures(data);
  }, [data]);

  return (
    <>
      {detailFeatures.map((item) => (
        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white">
          <div className="px-6 py-4">
            <div className="font-bold text-xl h-24 mb-2">
              {item.attributes.title}
            </div>
            <div className="h-60">
              <p className="text-gray-700 text-base">
                Magnitude: {item.attributes.magnitude}
                <br />
                Place: {item.attributes.place}
                <br />
                Time: {item.attributes.time}
                <br />
                Tsunami: {true ? "Yes" : "No"}
                <br />
                Magnitude Type: {item.attributes.mag_type}
                <br />
                Longitud: {item.attributes.coordinates.longitude}
                <br />
                Latitud: {item.attributes.coordinates.latitude}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 flex flex-col ">
            <div className="flex justify-between mt-auto">
              <a href={item.links.external_url} className="bg-slate-600 text-white flex items-center px-2 py-1 rounded"
                target="_blank" rel="noreferrer">
                <BaseIcon path={mdiEye} className="mr-1" />
              </a>
          
              <Link to={`/info/${item.id}`} className="bg-slate-600 text-white flex items-center px-2 py-1 rounded">
                <BaseIcon path={mdiPencil} className="mr-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
