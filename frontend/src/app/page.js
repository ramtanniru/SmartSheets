"use client"
import DBTable from '@/components/DBTable';
import Profile from '@/components/Profile';
import { BACKEND_URL } from '@/utils/constants';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [data, setData] = useState([]);


  // socket connection
  useEffect(() => {
    socket = io(BACKEND_URL,{
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false,
    });
    
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('db_update', (data) => {
      console.log('Database updated:', data.status);
      fetchData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(BACKEND_URL+'/api/data');
      const result = await response.json();
      
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-row justify-center items-start w-full'>
      <Profile className='w-1/6 bg-yellow-300'/>
      <DBTable users = {data} className='w-5/6 m-10'/>
    </div>
  );
}
