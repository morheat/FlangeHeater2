import { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

function App() {
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<string>("");
  const [wattsVar, setWattage] = useState<string>("");
  const [processSensor, setProcessSensor] = useState<string>("nT");
  const [HLSensor, setHLSensor] = useState<string>("nHL");
  const [processTStat, setProcessTStat] = useState<string>("");
  const [terminalBoxVar, setTerminalBox] = useState<string>("N1");
  const [materialVar, setMaterial] = useState<string>("304SS");

  const [flangeSizeOp, setFlangeSize] = useState<number>(3);
  const [phaseVar, setPhase] = useState<number>(1);
  const [immersionLengthVar, setImmersionLength] = useState<number>(25);
  const [foldLengthVar, setFoldLength] = useState<number>(5);
  const [thermoLength, setThermoLength] = useState<number>(10);
  const [elementNumVar, setElementNum] = useState<number>(1);
  const [coldLength, setColdLength] = useState<number>(2.5);
  const [hlLength, setHlLength] = useState<number>(10); // pick whatever default you want
  const [processRange, setProcessRange] = useState<string>("");


  const drawingRef = useRef<HTMLDivElement>(null);

  async function getDrawingBlob(): Promise<Blob> {
    if (!drawingRef.current) throw new Error("Drawing ref not found");

    const blob = await htmlToImage.toBlob(drawingRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "white",
    });

    if (!blob) throw new Error("Failed to create image blob");
    return blob;
  }

  async function copyDrawingToClipboard() {
    try {
      const blob = await getDrawingBlob();

      // ✅ prevent "ClipboardItem is not defined" crashes
      const ClipboardItemCtor = (window as any).ClipboardItem;
      if (!ClipboardItemCtor || !navigator.clipboard?.write) {
        alert("Clipboard image copy not supported here. Use Download instead.");
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItemCtor({ "image/png": blob }),
      ]);

      alert("Copied drawing to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Copy failed. (Often needs HTTPS or localhost)");
    }
  }


  async function downloadDrawingPng() {
    try {
      const blob = await getDrawingBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `heater-drawing-${Date.now()}.png`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  }


  useEffect(() => {
    const el = document.getElementById("elementNumOptions") as HTMLSelectElement | null;
    if (!el) return; // ✅ prevent crash
    setElementNum(Number(el.value));
  }, [flangeSizeOp]);


  return (
    <div className="flex justify-center mt-5 w-screen">
      <div className="w-96 h-[50rem] bg-white p-2 border-2 border-slate-400 rounded-lg mr-6 text-gray-700">
        <div className="flex space-x-3">
          <div>
            <h1>Serial Number</h1>
            <input
              type="text"
              id="serialNumInput"
              onChange={(e) => setSerialNum(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <h1>Title</h1>
            <input
              type="text"
              id="titleInput"
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <div>
            <h1>Voltage</h1>
            <input
              onChange={(e) => setVoltage(e.target.value)}
              type="text"
              id="voltInput"
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <h1>Wattage</h1>
            <input
              onChange={(e) => setWattage(e.target.value)}
              type="text"
              id="wattsInput"
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>

        <div>
          <h1>Flange Size</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => {
              setFlangeSize(Number(e.target.value));
            }}
          >
            <option value={3}>3&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={4}>4&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={5}>5&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={6}>6&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={8}>8&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={10}>10&quot;-150 LB ANSI Flanged Heaters</option>
            <option value={12}>12&quot;-150 LB ANSI Flanged Heaters</option>
          </select>
        </div>

        <div>
          <h1>Phase</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => {
              setPhase(Number(e.target.value));
            }}
          >
            <option value={1}>1PH</option>
            <option value={3}>3PH</option>
          </select>
        </div>

        <div>
          <h1>Immersion Length</h1>
          <input
            type="text"
            id="immersLength"
            defaultValue={10}
            onChange={(e) => setImmersionLength(Number(e.target.value) || 0)}
            className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
          />
        </div>

        <div>
          <h1>Number of Elements</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => {
              setElementNum(Number(e.target.value));
            }}
            id="elementNumOptions"
          >
            {flangeSizeOp === 3 && (
              <>
                <option value={3}>3 Element</option>
                <option value={6}>6 Element</option>
              </>
            )}
            {(flangeSizeOp === 4 || flangeSizeOp === 5) && (
              <>
                <option value={6}>6 Elements</option>
                <option value={9}>9 Elements</option>
              </>
            )}

            {flangeSizeOp === 6 && (
              <>
                <option value={12}>12 Elements</option>
                <option value={15}>15 Elements</option>
              </>
            )}

            {flangeSizeOp === 8 && (
              <>
                <option value={21}>21 Elements</option>
                <option value={24}>24 Elements</option>
                <option value={27}>27 Elements</option>
              </>
            )}
                        
            {flangeSizeOp === 10 && (
              <>
                <option value={36}>36 Elements</option>
                <option value={42}>42 Elements</option>
                <option value={48}>48 Elements</option>
              </>
            )}

            {flangeSizeOp === 12 && (
              <>
                <option value={48}>48 Elements</option>
                <option value={54}>54 Elements</option>
                <option value={60}>60 Elements</option>
              </>
            )}
          </select>
        </div>


        <div>
          <h1>Cold Length</h1>
          <input
            type="text"
            id="coldLengthInput"
            value={coldLength}
            onChange={(e) => setColdLength(Number(e.target.value) || 0)}
            className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
          />
        </div>
        
        {elementNumVar === 1.5 && (
          <div>
            <h1>Foldback Length</h1>
            <input
              type="text"
              id="foldbackLengthInput"
              defaultValue={5}
              onChange={(e) => setFoldLength(Number(e.target.value) || 0)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        )}

        <div>
          <h1>Element Sheath Material</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => {
              setMaterial(String(e.target.value));
            }}
          >
            <option>304SS</option>
            <option>310SS</option>
            <option>Incoloy 800/840</option>
            <option>Inconel 600</option>
            <option>Titanium</option>
            <option>PTFE Teflon</option>
          </select>
        </div>

        <div>
          <h1>Temp Sensor Option</h1>

          <div className="flex space-x-3">
            {/* ✅ Process Thermowell YES/NO (make blue) */}
            <select
              className="select select-xs border-blue-600 border-2 text-gray-700 dark:text-gray-300"
              value={processSensor === "nT" ? "No" : "Yes"}
              onChange={(e) => {
                const v = e.target.value;

                if (v === "No") {
                  setProcessSensor("nT");
                  setProcessTStat("");
                  setProcessRange("");
                } else {
                  // default when turning on
                  setProcessSensor("J"); // Type J default (change if you want)
                  setProcessTStat("");
                  setProcessRange("");
                }
              }}
            >
              <option value="No">Process Thermowell: No</option>
              <option value="Yes">Process Thermowell: Yes</option>
            </select>

            {/* HL selector stays the same */}
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              onChange={(e) => setHLSensor(e.target.value)}
              value={HLSensor}
            >
              <option value="nHL">None</option>
              <option value="HLTC">High-Limit Thermocouple</option>
              <option value="HLTS">High-Limit Thermostat</option>
            </select>
          </div>

          {/* ✅ If Process Thermowell YES, show the options list */}
          {processSensor !== "nT" && (
            <div className="mt-2">
              <h1>Process Thermowell Type</h1>

              <select
                className="select select-xs border-blue-600 border-2 text-gray-700 dark:text-gray-300 w-full"
                value={processSensor}
                onChange={(e) => {
                  const v = e.target.value;

                  setProcessSensor(v);

                  // thermostat logic
                  if (v === "SPST") {
                    setProcessTStat("SPST");
                    setProcessRange("C:-30,30"); // default
                  } else if (v === "DPST") {
                    setProcessTStat("DPST");
                    setProcessRange("F:0,100"); // default
                  } else {
                    setProcessTStat("");
                    setProcessRange("");
                  }
                }}
              >
                <option value="J">1) Type J Thermocouple</option>
                <option value="K">2) Type K Thermocouple</option>
                <option value="RTD">3) RTD</option>
                <option value="SPST">4) SPST Thermostat</option>
                <option value="DPST">5) DPST Thermostat</option>
              </select>

              {/* ✅ SPST ranges are in °C, but show °F too */}
              {processSensor === "SPST" && (
                <div className="mt-2">
                  <h1>SPST Range (°C / °F)</h1>
                  <select
                    className="select select-xs border-blue-600 border-2 text-gray-700 dark:text-gray-300 w-full"
                    value={processRange}
                    onChange={(e) => setProcessRange(e.target.value)}
                  >
                    <option value="C:-30,30">-30 to 30°C ( -22 to 86°F )</option>
                    <option value="C:0,40">0 to 40°C ( 32 to 104°F )</option>
                    <option value="C:0,50">0 to 50°C ( 32 to 122°F )</option>
                    <option value="C:0,80">0 to 80°C ( 32 to 176°F )</option>
                    <option value="C:0,90">0 to 90°C ( 32 to 194°F )</option>
                    <option value="C:0,120">0 to 120°C ( 32 to 248°F )</option>
                    <option value="C:0,150">0 to 150°C ( 32 to 302°F )</option>
                    <option value="C:0,200">0 to 200°C ( 32 to 392°F )</option>
                    <option value="C:0,250">0 to 250°C ( 32 to 482°F )</option>
                    <option value="C:0,320">0 to 320°C ( 32 to 608°F )</option>
                  </select>
                </div>
              )}

              {/* ✅ DPST ranges are in °F, but show °C too */}
              {processSensor === "DPST" && (
                <div className="mt-2">
                  <h1>DPST Range (°F / °C)</h1>
                  <select
                    className="select select-xs border-blue-600 border-2 text-gray-700 dark:text-gray-300 w-full"
                    value={processRange}
                    onChange={(e) => setProcessRange(e.target.value)}
                  >
                    <option value="F:0,100">0 to 100°F ( -18 to 38°C )</option>
                    <option value="F:6,250">6 to 250°F ( -14 to 121°C )</option>
                    <option value="F:50,550">50 to 550°F ( 10 to 288°C )</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>


        {processSensor === "TS" && (
          <div>
            <h1>Temp Sensor Option</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              onChange={(e) => {
                setProcessTStat(e.target.value);
              }}
              value={processTStat}
            >
              <option value="SPST">SPST Thermostat</option>
              <option value="DPST">DPST Thermostat</option>
            </select>
          </div>
        )}


        {(processSensor !== "nT" || HLSensor !== "nHL") && (
          <div>
            <h1>Sensor Lengths</h1>

            <div className="flex space-x-3">
              {/* Thermowell Length (Process) */}
              {processSensor !== "nT" && (
                <div className="flex-1">
                  <h1>Thermowell Length</h1>
                  <input
                    type="text"
                    id="psLength"
                    value={thermoLength}
                    onChange={(e) => setThermoLength(Number(e.target.value) || 0)}
                    className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
                  />
                </div>
              )}

              {/* HL Length */}
              {HLSensor !== "nHL" && (
                <div className="flex-1">
                  <h1>HL Length</h1>
                  <input
                    type="text"
                    id="hlLength"
                    value={hlLength}
                    onChange={(e) => setHlLength(Number(e.target.value) || 0)}
                    className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
        )}


        <div>
          <h1>Terminal Box</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={terminalBoxVar}
            onChange={(e) => setTerminalBox(e.target.value)}
          >

            {flangeSizeOp === 3 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 4 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 5 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 6 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 8 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 10 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {flangeSizeOp === 12 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            
          </select>
        </div>
        <div className="mt-4 space-y-2">
          <button
            className="btn btn-sm w-full border-2 border-cyan-500"
            type="button"
            onClick={copyDrawingToClipboard}
          >
            Copy Drawing (PNG)
          </button>

          <button
            className="btn btn-sm w-full border-2 border-cyan-500"
            type="button"
            onClick={downloadDrawingPng}
          >
            Download Drawing (PNG)
          </button>
        </div>

      </div>

      <Drawing
        drawingRef={drawingRef}
        serialNum={serialNum}
        title={titleVar}
        flangeSize={flangeSizeOp}
        phase={phaseVar}
        lengthElement={immersionLengthVar}
        foldLength={foldLengthVar}
        elementNum={elementNumVar}
        processTemp={processSensor}
        hlSensor={HLSensor}
        hlLength={hlLength}
        typeThermostat={processTStat}
        thermoLength={thermoLength}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        terminalBox={terminalBoxVar}
        coldLength={coldLength}
        processRange={processRange}
      />
    </div>
  );
}

export default App;
