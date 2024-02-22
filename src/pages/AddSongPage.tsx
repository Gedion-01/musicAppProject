import { useEffect, useState } from "react";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FormEvent } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { MdOutlineAudioFile } from "react-icons/md";
import { setAudioFile, setImageFile } from "../state/songs/songsSlice";
import FailedToast from "../components/Toasts/FailedToast";
import SuccessToast from "../components/Toasts/SuccessToast";

const Warningcon = styled(IoWarning)`
  font-size: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
`;

const UploadIcon = styled(AiOutlineCloudUpload)`
  font-size: 40px;
  cursor: pointer;
  transition: all 0.5s ease;
`;
const AudioIcon = styled(MdOutlineAudioFile)`
  font-size: 40px;
  cursor: pointer;
  transition: all 0.5s ease;
`;

const StyledInput = styled.input`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;

  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 5px; /* Rounded corners */

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
`;

const Categories = [
  "R&B",
  "Electronic",
  "Rock",
  "Ethiopian",
  "Pop",
  "Hip-Hop",
  "Latin",
  "Workout"
];

const StyledSelect = styled.select`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;

  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 5px; /* Rounded corners */

  /* Playful font */
  font-size: 18px;

  /* Playful animations on focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
  }
`;
const StyledOption = styled.option`
      color: #333;
      padding: 10px;
      border-radius: 5px;
  
      &:hover {
        background: red;
      }
    }
  `;

const StyledButton = styled.button`
  padding: 10px;
  /* Add playful spirit: */
  color: #e1f2f7;
  background-color: #182978;
  border: 1px solid #c0c0ff;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Ensure cursor changes on hover */

  &:hover {
    background-color: #2947CF;
  }

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }

  transition: 0.4s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledForm = styled.form``;
interface InputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}
interface FormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

function AddSongPage() {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  // states
  const [audioPreviewSize, setAudioPreviewSize] = useState(0);
  const [audioPreviewName, setAudioPreviewName] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [audioFileIsMissing, setAudioFileIsMissing] = useState(false);
  const [imageFileIsMissing, setImageFileIsMissing] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // redux states
  const showSuccessToast = useSelector(
    (state: RootState) => state.songs.showSuccessToast
  );
  const createSongCauseAnError = useSelector(
    (state: RootState) => state.songs.isCreateSongCausingError
  );
  const buttonIsLoading = useSelector(
    (state: RootState) => state.songs.addSongButtonLoading
  );
  const audioFile = useSelector((state: RootState) => state.songs.audioFile);
  const imageFile = useSelector((state: RootState) => state.songs.imageFile);
  const imageProgress = useSelector(
    (state: RootState) => state.songs.imageProgress
  );
  const audioProgress = useSelector(
    (state: RootState) => state.songs.audioProgress
  );
  const initialFormData: FormData = {
    title: "",
    artist: "",
    album: "",
    genre: "R&B",
  };

  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const genreStyles = css`
    gap: 12px;
    flex-wrap: wrap;
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 450px; /* Adjust width for larger screens */
    }
  `;
  const spinnerStyles = css`
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #007bff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-left: 10px;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  const fileUploaderStyle = css`
    cursor: pointer;
    padding: 10px;
    /* Add playful spirit: */
    background-color: #f0f8ff;
    border: 3px dashed #c0c0ff;

    font-size: 16px;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    transition: 0.2s ease-in-out;
    border-radius: 5px; /* Rounded corners */

    &:hover {
      box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
      border-color: #9090ff;
    }
  `;
  const audioPreviewStyle = css`
    padding: 10px;
    /* Add playful spirit: */
    background-color: #f0f8ff;
    border: 2px solid #c0c0ff;
    gap: 10px;

    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    border-radius: 8px; /* Rounded corners */
  `;
  //console.log(audioFile, imageFile)
  // when image is droped
  const onImageDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();
    file.onload = function () {
      setImagePreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
    dispatch(setImageFile(acceptedFiles[0]));
  }, []);

  // when audio is droped
  const onAudioDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      setAudioPreviewName(file.name);
      setAudioPreviewSize(file.size);
    });
    dispatch(setAudioFile(acceptedFiles[0]));
  }, []);

  function toMB(value: number) {
    const ONEMB = 1024 * 1024;
    const size = value / ONEMB;
    return size.toFixed(2);
  }
  const imageDropZone = useDropzone({
    onDrop: onImageDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  const audioDropZone = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });

  // when input is changed
  function handleInputChange(e: InputChangeEvent) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  console.log(audioFile, imageFile);
  
  // when submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // check if image file exists
    if (imageFile == undefined) {
      setImageFileIsMissing(true);
      return;
    } else {
      setImageFileIsMissing(false);
    }
    // check if audio file exists
    if (audioFile == undefined) {
      setAudioFileIsMissing(true);
      return;
    } else {
      setAudioFileIsMissing(false);
    }

    handleClick();
    dispatch({ type: "song/createSong", payload: { data: formData } });
  }
  const handleClick = () => {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 8000);
  };

  // success effect to navigate to home
  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => {
      };
    }
  }, [showSuccessToast]);

  return (
    <>
      <SuccessToast
        isToastVisible={showSuccessToast}
        light={true}
        message="Song uploaded successfully"
      />
      <Flex flexDirection={"column"}>
        {createSongCauseAnError && showErrorMessage && !buttonIsLoading ? (
          <FailedToast
            isToastVisible={showErrorMessage}
            light={true}
            message="Error while adding the song. Please try again."
          />
        ) : (
          ""
        )}
        <StyledForm onSubmit={handleSubmit}>
          <Flex flexDirection={"column"} css={genreStyles.styles}>
            <StyledInput
              required
              type="text"
              placeholder="Song Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <StyledInput
              required
              type="text"
              placeholder="Artist Name"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
            />
            <StyledInput
              
              type="text"
              placeholder="Album Name"
              name="album"
              value={formData.album}
              onChange={handleInputChange}
            />
            {/* <StyledInput
            required
            type="text"
            placeholder="Song Cover Image URL"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleInputChange}
          /> */}
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Song Cover Image
            </Text>
            {/* warining if image file is missing */}
            {imageFileIsMissing ? (
              <Flex alignItems={"center"} css={"color: red; gap: 10px;"}>
                <Text>Image file is required</Text>
                <Warningcon />
              </Flex>
            ) : (
              ""
            )}
            <Flex
              {...imageDropZone.getRootProps()}
              css={fileUploaderStyle.styles}
            >
              <input {...imageDropZone.getInputProps()} />
              {imageDropZone.isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <Flex
                  css={`
                    width: 100%;
                  `}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <Text>Click to select Image file, max file size 3MB</Text>
                  </Box>
                  <Box>
                    <UploadIcon />
                  </Box>
                </Flex>
              )}
            </Flex>
            {imagePreview && (
              <Flex
                css={audioPreviewStyle.styles}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Text>
                    <img
                      src={imagePreview as string}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </Text>
                </Box>

                <Box>
                  <CircularProgressWithLabel
                    variant="determinate"
                    value={imageProgress}
                  />
                </Box>
              </Flex>
            )}
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Song File
            </Text>
            {/* warining if audio file is missing */}
            {audioFileIsMissing ? (
              <Flex alignItems={"center"} css={"color: red; gap: 10px;"}>
                <Text>Audio file is required</Text>
                <Warningcon />
              </Flex>
            ) : (
              ""
            )}

            <Flex
              {...audioDropZone.getRootProps()}
              css={fileUploaderStyle.styles}
            >
              <input {...audioDropZone.getInputProps()} />
              {audioDropZone.isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <Flex
                  css={`
                    width: 100%;
                  `}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <Text>
                      Click to select an Audio file, max file size 10MB
                    </Text>
                  </Box>
                  <Box>
                    <UploadIcon />
                  </Box>
                </Flex>
              )}
            </Flex>
            {audioPreviewName && (
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                css={audioPreviewStyle.styles}
              >
                <Flex
                  alignItems={"center"}
                  css={`
                    gap: 10px;
                  `}
                >
                  <Box>
                    <AudioIcon />
                  </Box>
                  <Box>
                    <Flex flexDirection={"column"}>
                      <Box>
                        <Text fontSize={2} fontWeight={"bold"}>
                          {audioPreviewName}
                        </Text>
                      </Box>
                      <Box>{toMB(audioPreviewSize)} MB</Box>
                    </Flex>
                  </Box>
                </Flex>
                <Box>
                  <CircularProgressWithLabel
                    variant="determinate"
                    value={audioProgress}
                  />
                </Box>
              </Flex>
            )}
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Select Song Genre
            </Text>
            <StyledSelect
              required
              name="genre"
              onChange={handleInputChange}
              value={formData.genre}
            >
              {Categories.map((category, index) => (
                <StyledOption key={index} value={category}>
                  {category}
                </StyledOption>
              ))}
            </StyledSelect>
            <StyledButton type="submit" disabled={buttonIsLoading}>
              {buttonIsLoading ? (
                <>
                  <Flex
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    css={`
                      height: 30px;
                    `}
                  >
                    <Text>Add Song</Text>
                    <Flex css={spinnerStyles.styles}></Flex>
                  </Flex>
                </>
              ) : (
                <Flex
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  css={`
                    height: 30px;
                  `}
                >
                  <Text>Add Song</Text>
                </Flex>
              )}
            </StyledButton>
          </Flex>
        </StyledForm>
      </Flex>
    </>
  );
}

export default AddSongPage;
