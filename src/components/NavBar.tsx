import { useEffect, useState } from 'react';
import { TbMenu2 } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";

import SmallScreenSidebar from "./SmallScreen/SmallScreenSidebar";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setSearch } from '../state/songs/songsSlice';

export default function NavBar() {
  const  dispach = useDispatch()
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isHomeOpen, setHomeIsOpen] = useState(false);
  const search = useSelector((state: RootState) => state.songs.search)
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if(location.pathname === '/') {
      setTitle('All Songs');
    } else if(location.pathname.startsWith('/genre')) {
      setTitle('Genre');
    } else if(location.pathname === '/addSong') {
      setTitle('Add Song');
    } else if(location.pathname === '/Statistics') {
      setTitle('Overview');
    } else if(location.pathname.startsWith('/editSong/')) {
      setTitle('Edit Song');
    }
  }, [location.pathname]);

  useEffect(() => {
    setTimeout(() => {
      setHomeIsOpen(false);
      setOpen(false);
    }, 300);
  }, [isHomeOpen]);

  function close() {
    setOpen(false);
  }

  function closeHome() {
    navigate("/");
    setHomeIsOpen(true);
  }

  return (
    <>
      <SmallScreenSidebar
        openMobileNav={open}
        onClick={close}
        onClickHome={closeHome}
      />
      <div className="container">
        <div className="nav-bar">
          <span className="title">{title}</span>
          <div className="search-container">
            {location.pathname === "/" && (
              <IoIosSearch className="search-icon" />
            )}
            <input
              value={search}
              type="text"
              className="search-input"
              placeholder="Search Songs & artists here..."
              onChange={(e) => dispach(setSearch(e.target.value))}
              style={{
                display: location.pathname === "/" ? "block" : "none",
              }}
            />
          </div>
          <TbMenu2
            className="menu-icon"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="search-container-second">
          {location.pathname === "/" && (
            <IoIosSearch className="search-icon" />
          )}
          <input
            value={search}
            type="text"
            className="search-input"
            placeholder="Search Songs & artists here..."
            onChange={(e) => dispach(setSearch(e.target.value))}
            style={{
              display: location.pathname === "/" ? "block" : "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
