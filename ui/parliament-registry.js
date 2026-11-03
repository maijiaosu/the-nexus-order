/* Approved parliamentary pages share one entry and routing registry. */
(function(root){
  'use strict';
  const entries = {
  "USA": {
    "name": "美国",
    "source": "ui/politics/nations/parliament/four/index.html?embedded=1&country=USA&v=parliament20261103-1#USA",
    "icon": "ui/politics/nations/parliament/four/assets/USA.svg",
    "tone": "natural"
  },
  "FRA": {
    "name": "法国",
    "source": "ui/politics/nations/parliament/four/index.html?embedded=1&country=FRA&v=parliament20261103-1#FRA",
    "icon": "ui/politics/nations/parliament/four/assets/FRA.svg",
    "tone": "natural"
  },
  "DEU": {
    "name": "德国",
    "source": "ui/politics/nations/parliament/four/index.html?embedded=1&country=DEU&v=parliament20261103-1#DEU",
    "icon": "ui/politics/nations/parliament/four/assets/DEU.svg",
    "tone": "light"
  },
  "JPN": {
    "name": "日本",
    "source": "ui/politics/nations/parliament/four/index.html?embedded=1&country=JPN&v=parliament20261103-1#JPN",
    "icon": "ui/politics/nations/parliament/four/assets/JPN.svg",
    "tone": "light"
  },
  "GBR": {
    "name": "英国",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=GBR&v=parliament20261103-1#GBR",
    "icon": "ui/politics/nations/parliament/world/assets/GBR.svg",
    "tone": "natural"
  },
  "CAN": {
    "name": "加拿大",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=CAN&v=parliament20261103-1#CAN",
    "icon": "ui/politics/nations/parliament/world/assets/CAN.svg",
    "tone": "natural"
  },
  "AUS": {
    "name": "澳大利亚",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=AUS&v=parliament20261103-1#AUS",
    "icon": "ui/politics/nations/parliament/world/assets/AUS.svg",
    "tone": "natural"
  },
  "ITA": {
    "name": "意大利",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ITA&v=parliament20261103-1#ITA",
    "icon": "ui/politics/nations/parliament/world/assets/ITA.svg",
    "tone": "natural"
  },
  "ESP": {
    "name": "西班牙",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ESP&v=parliament20261103-1#ESP",
    "icon": "ui/politics/nations/parliament/world/assets/ESP.svg",
    "tone": "natural"
  },
  "POL": {
    "name": "波兰",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=POL&v=parliament20261103-1#POL",
    "icon": "ui/politics/nations/parliament/world/assets/POL.svg",
    "tone": "natural"
  },
  "UKR": {
    "name": "乌克兰",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=UKR&v=parliament20261103-1#UKR",
    "icon": "ui/politics/nations/parliament/world/assets/UKR.png",
    "tone": "natural"
  },
  "NLD": {
    "name": "荷兰",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=NLD&v=parliament20261103-1#NLD",
    "icon": "ui/politics/nations/parliament/world/assets/NLD.png",
    "tone": "natural"
  },
  "SWE": {
    "name": "瑞典",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=SWE&v=parliament20261103-1#SWE",
    "icon": "ui/politics/nations/parliament/world/assets/SWE.png",
    "tone": "natural"
  },
  "CHE": {
    "name": "瑞士",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=CHE&v=parliament20261103-1#CHE",
    "icon": "ui/politics/nations/parliament/world/assets/CHE.svg",
    "tone": "natural"
  },
  "BRA": {
    "name": "巴西",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=BRA&v=parliament20261103-1#BRA",
    "icon": "ui/politics/nations/parliament/world/assets/BRA.svg",
    "tone": "natural"
  },
  "IND": {
    "name": "印度",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=IND&v=parliament20261103-1#IND",
    "icon": "ui/politics/nations/parliament/world/assets/IND.svg",
    "tone": "light"
  },
  "KOR": {
    "name": "韩国",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=KOR&v=parliament20261103-1#KOR",
    "icon": "ui/politics/nations/parliament/world/assets/KOR.svg",
    "tone": "natural"
  },
  "IDN": {
    "name": "印度尼西亚",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=IDN&v=parliament20261103-1#IDN",
    "icon": "ui/politics/nations/parliament/world/assets/IDN.png",
    "tone": "natural"
  },
  "PAK": {
    "name": "巴基斯坦",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=PAK&v=parliament20261103-1#PAK",
    "icon": "ui/politics/nations/parliament/world/assets/PAK.png",
    "tone": "pale"
  },
  "BGD": {
    "name": "孟加拉国",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=BGD&v=parliament20261103-1#BGD",
    "icon": "ui/politics/nations/parliament/world/assets/BGD.svg",
    "tone": "natural"
  },
  "VNM": {
    "name": "越南",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=VNM&v=parliament20261103-1#VNM",
    "icon": "ui/politics/nations/parliament/world/assets/VNM.png",
    "tone": "natural"
  },
  "THA": {
    "name": "泰国",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=THA&v=parliament20261103-1#THA",
    "icon": "ui/politics/nations/parliament/world/assets/THA.png",
    "tone": "natural"
  },
  "PHL": {
    "name": "菲律宾",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=PHL&v=parliament20261103-1#PHL",
    "icon": "ui/politics/nations/parliament/world/assets/PHL.png",
    "tone": "natural"
  },
  "MYS": {
    "name": "马来西亚",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=MYS&v=parliament20261103-1#MYS",
    "icon": "ui/politics/nations/parliament/world/assets/MYS.png",
    "tone": "natural"
  },
  "SGP": {
    "name": "新加坡",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=SGP&v=parliament20261103-1#SGP",
    "icon": "ui/politics/nations/parliament/world/assets/SGP.svg",
    "tone": "natural"
  },
  "PRK": {
    "name": "朝鲜",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=PRK&v=parliament20261103-1#PRK",
    "icon": "ui/politics/nations/parliament/world/assets/PRK.svg",
    "tone": "natural"
  },
  "MEX": {
    "name": "墨西哥",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=MEX&v=parliament20261103-1#MEX",
    "icon": "ui/politics/nations/parliament/world/assets/MEX.png",
    "tone": "natural"
  },
  "ARG": {
    "name": "阿根廷",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ARG&v=parliament20261103-1#ARG",
    "icon": "ui/politics/nations/parliament/world/assets/ARG.svg",
    "tone": "natural"
  },
  "TUR": {
    "name": "土耳其",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=TUR&v=parliament20261103-1#TUR",
    "icon": "ui/politics/nations/parliament/world/assets/TUR.png",
    "tone": "natural"
  },
  "IRN": {
    "name": "伊朗",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=IRN&v=parliament20261103-1#IRN",
    "icon": "ui/politics/nations/parliament/world/assets/IRN.png",
    "tone": "light"
  },
  "ISR": {
    "name": "以色列",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ISR&v=parliament20261103-1#ISR",
    "icon": "ui/politics/nations/parliament/world/assets/ISR.png",
    "tone": "natural"
  },
  "ARE": {
    "name": "阿联酋",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ARE&v=parliament20261103-1#ARE",
    "icon": "ui/politics/nations/parliament/world/assets/ARE.svg",
    "tone": "natural"
  },
  "ZAF": {
    "name": "南非",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=ZAF&v=parliament20261103-1#ZAF",
    "icon": "ui/politics/nations/parliament/world/assets/ZAF.png",
    "tone": "natural"
  },
  "EGY": {
    "name": "埃及",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=EGY&v=parliament20261103-1#EGY",
    "icon": "ui/politics/nations/parliament/world/assets/EGY.svg",
    "tone": "natural"
  },
  "NGA": {
    "name": "尼日利亚",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=NGA&v=parliament20261103-1#NGA",
    "icon": "ui/politics/nations/parliament/world/assets/NGA.png",
    "tone": "natural"
  },
  "KEN": {
    "name": "肯尼亚",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=KEN&v=parliament20261103-1#KEN",
    "icon": "ui/politics/nations/parliament/world/assets/KEN.png",
    "tone": "natural"
  },
  "MAR": {
    "name": "摩洛哥",
    "source": "ui/politics/nations/parliament/world/index.html?embedded=1&country=MAR&v=parliament20261103-1#MAR",
    "icon": "ui/politics/nations/parliament/world/assets/MAR.png",
    "tone": "natural"
  }
};
  Object.values(entries).forEach(Object.freeze);
  const registry=Object.freeze(entries);
  if(typeof module!=='undefined'&&module.exports)module.exports=registry;
  root.TNOParliaments=registry;
})(typeof window!=='undefined'?window:globalThis);
