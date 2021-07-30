import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December' ],
  datasets: [
    {
      label: 'Service Requests',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function LineChart() 
{
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Service requests handles per month',
              fontSize:10
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }