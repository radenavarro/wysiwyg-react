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

  const replaceByEmotesOld = useCallback(debounce(async(txt, _emotes) => {
    // Se le pasa _emotes como parámetro en vez de utilizar directamente la constante emotes, porque en la primera carga puede venir undefined. De esta forma nos aseguramos 100% de que no lo haga
    let htmlText = [];
    let prevIndex = 0;
    let indexes = indexOfIncluding(
      _emotes.images?.map((i) => i.fullname),
      txt
    );
    console.log(textarea.current?.children?.[0]?.innerHTML);
    console.log(indexes)
    if (indexes && indexes?.length > 0) {
      indexes?.map((idxObj, indexInArray) => {
        let prevText = txt.substring(prevIndex, idxObj.index)
        let srcImage = _emotes.images?.find((i) => i.fullname === idxObj.needle);
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
    console.log(<>
      {htmlText.map((h) => (h))}
    </>)
    setHtmlValue(
      <>
        {htmlText.map((h) => (h))}
      </>
    )
    setParsedValue(txt);
  }, 1000),[])

  const replaceByEmotes = useCallback(debounce(async(txt, _emotes) => {
    // Se le pasa _emotes como parámetro en vez de utilizar directamente la constante emotes, porque en la primera carga puede venir undefined. De esta forma nos aseguramos 100% de que no lo haga
    let elementsInTextarea = textarea.current?.children;
    // console.log(elementsInTextarea)
    if (elementsInTextarea && elementsInTextarea?.length > 0) {
      let elmnts = Object.values(elementsInTextarea).map((element) => {
        let tagname = element.tagName;
        if (tagname !== "SPAN") return element;
        let prevIndex = 0;
        let text = element.innerText;
        let indexes = indexOfIncluding(
          _emotes.images?.map((i) => i.fullname),
          text
        );
        console.log(indexes)

        const renderHtml = (element) => {
          let elements = [];
          if (indexes && indexes?.length > 0) {
            indexes?.map((idxObj, indexInArray) => {
              let prevText = txt.substring(prevIndex, idxObj.index)

              let srcImage = _emotes.images?.find((i) => i.fullname === idxObj.needle);
              elements.push(
                <span key={prevText}>{prevText}</span>,
                <img className={'emoteImg'} key={srcImage.fullname + idxObj.index} src={srcImage.src}/>
              )

              prevIndex = idxObj.index + idxObj.needle.length;

            })
            console.log(prevIndex)
            // Añadir sobrante
            elements.push(
              <span>{txt.substring(prevIndex)}</span>
            )
          } else {
            elements.push(<span>{txt}</span>)
          }
          return (
            <>
              {elements?.map((e) => e)}
            </>
          )
        }

        return renderHtml(element);
      })
      // console.log(elmnts)
      setHtmlValue(elmnts)
    }
    setParsedValue(txt);
  }, 1000),[])

  const handleOnChange = (event, innerText) => {
    onTextChange(event, innerText);
    // El siguiente bloque de 3 lineas posiciona el cursor al final tras cada input, de lo contrario el cursor se posiciona al principio
    textarea.current?.focus()
    window.getSelection().selectAllChildren(textarea.current)
    window.getSelection().collapseToEnd()

    replaceByEmotes(innerText, emotes);
  }

  return (
    <>
      <div
        ref={textarea}
        className={'wysiwyg-textarea'}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => handleOnChange(e, e.target.innerText)}
      >
        {/*{parsedValue}*/}
        {htmlValue}
      </div>
      {/*{console.log(textarea.current?.children)}*/}
    </>

  )
}

export default Textarea;
