import React, {useCallback, useEffect, useMemo, useRef, useState, lazy} from "react";
import "./Textarea.scss";
import {emojisW10} from "../fallback/emotes/emojisW10";
import {useEmoteFolder} from "../customHooks/customHooks";
import {EMOTE_DIR} from "../constants";
import eye from "../img/emotes/theeye.jpg";
import {indexOfIncluding} from "../helpers";
const Textarea = (
  {
    value = "",
    rows = 20,
    cols = 80,
    onTextChange,
    ...props
  }
) => {
  const [parsedValue, setParsedValue] = useState(value);
  const textarea = useRef();
  const emotes = useEmoteFolder();

  const debounce = (fn, delay = 0) => {
    let id;
    return (...args) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(fn, delay, ...args);
      return id;
    };
  };

  useEffect(() => {
    setParsedValue(value)
  }, [value])

  const replaceByEmotes = useCallback(debounce(async(txt) => {
    // if (emotes.images && emotes.images?.length > 0) {
    let blocks = [];
    let lastIndex = 0;
    emotes.images?.forEach((emote) => {
      // txt = txt.replaceAll(Object.keys(emote)?.[0] ?? "", <img src={emote.src}/>)
      let index = txt.indexOf(emote.fullname);
      console.log(index)
      while (index !== -1) {

        let fragmentText = txt.substring(lastIndex, index);
        console.log(fragmentText)
        blocks.push(<span>{fragmentText}</span>, <img src={emote.src}/>)
        lastIndex = index;
        index = txt.indexOf(emote.fullname, index + 1);
      }
    })
    // console.log(blocks)
    // }
    // Object.entries(emojisW10).forEach((entry) => {
    //   txt = txt.replaceAll(entry[0], entry[1])
    // })
    // console.log(txt)
    setParsedValue(txt);
  }, 1000),[])

  const handleOnChange = (event, innerText) => {
    onTextChange(event, innerText);
    // El siguiente bloque de 3 lineas posiciona el cursor al final tras cada input, de lo contrario el cursor se posiciona al principio
    textarea.current?.focus()
    window.getSelection().selectAllChildren(textarea.current)
    window.getSelection().collapseToEnd()

    replaceByEmotes(innerText);
  }

  return (
    <div
      ref={textarea}
      className={'wysiwyg-textarea'}
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => handleOnChange(e, e.target.innerText)}
    >
      {parsedValue}
    </div>
  )
}

export default Textarea;
