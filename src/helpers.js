const lowestIdxObjectIncluding = (needles, haystack, pos) => {
  let indexObject = needles
    .map((needle) => {
      return {needle, index: haystack.indexOf(needle, pos)};
    })
    ?.filter((indexObj) => indexObj.index !== -1)
    ?.sort((a,b) => a.index - b.index)
    ?.[0];
  return indexObject;
}

/**
 * Función que devuelve un array de objetos con la información de todos los índices (needles) dentro de una cadena de texto
 * (haystack).
 *
 * @param needles
 * @param haystack
 * @returns {Object}
 */
export const indexOfIncluding = (needles, haystack) => {
  if (!Array.isArray(needles)) {
    console.error("Needle must be an array");
    return -1;
  }
  let pos = 0;
  let lowestIdx = lowestIdxObjectIncluding(needles, haystack, pos);
  if (lowestIdx && lowestIdx.index) pos = lowestIdx.index;
  let collection = [{...lowestIdx}];

  let time = new Date().getTime();// Control para que, pase lo que pase, el while no continúe una vez pasado una cierta cantidad de tiempo

  while (lowestIdx && lowestIdx?.index !== -1 && (new Date().getTime()) - time < 50) {
    lowestIdx = lowestIdxObjectIncluding(needles, haystack, pos + 1)
    if (lowestIdx && lowestIdx?.index !== -1) collection.push(lowestIdx);
    pos = lowestIdx?.index ?? -1;
  }
  return collection;
}
