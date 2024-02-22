import { Box, Flex, Text } from "rebass";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

import {
  setCurrentData,
  setCurrentTrackIndex,
  setIsPlaying,
  setPlayNext,
  setPlayerQueue,
  setPlayerQueueLength,
} from "../state/songs/playerSlice";
import FailedToast from "./Toasts/FailedToast";
// import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { audioPlayer } from "../hooks/audioPlayerRefs";

const StyledOption = styled(SlOptionsVertical)`
  position: relative;
  margin-right: 10px;
  font-size: 20px;
`;
const EditIcon = styled(MdOutlineEdit)`
  margin-right: 10px;
  font-size: 20px;
  z-index: 0px;
`;
const StyledRemoveIcon = styled(MdDelete)`
  margin-right: 10px;
  font-size: 20px;
  &:hover {
    color: red;
  }
`;

const PlayIcon = styled(BsFillPlayFill)`
  font-size: 22px;
  cursor: pointer;
`;
const PauseIcon = styled(BsPauseFill)`
  font-size: 22px;
  cursor: pointer;
`;
const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 5px;
`;
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  songDataUrl: string;
}
type myComponentProp = {
  playerQueue: Song[];
  isCurrent: boolean;
  index: number;
  isPlaying: boolean;
};

const Music: React.FC<myComponentProp & Song> = ({
  _id,
  title,
  artist,
  album,
  genre,
  coverImageUrl,
  createdAt,
  updatedAt,
  __v,
  songDataUrl,
  playerQueue,
  isCurrent,
  index,
  isPlaying,
}) => {
  const dispatch = useDispatch();
  const [optionIsOpened, setOptionIsOpened] = useState(false);
  const [markedItem, setMarkedItem] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const showFailedToast = useSelector(
    (state: RootState) => state.songs.showFailedToast
  );
  //
  const currentData = useSelector(
    (state: RootState) => state.playerData.currentData
  );

  function play(event: React.MouseEvent<SVGElement, MouseEvent>) {
    event.preventDefault();

    dispatch(setCurrentTrackIndex(index));
    dispatch(
      setCurrentData({
        _id,
        title,
        artist,
        album,
        genre,
        createdAt,
        updatedAt,
        coverImageUrl,
        songDataUrl,
        __v,
      })
    );
    dispatch(setPlayerQueueLength(playerQueue.length));
    dispatch(setPlayerQueue(playerQueue));

    if (currentData._id !== _id) {
      dispatch(setPlayNext(true));
    }
    dispatch(setIsPlaying(true));
    //audioPlayer?.current?.play();
  }
  function pause() {
    dispatch(setIsPlaying(false));
    dispatch(setPlayNext(false));
    audioPlayer?.current?.pause();
    //cancelAnimationFrame(animationRef.current);
  }
  // to open option
  const handleOptionClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOptionIsOpened((prev) => !prev);
  };

  const deleteSong = (id: string | unknown) => {
    dispatch({ type: "song/deleteSongById", payload: { songid: id } });
    closeModal();
  };

  const openModal = () => {
    setOpenDeleteModal(true);
    setOptionIsOpened(false);
    setMarkedItem(true);
    // dispatch(setOpenDeleteModal(true))
    // dispatch(setmarkDeletedItem(true))
  };

  const closeModal = () => {
    setMarkedItem(false);
    setOpenDeleteModal(false);
    // dispatch(setOpenDeleteModal(false))
    // dispatch(setmarkDeletedItem(false))
  };

  const StyledBackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: ${optionIsOpened ? "block" : "none"};
    height: 100vh;
    width: 100%;
  `;
  const Button = styled.button`
    padding: 15px 30px;
    background-color: #182978;
    color: #e1f2f7;
    border: none;
    border-radius: 5px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  `;
  const Button2 = styled.button`
    padding: 15px 30px;
    background-color: #f7f7f7;

    border: none;
    border-radius: 5px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  `;

  const StyledContent = styled.div`
    z-index: 20;
    font-size: 17px;
    position: absolute;
    min-width: 100px;
    background-color: #d0e3f0;
    box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.1);
    border-radius: 5px;
    margin-right: 5px;
    display: ${optionIsOpened ? "block" : "none"};

    text-decoration: none;
    right: 0;
  `;
  const StyledButton = styled.div`
    padding: 5px 2px;
    border: none;
  `;

  const musicStyle = useMemo(() => {
    return css`
      color: #1f3044;
      padding: 4px 4px;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color: ${optionIsOpened ? "#7DA2A9" : ""};
      background-color: ${isPlaying && isCurrent ? "#7DA2A9" : ""};
      background-color: ${markedItem ? "#7DA2A9" : ""};
      max-width: 850px;
      &: hover {
        background-color: #7da2a9;
        transition: all 0.2s ease-out;
      }
    `;
  }, [optionIsOpened, isPlaying, isCurrent, markedItem]);
  const playTitle = css`
    gap: 10px;
  `;

  const boxStyle = css`
    margin-right: 10px; /* Adjust the margin as needed */
  `;

  const hiddenOnSmallScreen = css`
    @media (max-width: 1024px) {
      display: none;
    }
  `;
  const cmMDScreen = css`
    @media (max-width: 1024px) {
      display: none;
    }
  `;

  const StyledOptionContainer = css`
    cursor: pointer;
    position: relative;
  `;
  const StyledlementsMenuebarContent = css`
    &:hover {
      color: #2947cf;
    }

    transition: 0.4s;
  `;
  // Define animation keyframes
  const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
  // for modal overlay
  const overlayStyles = css`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // modal content
  const modalStyles = css`
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
    gap: 10px;
    padding: 20px;
    border-radius: 8px;
    animation: ${fadeIn} 0.3s ease; /* Apply animation to modal content */
    @media (max-width: 768px) {
    }
  `;
  const textContainer = css`
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
      max-width: 200px;
    }
    @media (max-width: 300px) {
      max-width: 100px;
    }
  `;

  const Overlay = styled.div`
    ${overlayStyles}
  `;

  const ModalContent = styled.div`
    ${modalStyles}
  `;

  function formatDate(date: string): string {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = dateObject.toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  }

  const StyledSpan = styled.span`
    font-weight: bold;
  `;

  return (
    <>
      {/* <SuccessToast
        isToastVisible={showSuccessToast}
        light={true}
        message="Song deleted successfully."
      /> */}
      {/* <FileDeletedSuccessToast 
        isToastVisible={isRemoveSuccessFull}
        light={true}
        message="Song deleted successfully." /> */}
      <FailedToast
        isToastVisible={showFailedToast}
        message="Failed to remove song."
        light={true}
      />

      {/* Render modal if isOpen is true */}
      {openDeleteModal && (
        <Overlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Text fontSize={4} fontWeight={"bold"}>
              Delete from your Songs?
            </Text>
            <Text>
              This will delete <StyledSpan>{title}</StyledSpan> from Your Songs.
            </Text>
            <Flex
              flexDirection={"row"}
              justifyContent={"flex-end"}
              css={`
                gap: 10px;
                margin-top: 20px;
              `}
            >
              <Button2 onClick={closeModal}>Cancel</Button2>
              <Button onClick={() => deleteSong(_id)}>Delete</Button>
            </Flex>
          </ModalContent>
        </Overlay>
      )}
      {/* backdrop for option */}
      <StyledBackGround
        onClick={(e) => handleOptionClick(e)}
      ></StyledBackGround>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        css={musicStyle.styles}
      >
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          flex={1.5}
          css={playTitle.styles}
        >
          <Box ml={2}>
            {isPlaying && isCurrent ? (
              <PauseIcon onClick={pause} />
            ) : (
              <PlayIcon onClick={(e) => play(e)} />
            )}
          </Box>
          <Box>
            <StyledImage src={coverImageUrl} />
          </Box>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            css={textContainer.styles}
          >
            <Text fontSize={16} fontWeight="bold" css={textContainer.styles}>
              {title}
            </Text>

            <Text fontSize={14} css={textContainer.styles}>
              {artist}
            </Text>
          </Flex>
        </Flex>
        <Box
          css={[boxStyle.styles, hiddenOnSmallScreen.styles, cmMDScreen.styles]}
          flex={1}
          mr={2}
        >
          <Text
            fontSize={14}
            style={{
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {album}
          </Text>
        </Box>
        <Box css={[boxStyle.styles, hiddenOnSmallScreen.styles]} flex={1}>
          <Text fontSize={14}>{formatDate(updatedAt)}</Text>
        </Box>
        <Box css={StyledOptionContainer.styles}>
          <StyledOption onClick={(e) => handleOptionClick(e as any)} />
          {optionIsOpened === true ? (
            <StyledContent onClick={(e) => e.stopPropagation()}>
              <Link
                to={`/editSong/${_id}`}
                style={{ textDecoration: "none", color: "#1f3044" }}
              >
                <Flex
                  flexDirection={"row"}
                  alignItems={"center"}
                  p={2}
                  css={StyledlementsMenuebarContent.styles}
                >
                  <Box>
                    <EditIcon />
                  </Box>

                  <Box>
                    <StyledButton>Edit</StyledButton>
                  </Box>
                </Flex>
              </Link>
              <Flex
                flexDirection={"row"}
                alignItems={"center"}
                p={2}
                css={[
                  StyledlementsMenuebarContent.styles,
                  `&:hover {
                  color: red;
                        }`,
                ]}
                onClick={() => openModal()}
              >
                <Box
                  css={`
                    &:hover {
                      color: red;
                    }
                  `}
                >
                  <StyledRemoveIcon />
                </Box>
                <Box
                  css={`
                    &:hover {
                      color: red;
                      transition: 0.4s;
                    }
                  `}
                >
                  <StyledButton>Remove</StyledButton>
                </Box>
              </Flex>
            </StyledContent>
          ) : (
            ""
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Music;
