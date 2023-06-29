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
  const [htmlValue, setHtmlValue] = useState(<span></span>);
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
    let htmlText = [];
    let prevIndex = 0;
    let indexes = indexOfIncluding(
      emotes.images?.map((i) => i.fullname),
      txt
    );
    // console.log(indexes)
    if (indexes && indexes?.length > 0) {
      indexes?.map((idxObj, indexInArray) => {
        let prevText = txt.substring(prevIndex, idxObj.index)
        let srcImage = emotes.images?.find((i) => i.fullname === idxObj.needle);
        htmlText.push(
          <span key={prevText}>{prevText}</span>,
          <img className={'emoteImg'} key={srcImage.fullname + idxObj.index} src={srcImage.src}/>
        )
        prevIndex = idxObj.index + idxObj.needle.length;
        if (!indexes[indexInArray + 1]) {
          let postText = txt.substring(prevIndex);
          if (postText && postText !== "") {
            htmlText.push(<span key={postText}>{postText}</span>)
          }
        }
      })
    } else {
      htmlText.push(<span>{txt}</span>)
    }

    // }
    // Object.entries(emojisW10).forEach((entry) => {
    //   txt = txt.replaceAll(entry[0], entry[1])
    // })
    // console.log(txt)
    console.log(htmlText)
    setHtmlValue(
      <>
        {htmlText.map((h) => (h))}
      </>
    )
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
