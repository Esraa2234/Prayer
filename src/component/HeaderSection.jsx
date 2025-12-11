import React from "react";

function HeaderSection({
  countries,
  cities,
  selectedCountry,
  selectedCity,
  dateTime,
  onCountryChange,
  onCityChange
}) {
  return (
    <div className="top-sec">
      
      {/* الدولة */}
      <div className="city">
        <h3>الدولة</h3>
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.value}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* المدينة */}
      <div className="city">
        <h3>المدينة</h3>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
        >
          {cities[selectedCountry]?.map((city, index) => (
            <option key={index} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* التاريخ */}
      <div className="date">
        <h3>التاريخ</h3>
        <h4>{dateTime}</h4>
      </div>

    </div>
  );
}

export default HeaderSection;
