
import React, { useEffect, useState } from 'react';
import PrayerList from './component/PrayerList';
// import Prayer from './component/prayer';

import HeaderSection from './component/HeaderSection';

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");

  // 1. State للدولة والمدينة المختارة
  const [selectedCountry, setSelectedCountry] = useState("Egypt");
  const [selectedCity, setSelectedCity] = useState("Cairo");

  // 2. قائمة بالدول (كمثال)
  const countries = [
    { name: "مصر", value: "Egypt" },
    { name: "السعودية", value: "Saudi Arabia" },
  ];

  // 3. قائمة بالمدن (كمثال، يجب أن تتغير بناءً على الدولة)
  // في تطبيق حقيقي، هذه القائمة ستُجلب من API
  const cities = {
   
      Egypt: [
        { name: "القاهرة", value: "Cairo" },
        { name: "الجيزة", value: "Giza" },
        { name: "الإسكندرية", value: "Alexandria" },
        { name: "القليوبية", value: "Qalyubia" },
        { name: "بورسعيد", value: "Port Said" },
        { name: "الإسماعيلية", value: "Ismailia" },
        { name: "السويس", value: "Suez" },
        { name: "دمياط", value: "Damietta" },
        { name: "الدقهلية", value: "Dakahlia" },
        { name: "الشرقية", value: "Sharqia" },
        { name: "الغربية", value: "Gharbia" },
        { name: "المنوفية", value: "Monufia" },
        { name: "البحيرة", value: "Beheira" },
        { name: "كفر الشيخ", value: "Kafr El Sheikh" },
        { name: "الفيوم", value: "Fayoum" },
        { name: "بني سويف", value: "Beni Suef" },
        { name: "المنيا", value: "Minya" },
        { name: "أسيوط", value: "Assiut" },
        { name: "سوهاج", value: "Sohag" },
        { name: "قنا", value: "Qena" },
        { name: "الأقصر", value: "Luxor" },
        { name: "أسوان", value: "Aswan" },
        { name: "مطروح", value: "Matrouh" },
        { name: "شمال سيناء", value: "North Sinai" },
        { name: "جنوب سيناء", value: "South Sinai" },
        { name: "البحر الأحمر", value: "Red Sea" },
        { name: "الوادي الجديد", value: "New Valley" }
    ],
    "Saudi Arabia": [
      { name: "الرياض", value: "Riyadh" },
      { name: "جدة", value: "Jeddah" },
      { name: "مكة المكرمة", value: "Makkah" },
      { name: "المدينة المنورة", value: "Madinah" },
      { name: "الدمام", value: "Dammam" },
      { name: "الخبر", value: "Khobar" },
      { name: "الظهران", value: "Dhahran" },
      { name: "الطائف", value: "Taif" },
      { name: "ينبع", value: "Yanbu" },
      { name: "تبوك", value: "Tabuk" },
      { name: "أبها", value: "Abha" },
      { name: "خميس مشيط", value: "Khamis Mushait" },
      { name: "جيزان", value: "Jizan" },
      { name: "نجران", value: "Najran" },
      { name: "حائل", value: "Hail" },
      { name: "الباحة", value: "Baha" },
      { name: "عرعر", value: "Arar" },
      { name: "سكاكا", value: "Sakaka" },
      { name: "القصيم", value: "Qassim" },
      { name: "الجوف", value: "Jouf" }
    ]
  };
    
  const convertTo12HourFormat = (time24) => {
    if (!time24) return "00:00";
    const [hours, minutes] = time24.split(':');
    const hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? 'PM' : 'AM';
    const hours12 = hoursInt % 12 || 12; // تحويل الساعة 0 إلى 12
    const paddedHours = hours12 < 10 ? '0' + hours12 : hours12;
    return `${paddedHours}:${minutes} ${ampm}`;
  };
 

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (selectedCountry && selectedCity) {
        try {
          // 4. تحديث رابط الـ API ليشمل الدولة والمدينة
          const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}`);
          const data = await response.json();
          setPrayerTimes(data.data.timings);
          setDateTime(data.data.date.gregorian.date);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPrayerTimes();
  }, [selectedCity, selectedCountry]); // يعمل عند تغيير المدينة أو الدولة

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    // عند تغيير الدولة، قم بتعيين المدينة الافتراضية الأولى لهذه الدولة
    setSelectedCity(cities[newCountry][0].value);
  };


  return ( 
    <section>
      <div className="container">
      <HeaderSection
          countries={countries}
          cities={cities}
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          dateTime={dateTime}
          onCountryChange={setSelectedCountry}
          onCityChange={setSelectedCity}
        />

         <PrayerList 
          prayers={prayerTimes} 
          convertTime={convertTo12HourFormat}
        />
      </div>
    </section>
  );
}

export default App;