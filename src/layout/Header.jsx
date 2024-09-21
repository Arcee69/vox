import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Vapi from '@vapi-ai/web';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CgSpinner } from 'react-icons/cg';
import { Listbox, Transition} from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io';


import Logo from "../assets/svg/logo.svg"
import ModalPop from '../components/modalPop';
import RequestForm from '../pages/Insight/RequestForm';
import { isObjectEmpty } from '../utils/CheckLoginData';
import SignUp from '../pages/Auth/SignUp';
import Login from '../pages/Auth/Login';

const solutions = [
  { name: 'Vox Reputation', link:"/vox-reputation" },
  { name: 'Vox Sentiment', link:"/vox-sentiment" },
  { name: 'VoxScribe', link:"/voxscribe" },
  { name: 'VoxRelease', link:"/voxrelease" },
  { name: 'VoxOver', link:"/voxover" },
  { name: 'VoxShield', link:"/vox-shield" },
 
]


const Header = () => {
  const [openConsultModal, setOpenConsultModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [selected, setSelected] = useState(solutions[0])

  // const [callStatus, setCallStatus] = useState('inactive')
  // const [voxData, setVoxData] = useState([]);
  // const [loading, setLoading] = useState(false)

  const showOpenSignUpModal = () => {
    setOpenLogin(false)
    setOpenSignUp(true)  
}


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
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative w-[150px] cursor-default flex items-center gap-2 py-2 pl-3 pr-10 text-left outline-none sm:text-sm" onClick={() => navigate("/solutions")}>
                        <span className="block truncate w-full text-[#FF6600]">Our Solutions</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IoIosArrowDown
                                className="h-5 w-5 text-[#FF6600]"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 w-[200px] max-h-60 z-50  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {solutions.map((item, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-[#E6F6F4] text-[#052011]' : 'text-[#052011]'
                                        }`
                                    }
                                    value={item}
                                >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                            } text-[#052011]`}
                                            onClick={() => navigate(item?.link)}
                                        >
                                            {item.name}
                                        </span>
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/pricing")}> Pricing</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => setOpenConsultModal(true)}>Contact Us</p>

            <div 
              id="header-menu" 
              aria-controls={open ? "header-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className={`${userName ? "h-[50px] w-[50px]" : " w-[200px] h-[54px]"} bg-[#FF6600] cursor-pointer rounded-3xl  p-2 flex items-center justify-center`}
              onClick={(event) => {!isAuthed ? handleClick(event) : setOpenLogin(true)}}
            >
              <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{userName ? `${userName?.slice(0, 1)}` : "Login"}</p>
            </div>
            <Menu
                id="header-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => navigate("/settings")}
                >
                    Settings
                </MenuItem>
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

        
      <ModalPop isOpen={openLogin}>
        <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal}/>
      </ModalPop>

      <ModalPop isOpen={openSignUp}>
        <SignUp handleClose={() => setOpenSignUp(false)}/>
      </ModalPop>
    </div>
  )
}

export default Header