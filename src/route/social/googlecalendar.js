import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

// https://fullcalendar.io/docs/google-calendar
export default function Calendarpg() {
// Apikey는 환경 변수를 이용해 숨겼다
  //const apiKey = process.env.REACT_APP_CAL_API_KEY;
   const apiKey='AIzaSyARuGhCq-zIorRLrzi9Ba7tb0FUhL_0crc';
  return (
    <div className="cal-container">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
       
        googleCalendarApiKey={apiKey}
        events={{
          googleCalendarId: 'seunghyeon3145@gmail.com',
        }}
        eventDisplay={'block'}
        eventTextColor={'#FFF'}
        eventColor={'#F2921D'}
        height={'290px'}
        
      />
    </div>
  );
}

