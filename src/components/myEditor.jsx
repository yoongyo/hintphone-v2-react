import React, {useState} from 'react';
import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';

export const MyEditor = () => {
  const [value, setValue] = useState();

  return (
    <>
      <JoditReact onChange={(content) => setValue(content)} defaultValue="Hi" />
      {value}
    </>
  );
};