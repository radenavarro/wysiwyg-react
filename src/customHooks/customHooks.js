import {useEffect, useState} from "react";

export const useEmoteFolder = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const loadImageData = async () => {
      try {
        const context = require.context('../img/emotes', true, /\.(png|jpe?g|gif|svg|webp)$/);
        const fileNames = context.keys();
        const loadedImages = [];

        for (const fileName of fileNames) {
          const imageObject = {
            fullname: undefined,
            src: undefined
          }
          // console.log(fileName);
          let matches = context(fileName).match(/^\/static\/media\/(.+)\.[a-zA-Z0-9]+(\.\w+)$/);
          // console.log(matches)
          if (matches && matches.length === 3) {
            const fileName = matches[1];
            const fileExtension = matches[2];

            // const imageUrl = `../img/emotes/${fileName}${fileExtension}`;
            console.log(`../img/emotes/${fileName}${fileExtension}`)
            const imageUrl = await import(`../img/emotes/${fileName}${fileExtension}`);

            imageObject.fullname = fileName.replace('./', '');
            imageObject.src = imageUrl.default

          }


          loadedImages.push(imageObject);
        }

        setImageData(loadedImages);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };

    loadImageData();

  }, []);

  return {
    images: imageData
  };
};
