import React, {useState} from 'react';
import './WYSIWYGText.css';
import Textarea from "./components/Textarea";

const WYSIWYGText: React.FC = () => {
  const [text, setText] = useState("");

  const handleChangeText = (ev:any, value:string) => {
    // console.log(value)
    setText(value)
  }

  return (
      <div className="wysiwyg">
        <Textarea
          rows={20}
          cols={80}
          onTextChange={handleChangeText}
          value={text}
        />
      </div>
  );
}

export default WYSIWYGText;

