import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Vapi from '@vapi-ai/web';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CgSpinner } from 'react-icons/cg';

import Logo from "../assets/svg/logo.svg"
import ModalPop from '../components/modalPop';
import RequestForm from '../pages/Insight/RequestForm';
import { isObjectEmpty } from '../utils/CheckLoginData';

const Header = () => {
  const [openConsultModal, setOpenConsultModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("")

  // const [callStatus, setCallStatus] = useState('inactive')
  // const [voxData, setVoxData] = useState([]);
  // const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const logOut = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userObj")
      navigate("/")
  }
  const userData = JSON.parse(localStorage.getItem("userObj"))
  console.log(userData, "userData")

  const getUserName = () => {
    if(userData) {
      setUserName(userData?.data?.name)
    } else {
      setUserName(null)
    }
  }

  useEffect(() => {
    getUserName()
  }, [userData])


  
  const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

  // console.log(isAuthed, "isAuthed")



  // const vapi = new Vapi('5d3d4e5d-3f85-4af4-8dae-9d6527d525fc');

  // const start = async () => {
  //   setCallStatus("loading");
  //   setLoading(true);
  //   const response = await vapi.start("1aa24789-cabd-46b4-a5a8-af5a819ac810");
  //   setLoading(false);
  //   setVoxData(response)
  //   console.log(response.status, "brymo")
  //   return response
  // };

  // const stop = () => {
  //   setCallStatus("loading");
  //   vapi.stop();
  // };

  // useEffect(() => {
  //   vapi.on("call-start", () => setCallStatus("active"));
  //   vapi.on("call-end", () => setCallStatus('inactive'));
    
  //   return () => vapi.removeAllListeners();
  // }, [])

  return (
    <div 
      className='w-full h-[120px] py-[26px] px-[100px] flex items-center justify-between' 
    >
        <img src={Logo} alt='logo' onClick={() => navigate("/")} className='cursor-pointer'/>
        <div className='flex items-center gap-[48px]'>
            <p className='text-BLACK-_100 cursor-pointer font-poppins' onClick={() => navigate("/")}>Home</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/insight-engine")}>Insight Engine</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/sentiment-decoder")}> Sentiment Decoder</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/pricing")}> Pricing</p>
            <div 
              id="header-menu" 
              aria-controls={open ? "header-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className='bg-[#FF6600] cursor-pointer rounded-3xl w-[200px]  p-2 flex items-center justify-center h-[54px]' 
              onClick={(event) => {!isAuthed ? handleClick(event) : setOpenConsultModal(true)}}
            >
              <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{userName ? `Hi ${userName?.slice(0, 5)}` : "Get In Touch"}</p>
            </div>
            <Menu
                id="header-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => logOut()}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>

        <ModalPop isOpen={openConsultModal}>
          <RequestForm  handleClose={() => setOpenConsultModal(false)}/>
        </ModalPop>
    </div>
  )
}

export default Header