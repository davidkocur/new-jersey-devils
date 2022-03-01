import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import { storage } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { showToastError } from "./Common";

const getRefForUploader = (dir) => {
  const refForUploader = ref(storage, dir);
  refForUploader["child"] = function (filename) {
    const newRef = ref(this, filename);
    newRef["put"] = function (file, metadata) {
      return uploadBytesResumable(newRef, file, metadata);
    };
    return newRef;
  };
  return refForUploader;
};

const ImageUploader = ({ dir, defaultImg, defaultImgName, onUploadSuccess, onImageReset }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    if (
      typeof defaultImg === "string" &&
      defaultImg.length > 0 &&
      typeof defaultImgName === "string" &&
      defaultImgName.length > 0
    )
      setImageData({ filename: defaultImgName, fileURL: defaultImg });
  }, [defaultImg, defaultImgName]);

  const handleUploadStart = (e) => {
    setIsProcessing(true);
    console.log(e);
  };

  const handleUploadError = (err) => {
    setIsProcessing(false);
    console.error(err);
  };

  const handleUploadSuccess = (filename) => {
    const fileRef = ref(storage, `${dir}/${filename}`);
    getDownloadURL(fileRef)
      .then((fileURL) => {
        setImageData({ filename, fileURL, currentFileRef: fileRef });
        onUploadSuccess(filename, fileURL);
        console.log(imageData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsProcessing(false));
  };

  const handleImageRemove = () => {
    const deleteFromStorage = (fileRef) => {
      deleteObject(fileRef)
        .then(() => {
          setImageData({});
          onImageReset();
        })
        .catch((err) => console.error(err))
        .finally(() => setIsProcessing(false));
    };
    setIsProcessing(true);

    if (imageData.currentFileRef) {
      //adding
      deleteFromStorage(imageData.currentFileRef);
    } else if (imageData.filename) {
      //editing
      const fileRef = ref(storage, `${dir}/${imageData.filename}`);
      deleteFromStorage(fileRef);
    } else {
      showToastError("Whoops, something went wrong");
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {!imageData.fileURL ? (
        <div>
          <FileUploader
            accept="image/*"
            name="playerPicture"
            randomizeFilename
            storageRef={getRefForUploader(dir)}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      ) : (
        <div className="image_upload_container">
          <img style={{ width: "100%" }} src={imageData.fileURL} alt="player" />
          <Tooltip title="Remove image" placement="top">
            <IconButton className="remove" onClick={handleImageRemove}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
      )}
      {isProcessing && (
        <div className="progress" style={{ textAlign: "center", margin: "30px 0" }}>
          <CircularProgress style={{ color: "#98c6e9" }} thickness={5} size={32} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
