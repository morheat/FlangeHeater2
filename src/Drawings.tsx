import React from "react";
import Header from "./headers";
import { ReactComponent as Head3 } from "./assets/flange_head-3.svg";
import { ReactComponent as Head3L } from "./assets/flange_head-3L.svg";
import { ReactComponent as Head4 } from "./assets/flange_head-4.svg";
import { ReactComponent as Head4L } from "./assets/flange_head-4L.svg";
import { ReactComponent as Head5 } from "./assets/flange_head-5.svg";
import { ReactComponent as Head5L } from "./assets/flange_head-5L.svg";
import { ReactComponent as Head6 } from "./assets/flange_head-6.svg";
import { ReactComponent as Head6L } from "./assets/flange_head-6L.svg";
import { ReactComponent as Head8 } from "./assets/flange_head-8.svg";
import { ReactComponent as Head8L } from "./assets/flange_head-8L.svg";
import { ReactComponent as Head1014L } from "./assets/flange_head-10L_N_1_4.svg";
import { ReactComponent as Head1014 } from "./assets/flange_head-10_N_1_4.svg";
import { ReactComponent as Head107 } from "./assets/flange_head-10_N7.svg";
import { ReactComponent as Head107L } from "./assets/flange_head-10L_N7.svg";
import { ReactComponent as El33 } from "./assets/3in-3-element.svg";
import { ReactComponent as El36 } from "./assets/3in-6-element.svg";
import { ReactComponent as El46 } from "./assets/4in-6-element.svg";
import { ReactComponent as El49 } from "./assets/4in-9-element.svg";
import { ReactComponent as El56 } from "./assets/5in-6-element.svg";
import { ReactComponent as El59 } from "./assets/5in-9-element.svg";
import { ReactComponent as El612 } from "./assets/6in-12-element.svg";
import { ReactComponent as El615 } from "./assets/6in-15-element.svg";
import { ReactComponent as El821 } from "./assets/8in-21-24-27-element.svg";
import { ReactComponent as El1036 } from "./assets/10in-36-48-element.svg";
import { ReactComponent as El33H } from "./assets/3in-3-elementH.svg";
import { ReactComponent as El36H } from "./assets/3in-6-elementH.svg";
import { ReactComponent as El46H } from "./assets/4in-6-elementH.svg";
import { ReactComponent as El49H } from "./assets/4in-9-elementH.svg";
import { ReactComponent as El56H } from "./assets/5in-6-elementH.svg";
import { ReactComponent as El59H } from "./assets/5in-9-elementH.svg";
import { ReactComponent as El612H } from "./assets/6in-12-elementH.svg";
import { ReactComponent as El615H } from "./assets/6in-15-elementh.svg";
import { ReactComponent as El821H } from "./assets/8in-21-24-27-elementH.svg";
import { ReactComponent as El1036H } from "./assets/10in-36-48-elementH.svg";
import { ReactComponent as El10N7 } from "./assets/10in-N7.svg";
import { ReactComponent as El10N7H } from "./assets/10in-N7H.svg";
import { ReactComponent as Titlebox } from "./assets/TITLE.svg";
import { ReactComponent as LOGO } from "./assets/LOGO.svg";



const DRAWING_LENGTH = 24;      // visual drawing length (inches)
const DIMENSION_LENGTH = DRAWING_LENGTH;    // dimension line length (same as drawing)
const THERMOWELL_DIM_LENGTH = 12; // inches – visual only
const THERMOWELL_DRAWING_LENGTH = THERMOWELL_DIM_LENGTH; // inches – visual only
// const PX_PER_IN = 16;
// const baseDimPx = DIMENSION_LENGTH * PX_PER_IN;
// const PX_PER_IN_DIM = 16; // use same 16
// const DIM_START_LEFT = 122; // your anchor
// const DIM_END_OFFSET_PX = 0; // tweak if you need a tiny correction



interface drawingProps {
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

const Drawings: React.FC<drawingProps> = ({
  serialNum,
  title,
  flangeSize,
  lengthElement,
  // foldLength,
  elementNum,
  processTemp,
  hlSensor,
  typeThermostat,
  thermoLength,
  material,
  voltage,
  wattage,
  terminalBox,
}) => {

  // let scaleFactor = 1;

  // if (lengthElement > 22) {
  //   scaleFactor = 500 / (lengthElement * 16 + flangeSize * 16);
  // }
  // new
  const scaleFactor = 1;
  const PX_PER_IN = 16;
  const isN7 = terminalBox ==="N7";

  const headVisualShiftX =
    flangeSize === 10 && isN7 ? 29 : 0; // <-- matches your Head107 translateX

  const is10N7 = flangeSize === 10 && isN7;
  const n7ShiftX = is10N7 ? 29 : 0; // one source of truth


  const getHeadWidthPx = (flangeSize: number) => {
    switch (flangeSize) {
      case 3: return 120;
      case 4: return 115;
      case 5: return 125;
      case 6: return 115;
      case 8: return 122;
      case 10: return 218; // don’t shrink this for N7
      default: return 120;
    }
  };

  const getHeadDatumPx = (flangeSize: number, terminalBox: string) => {
    if (flangeSize !== 10) return getHeadWidthPx(flangeSize);

    // This is the IMPORTANT part:
    // Use the X location of the flange-face (where the elements start)
    // Tune these numbers once and you’re done.
    if (terminalBox === "N7") return 218;   // try 218 first (adjust ±5-15 if needed)
    return 218; // N1/N4
  };


  // if you ever add marginRight to these head wrappers, include it here too
  const getHeadRightOffsetPx = (_flangeSize: number) => 0; // tweak if needed

  const getDimWidthPx = (flangeSize: number, elementNum: number) =>
    DIMENSION_LENGTH * PX_PER_IN +
    (elementNum === 3 ? 11 : 0) +
    (flangeSize === 3 ? 14 : 0) +
    (flangeSize === 4 ? 15 : 0) +
    (flangeSize === 5 ? 18 : 0) +
    (flangeSize === 6 ? 22 : 0) +
    (flangeSize === 8 ? 19 : 0) +
    (flangeSize === 10 ? 19 : 0);
  
  const headDatumX =
    getHeadDatumPx(flangeSize, terminalBox) +
    getHeadRightOffsetPx(flangeSize) +
    headVisualShiftX;

  const dimWidthPx = getDimWidthPx(flangeSize, elementNum);

  const is10in = flangeSize === 10 && elementNum === 36;

  // how much to move the leader arrow up/down for ONLY 10in
  // negative = up, positive = down
  const hlLeaderYOffset = is10in ? -30 : 0;

  const is10Flange = flangeSize === 10;

  // tweak these two numbers until it’s perfect:
  const flangeLeaderX = is10Flange ? (isN7 ? -20 : -40) : -13;  // move left/right
  const flangeLeaderY = is10Flange ? flangeSize * 4 + 45 : flangeSize * 4 + 30; // move up/down

  

  return (
    <div className="w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
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
      <div className="h-full flex-grow flex items-center justify-center">
        <div
          style={{
            transform: `scale(${scaleFactor}) translate(0%, 0%)`,
          }}
        >
          {flangeSize === 3 && (
            <div style={{ width: 120, marginRight: "-10px" }}>
              <Head3L />
            </div>
          )}
          {flangeSize === 4 && (
            <div style={{ width: 144, marginRight: "-10px" }}>
              <Head4L />
            </div>
          )}
          {flangeSize === 5 && (
            <div style={{ width: 160, marginRight: "-10px" }}>
              <Head5L />
            </div>
          )}
          {flangeSize === 6 && (
            <div style={{ width: 176, marginRight: "-10px" }}>
              <Head6L />
            </div>
          )}
          {flangeSize === 8 && (
            <div style={{ width: 216, marginRight: "-10px" }}>
              <Head8L />
            </div>
          )}
          {flangeSize === 10 && (
            <div style={{ width: 220, marginRight: "0px" }}>
              {isN7 ? <Head107L style={{ transform: `translateX(${headVisualShiftX}px)` }} /> : <Head1014L style={{ transform: `translateX(35px)` }}/>}
            </div>
          )}

        </div>
      </div>
      <div className="h-full flex flex-grow-[5] items-center justify-center">
        <div
          className="absolute relative flex items-center pl-[0rem]"
          style={{ transform: `scale(${scaleFactor}) translate(0%, 0%)` }}
        >

          {flangeSize === 3 && (
            <div style={{ width: 120, marginRight: "0px" }}>
              <Head3 />
            </div>
          )}
          {flangeSize === 4 && (
            <div style={{ width: 115, marginRight: "0px" }}>
              <Head4 />
            </div>
          )}
          {flangeSize === 5 && (
            <div style={{ width: 125, marginRight: "0px" }}>
              <Head5 />
            </div>
          )}
          {flangeSize === 6 && (
            <div style={{ width: 115, marginRight: "0px" }}>
              <Head6 />
            </div>
          )}
          {flangeSize === 8 && (
            <div style={{ width: 122, marginRight: "0px" }}>
              <Head8 />
            </div>
          )}
          {flangeSize === 10 && (
            <div style={{ width: 220, marginRight: "0px" }}>
              {isN7 ? <Head107 style={{ transform: `translateX(${headVisualShiftX}px)` }} /> : <Head1014 />}
            </div>
          )}

          {/* **************************  ********************************************************************************************************************************/}
          {/* FLANGE LEADER */}
          {/* ************************ */}
          
          <div
            className="border-b-[1.2rem] border-r-[0.3rem] border-l-[0.3rem] border-r-transparent border-l-transparent border-b-black"
            style={{
              marginLeft: -9,
              transform: `translate(${flangeLeaderX}px, ${flangeLeaderY}px) rotate(10deg)`,
            }}
          >
            <div
              className="absolute"
              style={{
                height: 100 / scaleFactor,
                borderLeft: `${1 / scaleFactor}px solid black`,
              }}
            />
            <div
              className="absolute text-black"
              style={{
                marginLeft: -40 / scaleFactor,
                width: 150 / scaleFactor,
                marginTop: 90 / scaleFactor,
                transform: "rotate(-10deg)",
                fontSize: `${1 / scaleFactor}rem`,
              }}
            >
              {flangeSize}&quot; FLANGE
            </div>
          </div>

          {/* ********************************** */}
          {/* ************Elements************** */}
          {/* ********************************** */}
          {elementNum === 3 && (
            <div className="flex items-center">
              <El33 width={`${DRAWING_LENGTH * 16}px`} height="48" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 22 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[45px]"
                  style={{ width: `${lengthElement * 14.5}px`}}
                />
              )}
            </div>
          )}
          {elementNum === 6 && flangeSize === 3 && (
            <div className="flex items-center">
              <El36 width={`${DRAWING_LENGTH * 16}px`} height="48" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[44px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 6 && flangeSize === 4 && (
            <div className="flex items-center">
              <El46 width={`${DRAWING_LENGTH * 16}px`} height="64" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[60px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 9 && flangeSize === 4 && (
            <div className="flex items-center">
              <El49 width={`${DRAWING_LENGTH * 16}px`} height="64" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[60px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 6 && flangeSize === 5 && (
            <div className="flex items-center">
              <El56 width={`${DRAWING_LENGTH * 16}px`} height="80" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[76px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 9 && flangeSize === 5 && (
            <div className="flex items-center">
              <El59 width={`${DRAWING_LENGTH * 16}px`} height="80" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[76px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 12 && flangeSize === 6 && (
            <div className="flex items-center">
              <El612 width={`${DRAWING_LENGTH * 16}px`} height="96" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[92px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 15 && flangeSize === 6 && (
            <div className="flex items-center">
              <El615 width={`${DRAWING_LENGTH * 16}px`} height="96" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[92px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 21 && flangeSize === 8 && (
            <div className="flex items-center">
              <El821 width={`${DRAWING_LENGTH * 16}px`} height="128" />
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${processTemp !== "nT" ? THERMOWELL_DRAWING_LENGTH * 16 + 14 : 0}px`,
                  }}
                />
              )}
              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[125px]"
                  style={{ width: `${lengthElement * 14.5}px` }}
                />
              )}
            </div>
          )}
          {elementNum === 36 && flangeSize === 10 && (
            <div className="flex items-center relative">
              
              {is10N7 ? (
                <El10N7
                  width={`${DRAWING_LENGTH * 16}px`}
                  height="300"
                  style={{ transform: `translateX(${n7ShiftX}px)` }}
                />
              ) : (
                <El1036 width={`${DRAWING_LENGTH * 16}px`} height="300" />
              )}
              {/* height fixed, width auto */}
              
              {processTemp !== "nT" && (
                <div
                  className="absolute h-[16px] bg-cyan-400 border-r-[1px] border-y-[1px] border-black mt-[0px]"
                  style={{
                    width: `${THERMOWELL_DRAWING_LENGTH * 16 + 14}px`,
                  }}
                />
              )}

              {hlSensor !== "nHL" && (
                <div
                  className="absolute h-[3px] bg-yellow-300 border-r-[0.5px] border-y-[0.5px] border-black mt-[125px]"
                  style={{ width: `${lengthElement * 14.5}px`,
                           marginTop: 64, }}
                />
              )}
            </div>
          )}

          {/* ********************************** */}
          {/* ************Heads************** */}
          {/* ********************************** */}

          {elementNum === 3 && lengthElement > 0 && (
            <El33H width={`24`} style={{ marginLeft: `${-0.3}px` }} />
          )}

          {elementNum === 6 && flangeSize === 3 && lengthElement > 0 && (
            <El36H width={`12.5`} style={{ marginLeft: `${-0.3}px` }} />
          )}

          {elementNum === 6 && flangeSize === 4 && lengthElement > 0 && (
            <El46H
              width={`14.2`}
              style={{ marginTop: -0.8, marginLeft: `${-0.3}px` }}
            />
          )}

          {elementNum === 9 && flangeSize === 4 && lengthElement > 0 && (
            <El49H
              width={`13.5`}
              style={{ marginTop: -1, marginLeft: `${-0.3}px` }}
            />
          )}

          {elementNum === 6 && flangeSize === 5 && lengthElement > 0 && (
            <El56H
              width={`17`}
              style={{ marginTop: -1, marginLeft: `${-0.3}px` }}
            />
          )}

          {elementNum === 9 && flangeSize === 5 && lengthElement > 0 && (
            <El59H
              width={`12.7`}
              style={{ marginTop: 1, marginLeft: `${-0.3}px` }}
            />
          )}

          {elementNum === 12 && flangeSize === 6 && lengthElement > 0 && (
            <El612H
              width={`20.2`}
              style={{ marginTop: -1, marginLeft: `${-0.3}px` }}
            />
          )}

          {elementNum === 15 && flangeSize === 6 && lengthElement > 0 && (
            <El615H
              width={`17.5`}
              style={{ marginTop: 0, marginLeft: `${-0}px` }}
            />
          )}

          {elementNum === 21 && flangeSize === 8 && lengthElement > 0 && (
            <El821H
              width={`18.2`}
              style={{ marginTop: -0.6, marginLeft: `${-0.3}px` }}
            />
          )}
          {elementNum === 36 && flangeSize === 10 && lengthElement > 0 && (
            is10N7 ? (
              <El10N7H
                width="16"
                style={{
                  marginTop: -0.6,
                  marginLeft: `${-10 + n7ShiftX}px`, // shift overlay too
                }}
              />
            ) : (
              <El1036H width="16" style={{ marginTop: -0.6, marginLeft: "-12px" }} />
            )

          )}

          {/* DIMENSION IMMERSION LENGTH */}
          {lengthElement > 0 && (
            <div
              className="relative border-x-2 border-black flex items-end justify-end"
              style={{
                position: "absolute",
                left: headDatumX, // ✅ tune this once (try 122 -> 130 if still too left)
                width: `${dimWidthPx}px`,
                height: `${15 / scaleFactor}rem`,
                borderLeftWidth: `${1 / scaleFactor}px`,
                borderRightWidth: `${1 / scaleFactor}px`,
                marginBottom: `${(16 + flangeSize * 1.1) / scaleFactor}rem`,
              }}
            >
              {/* Arrows */}
              <div
                className="absolute w-0 h-0 border-t-[0.5rem] border-b-[0.5rem] border-r-[2rem] border-t-transparent border-b-transparent border-r-black "
                style={{
                  marginRight: `${dimWidthPx - 32}px`,
                  marginBottom: `${13 / scaleFactor}rem`,
                }}
              />
              <div
                className="absolute w-0 h-0 border-t-[0.5rem] border-b-[0.5rem] border-l-[2rem] border-t-transparent border-b-transparent border-l-black"
                style={{ marginBottom: `${13 / scaleFactor}rem` }}
              />

              {/* NUMBER ONLY (this is the only dynamic part) */}
              <div
                className="absolute text-black"
                style={{
                  marginBottom: `${13 / scaleFactor + 0.5}rem`,
                  marginRight: `${dimWidthPx / 2}px`,
                  transform: "translate(50%,0%)",
                  fontSize: `${1 / scaleFactor}rem`,
                }}
              >
                {lengthElement}&quot;
              </div>

              <div
                className="absolute text-black"
                style={{
                  marginBottom: `${12.5 / scaleFactor}rem`,
                  marginRight: `${dimWidthPx / 2}px`,
                  transform: "translate(50%,0%)",
                  fontSize: `${0.6 / scaleFactor}rem`,
                }}
              >
                Immersion Length
              </div>

              <div
                className="absolute border-t-[1px] border-black"
                style={{
                  marginBottom: `${13 / scaleFactor + 0.5}rem`,
                  width: `${dimWidthPx}px`,
                }}
              />
            </div>
          )}


          {/* ***********************************************************DIM HIGHLIMIT************************************************************************************* */}
          {hlSensor !== "nHL" && lengthElement > 0 && (
            <div
              className="border-b-[1.2rem] border-r-[0.3rem] border-l-[0.3rem] border-r-transparent border-l-transparent border-b-black"
              style={{
                marginLeft: -8,
                transform: `translate(${
                  -lengthElement * 1.5 -
                  (flangeSize === 3 && elementNum === 3 ? 35 : 0) -
                  (flangeSize === 3 && elementNum === 6 ? 22 : 0) -
                  (flangeSize === 4 && elementNum === 6 ? 22 : 0) -
                  (flangeSize === 4 && elementNum === 9 ? 22 : 0) -
                  (flangeSize === 5 && elementNum === 6 ? 22 : 0) -
                  (flangeSize === 5 && elementNum === 9 ? 22 : 0) -
                  (flangeSize === 6 && elementNum === 12 ? 22 : 0) -
                  (flangeSize === 6 && elementNum === 15 ? 22 : 0) -
                  (flangeSize === 8 ? 22 : 0) -
                  (flangeSize === 10 ? 22 : 0)
                }px,${
                  (
                    (flangeSize === 3 ? 33 : 0) +
                    (flangeSize === 4 ? 40 : 0) +
                    (flangeSize === 5 ? 48 : 0) +
                    (flangeSize === 6 ? 57 : 0) +
                    (flangeSize === 8 ? 72 : 0) +
                    (flangeSize === 10 ? 72 : 0)
                  ) + hlLeaderYOffset
                }px) rotate(10deg)`,
              }}
            >
              <div
                className="absolute"
                style={{
                  height: 80 / scaleFactor,
                  borderLeft: `${1 / scaleFactor}px solid black`,
                }}
              />
              <div
                className="absolute text-black"
                style={{
                  marginLeft: -90 / scaleFactor,
                  width: 200 / scaleFactor,
                  marginTop: 75 / scaleFactor,
                  transform: "rotate(-10deg)",
                  fontSize: `${1 / scaleFactor}rem`,
                }}
              >
                {hlSensor === "HLTC" && <>High-Limit Thermocouple</>}
                {hlSensor === "HLTS" && <>High-Limit Thermostat</>}
              </div>
            </div>
          )}
          {/*************************************************/}
          {/*************************************************/}
          {/*Thermowell DIM Length*/}
          {/*************************************************/}
          {/*************************************************/}

          {processTemp !== "nT" && thermoLength > 0 && (
            <div
              className="border-x-2 border-black flex items-end justify-end"
              style={{
                width: `${
                  THERMOWELL_DIM_LENGTH * 16 +
                  (elementNum === 3 ? 11 : 0) +
                  (flangeSize === 3 ? 14 : 0) +
                  (flangeSize === 4 ? 15 : 0) +
                  (flangeSize === 5 ? 18 : 0) +
                  (flangeSize === 6 ? 22 : 0) +
                  (flangeSize === 8 ? 19 : 0) +
                  (flangeSize === 10 ? 19 : 0)
                }px`,
                marginLeft: `${-(
                  DIMENSION_LENGTH * 16 +
                  (elementNum === 3 ? 11 : 0) +
                  (flangeSize === 3 ? 14 : 0) +
                  (flangeSize === 4 ? 15 : 0) +
                  (flangeSize === 5 ? 18 : 0) +
                  (flangeSize === 6 ? 22 : 0) +
                  (flangeSize === 8 ? 19 : 0) +
                  (flangeSize === 10 ? 5 : 0)
                )}px`,
                marginRight: `${
                  (DIMENSION_LENGTH - THERMOWELL_DIM_LENGTH) * 16 +
                  7 +
                  (elementNum === 3 ? 4 : 0)
                }px`,
                height: `${8 / scaleFactor}rem`,
                borderLeftWidth: `${1 / scaleFactor}px`,
                borderRightWidth: `${1 / scaleFactor}px`,
                marginBottom: `${(8 + flangeSize * 1.5) / scaleFactor}rem`,
              }}
            >
              {/* Arrows */}
              <div
                className="absolute w-0 h-0 border-t-[0.5rem] border-b-[0.5rem] border-r-[2rem] border-t-transparent border-b-transparent border-r-black"
                style={{
                  marginRight: `${
                    THERMOWELL_DIM_LENGTH * 16 +
                    18 +
                    (elementNum === 3 ? 8 : 0) -
                    32
                  }px`,
                  marginBottom: `${7 / scaleFactor}rem`,
                }}
              />
              <div
                className="absolute w-0 h-0 border-t-[0.5rem] border-b-[0.5rem] border-l-[2rem] border-t-transparent border-b-transparent border-l-black"
                style={{ marginBottom: `${7 / scaleFactor}rem` }}
              />

              {/* NUMBER ONLY */}
              <div
                className="absolute text-black"
                style={{
                  marginBottom: `${7 / scaleFactor + 0.5}rem`,
                  marginRight: `${
                    THERMOWELL_DIM_LENGTH * 8 +
                    7 +
                    (elementNum === 3 ? 4 : 0)
                  }px`,
                  transform: "translate(50%,0%)",
                  fontSize: `${1 / scaleFactor}rem`,
                }}
              >
                {thermoLength}&quot;
              </div>

              <div
                className="absolute text-black"
                style={{
                  marginBottom: `${6.5 / scaleFactor}rem`,
                  marginRight: `${
                    THERMOWELL_DIM_LENGTH * 8 +
                    7 +
                    (elementNum === 3 ? 4 : 0)
                  }px`,
                  transform: "translate(50%,0%)",
                  fontSize: `${0.6 / scaleFactor}rem`,
                }}
              >
                Thermowell
              </div>

              <div
                className="absolute border-t-[1px] border-black"
                style={{
                  marginBottom: `${7 / scaleFactor + 0.5}rem`,
                  width: `${
                    THERMOWELL_DIM_LENGTH * 16 +
                    14 +
                    (elementNum === 3 ? 8 : 0)
                  }px`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawings;
