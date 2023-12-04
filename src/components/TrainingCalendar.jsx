import  { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TrainingCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTraining();
  }, []);

  const fetchTraining = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error('Error fetching training: ' + response.statusText);
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  };

  const events = trainings.map(training => {
    const start = new Date(training.date);
    const end = dayjs(start).add(training.duration, 'minutes').toDate();

    return {
      title: training.activity,
      start: start,
      end: end,
      duration: training.duration,
    };
  });

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default TrainingCalendar;
