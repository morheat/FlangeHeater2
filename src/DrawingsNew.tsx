import React, { useMemo} from "react";
import Header from "./headers";

import Titlebox from "./assets/TITLE.svg?react";
import LOGO from "./assets/LOGO.svg?react";

// Your ONE static full drawing SVG (10-inch config)
import Layout10 from "./assets/10in-N14.svg?react";
import Layout10N7 from "./assets/10in-N7.svg?react";

import Layout3_N14_E3 from "./assets/3in-N14-3E.svg?react";
import Layout3_N14_E6 from "./assets/3in-N14-6E.svg?react";
import Layout3_N7_E3 from "./assets/3in-N7-3E.svg?react";
import Layout3_N7_E6 from "./assets/3in-N7-6E.svg?react"; 

import Layout4_N14_E6 from "./assets/4in-N14-6E.svg?react";
import Layout4_N14_E9 from "./assets/4in-N14-9E.svg?react";
import Layout4_N7_E6 from "./assets/4in-N7-6E.svg?react";
import Layout4_N7_E9 from "./assets/4in-N7-9E.svg?react"; 

import Layout5_N1 from "./assets/5in-N1.svg?react";
import Layout5_N4 from "./assets/5in-N4.svg?react";
import Layout5_N7 from "./assets/5in-N7.svg?react";

import Layout6_N1 from "./assets/6in-N1.svg?react";
import Layout6_N4 from "./assets/6in-N4.svg?react";
import Layout6_N7 from "./assets/6in-N7.svg?react";

import Layout8_N1 from "./assets/8in-N1.svg?react";
import Layout8_N4 from "./assets/8in-N4.svg?react";
import Layout8_N7 from "./assets/8in-N7.svg?react";

import Layout12_N1 from "./assets/12in-N1.svg?react";
import Layout12_N4 from "./assets/12in-N4.svg?react";
import Layout12_N7 from "./assets/12in-N7.svg?react";


interface drawingProps {
  drawingRef: React.RefObject<HTMLDivElement>;
  serialNum: string;
  title: string;
  flangeSize: number;
  phase: number;
  lengthElement: number;
  foldLength: number;
  elementNum: number;
  processTemp: string;
  hlSensor: string;
  typeThermostat: string;
  thermoLength: number;
  hlLength: number;
  material: string;
  voltage: string;
  wattage: string;
  terminalBox: string;
  coldLength: number;
  processRange: string;
}

const Drawings10: React.FC<drawingProps> = ({
  drawingRef,
  serialNum,
  title,
  flangeSize,
  phase,
  lengthElement,
  elementNum,
  material,
  voltage,
  wattage,
  terminalBox,
  typeThermostat,
  hlSensor, // ✅ needed
  hlLength,
  processTemp, // (optional later)
  thermoLength,
  coldLength,
  processRange
}) => {
  const showHL = hlSensor !== "nHL";
  const showProcess = processTemp !== "nT";
  const elementNumN = Number(elementNum);
  const showColdDim = coldLength > 0;

  // Only enable 10-inch for now
  // ❌ DON'T gate the UI with this anymore if you want 3-inch too
  // const is10in = flangeSize === 10;

  // N7 vs N1/N4
  const isN7 = terminalBox === "N7";

  // const TITLEBOX_H = 190;        // adjust this until the title block fits perfectly
  // const DRAWING_Y_OFFSET = 0;    // negative = move drawing up, positive = move down


  // pick correct drawing
  const LayoutSVG = useMemo(() => {
    // ----- 10 inch -----
    if (flangeSize === 10) {
      return isN7 ? Layout10N7 : Layout10;
    }

    // ----- 3 inch -----
    if (flangeSize === 3) {
      if (elementNumN === 3) return isN7 ? Layout3_N7_E3 : Layout3_N14_E3;
      if (elementNumN === 6) return isN7 ? Layout3_N7_E6 : Layout3_N14_E6;
      return null;
    }

    // ----- 4 inch -----

    if (flangeSize === 4) {
      if (elementNumN === 6) return isN7 ? Layout4_N7_E6 : Layout4_N14_E6;
      if (elementNumN === 9) return isN7 ? Layout4_N7_E9 : Layout4_N14_E9;
      return null;
    }

    // ----- 5 inch -----
    if (flangeSize === 5) {
      if (terminalBox === "N1") return Layout5_N1;
      if (terminalBox === "N4") return Layout5_N4;
      if (terminalBox === "N7") return Layout5_N7;
      return null;
    }

    // ----- 6 inch -----
    if (flangeSize === 6) {
      if (terminalBox === "N1") return Layout6_N1;
      if (terminalBox === "N4") return Layout6_N4;
      if (terminalBox === "N7") return Layout6_N7;
      return null;
    }

    // ----- 8 inch -----
    if (flangeSize === 8) {
      if (terminalBox === "N1") return Layout8_N1;
      if (terminalBox === "N4") return Layout8_N4;
      if (terminalBox === "N7") return Layout8_N7;
      return null;
    }

    // ----- 12 inch -----
    if (flangeSize === 12) {
      if (terminalBox === "N1") return Layout12_N1;
      if (terminalBox === "N4") return Layout12_N4;
      if (terminalBox === "N7") return Layout12_N7;
      return null;
    }


    return null;
  }, [flangeSize, elementNumN, terminalBox, isN7]);

  // What you want displayed as the immersion number
  const immersionText = useMemo(() => {
    if (!lengthElement || Number.isNaN(Number(lengthElement))) return "";
    return `${lengthElement}"`;
  }, [lengthElement]);

  const showThermowellDim = processTemp !== "nT" && thermoLength > 0;
  const showHLDim = hlSensor !== "nHL" && hlLength > 0;

// --- label text helpers ---
const terminalBoxLabel = useMemo(() => {
  if (terminalBox === "N1") return "NEMA 1 Terminal Box";
  if (terminalBox === "N4") return "NEMA 4 Terminal Box";
  if (terminalBox === "N7") return "NEMA 7 Terminal Box";
  return "Terminal Box";
}, [terminalBox]);

const flangeLabel = useMemo(() => {
  // edit wording if you want “150# RF” etc.
  return `${flangeSize}" 150# Flange`;
}, [flangeSize]);

const hlDimLabel = useMemo(() => {
  if (hlSensor === "HLTC") return "High-Limit Thermocouple";
  if (hlSensor === "HLTS") return "High-Limit Thermostat";
  return "High-Limit";
}, [hlSensor]);

  const cToF = (c: number) => (c * 9) / 5 + 32;
  const fToC = (f: number) => ((f - 32) * 5) / 9;

  const processThermowellLabel = useMemo(() => {
    if (processTemp === "nT") return "";

    if (processTemp === "J") return "Process Thermowell\nType J Thermocouple";
    if (processTemp === "K") return "Process Thermowell\nType K Thermocouple";
    if (processTemp === "RTD") return "Process Thermowell\nRTD";

    // thermostat cases
    const range = processRange || "";

    if (processTemp === "SPST") {
      // stored like "C:0,40"
      const m = range.match(/^C:(-?\d+),(-?\d+)$/);
      if (!m) return "Process Thermowell\nSPST Thermostat";
      const c1 = Number(m[1]);
      const c2 = Number(m[2]);
      const f1 = Math.round(cToF(c1));
      const f2 = Math.round(cToF(c2));
      return `Process Thermowell\nSPST Thermostat\n${c1}–${c2}°C (${f1}–${f2}°F)`;
    }

    if (processTemp === "DPST") {
      // stored like "F:0,100"
      const m = range.match(/^F:(-?\d+),(-?\d+)$/);
      if (!m) return "Process Thermowell\nDPST Thermostat";
      const f1 = Number(m[1]);
      const f2 = Number(m[2]);
      const c1 = Math.round(fToC(f1));
      const c2 = Math.round(fToC(f2));
      return `Process Thermowell\nDPST Thermostat\n${f1}–${f2}°F (${c1}–${c2}°C)`;
    }

    return "Process Thermowell";
  }, [processTemp, processRange]);

type LeaderCfg = {
  left: string;
  bottom: string;
  rotate: number;
  lineHeight: number;
  textOffsetY: number;
  textWidth?: number;
  textRotate?: number; // lets you rotate text separately if you want
};

  // =========================
  // CONFIGS 
  // =========================

  //10in
  const cfg10N14 = {
    processBar: { left: "57%", bottom: "45%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 40, lineHeight: 205, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "57%", bottom: "25%", width: "18%", height: "2%" },
    hlLeader: {left: "70%", bottom: "-5%", rotate: 10, lineHeight: 19, textOffsetY: 6},
    hlDim: { left: "57%", bottom: "-35%", width: "18%", dropHeight: 125 },
    
    terminalBoxLeader: { left: "43%", bottom: "-18%", rotate: 25, lineHeight: 55, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "54.5%", bottom: "-45%", rotate: 0, lineHeight: 95, textOffsetY: 6, textWidth: 220, textRotate:0 },

    elemMatLeader: { left: "86%", bottom: "-21%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "7%" },

    thermoDim: { left: "57%", bottom: "56%", width: "18%", dropHeight: 25 },

    coldDim: { left: "57%", bottom: "-8%", width: "5%", riseHeight: 62 },
  };

  const cfg10N7 = {
    // ✅ change these independently for N7 (up/down = bottom, left/right = left)
    processBar: { left: "53.5%", bottom: "44%", width: "18%", height: "4%" }, //Blue Bar
    processLeader: { left: "80%", bottom: "110%", rotate: 40, lineHeight: 240, textOffsetY: 6, textWidth: 170, textRotate: 0},

    hlBar: { left: "53.5%", bottom: "19.5%", width: "18%", height: "2%" }, //yello Bar
    hlDim: { left: "53.5%", bottom: "-25%", width: "18%", dropHeight: 105 },

    hlLeader: { left: "65%", bottom: "-7%", rotate: 10, lineHeight: 28, textOffsetY: 0},

    terminalBoxLeader: { left: "40%", bottom: "-11%", rotate: 25, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51.5%", bottom: "-32%", rotate: 0, lineHeight: 88, textOffsetY: 0, textWidth: 220, textRotate:0 },

    elemMatLeader: { left: "85%", bottom: "-12%", rotate: 10, lineHeight: 30, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "17%" }, //Length text

    thermoDim: { left: "53.5%", bottom: "60%", width: "18%", dropHeight: 70 },

    coldDim: { left: "53.5%", bottom: "-9%", width: "5%", riseHeight: 62 },
  };

  //3in
  const cfg3N14_E3 = {
    processBar: { left: "53.25%", bottom: "44.5%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "100%", rotate: 50, lineHeight: 205, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "53.25%", bottom: "32.5%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-10%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "53.25%", bottom: "-35%", width: "18%", dropHeight: 150 },

    terminalBoxLeader: { left: "40%", bottom: "-18%", rotate: 25, lineHeight: 45, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51%", bottom: "-45%", rotate: 0, lineHeight: 90, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-13%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "25%" },

    thermoDim: { left: "53.25%", bottom: "46%", width: "18%", dropHeight: 80 },

    coldDim: { left: "53.25%", bottom: "-0%", width: "5%", riseHeight: 62 },
  };

  const cfg3N14_E6 = {
    processBar: { left: "52%", bottom: "47%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "100%", rotate: 50, lineHeight: 215, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "52%", bottom: "36%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-3%", rotate: 10, lineHeight: 60, textOffsetY: 0},
    hlDim: { left: "52%", bottom: "-28%", width: "18%", dropHeight: 155 },

    terminalBoxLeader: { left: "38%", bottom: "-11%", rotate: 25, lineHeight: 45, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "49.5%", bottom: "-35%", rotate: 0, lineHeight: 90, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "25%" },

    thermoDim: { left: "52%", bottom: "46%", width: "18%", dropHeight: 80 },

    coldDim: { left: "52%", bottom: "6%", width: "5%", riseHeight: 62 },
  };

  const cfg3N7_E3 = {
    processBar: { left: "52%", bottom: "46%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "100%", rotate: 50, lineHeight: 225, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "52%", bottom: "35%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-3%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "52%", bottom: "-25%", width: "18%", dropHeight: 150 },

    terminalBoxLeader: { left: "36%", bottom: "-10%", rotate: 25, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "49.5%", bottom: "-32%", rotate: 0, lineHeight: 85, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "25%" },

    thermoDim: { left: "52%", bottom: "46%", width: "18%", dropHeight: 80 },

    coldDim: { left: "52%", bottom: "6%", width: "5%", riseHeight: 62 },
  };

  const cfg3N7_E6 = {
    processBar: { left: "56%", bottom: "45%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "100%", rotate: 40, lineHeight: 205, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "56%", bottom: "36%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-.5%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "56%", bottom: "-25%", width: "18%", dropHeight: 160 },

    terminalBoxLeader: { left: "34%", bottom: "-10%", rotate: 25, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "53.5%", bottom: "-32%", rotate: 0, lineHeight:105, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-3%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "32%" },

    thermoDim: { left: "56%", bottom: "46%", width: "18%", dropHeight: 80 },

    coldDim: { left: "56%", bottom: "8%", width: "5%", riseHeight: 62 },
  };

  //4 inches
  const cfg4N7_E6 = {
    processBar: { left: "60.25%", bottom: "46%", width: "15%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 42, lineHeight: 180, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "60.25%", bottom: "36%", width: "15%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-12%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "60.25%", bottom: "-48%", width: "15%", dropHeight: 170 },

    terminalBoxLeader: { left: "44%", bottom: "-8%", rotate: 0, lineHeight: 22, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "58%", bottom: "-57%", rotate: 0, lineHeight: 105, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: 10, lineHeight: 30, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "28%" },

    thermoDim: { left: "60.25%", bottom: "46%", width: "15%", dropHeight: 80 },

    coldDim: { left: "60.25%", bottom: "-1%", width: "5%", riseHeight: 62 },
  };

  const cfg4N7_E9 = {
    processBar: { left: "60%", bottom: "44%", width: "15%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 40, lineHeight: 195, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "60%", bottom: "32%", width: "15%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-15%", rotate: 10, lineHeight: 65, textOffsetY: 0,},
    hlDim: { left: "60%", bottom: "-40%", width: "15%", dropHeight: 150 },

    terminalBoxLeader: { left: "43%", bottom: "-7%", rotate: 0, lineHeight: 22, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "58%", bottom: "-50%", rotate: 0, lineHeight: 100, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-7%", rotate: 10, lineHeight: 30, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "30%" },

    thermoDim: { left: "60%", bottom: "46%", width: "15%", dropHeight: 80 },

    coldDim: { left: "60%", bottom: "-2%", width: "5%", riseHeight: 62 },
  };

  const cfg4N14_E6 = {
    processBar: { left: "53%", bottom: "45%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 45, lineHeight: 225, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "53%", bottom: "34%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-8%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "53%", bottom: "-38%", width: "18%", dropHeight: 160 },

    terminalBoxLeader: { left: "38%", bottom: "-8%", rotate: 10, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "50.5%", bottom: "-45%", rotate: 0, lineHeight: 98, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-11.5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "12%" },

    thermoDim: { left: "53%", bottom: "46%", width: "18%", dropHeight: 35 },

    coldDim: { left: "53%", bottom: "1%", width: "5%", riseHeight: 62 },
  };

  const cfg4N14_E9 = {
    processBar: { left: "52.75%", bottom: "42%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 40, lineHeight: 250, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "52.75%", bottom: "30%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-7%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "52.75%", bottom: "-25%", width: "18%", dropHeight: 140 },

    terminalBoxLeader: { left: "38%", bottom: "-3%", rotate: 10, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "50.5%", bottom: "-33%", rotate: 0, lineHeight: 90, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-10%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73.5%", top: "20%" },

    thermoDim: { left: "52.75%", bottom: "47%", width: "18%", dropHeight: 30 },

    coldDim: { left: "52.75%", bottom: "1%", width: "5%", riseHeight: 62 },
  };

  // 5 inches
  const cfg5N1 = {
    processBar: { left: "53.5%", bottom: "43%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 42, lineHeight: 235, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "53.5%", bottom: "33%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-6%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "53.5%", bottom: "-28%", width: "18%", dropHeight: 145 },

    terminalBoxLeader: { left: "38%", bottom: "-8%", rotate: 25, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51%", bottom: "-35%", rotate: 0, lineHeight: 85, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "15%" },

    thermoDim: { left: "53.5%", bottom: "46%", width: "18%", dropHeight: 45 },

    coldDim: { left: "53.5%", bottom: "3%", width: "5%", riseHeight: 62 },
  };

  const cfg5N4 = {
    processBar: { left: "53%", bottom: "43%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "100%", rotate: 42, lineHeight: 245, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "53%", bottom: "34%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "1.5%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "53%", bottom: "-15%", width: "18%", dropHeight: 140 },

    terminalBoxLeader: { left: "38%", bottom: "1%", rotate: 25, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "50.5%", bottom: "-22%", rotate: 0, lineHeight: 85, textOffsetY: 0, textWidth: 220, textRotate:0 },
   
    elemMatLeader: { left: "85%", bottom: "-1%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "21.5%" },

    thermoDim: { left: "53%", bottom: "45%", width: "18%", dropHeight: 45 },

    coldDim: { left: "53%", bottom: "9%", width: "5%", riseHeight: 62 },
  };

  const cfg5N7 = {
    processBar: { left: "62.5%", bottom: "47%", width: "15%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 33, lineHeight: 190, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "62.5%", bottom: "38%", width: "15%", height: "2%" },
    hlLeader: { left: "72%", bottom: "-6%", rotate: 10, lineHeight: 70, textOffsetY: 0,},
    hlDim: { left: "62.5%", bottom: "-30%", width: "15%", dropHeight: 160 },

    terminalBoxLeader: { left: "45%", bottom: "-1%", rotate: 0, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "60.5%", bottom: "-40%", rotate: 0, lineHeight: 96, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "88%", bottom: "3%", rotate: 10, lineHeight: 30, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "80%", top: "30%" },

    thermoDim: { left: "62.5%", bottom: "46%", width: "15%", dropHeight: 80 },

    coldDim: { left: "62.5%", bottom: "7%", width: "5%", riseHeight: 62 },
  };


  // 6 inches
  const cfg6N1 = {
    processBar: { left: "54.25%", bottom: "42%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 43, lineHeight: 215, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "54.25%", bottom: "20%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-10%", rotate: 10, lineHeight: 22, textOffsetY: 0,},
    hlDim: { left: "54.25%", bottom: "-42%", width: "18%", dropHeight: 130 },

    terminalBoxLeader: { left: "40%", bottom: "-15%", rotate: 25, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "52%", bottom: "-50%", rotate: 0, lineHeight: 100, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-28%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "15%" },

    thermoDim: { left: "54.25%", bottom: "46%", width: "18%", dropHeight: 45 },

    coldDim: { left: "54.25%", bottom: "-14%", width: "5%", riseHeight: 62 },
  };

  const cfg6N4 = {
    processBar: { left: "53.75%", bottom: "46%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 46, lineHeight: 215, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "53.75%", bottom: "24%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-7%", rotate: 10, lineHeight: 25, textOffsetY: 0,},
    hlDim: { left: "53.75%", bottom: "-42%", width: "18%", dropHeight: 135 },

    terminalBoxLeader: { left: "40%", bottom: "-11%", rotate: 25, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51.5%", bottom: "-50%", rotate: 0, lineHeight: 109, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-25%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "13%" },

    thermoDim: { left: "53.75%", bottom: "55%", width: "18%", dropHeight: 25 },

    coldDim: { left: "53.75%", bottom: "-11%", width: "5%", riseHeight: 62 },
  };

  const cfg6N7 = {
    processBar: { left: "58.75%", bottom: "47%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 31, lineHeight: 208, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "58.75%", bottom: "27%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-5%", rotate: 10, lineHeight: 50, textOffsetY: 0,},
    hlDim: { left: "58.75%", bottom: "-24%", width: "18%", dropHeight: 130 },

    terminalBoxLeader: { left: "42%", bottom: "8%", rotate: 0, lineHeight: 31, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "56.5%", bottom: "-30%", rotate: 0, lineHeight: 95, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "88%", bottom: "2%", rotate: 10, lineHeight: 15, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "1%" },

    thermoDim: { left: "58.75%", bottom: "59%", width: "18%", dropHeight: 40 },

    coldDim: { left: "58.75%", bottom: "-0%", width: "5%", riseHeight: 62 },
  };


  // 8 inches
  const cfg8N1 = {
    processBar: { left: "54%", bottom: "47%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 45, lineHeight: 220, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "54%", bottom: "26%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-15%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "54%", bottom: "-35%", width: "18%", dropHeight: 140 },

    terminalBoxLeader: { left: "40%", bottom: "-15%", rotate: 25, lineHeight: 55, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51.5%", bottom: "-42%", rotate: 0, lineHeight: 102, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "12%" },

    thermoDim: { left: "54%", bottom: "56%", width: "18%", dropHeight: 30 },

    coldDim: { left: "54%", bottom: "-6%", width: "5%", riseHeight: 62 },
  };

  const cfg8N4 = {
    processBar: { left: "52.25%", bottom: "43%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 44, lineHeight: 245, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "52.25%", bottom: "24%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-12%", rotate: 10, lineHeight: 50, textOffsetY: 0,},
    hlDim: { left: "52.25%", bottom: "-30%", width: "18%", dropHeight: 125 },

    terminalBoxLeader: { left: "38%", bottom: "-15%", rotate: 25, lineHeight: 55, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "50%", bottom: "-39%", rotate: 0, lineHeight: 100, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "18%" },

    thermoDim: { left: "52.25%", bottom: "52%", width: "18%", dropHeight: 25 },

    coldDim: { left: "52.25%", bottom: "-6%", width: "5%", riseHeight: 62 },
  };

  const cfg8N7 = {
    processBar: { left: "49.75%", bottom: "41%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 48, lineHeight: 260, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "49.75%", bottom: "19%", width: "18%", height: "2%" },
    hlLeader: { left: "60%", bottom: "-11%", rotate: 10, lineHeight: 30, textOffsetY: 0,},
    hlDim: { left: "49.75%", bottom: "-32%", width: "18%", dropHeight: 115 },

    terminalBoxLeader: { left: "35%", bottom: "-10%", rotate: 0, lineHeight: 45, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "48%", bottom: "-40%", rotate: 0, lineHeight: 80, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-19%", rotate: 10, lineHeight: 40, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "17%" },

    thermoDim: { left: "49.75%", bottom: "51%", width: "18%", dropHeight: 35 },

    coldDim: { left: "49.75%", bottom: "-12%", width: "5%", riseHeight: 62 },
  };


  // 12 inches
  const cfg12N1 = {
    processBar: { left: "55.25%", bottom: "48%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 42, lineHeight: 205, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "55.25%", bottom: "30%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-12%", rotate: 10, lineHeight: 60, textOffsetY: 0,},
    hlDim: { left: "55.25%", bottom: "-35%", width: "18%", dropHeight: 145 },

    terminalBoxLeader: { left: "40%", bottom: "-15%", rotate: 25, lineHeight: 64, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "53%", bottom: "-42%", rotate: 0, lineHeight: 112, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-15%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "8%" },

    thermoDim: { left: "55.25%", bottom: "57%", width: "18%", dropHeight: 30 },

    coldDim: { left: "55.25%", bottom: "-2%", width: "5%", riseHeight: 62 },
  };

  const cfg12N4 = {
    processBar: { left: "55.5%", bottom: "49%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 45, lineHeight: 195, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "55.5%", bottom: "30%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-13%", rotate: 10, lineHeight: 55, textOffsetY: 0,},
    hlDim: { left: "55.5%", bottom: "-43%", width: "18%", dropHeight: 155 },

    terminalBoxLeader: { left: "40%", bottom: "-15%", rotate: 25, lineHeight: 55, textOffsetY: 0, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "53%", bottom: "-50%", rotate: 0, lineHeight: 123, textOffsetY: 0, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "6%" },

    thermoDim: { left: "55.5%", bottom: "57%", width: "18%", dropHeight: 30 },

    coldDim: { left: "55.5%", bottom: "-4%", width: "5%", riseHeight: 62 },
  };

  const cfg12N7 = {
    processBar: { left: "52.25%", bottom: "48%", width: "18%", height: "4%" },
    processLeader: { left: "80%", bottom: "110%", rotate: 48, lineHeight: 225, textOffsetY: 6, textWidth: 170, textRotate: 0},
    
    hlBar: { left: "52.25%", bottom: "22%", width: "18%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-15%", rotate: 10, lineHeight: 45, textOffsetY: 0,},
    hlDim: { left: "52.25%", bottom: "-35%", width: "18%", dropHeight: 120 },

    terminalBoxLeader: { left: "38%", bottom: "-5%", rotate: 0, lineHeight: 60, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "50.5%", bottom: "-45%", rotate: 0, lineHeight: 105, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-24%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "9.5%" },

    thermoDim: { left: "52.25%", bottom: "64%", width: "18%", dropHeight: 70 },

    coldDim: { left: "52.25%", bottom: "-11%", width: "5%", riseHeight: 62 },
  };    


  const overlayCfg = useMemo(() => {
    // 10 inch
    if (flangeSize === 10) return isN7 ? cfg10N7 : cfg10N14;

    // 3 inch
    if (flangeSize === 3) {
      if (elementNumN === 3) return isN7 ? cfg3N7_E3 : cfg3N14_E3;
      if (elementNumN === 6) return isN7 ? cfg3N7_E6 : cfg3N14_E6;
    }
    
    //4 inch
    if (flangeSize === 4) {
      if (elementNumN === 6) return isN7 ? cfg4N7_E6 : cfg4N14_E6;
      if (elementNumN === 9) return isN7 ? cfg4N7_E9 : cfg4N14_E9;
    }

    //5 inch
    if (flangeSize === 5) {
      if (terminalBox === "N1") return cfg5N1;
      if (terminalBox === "N4") return cfg5N4;
      if (terminalBox === "N7") return cfg5N7;
    }

    //6 inch
    if (flangeSize === 6) {
      if (terminalBox === "N1") return cfg6N1;
      if (terminalBox === "N4") return cfg6N4;
      if (terminalBox === "N7") return cfg6N7;
    }

    //8 inch
    if (flangeSize === 8) {
      if (terminalBox === "N1") return cfg8N1;
      if (terminalBox === "N4") return cfg8N4;
      if (terminalBox === "N7") return cfg8N7;
    }

    //12 inch
    if (flangeSize === 12) {
      if (terminalBox === "N1") return cfg12N1;
      if (terminalBox === "N4") return cfg12N4;
      if (terminalBox === "N7") return cfg12N7;
    }

    return null;
  }, [flangeSize, elementNumN, terminalBox, isN7]);


  const DimOverlay = ({
    left,
    bottom,
    width,
    dropHeight,
    value,
    label,
    zIndex = 80,
  }: {
    left: string;
    bottom: string;
    width: string;
    dropHeight: number;
    value: number;
    label: string;
    zIndex?: number;
  }) => (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        bottom,
        width,
        height: `${dropHeight + 60}px`,
        zIndex,
      }}
    >
      {/* left drop */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 26,
          height: dropHeight,
          borderLeft: "1px solid black",
        }}
      />
      {/* right drop */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 26,
          height: dropHeight,
          borderLeft: "1px solid black",
        }}
      />
      {/* top dim line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 26,
          borderTop: "1px solid black",
        }}
      />
      {/* left arrow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 22,
          width: 0,
          height: 0,
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderRight: "14px solid black",
          transform: "translateX(-2px)",
        }}
      />
      {/* right arrow */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 22,
          width: 0,
          height: 0,
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderLeft: "14px solid black",
          transform: "translateX(2px)",
        }}
      />

      {/* number */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 5,
          transform: "translateX(-50%)",
          fontSize: "15px",
          fontWeight: "bold",
          background: "white",
          padding: "1px 6px",
          color: "black",
        }}
      >
        {value}&quot;
      </div>

      {/* label */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 25,
          transform: "translateX(-50%)",
          fontSize: "12px",
          background: "white",
          padding: "1px 6px",
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );

  const DimOverlayUp = ({
    left,
    bottom,
    width,
    dropHeight,
    value,
    label,
    zIndex = 85,
  }: {
    left: string;
    bottom: string;
    width: string;
    dropHeight: number;
    value: number;
    label: string;
    zIndex?: number;
  }) => {
    // HL dim line is at the "bottom" of the drops
    const lineY = dropHeight + 26;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left,
          bottom,
          width,
          height: `${dropHeight + 60}px`,
          zIndex,
        }}
      >
        {/* left drop (goes UP) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 26,
            height: dropHeight,
            borderLeft: "1px solid black",
          }}
        />

        {/* right drop (goes UP) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 26,
            height: dropHeight,
            borderLeft: "1px solid black",
          }}
        />

        {/* horizontal dim line (this is the "main" line for HL) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: lineY,
            borderTop: "1px solid black",
          }}
        />

        {/* arrows on the dim line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: lineY - 4,
            width: 0,
            height: 0,
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderRight: "14px solid black",
            transform: "translateX(-2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: lineY - 4,
            width: 0,
            height: 0,
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderLeft: "14px solid black",
            transform: "translateX(2px)",
          }}
        />

        {/* ✅ number ON the dim line (between arrows) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: lineY - 13, // <-- centers text on the line
            transform: "translateX(-50%)",
            fontSize: "15px",
            fontWeight: "bold",
            background: "white",
            padding: "1px 6px",
            color: "black",
            whiteSpace: "nowrap",
          }}
        >
          {value}&quot;
        </div>

        {/* ✅ label just UNDER the dim line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: lineY + 6,
            transform: "translateX(-50%)",
            fontSize: "12px",
            background: "white",
            padding: "1px 6px",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "nowrap",
            minWidth: "260px",
          }}
        >
          {label}
        </div>
      </div>
    );
  };

  const LeaderOverlay = ({
    cfg,
    label,
    color = "#1d4ed8",
    triangleColor = "#1d4ed8",
    zIndex = 205,
  }: {
    cfg: LeaderCfg;
    label: string;
    color?: string;
    triangleColor?: string;
    zIndex?: number;
  }) => {
    const lineLen = cfg.lineHeight;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: cfg.left,
          bottom: cfg.bottom,
          zIndex,
        }}
      >
        {/* ✅ LABEL BOX is the anchor reference */}
        <div
          className="text-black"
          style={{
            width: `${cfg.textWidth ?? 260}px`,
            fontSize: "15px",
            fontWeight: "bold",
            background: "white",
            padding: "2px 6px",
            textAlign: "center",
            whiteSpace: "pre-line",
            border: `2px solid ${color}`,
            position: "relative", // IMPORTANT: arrow anchors to this box
            transform: `rotate(${cfg.textRotate ?? 0}deg)`,
            transformOrigin: "center",
          }}
        >
          {label}

          {/* ✅ ARROW GROUP rotates around bottom-center of the box */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "100%", // bottom edge of box
              transform: `translateX(-50%) rotate(${cfg.rotate}deg)`,
              transformOrigin: "top center", // <-- bottom-center of box
              width: 0,
              height: 0,
            }}
          >
            {/* line */}
            <div
              style={{
                height: `${lineLen}px`,
                borderLeft: `2px solid ${color}`,
                marginLeft: "-1px",
              }}
            />

            {/* triangle at the end of the line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: `${lineLen}px`,
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: `18px solid ${triangleColor}`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };


  return (
    <div ref={drawingRef} className=" relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        phase={phase}
        wattage={wattage}
        terminalBox={terminalBox}
        thermostat={typeThermostat}
        elementNum={elementNum}
        immersionLength={lengthElement}
        coldLength={coldLength}
      />


      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <LOGO className="absolute w-[16rem] ml-[650px] mt-[460px]" />
      </div>

      <div
        className="h-full w-full flex items-center justify-center"
        style={{ transform: "translateY(-60px)" }}
      >

        {/* ✅ DO NOT gate on is10in — gate on whether a drawing exists */}
        {!LayoutSVG ? (
          <div className="text-slate-600 text-sm">
            No drawing available for this configuration.
          </div>
        ) : (
          <div className="relative w-[950px]">
            {/* Static drawing */}
            <LayoutSVG className="block w-full h-auto" />

            {/* ✅ Only render overlays when we actually have overlayCfg */}
            {overlayCfg && (
              <>
                {/* ===== Process Temp Sensor (BLUE bar) ===== */}
                {showProcess && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.processBar.left,
                      bottom: overlayCfg.processBar.bottom,
                      width: overlayCfg.processBar.width,
                      height: overlayCfg.processBar.height,
                      backgroundColor: "#22d3ee",
                      border: "1px solid black",
                      zIndex: 50,
                    }}
                  />
                )}
                
                {/* ✅ Adjustable Process Thermowell leader */}
                {showProcess && overlayCfg?.processLeader && (
                  <LeaderOverlay
                    cfg={overlayCfg.processLeader}
                    label={processThermowellLabel}
                    color="#1d4ed8"
                    triangleColor="#1d4ed8"
                    zIndex={206}
                  />
                )}


                {/* ===== High Limit (RED bar) ===== */}
                {showHL && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.hlBar.left,
                      bottom: overlayCfg.hlBar.bottom,
                      width: overlayCfg.hlBar.width,
                      height: overlayCfg.hlBar.height,
                      backgroundColor: "#fa1515",
                      border: "1px solid black",
                      zIndex: 60,
                    }}
                  />
                )}

                {/* ✅ Thermowell DIM */}
                {overlayCfg?.thermoDim && showThermowellDim && (
                  <DimOverlay
                    left={overlayCfg.thermoDim.left}
                    bottom={overlayCfg.thermoDim.bottom}
                    width={overlayCfg.thermoDim.width}
                    dropHeight={overlayCfg.thermoDim.dropHeight}
                    value={thermoLength}
                    label="Thermowell"
                    zIndex={80}
                  />
                )}

                {/* ✅ HL DIM (title changes based on option) */}
                {overlayCfg?.hlDim && showHLDim && (
                  <DimOverlayUp
                    left={overlayCfg.hlDim.left}
                    bottom={overlayCfg.hlDim.bottom}
                    width={overlayCfg.hlDim.width}
                    dropHeight={overlayCfg.hlDim.dropHeight}
                    value={hlLength}
                    label={hlDimLabel}
                    zIndex={85}
                  />
                )}

                {//ColdLength
                }
                {showColdDim && overlayCfg.coldDim && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: overlayCfg.coldDim.left,
                    bottom: overlayCfg.coldDim.bottom,
                    width: overlayCfg.coldDim.width,
                    height: `${overlayCfg.coldDim.riseHeight + 60}px`,
                    zIndex: 80,
                  }}
                >
                  {/* 1) Vertical rise line (LEFT) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 26,
                      height: overlayCfg.coldDim.riseHeight,
                      borderLeft: "1px solid black",
                    }}
                  />

                  {/* 2) Vertical rise line (RIGHT) */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 26,
                      height: overlayCfg.coldDim.riseHeight,
                      borderLeft: "1px solid black",
                    }}
                  />

                  {/* 3) Dimension line (BOTTOM) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 26,
                      borderBottom: "1px solid black",
                    }}
                  />

                  {/* 4) Left arrow (pointing inward) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 22,
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderRight: "14px solid black",
                      transform: "translateX(-2px)",
                    }}
                  />

                  {/* 5) Right arrow (pointing inward) */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 22,
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: "14px solid black",
                      transform: "translateX(2px)",
                    }}
                  />

                  {/* 6) Number (ABOVE the bottom line) */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 15,
                      transform: "translateX(-50%)",
                      fontSize: "15px",
                      background: "white",
                      padding: "1px 6px",
                    }}
                  >
                    {coldLength}&quot;
                  </div>

                  {/* 7) Label (optional) */}
                  <div
                    style={{
                      position: "absolute",
                      textAlign: "right",
                      width: 100,
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      fontSize: "12px",
                      background: "white",
                      padding: "1px 6px",
                    }}
                  >
                    Cold Length
                  </div>
                </div>
              )}

                {/* ============================================
                   IMMERSION DIMENSION: remove arrows/line
                   We "erase" that area by covering it white,
                   then overlay ONLY the number.
                   ============================================ */}

                {/* 1) White cover box (tune these numbers ONCE) */}
                <div
                  className="absolute bg-white"
                  style={{
                    left: overlayCfg.immersionCover.left,
                    top: overlayCfg.immersionCover.top,
                    width: overlayCfg.immersionCover.width,
                    height: overlayCfg.immersionCover.height,
                    zIndex: 90,
                  }}
                />

                {/* 2) Dynamic number only */}
                <div
                  className="absolute text-black"
                  style={{
                    // Starting values — tweak once to align perfectly
                    left: overlayCfg.immersionText.left,
                    top: overlayCfg.immersionText.top,
                    transform: "translate(-70%, -50%)",
                    fontSize: "16px",
                    fontWeight: "bold",
                    background: "white",
                    padding: "2px 5px",
                    zIndex: 95,
                  }}
                >
                  {immersionText}
                </div>

                {/* ==============================
                        TEMP SENSOR OPTION (HL)
                        Yellow bar + leader text
                    ============================== */}
                    {showHL && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: overlayCfg.hlLeader.left,
                          bottom: overlayCfg.hlLeader.bottom,
                          transform: `rotate(${overlayCfg.hlLeader.rotate}deg)`,
                          zIndex: 96,
                        }}
                      >
                        {/* triangle */}
                        {/* <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" /> */}

                        {/* leader line */}
                        <div
                          // style={{
                          //   height: overlayCfg.hlLeader.lineHeight,
                          //   borderLeft: "2px solid black",
                          //   marginLeft: "9px",
                          // }}
                        />

                        {/* label */}
                        <div
                          // className="text-black"
                          // style={{
                          //   marginLeft: "-85px",
                          //   marginTop: overlayCfg.hlLeader.textOffsetY,
                          //   width: "220px",
                          //   transform: "rotate(-10deg)",
                          //   fontSize: "15px",
                          //   background: "white",
                          //   padding: "2px 6px",
                          //   fontWeight: "bold",
                          // }}
                        >
                          {/* {hlSensor === "HLTC" && <>High-Limit Thermocouple</>}
                          {hlSensor === "HLTS" && <>High-Limit Thermostat</>} */}
                        </div>
                      </div>
                    )}

                    {/* ==============================
                        ✅ NEW LEADER: Elements + Material
                        ALWAYS SHOW
                    ============================== */}
                    {overlayCfg?.elemMatLeader && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: overlayCfg.elemMatLeader.left,
                          bottom: overlayCfg.elemMatLeader.bottom,
                          transform: `rotate(${overlayCfg.elemMatLeader.rotate}deg)`,
                          zIndex: 200,
                        }}
                      >
                        {/* triangle */}
                        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                        {/* leader line */}
                        <div
                          style={{
                            height: overlayCfg.elemMatLeader.lineHeight,
                            borderLeft: "2px solid black",
                            marginLeft: "9px",
                          }}
                        />

                        {/* label */}
                        <div
                          key={`${elementNumN}-${material}`}
                          className="text-black"
                          style={{
                            marginLeft: "-85px",
                            marginTop: overlayCfg.elemMatLeader.textOffsetY,
                            width: `${overlayCfg.elemMatLeader.textWidth}px`,
                            transform: "rotate(-10deg)",
                            fontSize: "16px",
                            fontWeight:"bold",
                            background: "white",
                            padding: "2px 6px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ lineHeight: "18px", width: "100%" }}>
                            <div>{`${elementNumN} x 0.475"D Elements`}</div>
                            <div>{material}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ==============================
                            ✅ NEW LEADER: Terminal Box
                        ============================== */}
                        {overlayCfg?.terminalBoxLeader && (
                          <div
                            className="absolute pointer-events-none"
                            style={{
                              left: overlayCfg.terminalBoxLeader.left,
                              bottom: overlayCfg.terminalBoxLeader.bottom,
                              transform: `rotate(${overlayCfg.terminalBoxLeader.rotate}deg)`,
                              zIndex: 210,
                            }}
                          >
                            {/* triangle */}
                            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                            {/* leader line */}
                            <div
                              style={{
                                height: overlayCfg.terminalBoxLeader.lineHeight,
                                borderLeft: "2px solid black",
                                marginLeft: "9px",
                              }}
                            />

                            {/* label */}
                            {(() => {
                              const parentRot = overlayCfg.terminalBoxLeader.rotate;

                              return(
                                <div
                                  className="text-black"
                                  style={{
                                    marginLeft: "-85px",
                                    marginTop: overlayCfg.terminalBoxLeader.textOffsetY,
                                    width: `${overlayCfg.terminalBoxLeader.textWidth ?? 220}px`,
                                    transform: `rotate(${(overlayCfg.terminalBoxLeader.textRotate ?? -10) - parentRot}deg)`,
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    background: "white",
                                    padding: "2px 6px",
                                    textAlign: "center",
                                  }}
                                >
                              {terminalBoxLabel}
                            </div>
                              );
                            })()}
                          </div>
                        )}

                        {/* ==============================
                            ✅ NEW LEADER: Flange Size
                        ============================== */}
                        {overlayCfg?.flangeLeader && (
                          <div
                            className="absolute pointer-events-none"
                            style={{
                              left: overlayCfg.flangeLeader.left,
                              bottom: overlayCfg.flangeLeader.bottom,
                              transform: `rotate(${overlayCfg.flangeLeader.rotate}deg)`,
                              zIndex: 220,
                            }}
                          >
                            {/* triangle */}
                            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                            {/* leader line */}
                            <div
                              style={{
                                height: overlayCfg.flangeLeader.lineHeight,
                                borderLeft: "2px solid black",
                                marginLeft: "9px",
                              }}
                            />

                            {/* label */}
                            {(() => {
                              const parentRot = overlayCfg.flangeLeader.rotate;   // <-- THIS IS THE LINE

                              return (
                                <div
                                  className="text-black"
                                  style={{
                                    marginLeft: "-85px",
                                    marginTop: overlayCfg.flangeLeader.textOffsetY,
                                    width: `${overlayCfg.flangeLeader.textWidth ?? 220}px`,
                                    transform: `rotate(${(overlayCfg.flangeLeader.textRotate ?? -10) - parentRot}deg)`,
                                    transformOrigin: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    background: "white",
                                    padding: "2px 6px",
                                    textAlign: "center",
                                  }}
                                >
                                  {flangeLabel}
                                </div>
                              );
                            })()}
                          </div>
                        )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawings10;
