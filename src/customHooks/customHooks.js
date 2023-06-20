import {useEffect, useState} from "react";

export const useEmoteFolder = () => {
  const [imageSet, setImageSet] = useState({images:[]});

  function mapKeys(r) {
    return r.keys().map(r) ?? [];
  }

  async function loadSrcs(mappedKeys) {
    let loadedSrcs = [];
    for await (let emote of mappedKeys) {
      let imgname = emote.match(/([^(.)]*)/gm)?.[0]?.replace("/static/media/", "");
      let extension = emote.split(".")?.pop();
      let src = await import(`../img/emotes/${imgname}.${extension}`);
      loadedSrcs.push ({
        [imgname]: {
          fullname: emote,
          src
        }
      })
    }
    return loadedSrcs;
  }

  async function importAll(r) {
    let mappedKeys = mapKeys(r);
    if (mappedKeys && mappedKeys?.length > 0) {
      mappedKeys = await loadSrcs(mappedKeys);
    }
    setImageSet({images: mappedKeys});
  }

  useEffect(() => {
    importAll(require.context('../img/emotes', true, /\.(png|jpe?g|svg)$/))
  },[])

  return imageSet;
}
