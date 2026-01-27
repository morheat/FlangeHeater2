import React, { useMemo} from "react";
import Header from "./headers";

import { ReactComponent as Titlebox } from "./assets/TITLE.svg";
import { ReactComponent as LOGO } from "./assets/LOGO.svg";

// Your ONE static full drawing SVG (10-inch config)
import { ReactComponent as Layout10 } from "./assets/10in-N14.svg";
import { ReactComponent as Layout10N7 } from "./assets/10in-N7.svg";

import { ReactComponent as Layout3_N14_E3 } from "./assets/3in-N14-3E.svg";
import { ReactComponent as Layout3_N14_E6 } from "./assets/3in-N14-6E.svg";
import { ReactComponent as Layout3_N7_E3 } from "./assets/3in-N7-3E.svg";
import { ReactComponent as Layout3_N7_E6 } from "./assets/3in-N7-6E.svg"; 

import { ReactComponent as Layout4_N14_E6 } from "./assets/4in-N14-6E.svg";
import { ReactComponent as Layout4_N14_E9 } from "./assets/4in-N14-9E.svg";
import { ReactComponent as Layout4_N7_E6 } from "./assets/4in-N7-6E.svg";
import { ReactComponent as Layout4_N7_E9 } from "./assets/4in-N7-9E.svg"; 

import { ReactComponent as Layout5_N1 } from "./assets/5in-N1.svg";
import { ReactComponent as Layout5_N4 } from "./assets/5in-N4.svg";
import { ReactComponent as Layout5_N7 } from "./assets/5in-N7.svg";

import { ReactComponent as Layout6_N1 } from "./assets/6in-N1.svg";
import { ReactComponent as Layout6_N4 } from "./assets/6in-N4.svg";
import { ReactComponent as Layout6_N7 } from "./assets/6in-N7.svg";

import { ReactComponent as Layout8_N1 } from "./assets/8in-N1.svg";
import { ReactComponent as Layout8_N4 } from "./assets/8in-N4.svg";
import { ReactComponent as Layout8_N7 } from "./assets/8in-N7.svg";

import { ReactComponent as Layout12_N1 } from "./assets/12in-N1.svg";
import { ReactComponent as Layout12_N4 } from "./assets/12in-N4.svg";
import { ReactComponent as Layout12_N7 } from "./assets/12in-N7.svg";


interface drawingProps {
  drawingRef: React.RefObject<HTMLDivElement>;
  serialNum: string;
  title: string;
  flangeSize: number;
  lengthElement: number;
  foldLength: number;
  elementNum: number;
  processTemp: string;
  hlSensor: string;
  typeThermostat: string;
  thermoLength: number;
  material: string;
  voltage: string;
  wattage: string;
  terminalBox: string;
}

const Drawings10: React.FC<drawingProps> = ({
  drawingRef,
  serialNum,
  title,
  flangeSize,
  lengthElement,
  elementNum,
  material,
  voltage,
  wattage,
  terminalBox,
  typeThermostat,
  hlSensor, // ✅ needed
  processTemp, // (optional later)
  thermoLength,
}) => {
  const showHL = hlSensor !== "nHL";
  const showProcess = processTemp !== "nT";
  const elementNumN = Number(elementNum);

  // Only enable 10-inch for now
  // ❌ DON'T gate the UI with this anymore if you want 3-inch too
  // const is10in = flangeSize === 10;

  // N7 vs N1/N4
  const isN7 = terminalBox === "N7";

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


  // =========================
  // CONFIGS 
  // =========================

  //10in
  const cfg10N14 = {
    processBar: { left: "57%", bottom: "48%", width: "18%", height: "1.8%" },
    hlBar: { left: "57%", bottom: "25%", width: "26%", height: "1.5%" },

    hlLeader: {left: "57%", bottom: "-24%", rotate: 10, lineHeight: 70, textOffsetY: 6},
    
    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    elemMatLeader: { left: "86%", bottom: "-21%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "7%" },

    thermoDim: { left: "57%", bottom: "58%", width: "18%", dropHeight: 25 },
  };

  const cfg10N7 = {
    // ✅ change these independently for N7 (up/down = bottom, left/right = left)
    processBar: { left: "53.5%", bottom: "46%", width: "18%", height: "1.8%" }, //Blue Bar
    hlBar: { left: "53.5%", bottom: "19.5%", width: "26%", height: "1.5%" }, //yello Bar

    hlLeader: { left: "58%", bottom: "-11%", rotate: 10, lineHeight: 40, textOffsetY: 0},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    elemMatLeader: { left: "85%", bottom: "-12%", rotate: 10, lineHeight: 30, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "17%" }, //Length text

    thermoDim: { left: "53.5%", bottom: "60%", width: "18%", dropHeight: 70 },
  };

  //3in
  const cfg3N14_E3 = {
    processBar: { left: "53.25%", bottom: "44.5%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "53.25%", bottom: "32.5%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-10%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "40%", bottom: "-18%", rotate: 25, lineHeight: 45, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "51%", bottom: "-20%", rotate: 0, lineHeight:   20, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-13%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "25%" },

    thermoDim: { left: "53.25%", bottom: "46%", width: "18%", dropHeight: 80 },
  };

  const cfg3N14_E6 = {
    processBar: { left: "52%", bottom: "47.5%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "52%", bottom: "36%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-3%", rotate: 10, lineHeight: 60, textOffsetY: 0},

    terminalBoxLeader: { left: "38%", bottom: "-11%", rotate: 25, lineHeight: 45, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "49.5%", bottom: "-12%", rotate: 0, lineHeight:   20, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "25%" },

    thermoDim: { left: "52%", bottom: "46%", width: "18%", dropHeight: 80 },
  };

  const cfg3N7_E3 = {
    processBar: { left: "52%", bottom: "47.5%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "52%", bottom: "35%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-3%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "36%", bottom: "-10%", rotate: 25, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "49.5%", bottom: "-11%", rotate: 0, lineHeight:   20, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "25%" },

    thermoDim: { left: "52%", bottom: "46%", width: "18%", dropHeight: 80 },
  };

  const cfg3N7_E6 = {
    processBar: { left: "56%", bottom: "47.5%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "56%", bottom: "36%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-.5%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "34%", bottom: "-10%", rotate: 25, lineHeight: 35, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "53.5%", bottom: "-11%", rotate: 0, lineHeight:40, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-3%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "32%" },

    thermoDim: { left: "56%", bottom: "46%", width: "18%", dropHeight: 80 },
  };

  //4 inches
  const cfg4N7_E6 = {
    processBar: { left: "60.25%", bottom: "47.5%", width: "15%", height: "1.8%" },
    
    hlBar: { left: "60.25%", bottom: "36%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-12%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-16%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "28%" },

    thermoDim: { left: "60.25%", bottom: "46%", width: "15%", dropHeight: 80 },
  };

  const cfg4N7_E9 = {
    processBar: { left: "60%", bottom: "46%", width: "15%", height: "1.8%" },
    
    hlBar: { left: "60%", bottom: "32%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-12.5%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-16%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "30%" },

    thermoDim: { left: "60%", bottom: "46%", width: "15%", dropHeight: 80 },
  };

  const cfg4N14_E6 = {
    processBar: { left: "53%", bottom: "46%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "53%", bottom: "34%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-8%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-11.5%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "12%" },

    thermoDim: { left: "53%", bottom: "46%", width: "18%", dropHeight: 35 },
  };

  const cfg4N14_E9 = {
    processBar: { left: "52.75%", bottom: "43%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "52.75%", bottom: "30%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-7%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-10%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73.5%", top: "20%" },

    thermoDim: { left: "52.75%", bottom: "47%", width: "18%", dropHeight: 30 },
  };

  // 5 inches
  const cfg5N1 = {
    processBar: { left: "53.5%", bottom: "44%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "53.5%", bottom: "33%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-6%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "15%" },

    thermoDim: { left: "53.5%", bottom: "46%", width: "18%", dropHeight: 45 },
  };

  const cfg5N4 = {
    processBar: { left: "53%", bottom: "44%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "53%", bottom: "34%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "1.5%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
   
    elemMatLeader: { left: "85%", bottom: "-1%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "21.5%" },

    thermoDim: { left: "53%", bottom: "45%", width: "18%", dropHeight: 45 },
  };

  const cfg5N7 = {
    processBar: { left: "62.5%", bottom: "47.5%", width: "15%", height: "1.8%" },
    
    hlBar: { left: "62.5%", bottom: "38%", width: "20%", height: "1.5%" },
    hlLeader: { left: "65%", bottom: "-3%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220 , textRotate:0},
    
    elemMatLeader: { left: "88%", bottom: "-6%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "80%", top: "30%" },

    thermoDim: { left: "62.5%", bottom: "46%", width: "15%", dropHeight: 80 },
  };


  // 6 inches
  const cfg6N1 = {
    processBar: { left: "54.25%", bottom: "44%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "54.25%", bottom: "20%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-24%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-28%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "15%" },

    thermoDim: { left: "54.25%", bottom: "46%", width: "18%", dropHeight: 45 },
  };

  const cfg6N4 = {
    processBar: { left: "53.75%", bottom: "46%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "53.75%", bottom: "24%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-21%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-25%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "13%" },

    thermoDim: { left: "53.75%", bottom: "55%", width: "18%", dropHeight: 25 },
  };

  const cfg6N7 = {
    processBar: { left: "58.75%", bottom: "49%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "58.75%", bottom: "27%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-8%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-11%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "1%" },

    thermoDim: { left: "58.75%", bottom: "59%", width: "18%", dropHeight: 40 },
  };


  // 8 inches
  const cfg8N1 = {
    processBar: { left: "54%", bottom: "47%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "54%", bottom: "26%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-15%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "74%", top: "12%" },

    thermoDim: { left: "54%", bottom: "56%", width: "18%", dropHeight: 30 },
  };

  const cfg8N4 = {
    processBar: { left: "52.25%", bottom: "44%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "52.25%", bottom: "24%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-15%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "18%" },

    thermoDim: { left: "52.25%", bottom: "52%", width: "18%", dropHeight: 25 },
  };

  const cfg8N7 = {
    processBar: { left: "49.75%", bottom: "42%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "49.75%", bottom: "19%", width: "20%", height: "1.5%" },
    hlLeader: { left: "55%", bottom: "-18%", rotate: 10, lineHeight: 50, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-19%", rotate: 10, lineHeight: 40, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "17%" },

    thermoDim: { left: "49.75%", bottom: "51%", width: "18%", dropHeight: 35 },
  };


  // 12 inches
  const cfg12N1 = {
    processBar: { left: "55.25%", bottom: "50%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "55.25%", bottom: "30%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-12%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-15%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "8%" },

    thermoDim: { left: "55.25%", bottom: "57%", width: "18%", dropHeight: 30 },
  };

  const cfg12N4 = {
    processBar: { left: "55.5%", bottom: "50%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "55.5%", bottom: "30%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-15%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "6%" },

    thermoDim: { left: "55.5%", bottom: "57%", width: "18%", dropHeight: 30 },
  };

  const cfg12N7 = {
    processBar: { left: "52.25%", bottom: "49%", width: "18%", height: "1.8%" },
    
    hlBar: { left: "52.25%", bottom: "22%", width: "20%", height: "1.5%" },
    hlLeader: { left: "60%", bottom: "-21%", rotate: 10, lineHeight: 60, textOffsetY: 0,},

    terminalBoxLeader: { left: "18%", bottom: "-8%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },

    flangeLeader: { left: "34%", bottom: "-14%", rotate: 0, lineHeight: 55, textOffsetY: 6, textWidth: 220, textRotate:0 },
    
    elemMatLeader: { left: "85%", bottom: "-24%", rotate: 10, lineHeight: 55, textOffsetY: 6, textWidth: 200 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "9.5%" },

    thermoDim: { left: "52.25%", bottom: "64%", width: "18%", dropHeight: 70 },
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

  return (
    <div ref={drawingRef} className=" relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        wattage={wattage}
        terminalBox={terminalBox}
        thermostat={typeThermostat}
      />

      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <LOGO className="absolute w-[16rem] ml-[650px] mt-[460px]" />
      </div>

      <div className="h-full w-full flex items-center justify-center">
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

                {/* ===== High Limit (YELLOW bar) ===== */}
                {showHL && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.hlBar.left,
                      bottom: overlayCfg.hlBar.bottom,
                      width: overlayCfg.hlBar.width,
                      height: overlayCfg.hlBar.height,
                      backgroundColor: "#facc15",
                      border: "1px solid black",
                      zIndex: 60,
                    }}
                  />
                )}

                {/* Thermowell DIM*/}
                {showThermowellDim && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.thermoDim.left,
                      bottom: overlayCfg.thermoDim.bottom,
                      width: overlayCfg.thermoDim.width,
                      height: `${overlayCfg.thermoDim.dropHeight + 60}px`,
                      zIndex: 80,
                    }}
                  >
                    {/* 1) Vertical drop line (LEFT) */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 26,
                        height: overlayCfg.thermoDim.dropHeight,
                        borderLeft: "1px solid black",
                      }}
                    />

                    {/* 2) Vertical drop line (RIGHT) */}
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 26,
                        height: overlayCfg.thermoDim.dropHeight,
                        borderLeft: "1px solid black",
                      }}
                    />

                    {/* 3) Dimension line (top) */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 26,
                        borderTop: "1px solid black",
                      }}
                    />

                    {/* 4) Left arrow */}
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

                    {/* 5) Right arrow */}
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

                    {/* 6) Number */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 5,
                        transform: "translateX(-50%)",
                        fontSize: "15px",
                        background: "white",
                        padding: "1px 6px",
                        color:"black"
                      }}
                    >
                      {thermoLength}&quot;
                    </div>

                    {/* 7) Label */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 25,
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        background: "white",
                        padding: "1px 6px",
                        color:"black"
                      }}
                    >
                      Thermowell
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
                        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                        {/* leader line */}
                        <div
                          style={{
                            height: overlayCfg.hlLeader.lineHeight,
                            borderLeft: "2px solid black",
                            marginLeft: "9px",
                          }}
                        />

                        {/* label */}
                        <div
                          className="text-black"
                          style={{
                            marginLeft: "-85px",
                            marginTop: overlayCfg.hlLeader.textOffsetY,
                            width: "220px",
                            transform: "rotate(-10deg)",
                            fontSize: "16px",
                            background: "white",
                            padding: "2px 6px",
                          }}
                        >
                          {hlSensor === "HLTC" && <>High-Limit Thermocouple</>}
                          {hlSensor === "HLTS" && <>High-Limit Thermostat</>}
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
