import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { DicomImage } from "../types/PatientDataTypes";
import { getPatientDicom } from "../redux/api/getPatientDetail";

const DicomImageList: React.FC<{}> = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const id = localStorage.getItem("CaseId")
    ? localStorage.getItem("CaseId")
    : "";
  const [data, setData] = useState<DicomImage[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const DicomImg = await getPatientDicom(id);
        setData(DicomImg.result.study);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      <Header />
      {Loading && (
        <div className="flex h-screen w-full justify-center items-center absolute bg-opacity-70	 bg-white">
          <Loader />
        </div>
      )}
      <div>
        <h1 className="px-3 text-2xl mt-3 underline font-bold">
          Patient Dicom Images
        </h1>
        <DataTable data={data} />
      </div>
    </>
  );
};

export default DicomImageList;

const DataTable: React.FC<any> = ({ data }) => {
  return (
    <div className="p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">UID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item: DicomImage, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.uuid}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={item.viewer_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.viewer_link}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                //   colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
