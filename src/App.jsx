import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function App() {
  // State for team members' data
  const [teamMembers, setTeamMembers] = useState([
    { name: "John Doe", interest: "Area of Interest1", career:"Cybersecurity", address: "New York, USA", lat: 40.7128, lng: -74.0060, image: "/images/avatar.jpg"},
    { name: "Jane Smith", interest: "Area of Interest2", career:"Biology", address: "London, UK", lat: 51.5074, lng: -0.1278, image: "/images/avatar2.jpg" },
    { name: "Maria Garcia", interest: "Area of Interest3", career:"Climate Security", address: "Madrid, Spain", lat: 40.4168, lng: -3.7038, image: "/images/avatar3.jpg" },
    { name: "Mikk", interest: "Area of Interest3", career:"Intelligence", address: "Viljandi, Estonia", lat: 58.3639, lng: 25.5900, image: "/images/avatar6.jpg" },
  ]);

  // State for the currently selected team member
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  // State for storing markers
  const [markers, setMarkers] = useState([]);

  // Create custom triangle icon for the markers
  const createTriangleIcon = (color) => {
    return L.divIcon({
      className: "triangle-icon",
      html: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 20,0 10,20" fill="${color}" />
              </svg>`,
      iconSize: [30, 30],
      iconAnchor: [10, 20],
    });
  };

  // Handle next and previous buttons
  const goToNext = () => {
    const nextIndex = teamMembers.indexOf(selectedMember) + 1;
    if (nextIndex < teamMembers.length) {
      const nextMember = teamMembers[nextIndex];
      setSelectedMember(nextMember);
      updateMarker(nextMember);
    }
  };

  const goToPrev = () => {
    const prevIndex = teamMembers.indexOf(selectedMember) - 1;
    if (prevIndex >= 0) {
      const prevMember = teamMembers[prevIndex];
      setSelectedMember(prevMember);
      updateMarker(prevMember);
    }
  };

  // Update the marker color when the selected member changes
  const updateMarker = (newSelectedMember) => {
    // Reset the color of all markers
    markers.forEach((marker) => {
      marker.setIcon(createTriangleIcon("#F2547C"));
    });

    // Find and highlight the marker for the selected member
    const markerIndex = teamMembers.indexOf(newSelectedMember);
    if (markers[markerIndex]) {
      markers[markerIndex].setIcon(createTriangleIcon("#30D5C8"));
    }
  };

  // Initialize the map with Leaflet
  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false, // Disable default Leaflet attribution
    }).setView([51.505, -0.09], 2); // Default world view

    const Toner = L.tileLayer(
      "https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=k9wvjSleDxq0bkfe2tsg",
      {
        minZoom: 2,
        maxZoom: 10,
        ext: "png",
      }
    );
    Toner.addTo(map);

    L.control
      .attribution({
        position: "bottomright",
      })
      .addAttribution(
        `<a href="https://maptiler.com/" target="_blank" style="text-decoration: none;">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler" style="height: 20px; vertical-align: middle;" />
        </a>`
      )
      .addTo(map);

    // Create markers for team members
    const newMarkers = [];
    teamMembers.forEach((member) => {
      if (member.lat && member.lng) {
        const marker = L.marker([member.lat, member.lng], {
          icon: createTriangleIcon("#F2547C"),
          popupAnchor: [0, -20],
        }).addTo(map);

        // Add the marker to the array
        newMarkers.push(marker);

        // Add click event to update the selected member
        marker.on("click", () => {
          // Reset color of all markers
        newMarkers.forEach((m) => {
          m.setIcon(createTriangleIcon("#F2547C"));
        });

          // Set the clicked marker's color to turquoise
          marker.setIcon(createTriangleIcon("#30D5C8"));
          setSelectedMember(member); // Update the selected member
          updateMarker(member); // Update the marker color
        });
      }
    });

    // Update markers state
    setMarkers(newMarkers);

    // Cleanup map instance when component unmounts
    return () => {
      map.remove();
    };
  }, [teamMembers]);

  return (
    <div className="main-container">
      <div className="wrapper-container">
        <div id="map" className="map-container"></div>
        {selectedMember && (
          <div className="people-slider">
            <div className="heading-wrapper">
              <h2 className="slider-title">Our Community</h2>
            </div>
            <div className="slider-wrap">
              <div className="data-slider">
                <div className="image">
                  <img className="slider-image" src={selectedMember.image} alt="slider-image" loading="lazy" />
                  <button onClick={goToPrev} disabled={teamMembers.indexOf(selectedMember) === 0} className="slider-btn-prev">
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button onClick={goToNext} disabled={teamMembers.indexOf(selectedMember) === teamMembers.length - 1} className="slider-btn-next">
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
                <div className="text">
                  <div className="name">{selectedMember.name}</div>
                  <p className="interest">{selectedMember.interest}</p>
                  <div className="career">{selectedMember.career}</div>
                  <div className="location"><i className="fa-solid fa-location-dot"></i>{selectedMember.address}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
