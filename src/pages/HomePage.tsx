/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { homePageTableType } from "../types/tableType";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getPatientDicom, getTruplan } from "../redux/api/getPatientDetail";
import Loader from "../components/Loader";
import { FaImage } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";

const HomePage: React.FC = () => {
  const navigation = useNavigate();
  const [Loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<homePageTableType[]>([
    {
      column1: "test",
      column2: "test02",
    },
    {
      column1: "test10",
      column2: "test20",
    },
    {
      column1: "test33",
      column2: "test12s",
    },
  ]);

  const DicomImageViewer = useCallback(
    async (id: string) => {
      localStorage.setItem("CaseId", id);
      navigation("/dicom");
    },
    [navigation]
  );

  const DownloadPdf = async () => {
    try {
      setLoading(true);
      const truplan = await getTruplan("49");
      const { result } = truplan;
      const response = await fetch(result.blob_url);
      if (!response.ok) {
        alert("Can't the get the PDF file \n Contact Admin");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "ambrastudy.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const showPDF = useCallback(async () => {
    try {
      setLoading(true);
      const truplan = await getTruplan("49");
      console.log(truplan);

      window.open(truplan?.result?.blob_url);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Header />
      {Loading && (
        <div className="flex h-screen w-full justify-center items-center absolute bg-opacity-70	 bg-white">
          <Loader />
        </div>
      )}
      <div className="flex-1 w-full min-h-screen bg-gray-300 p-12">
        {/* table  */}
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-4 py-2 text-left border-gray-500 border-r-4  text-gray-100 font-semibold">
                Column 01
              </th>
              <th className="px-4 py-2 text-left text-gray-100 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((val) => {
              return (
                <tr className="bg-gray-100">
                  <td className="px-4 py-2  border-gray-500 border-r-4">
                    {val.column1}
                  </td>
                  <td className="px-4 py-2  border-gray-200 ">
                    <div className="flex flex-row items-center gap-x-3 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          showPDF();
                        }}
                      >
                        <LuEye size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigation("/upload");
                        }}
                      >
                        <FiUpload color="#d400ff" size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          DownloadPdf();
                        }}
                      >
                        <TbDownload size={20} color="#00ff4c" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          DicomImageViewer("49");
                        }}
                      >
                        <FaImage size={20} color="#00ff4c" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          DownloadPdf();
                        }}
                      >
                        <RiImageAddLine size={20} color="#00ff4c" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
