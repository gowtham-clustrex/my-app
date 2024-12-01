/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from "react";
import { MdUploadFile } from "react-icons/md";
import Header from "../components/Header";
import { uploadTruPlan } from "../redux/api/getPatientDetail";
import axios from "axios";
import CustomModal from "../components/CustomModal";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

const Uploadpage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [alert, setAlert] = useState({
    state: false,
    title: "",
    description: "",
    isError: false,
  });
  const [Loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [onDrag, setOndrag] = useState<boolean>(false);
  const fileOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
    setOndrag(false);
  };

  const onDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
    setOndrag(false);
  };

  const onPress = useCallback(async () => {
    if (file) {
      try {
        setLoading(true);
        const data = await uploadTruPlan(6);
        console.log(file.arrayBuffer);
        const uploadApiResult = await axios.put(data.result.blob_url, file, {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "application/pdf",
          },
        });
        setAlert({
          state: true,
          title: "Upload completed",
          description: "The PDF file was uploaded successfully",
          isError: false,
        });
      } catch (err) {
        console.error(err);
        setAlert({
          state: true,
          title: "Upload Was Not completed",
          description: "The PDF file was not uploaded successfully",
          isError: true,
        });
      } finally {
        setLoading(false);
      }
    }
  }, [file]);

  return (
    <>
      {alert.state && (
        <CustomModal
          isError={alert.isError}
          title={alert.title}
          description={alert.description}
          closeModal={() => {
            setAlert({
              state: false,
              title: "",
              description: "",
              isError: false,
            });
          }}
          confirmFn={() => {
            setAlert({
              state: false,
              title: "",
              description: "",
              isError: false,
            });
            navigator("/");
          }}
        />
      )}

      {Loading && (
        <div className="flex h-screen w-full justify-center items-center absolute bg-opacity-70	 bg-white">
          <Loader />
        </div>
      )}
      <Header />
      <div className="centered">
        <div
          className={`border-4 border-dotted w-[30%] h-[40%] border-spacing-2 items-center justify-center flex flex-col ${
            onDrag ? "" : "border-purple-800"
          }`}
          onDrop={onDragEvent}
          onDragOver={(event) => {
            event.preventDefault();
            setOndrag(true);
          }}
          onDragEnd={() => {
            setOndrag(false);
          }}
          onDragExit={() => {
            setOndrag(false);
          }}
        >
          <h1 className="font-bold text-2xl mb-4">Upload Pdf File</h1>
          <div className="border-b-2 mx-14 w-full"></div>
          <input
            type="file"
            onChange={fileOnChangeHandler}
            ref={uploadRef}
            hidden
            accept=".pdf"
          />
          <button
            onClick={() => {
              uploadRef.current?.click();
            }}
          >
            <MdUploadFile size={120} color="#0022ff" />
          </button>

          <div className="gap-x-3  p-4 flex flex-row items-center">
            <p className="sm:hidden md:block">FileName: </p>
            <input value={file?.name} className="border-2 px-2" />
          </div>
          {file !== null && (
            <button
              className="bg-blue-500 p-2 rounded-lg text-white font-bold"
              onClick={onPress}
            >
              upload
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Uploadpage;
