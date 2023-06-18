import React, { useState } from 'react';
import './style.css'

const Process3 = () => {
  // Define time slots and student names
  const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM']; // Define your time slots here
  const studentNames = ['John Doe', 'Jane Smith', 'Mike Johnson']; // Define student names here

  // Initialize state for selected time slots
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Handle time slot selection
  const handleTimeSlotSelection = (timeSlotIndex, studentName) => {
    // Check if the selected slot is already taken
    if (selectedSlots.includes(timeSlotIndex)) {
      console.log('Selected time slot is already taken. Please choose a different slot.');
      return;
    }

    // Make a request to backend API to save the selected time slot for the student
    // Example:
    // fetch(`/api/students/${studentId}/timeslot`, {
    //   method: 'POST',
    //   body: JSON.stringify({ timeSlot: timeSlotIndex }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success or display any messages to the user
    //   setSelectedSlots([...selectedSlots, timeSlotIndex]);
    // })
    // .catch(error => {
    //   // Handle error or display error messages to the user
    // });

    setSelectedSlots([...selectedSlots, timeSlotIndex]);
  };

  return (
    <div>
      <h1>Time Slot Page</h1>
      <table className="time-slot-table">
        <thead>
          <tr>
            <th>Time Slot</th>
            <th>Student Name</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, index) => (
            <tr key={index} className={selectedSlots.includes(index) ? 'selected' : ''}>
              <td>{timeSlot}</td>
              <td>
                {selectedSlots.includes(index) ? (
                  studentNames[selectedSlots.indexOf(index)]
                ) : (
                  <button onClick={() => handleTimeSlotSelection(index, studentNames[index])}>
                    Select
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Process3;
