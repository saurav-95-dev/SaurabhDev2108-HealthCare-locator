import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const handleButtonClick = async (location) => {
    setSelectedLocation(location);

    try {
      let response;
      if (location === 'Current Location') {
        // Fetch nearby hospitals based on current geolocation
        const { latitude, longitude } = selectedLocation;
        response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            format: 'json',
            q: 'hospital',
            lat: latitude,
            lon: longitude,
            addressdetails: 1,
            limit: 10, // Limiting to 10 results
          },
        });
      } else {
        // Fetch nearby hospitals based on the selected city
        response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            format: 'json',
            q: `hospital, ${location}`,
            addressdetails: 1,
            limit: 10, // Limiting to 10 results
          },
        });
      }
      setNearbyHospitals(response.data);
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ latitude, longitude }, () => {
            handleButtonClick('Current Location');
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
      <h1 className="address">LOCATE HEALTHCARE CENTERS AND HOSPITALS<br></br><br></br>(Click a button to locate on Map)</h1>
      <div className="buttons-container">
        <button className="button" onClick={() => handleButtonClick('Noida')}>For Noida</button>
        <button className="button" onClick={() => handleButtonClick('Delhi')}>For Delhi</button>
        <button className="button" onClick={() => handleButtonClick('Hyderabad')}>For Hyderabad</button>
        <button className="button" onClick={() => handleButtonClick('Chennai')}>For Chennai</button>
        <button className="button" onClick={() => handleButtonClick('Gujarat')}>For Gujarat</button>
        {/* <button className="button" onClick={() => handleButtonClick('Bihar')}>For Bihar</button> */}
      </div>

      <button className="button use-location-button" onClick={handleUseMyLocation}>Use My Current Location</button>

      <div className='map-container'>
        {selectedLocation && (
          <>
            <iframe
              title="Selected Location Map"
              className="map"
              src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d112135.57351471338!2d${selectedLocation.longitude}!3d${selectedLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${selectedLocation}%20hospitals!5e0!3m2!1sen!2sin!4v1711909622873!5m2!1sen!2sin`}
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {nearbyHospitals.length > 0 && (
              <>
                <h2>Nearby Hospitals:</h2>
                <ul className="hospitals-list">
                  {nearbyHospitals.map((hospital, index) => (
                    <li key={index}>{hospital.display_name}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
