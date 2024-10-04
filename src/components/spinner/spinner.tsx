import React from "react";
import "./spinner.css";

interface SpinnerProps {
  width?: React.CSSProperties["width"];
}

export default function Spinner(props: SpinnerProps) {
  return <div className="spinner" style={{ width: props.width || 20 }} />;
}
