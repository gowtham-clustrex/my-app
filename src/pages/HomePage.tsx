/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { homePageTableType } from "../types/tableType";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getTruplan } from "../redux/api/getPatientDetail";

const HomePage: React.FC = () => {
  const navigation = useNavigate();
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

  const DownloadPdf = useCallback(async () => {
    try {
      const truplan = await getTruplan("1");
      const { result } = truplan;
      // const data = fetch(result.blob_url)
      const link = document.createElement("a");
      link.href = result.blob_url;
      // document.body.appendChild(result.blob_url);
      link.download = "example.pdf";
      link.click();
      // document.body.removeChild(result.blob_url);
    } catch (err) {
      console.error("Error", err);
    }
  }, []);

  const showPDF = useCallback(async () => {
    try {
      const truplan = await getTruplan("1");
      window.open(truplan?.result?.blob_url);
    } catch (err) {
      console.error("Error", err);
    }
  }, []);

  return (
    <>
      <Header />
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
                        onClick={() => {
                          showPDF();
                        }}
                      >
                        <LuEye size={20} />
                      </button>
                      <button
                        onClick={() => {
                          navigation("/upload");
                        }}
                      >
                        <FiUpload color="#d400ff" size={20} />
                      </button>
                      <button
                        onClick={() => {
                          DownloadPdf();
                        }}
                      >
                        <TbDownload size={20} color="#00ff4c" />
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
