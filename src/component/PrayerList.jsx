
import React from "react";
import Prayer from "./prayer";

function PrayerList({ prayers, convertTime }) {
  return (
    <>
      <Prayer name="الفجر" time={convertTime(prayers.Fajr)} />
      <Prayer name="الظهر" time={convertTime(prayers.Dhuhr)} />
      <Prayer name="العصر" time={convertTime(prayers.Asr)} />
      <Prayer name="المغرب" time={convertTime(prayers.Maghrib)} />
      <Prayer name="العشاء" time={convertTime(prayers.Isha)} />
    </>
  );
}

export default PrayerList;
