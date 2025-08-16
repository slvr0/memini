import React, { useEffect, useState, useRef } from "react";

const DataTree = ({ data, level = 0 }) => {
  const [expanded, setExpanded] = useState(false); // ✅ always at the top

  if (data === null) {
    return <span style={{ color: "#888" }}>null</span>;
  }

  if (typeof data !== "object") {
    return <span>{String(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);

  return (
    <div style={{ marginLeft: level * 12 }}>
      <span
        style={{ cursor: "pointer", color: "#61dafb" }}
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "▼" : "▶"} {isArray ? `Array(${entries.length})` : "Object"}
      </span>
      {expanded &&
        entries.map(([key, value]) => (
          <div key={key}>
            <strong style={{ color: "#9cdcfe" }}>{key}:</strong>{" "}
            <DataTree data={value} level={level + 1} />
          </div>
        ))}
    </div>
  );
};


const ConsoleViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    const addLog = (type, args) => {
      setLogs((prev) => [...prev, { type, args, timestamp: new Date() }]);
    };

    console.log = (...args) => {
      addLog("log", args);
      originalLog(...args);
    };
    console.warn = (...args) => {
      addLog("warn", args);
      originalWarn(...args);
    };
    console.error = (...args) => {
      addLog("error", args);
      originalError(...args);
    };
    console.info = (...args) => {
      addLog("info", args);
      originalInfo(...args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
    };
  }, []);

  const getColor = (type) => {
    switch (type) {
      case "error": return "#f44747";
      case "warn": return "#ffcc00";
      case "info": return "#4fc3f7";
      default: return "#ffffff";
    }
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: "10px",
        padding: "10px",
        height: "100vh",
        overflowY: "auto",
        border: "1px solid #333",
        borderRadius: "6px"
      }}
    >
      {logs.map((log, idx) => (
        <div key={idx} style={{ color: getColor(log.type) }}>
          <span style={{ color: "#888" }}>
            [{log.timestamp.toLocaleTimeString()}]
          </span>{" "}
          <strong>{log.type.toUpperCase()}</strong>:{" "}
          {log.args.map((arg, i) => (
            <DataTree key={i} data={arg} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConsoleViewer;
