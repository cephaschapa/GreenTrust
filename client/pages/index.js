import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { VscAccount, VscAdd, VscArchive, VscBook, VscChromeMaximize, VscChromeMinimize, VscDatabase, VscGithub, VscLayers, VscMail, VscMenu, VscWorkspaceTrusted } from 'react-icons/vsc'

export default function Home({data}) {
  const [btnText, setBtnTxt] = useState(false)
  const [btnText2, setBtnTxt2] = useState(false)
  const [email, setEmail] = useState('');
  const [names, setNames] = useState('');
  const [email1, setEmail1] = useState('');
  const [names1, setNames1] = useState('');
  const [plantName, setPlantName] = useState('');
  const [species, setSpecies] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [origin, setOrigin] = useState('');
  const [date, setDate] = useState('');
  const [connections, setConnections] = useState('');

  const handleInvitation = async (e) => {
    e.preventDefault();
    
    setBtnTxt2(true)

    const res = await axios.post('http://localhost:5000/createConnections',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data:{
        multiParty: false,
        name: "any",
        email: email1,
        fullName: names1
      }
    })

    if(res){
      setBtnTxt2(false)
    }
    
  }

  const handleCredential = async (e) => {
    setBtnTxt(true)
    e.preventDefault();
    console.log(connections)

    const res = await axios.post('http://localhost:5000/createCredential',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data:{
        fname: names,
        email: email,
        plantName: plantName,
        species: species,
        longitude: longitude,
        latitude: latitude,
        origin: origin,
        date: date,
        connectionId: connections
      }
    })

    if(res){
      setBtnTxt(false)
    }

    console.log(res)
    
  }

  return (
    <div>
      <Head>
        <title>GreenTrust</title>
        <meta name="description" content="Green Organization" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <header className='w-full py-5  fixed top-0 px-24 lg:px-52 h-20 bg-green-600 shadow-md'>
            <div className='flex  items-center h-full space-x-3'>
                <VscWorkspaceTrusted className='h-10 w-10 text-white'/>
                <p className='text-3xl text-white font-bold'>GreenTrust</p>
                <div className='w-full'>
                  <ul className='flex justify-end space-x-3 text-white font-bold text-xl'>
                    <Link href="#create">
                      <li className='p-3 transition duration-150 cursor-pointer rounded-full hover:bg-green-500'>Create Connection</li>
                    </Link>
                    <Link href="#certify">
                      <li className='p-3 transition duration-150 cursor-pointer rounded-full hover:bg-green-500'>Create Certificate</li>
                    </Link>
                    <Link href="#certify">
                      <li className='flex items-center space-x-1 p-3 transition duration-150 cursor-pointer rounded-full hover:bg-green-500'>
                        <VscGithub className='h-5 w-5 '/>
                        <span>Repo</span>
                      </li>
                    </Link>
                  </ul>
                </div>
            </div>
        </header>
      <main id='create' className="h-screen flex items-center justify-center w-full px-12">
        <div className=' border grid grid-cols-2 p-3 gap-2 shadow-md lg:w-3/4 h-[500px] rounded-2xl'>
            <div className='flex flex-col border-r justify-center items-center w-full h-full px-5'>
              <form className='w-full space-y-3 lg:px-5 opacity-100 transition duration-200'>
                <h3 className='text-center  p-2 text-3xl font-bold text-slate-600'>SEND AN INVITATION</h3>
                <p className='text-center'>The recipient will accept and join a connction via a genrated url sent to this address</p>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscBook className='h-5 w-5'/>
                  <input value={names1} onChange={(e)=>setNames1(e.target.value)} type="text" placeholder="Partifipant's Name" className='w-full outline-none'/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500 rounded-full'>
                  <VscAccount className='h-5 w-5'/>
                  <input value={email1} onChange={(e)=>setEmail1(e.target.value)} type="email" placeholder="Partifipant's Email" className='w-full outline-none'/>
                </div>
                
                <button onClick={handleInvitation} className='bg-green-600 w-full p-3 rounded-full font-bold text-white'>
                {
                    btnText2 ? 'Processing...': 'INVITE'
                  }
                </button>
              </form>
            </div>
            <div className='bg-white w-full h-full rounded-2xl svg-background'>
              
            </div>
        </div>

        
      </main>
      <section id='certify' className='h-screen flex lg:px-52 justify-center w-full px-24 md:px-12'>
        <div className=' border grid grid-cols-2 mt-20 p-3 gap-2 shadow-md w-full h-[800px] rounded-2xl'>
            <div className='flex flex-col border-r justify-center items-center w-full h-full px-5'>
              <form className='w-full space-y-3 '>
                <h3 className='text-center  p-2 text-3xl font-bold text-slate-600'>ISSUE A CREDENTIAL</h3>
                <p className='text-center'>Issue a certificate to a connected partifipant.</p>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscAdd className='h-5 w-5'/>
                  <select value={connections} onChange={(e)=>setConnections(e.target.value)} type="text" placeholder="Connection" className='w-full outline-none' required>
                    <option selected>Select Connection</option>
                    {
                      data.map((conn, i)=>{
                        return(
                          <option key={i} value={conn.connectionId}>
                            {conn.name}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscBook className='h-5 w-5'/>
                  <input value={names} onChange={(e)=>setNames(e.target.value)} type="text" placeholder="Partifipant's Name" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500 rounded-full'>
                  <VscMail className='h-5 w-5'/>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Participant's Email" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscArchive className='h-5 w-5'/>
                  <input value={plantName} onChange={(e)=>setPlantName(e.target.value)} type="text" placeholder="Plant Name" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscChromeMinimize className='h-5 w-5'/>
                  <input value={species} onChange={(e)=>setSpecies(e.target.value)} type="text" placeholder="Species" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscChromeMaximize className='h-5 w-5'/>
                  <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} type="text" placeholder="Longitude" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscLayers className='h-5 w-5'/>
                  <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} type="text" placeholder="Latitude" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscDatabase className='h-5 w-5'/>
                  <input value={origin} onChange={(e)=>setOrigin(e.target.value)} type="text" placeholder="Plant Origin" className='w-full outline-none' required/>
                </div>
                <div className='p-3 w-full flex space-x-3 items-center bg-white border border-slate-500  rounded-full'>
                  <VscBook className='h-5 w-5'/>
                  <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" placeholder="Date" className='w-full outline-none' required/>
                </div>
                
                <button onClick={handleCredential} className='bg-green-600 w-full p-3 rounded-full font-bold text-white'>
                  {
                    btnText ? 'Processing...': 'SUBMIT'
                  }
                </button>
              </form>
            </div>
            <div className='bg-white w-full h-full rounded-2xl svg-background'>
              
            </div>
        </div>
      </section>

      <footer className="bg-slate-600 p-5">
        <div className='flex items-center justify-center  w-full'>
            <p className='text-white text-xl'>GreenTrust &copy; 2022</p>
        </div>
      </footer>
    </div>
  )
}


export async function getServerSideProps () {
  const res = await axios.get('http://localhost:5000/getConnections?state=Connected',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    const data = res.data.data
    console.log(data)
    
    return {
      props: {
        data
      }
    }
}