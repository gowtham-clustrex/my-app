import React, { useCallback, useRef, useState } from "react";
import { MdUploadFile } from "react-icons/md";
import Header from "../components/Header";
import { uploadTruPlan } from "../redux/api/getPatientDetail";
import axios from "axios";

const Uploadpage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
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
        const data = await uploadTruPlan(6);
        console.log(file.arrayBuffer);
        axios
          .put(data.result.blob_url, file, {
            headers: {
              "x-ms-blob-type": "BlockBlob",
              "Content-Type": "application/pdf",
            },
          })
          .then((res) => {
            console.log("upload res", res);
          });

        // console.log(data.result.blob_url);
      } catch (err) {
        console.error(err);
      }
    }
  }, [file]);

  return (
    <>
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
            <p>FileName: </p>
            <input value={file?.name} className="border-2 px-2" />
          </div>
          <button
            className="bg-blue-500 p-2 rounded-lg text-white font-bold"
            onClick={onPress}
          >
            upload
          </button>
        </div>
      </div>
    </>
  );
};

export default Uploadpage;
