import { useState, useEffect } from "react";
import { DetailFeature } from "./DetailFeatures";
import { getFeatures } from "../../api/feature";
import { FeatureT } from "../../types/FeatureT";
import { Button } from "../../components/Button";
import { mdiChevronLeftBoxOutline, mdiChevronRightBoxOutline } from "@mdi/js";
import { Loader } from "../../components/Loader";
import { EMPTYSTRING, ZERO } from "../../utils/Constants";

export function Feature() {

  const INITIALPAGE = 1;
  const INITIALREGISTER = 10;

  const [features, setFeatures] = useState<FeatureT>();
  const [currentPage, setCurrentPage] = useState(INITIALPAGE);
  const [totalNumberPage, setTotalNumberPage] = useState(ZERO);
  const [perPage, setPerPage] = useState(INITIALREGISTER);
  const [isLoading, setIsloading] = useState(false);
  const [factorSearch,setFactorSearch] = useState<string[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const response = await getFeatures(currentPage, perPage,factorSearch);
      if (response.data && response.pagination) {
        setFeatures(response);
        setIsloading(true);
      }
    };
    fetchData();
  }, [currentPage, perPage,factorSearch]);

  useEffect(() => {
    const pages = Math.ceil(Number((features?.pagination.total || ZERO)) / Number(features?.pagination.per_page || ZERO));
    setTotalNumberPage(pages)
  }, [features])

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  if (!isLoading) {
    return <Loader />;
  }

  function handlePerPageChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value);
    value = isNaN(value) ? ZERO : value
    setPerPage(value);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if(value != EMPTYSTRING){
      const magTypesArray = value.split(',').map(type => type.trim());
      setFactorSearch(magTypesArray);
    }else{
      setFactorSearch([])
    }

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
              value={factorSearch}
              onChange={handleSearchChange}
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

      <footer className="fixed bottom-0  bg-gray-100 rounded p-4 ">
        <div className="text-sm text-gray-800 ">
          Showing{" "}
          <span className=" p-2 font-bold text-gray-500">{features?.pagination.current_page}</span>
          to
          <span className="font-bold p-2 text-gray-500">
            {totalNumberPage}
          </span>{" "}
          of
          <span className="font-bold p-2 text-gray-500">{features?.pagination.total}</span>{" "}
          Entries
        </div>
        <div className="container flex justify-center pt-2 items-start">
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
            disabled={currentPage >= totalNumberPage}
            onClick={() => handlePageChange(currentPage + 1)}
            icon={mdiChevronRightBoxOutline}
            color={"gray"}
          />
        </div>
      </footer>
    </>
  );
}
