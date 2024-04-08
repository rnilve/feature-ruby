import { useState, useEffect } from "react";
import { DetailFeature } from "./DetailFeatures";
import { getFeatures } from "../../api/feature";
import { FeatureT } from "../../types/FeatureT";
import { Button } from "../../components/Button";
import { mdiChevronLeftBoxOutline, mdiChevronRightBoxOutline } from "@mdi/js";
import { Loader } from "../../components/Loader";

export function Feature() {
  const [features, setFeatures] = useState<FeatureT>();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeatures(currentPage, perPage);
      if (data.data && data.pagination) {
        setFeatures(data);
        setIsloading(true);
      }
    };
    fetchData();
  }, [currentPage, perPage]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  if (!isLoading) {
    return <Loader />;
  }

  function handlePerPageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setPerPage(value);
  }

  return (
    <>
      <header className="flex justify-between pb-2">
        <div>
          <h2 className="text-start  text-lg font-bold">Features</h2>
        </div>
        <div>
          <div className="flex flex-row">
            <h3 className="text-end font-semibold">Search:</h3>
            <input
              type="text"
              className="ml-2 border border-gray-400 px-2 py-1 rounded-md"
              placeholder="Escribe aquí..."
            />
          </div>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {features?.data.map((item) => (
            <DetailFeature key={item.id} data={[item]} />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0  bg-gray-100 rounded py-2 ">
      <div className="text-sm text-gray-800 ">
    Showing{" "}
    <span className=" p-2 font-bold text-gray-500">{features?.pagination.current_page}</span>
    to
    <span className="font-bold p-2 text-gray-500">
  {Math.ceil(Number(features?.pagination.total) / Number(features?.pagination.per_page))}
</span>{" "}
    of
    <span className="font-bold p-2 text-gray-500">{features?.pagination.total}</span>{" "}
    Entries
  </div>
        <div className="container flex justify-end items-start">
          <Button
            type="button"
            label=""
            onClick={() => handlePageChange(currentPage - 1)}
            icon={mdiChevronLeftBoxOutline}
            color={"gray"}
          />
          <div className="px-4">
            <input
              type="number"
              className="w-12"
              id="perPage"
              value={perPage}
              onChange={handlePerPageChange}
            />
          </div>
          <Button
            type="button"
            label=""
            onClick={() => handlePageChange(currentPage + 1)}
            icon={mdiChevronRightBoxOutline}
            color={"gray"}
          />
        </div>
      </footer>
    </>
  );
}
