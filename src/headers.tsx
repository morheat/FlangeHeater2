import React from "react";

interface headerProps {
  serialNum: string;
  title: string;
  material: string;
  voltage: string;
  phase: number;
  wattage: string;
  terminalBox: string;
  thermostat: string;
  elementNum: number;
  immersionLength: number;
  coldLength: number;
}

const Header: React.FC<headerProps> = ({
  serialNum,
  title,
  material,
  voltage,
  phase,
  wattage,
  //terminalBox,
  thermostat,
  elementNum,
  immersionLength,
  coldLength,

}) => {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(today);

  const wattsNum = Number(String(wattage).replace(/[^\d.]/g, ""));
  const voltsNum = Number(String(voltage).replace(/[^\d.]/g, ""));

  const amps =
    wattsNum > 0 && voltsNum > 0
      ? phase === 3
        ? wattsNum / voltsNum / 1.73
        : wattsNum / voltsNum
      : null;

  // 4) Wattage formatting: 5000W vs 10kW
  const wattageDisplay =
    wattsNum > 0
      ? wattsNum >= 10000
        ? `${(wattsNum / 1000).toFixed(wattsNum % 1000 === 0 ? 0 : 1)} kW`
        : `${wattsNum.toFixed(0)} W`
      : "";

  // 5) Watt density (W/in^2)
  const heatedLength = immersionLength - coldLength;

  const wattDensity =
    wattsNum > 0 && elementNum > 0 && heatedLength > 0
      ? wattsNum / (0.475 * Math.PI * elementNum * heatedLength * 2)
      : null;


  return (
    <div className="absolute text-black flex">
      <div className="absolute w-[9.5rem] mt-[210px] ml-[112px] flex justify-center items-center translate-x-[-50%] text-center">
        {serialNum}
      </div>
      <div className="absolute h-16 w-[18rem] mt-[270px] ml-[331.5px] flex justify-center translate-x-[-50%] text-center text-xl font-bold">
        {title}
      </div>
      <div className="absolute h-16 w-[18rem] mt-[295px] ml-[112px] flex justify-center translate-x-[-50%] text-center text-xl ">
        {material}
      </div>
      <div className="absolute h-16 w-[18rem] mt-[265px] ml-[112px] flex justify-center translate-x-[-50%] text-center">
        {formattedDate}
      </div>
      <div className="absolute w-[18rem] mt-[230px] ml-[-420px] ">
        {thermostat !== "" && (
          <div className="">Using {" " + thermostat + " "} thermostat</div>
        )}
        <div>
          Voltage: {voltage}
          {" V"}
        </div>
        <div>
          Phase: {phase}
          {" PH"}
        </div>
        <div>
          Amps: {amps === null ? "" : amps.toFixed(2)}
          {" A"}
        </div>
        <div>Wattage: {wattageDisplay}</div>
        <div>
          Watt Density: {wattDensity === null ? "" : wattDensity.toFixed(2)}
          {" W/in\u00B2"}
        </div>
      </div>
    </div>
  );
};

export default Header;
