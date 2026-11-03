/* Interface marks, drawn for this study. These are not official corporate logos. */
window.NATION_MARKS = (() => {
  const shapes = {
    tourism:'<path d="M60 15a27 27 0 0 1 0 54C45 54 36 42 60 15ZM105 60a27 27 0 0 1-54 0c15-15 27-24 54 0ZM60 105a27 27 0 0 1 0-54c15 15 24 27 0 54ZM15 60a27 27 0 0 1 54 0c-15 15-27 24-54 0Z"/><circle cx="60" cy="60" r="10" fill="#061217"/>',
    urban:'<path d="M14 101V46L40 20v81H14Zm33 0V7h25v94H47Zm32 0V42l27 26v33H79Z"/><path d="M19 79h82v7H19ZM53 26h13v6H53ZM53 44h13v6H53ZM53 62h13v6H53Z" fill="#061217"/>',
    advanced:'<path d="m60 8 45 26v52l-45 26-45-26V34Zm0 12L25 40v40l35 20 35-20V40Z" fill-rule="evenodd"/><path d="M43 37h34v46H43ZM5 43h26v5H5Zm0 29h26v5H5Zm84-29h26v5H89Zm0 29h26v5H89ZM46 4h5v27h-5Zm23 0h5v27h-5ZM46 89h5v27h-5Zm23 0h5v27h-5Z"/><path d="M53 47h14v26H53Z" fill="#061217"/>',
    logistics:'<path d="M18 34h68V19l29 25-29 25V53H18Zm84 52H34v15L5 76l29-25v16h68Z"/><path d="M46 5h28v17H46Zm0 93h28v17H46Z"/>',
    energy:'<path d="M59 25C43 47 29 61 29 80a31 31 0 0 0 62 0c0-19-16-35-32-55Z"/><path d="m65 48-23 32h16l-4 22 24-33H62Z" fill="#061217"/><path d="M58 0h5v16h-5ZM21 10l12 13-4 4-12-13ZM3 42l19 5-2 5-19-5ZM99 10l4 4-12 13-4-4Zm18 32 2 5-19 5-2-5Z"/>',
    neom:'<path d="m60 5 52 30v60l-52 23L8 88V28Zm0 11L20 35v47l40 24 40-17V42L60 16Z" fill-rule="evenodd"/><path d="m32 38 28-15v32L32 70Zm36-10 27 18v34L68 60ZM28 79l29-17v36Zm36-9 23 17-23 11Z"/>',
    saf:'<path d="M12 24 53 46v12L12 43Zm0 28 41 16v12L12 70ZM108 24 67 46v12l41-15Zm0 28L67 68v12l41-10ZM60 15l7 18h-14ZM53 39h14v48H53ZM37 94h46v9H37Z"/><path d="m30 108 30-12 30 12v5H30Z"/>',
    rsf:'<path d="M20 21h80v49L60 111 20 70Zm9 10v35l31 32 31-32V31Z" fill-rule="evenodd"/><path d="m60 35 23 23-13 13-10-10-10 10-13-13ZM55 71h10v17H55Z"/>',
    strategic:'<path d="M13 36 60 9l47 27v9H13Zm9 17h14v39H22Zm31 0h14v39H53Zm31 0h14v39H84ZM9 101h102v11H9Z"/>',
    financial:'<circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" stroke-width="5"/><ellipse cx="60" cy="60" rx="22" ry="48" fill="none" stroke="currentColor" stroke-width="4"/><path d="M15 42h90M12 77h96M60 12v96" fill="none" stroke="currentColor" stroke-width="4"/>'
  };
  return (key,cls='')=>`<svg class="ui-mark ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false" fill="currentColor">${shapes[key]||shapes.strategic}</svg>`;
})();
