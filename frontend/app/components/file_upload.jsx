"use client";

import {useState} from "react";
import Image from "next/image";

const FileUpload = ({isActive, uploadedFile, setUploadedFile, onUploadSuccess}) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/transcribe`, {
                method: "POST",
                body: formData,
                mode: "cors",
            });
            const result = await response.json();
            setUploadedFile(file);
            onUploadSuccess();
        } catch (error) {
            console.error("Error: ", error);
        }
        setLoading(false);
    };

    const showFileUploadState = () => {
        if (uploadedFile) {
            return (
                <div className="flex flex-col items-center justify-center text-center">
                    <Image
                        className="w-6 h-6 m-2"
                        src="/images/green_checkmark.png"
                        alt="File Uploaded"
                        width={32}
                        height={32}
                    />
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center text-center">
                    <svg
                        className="w-6 h-6 m-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                </div>
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <div
                className={`flex items-center justify-center w-full ${
                    isActive ? "opacity-25 pointer-events-none" : ""
                }`}
            >
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                    {loading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    ) : (showFileUploadState())}
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}
                           accept=".mp3, .wav, .m4a"
                    />
                </label>
            </div>
        </div>
    );
};

export default FileUpload;
