window.mountChinaShell=function(){
  const main=document.getElementById('main-window');
  const outline=window.CHINA_ROOF_CONTOUR+'L1400 466.667H0Z';
  main.insertAdjacentHTML('afterbegin',`<div class="nation-shell" aria-hidden="true"><svg viewBox="0 0 1400 466.667"><defs>
    <pattern id="shell-texture" width="160" height="160" patternUnits="userSpaceOnUse"><svg width="160" height="160" viewBox="10 10 160 160"><image href="../assets/window.png" width="188" height="188"/></svg></pattern>
    <filter id="shell-cutout"><feMorphology in="SourceAlpha" operator="erode" radius="1.4" result="alpha"/><feComposite in="SourceGraphic" in2="alpha" operator="in"/></filter>
    <clipPath id="shell-mao"><rect x="668.5" y="280" width="61.5" height="78"/></clipPath>
    </defs><path d="${outline}" fill="#080b0d"/><path d="${outline}" fill="url(#shell-texture)" opacity=".25"/><path d="M0 466.667L0 288${window.CHINA_ROOF_CONTOUR.replace(/^M[^L]+/,'')}L1400 466.667" fill="none" stroke="#596362" stroke-width="4"/>
    <image href="../china-tno-study/assets/tiananmen-final.png" width="1400" height="466.667" filter="url(#shell-cutout)"/>
    <g clip-path="url(#shell-mao)"><svg x="668.5" y="280" width="61.5" height="78" viewBox="1764 1190 347 488" preserveAspectRatio="xMidYMid slice"><image href="assets/mao-tiananmen-real-2014.jpg" width="4000" height="3000"/></svg></g>
    </svg></div>`);
};
