import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { FormEvent } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineAudioFile } from "react-icons/md";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import FailedToast from "../components/Toasts/FailedToast";
import { setAudioFile, setImageFile } from "../state/songs/songsSlice";
import { IoWarning } from "react-icons/io5";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import SuccessToast from "../components/Toasts/SuccessToast";
import Loading from "../components/Animation/Loading";

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
  border-radius: 8px; /* Rounded corners */

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
  "Workout",
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
  border-radius: 8px; /* Rounded corners */

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
  border-radius: 8px; /* Rounded corners */
  cursor: pointer; /* Ensure cursor changes on hover */

  &:hover {
    background-color: #2947cf;
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

function EditSongPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // states
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [audioPreviewSize, setAudioPreviewSize] = useState(0);
  const [audioPreviewName, setAudioPreviewName] = useState("");
  const [audioFileIsMissing, setAudioFileIsMissing] = useState(false);
  const [imageFileIsMissing, setImageFileIsMissing] = useState(false);

  // redux states
  const searchedSongLoading = useSelector(
    (state: RootState) => state.songs.searchedSongLoading
  );

  const imageProgress = useSelector(
    (state: RootState) => state.songs.imageProgress
  );
  const audioProgress = useSelector(
    (state: RootState) => state.songs.audioProgress
  );
  const audioFile = useSelector((state: RootState) => state.songs.audioFile);
  const imageFile = useSelector((state: RootState) => state.songs.imageFile);

  const showSuccessToast = useSelector(
    (state: RootState) => state.songs.showSuccessToast
  );
  const searchedSong = useSelector(
    (state: RootState) => state.songs.searchedSong
  );
  const EditSongCauseAnError = useSelector(
    (state: RootState) => state.songs.isEditSongCausingError
  );
  const buttonIsLoading = useSelector(
    (state: RootState) => state.songs.EditSongButtonLoading
  );
  //console.log(searchedSong);

  const [formData, setFormData] = useState({
    songid: id,
    title: "",
    artist: "",
    album: "",
    genre: "",
    coverImageUrl: "",
    songDataUrl: "",
  });

  useEffect(() => {
    dispatch({ type: "song/getSongById", payload: { id: id } });
  }, []); // may be i will add id
  useEffect(() => {
    setFormData({
      songid: id,
      title: searchedSong.title,
      artist: searchedSong.artist,
      album: searchedSong.album,
      genre: searchedSong.genre,
      coverImageUrl: searchedSong.coverImageUrl,
      songDataUrl: searchedSong.songDataUrl,
    });
  }, [searchedSong]);
  // console.log(formData);

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

  // when input change
  function handleInputChange(e: InputChangeEvent) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // on submiting the form
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
    dispatch({ type: "song/updateSong", payload: { data: formData } });
  }

  // effect when its success to navigate to home
  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => {};
    }
  }, [showSuccessToast]);

  const handleClick = () => {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 8000);
  };
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
    border-radius: 8px; /* Rounded corners */

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
    border-radius: 5px; /* Rounded corners */
  `;
  return (
    <>
      {showSuccessToast === true ? (
        <SuccessToast
          isToastVisible={showSuccessToast}
          light={true}
          message="Song Edited successfully"
        />
      ) : (
        ""
      )}
      <Flex flexDirection={"column"}>
        {EditSongCauseAnError && showErrorMessage && !buttonIsLoading ? (
          <FailedToast
            isToastVisible={showErrorMessage}
            light={true}
            message="Error while Editing the song. Please try again."
          />
        ) : (
          ""
        )}

        {searchedSongLoading ? (
          <Loading />
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <Flex flexDirection={"column"} css={genreStyles.styles}>
              <Text fontSize={2} fontWeight="bold" mb={0}>
                Song Title
              </Text>
              <StyledInput
                required
                type="text"
                placeholder="Song Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Text fontSize={2} fontWeight="bold" mb={0}>
                Artist Name
              </Text>
              <StyledInput
                required
                type="text"
                placeholder="Artist Name"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
              />
              <Text fontSize={2} fontWeight="bold" mb={0}>
                Album Name
              </Text>
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
                  <Text>Inorder to save, a new Image file is required</Text>
                  <Warningcon />
                </Flex>
              ) : (
                ""
              )}
              <Flex
                {...imageDropZone.getRootProps()}
                css={fileUploaderStyle.styles}
              >
                <input name="image" {...imageDropZone.getInputProps()} />
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
                      <Text>
                        Click to select new Image file, max file size 3MB
                      </Text>
                    </Box>
                    <Box>
                      <UploadIcon />
                    </Box>
                  </Flex>
                )}
              </Flex>
              {imagePreview || searchedSong.coverImageUrl ? (
                <Flex
                  css={audioPreviewStyle.styles}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <Text>
                      <img
                        src={
                          (imagePreview as string) ||
                          (searchedSong.coverImageUrl as string)
                        }
                        style={{
                          width: "100px",
                          height: "100px",
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
              ) : (
                ""
              )}
              <Text fontSize={2} fontWeight="bold" mb={0}>
                Song File
              </Text>
              {/* warining if audio file is missing */}
              {audioFileIsMissing ? (
                <Flex alignItems={"center"} css={"color: red; gap: 10px;"}>
                  <Text>Inorder to save, a new Audio file is required</Text>
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
                        Click to select new Audio file, max file size 10MB
                      </Text>
                    </Box>
                    <Box>
                      <UploadIcon />
                    </Box>
                  </Flex>
                )}
              </Flex>
              {audioPreviewName ? (
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
              ) : (
                ""
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
              <Text fontSize={1} mb={0} textAlign={"center"}>
                After clicking Save previous data will be lost and new data will
                be saved.
              </Text>
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
                      <Text>Editing Song</Text>
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
                    <Text>Save</Text>
                  </Flex>
                )}
              </StyledButton>
            </Flex>
          </StyledForm>
        )}
      </Flex>
    </>
  );
}

export default EditSongPage;
