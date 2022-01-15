import React, { useEffect } from "react";
import ax from "../ax";
const LabelContext = React.createContext();

export const LabelContextProvider = (props) => {
  const [label, setLabel] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [selectedLabel, setSelectedLabel] = React.useState(null);

  return (
    <LabelContext.Provider
      value={{
        label,
        setLabel,
        loader,
        selectedLabel,
        setSelectedLabel,
        setLoader,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};

export default LabelContext;
