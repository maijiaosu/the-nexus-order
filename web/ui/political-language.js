/* Editorial ink for political and social reading passages. The source strings remain intact. */
(function (root) {
  'use strict';
  const groups = {
    left: ['#c74649', [
      '社会主义 社会主义经济 科学社会主义 共产主义 马克思主义 马克思列宁主义 马克思列宁主义者 列宁主义 布尔什维主义 毛泽东思想 毛主义 无产阶级 无产阶级专政 无产阶级革命 工人阶级 阶级斗争 阶级意识 第三世界 革命 继续革命 反帝国主义 反殖民主义 生产资料公有制 公有制 计划经济 劳动解放 劳工运动 工人运动 农民运动 土地革命 左翼民族主义 左翼民粹主义 自由社会主义 左翼无政府主义 社会主义政党 社会主义纲领 社会主义经济政策 社会主义革命 工人政党 工人委员会 工人阶级政党 马克思列宁主义者 马克思主义者 共产党总书记 中共中央政治局 中共中央 中共党史 越共中央 苏共中央 苏联解体后 社会主义阵营 革命根据地 阶级政治 意大利共产党 法国共产党 俄罗斯联邦共产党 尼泊尔共产党 古巴革命 劳工阶级 反殖民斗争 反殖民统治 土地改革运动 共产党员马克思主义者 左翼联盟 左翼政府 左翼运动 左翼政党 国际主义 劳动阶级 卡斯特罗主义 纳赛尔主义 反殖民 工人社会主义党 学生革命 新民主主义 人民公社 托洛茨基主义 工农联盟 西班牙共产党 左翼民族主义者 社会所有制',
      'left-wing party|left-wing movement|national liberation|collectivisation|labor unions|socialist party|Socialist Party of America|workers\' movement|anti-colonial struggle|Central Committee of the Communist Party|Maoist|socialist revolution|socialism|socialist|socialists|communism|communist|communists|Marxism–Leninism|Marxism|Marxist|Maoism|proletariat|proletarian|working class|working-class|class struggle|Third World|revolution|workers’ movement|anti-colonialism|anti-imperialism|planned economy|public ownership|socialismo|proletariado|revolución'
    ]],
    social: ['#e4a1be', [
      '民主社会主义 民主社会主义者 社会民主主义 社会民主主义者 福利国家 社会保障体系 全民医保 全民健保 全民医疗保障 全民医疗 最低工资 集体谈判 工会权利 劳工权利 劳工权益 劳动者权益 财富再分配 收入再分配 财富不平等 经济不平等 公共住宅 公共住房 养老金制度 无条件基本收入 社会民主党 社民党 工党政府 工党领袖 西班牙工人社会党 德国社会民主党 瑞典社会民主党 福利支出 工资上涨 工资增长 公共医疗体系 就业保障 劳动保障 劳动合同 集体合同 劳动市场 劳动力市场 就业市场 社会救济 医疗保险 养老金领取者 医疗开支 工会组织 工会会员 失业保险 福利依赖 社会住房政策 免费教育 工薪阶层 社保体系 福利政策 养老金改革方案 希望工程 工人权益 产假制度 照护工作 社会民主党人 德国社民党 法国社会党 社会民主工党 普遍医疗保障 统一社会党 全民医疗保障制度 儿童福利 反贫困 贫困率 工业行动 最低月薪',
      'labour rights|welfare reform|social protection|old-age pensions|workers’ compensation|Social Democratic Party|social democrats|social welfare|welfare benefits|public health system|working families|health insurance|pensions|labour market|labor market|unemployment insurance|National Health Insurance|Workers\' Rights|social spending|Partido Socialdemócrata|democratic socialism|democratic socialist|democratic socialists|social democracy|social democratic|social democrat|welfare state|universal healthcare|universal health care|Medicare for All|collective bargaining|workers’ rights|minimum wage|wealth inequality|income redistribution|socialdemocracia|salario mínimo'
    ]],
    liberal: ['#79bde8', [
      '自由主义 新自由主义 古典自由主义 社会自由主义 自由意志主义 自由至上主义 市场自由化 贸易自由化 自由贸易 自由市场 经济自由化 私有化 市场化 出版自由 新闻自由 言论自由 信仰自由 宗教自由 公民自由 公民权利 民权运动 司法独立 权力分立 政教分离 绿色政治 生态主义 人权组织 妇女权利 妇女平权 同性婚姻 同性恋权利 种族平权 种族歧视 公民权运动 人权活动人士 自由选举权 新自由主义经济政策 法治原则 反歧视法 无罪推定 民主改革 民主倒退 解禁反对党 集会权 多元民主 人权观察 女权运动 私营经济 市场化改革 进步主义 平等主义 环保主义 世俗主义 民权人士 政治自由化 基本权利 人权运动 新闻工作者协会 个人权利 经济自由 新闻出版自由 民主人士 公民权利运动',
      'progressivism|political liberalisation|freedom of movement|human rights|women\'s rights|same-sex marriage|anti-discrimination|rule of law|press freedoms|feminist|civil rights|civil society|minority rights|derechos humanos|estado de derecho|neoliberalism|neoliberal|classical liberalism|social liberalism|liberalism|libertarianism|libertarian|free trade|free market|privatization|privatisation|press freedom|freedom of the press|freedom of speech|civil liberties|civil rights movement|judicial independence|separation of powers|green politics|liberalismo|neoliberalismo|libre mercado'
    ]],
    conservative: ['#718fd0', [
      '自由保守主义 保守自由主义 保守的自由主义 财政保守主义 财政纪律 小政府 平衡预算 财政紧缩 减税与就业法案 基督教民主主义',
      'liberal conservatism|liberal conservative|conservative liberalism|fiscal conservatism|fiscal discipline|balanced budget|limited government|Christian democracy|tax cuts and jobs act'
    ]],
    nationalRight: ['#b78161', [
      '右翼民粹主义 右翼民粹 右翼民族主义 温和右翼民族主义 民族保守主义 右翼民族社会主义 法西斯主义 新法西斯主义 国家社会主义 纳粹主义 贸易保护主义 经济民族主义 美国优先 让美国再次伟大 反移民 疑欧派 反移民政党 驱逐非法移民 移民限制 边境管控 边境管制政策 移民禁令 右翼政党 极右翼政党 右翼联盟 极右派政党 极右翼政客 疑欧主义者 排外主义 反对移民 右翼民族主义者 右翼运动 国家保守主义',
      'far-right party|anti-immigrant|ethnonationalism|anti-immigration|Eurosceptic|border security|restrictions on immigration|right-wing coalition|right-wing populism|right-wing populist|right-wing nationalism|national conservatism|national socialism|national socialist|neo-fascism|fascism|fascist|Nazism|economic nationalism|trade protectionism|America First|Make America Great Again|populismo de derecha|fascismo'
    ]],
    ultra: ['#93929b', [
      '极端民族主义 极端军国主义 种族至上主义 白人至上主义 大汉族主义 排他民族观',
      'ultranationalism|ultra-nationalism|ultramilitarism|white supremacy|racial supremacy'
    ]],
    populist: ['#f3d75a', [
      '民粹主义 民粹主义者 反建制主义 反建制运动 人民对抗精英',
      'populism|populist|anti-establishment movement|populismo'
    ]],
    faith: ['#65aa79', [
      '伊斯兰主义 政治伊斯兰 伊斯兰教法 神权政治 神权统治 宗教政治 宗教民族主义 教法统治 政教合一 法学家监护 伊斯兰革命 什叶派教士 逊尼派穆斯林 伊斯兰达瓦党 伊斯兰宗教学者 穆斯林少数群体 伊斯兰教士 穆斯林少数民族 天主教主教团 宗教少数群体 塔利班政权',
      'Islamic Dawa Party|Shia cleric|Muslim minority|religious minorities|Sunni Muslim|Islamism|political Islam|Islamic law|sharia law|theocracy|theocratic rule|religious nationalism|guardianship of the jurist|Islamic Revolution'
    ]],
    authority: ['#a6a6ab', [
      '威权主义 专制主义 极权主义 官僚主义 一党制 一党专政 一党统治 军事独裁 军政府 党国体制 情报机构 个人崇拜 世袭统治 绝对君主制 中央集权 紧急状态 戒严令 军事政变 军事政变后 军事独裁统治 军事执政委员会 军政权 军事管制法 紧急状态法 戒严 政变上台 过渡军事政府 军事统治时期 解散国民议会 暂停宪法 审查制度 言论审查 权力集中于 王位继承 君主专制 独裁主义 个人统治 庇护主义 世袭政权 军政领导人 军官集团 政治局常委会 党内清洗 高压政策 情报机关 军事委员会主席 政变领导人 王储 绝对君主 王位继承人 革命指挥委员会 掌握国家权力 最高军事委员会 执政军政府 戒严法',
      'crown prince|military officers|military junta|royal succession|emergency decree|military takeover|military council|coup d\'état|coup d’état|military coups|dictatorship|emergency rule|authoritarianism|authoritarian rule|totalitarianism|military junta|military dictatorship|one-party state|one-party rule|cult of personality|absolute monarchy|martial law|state of emergency'
    ]],
    paternal: ['#e1ded7', ['家长制 家长式统治 家长式专制','paternalism|paternalistic rule']],
    material: ['#c8a053', [
      '土地财政 土地出让收入 石油租金 资源诅咒 资源民族主义 石油收入 侨汇 外汇储备 外汇管制 美元结算 储备货币 主权债务 债务减免 债务重组 债务利息 通货膨胀 恶性通胀 产业链 供应链 全球价值链 国防订单 军工生产 非正规就业 非正规劳动 地方财政 国有化 经济多元化 粮食安全 能源安全 住房危机 土地所有权 采矿权 水资源 种植园经济 公共财政 货币改革 财政改革 紧缩措施 紧缩开支 国债利息 财政部长会议 央行行长 国家银行 预算赤字 国防开支 国有资产 国有银行 矿业特许权 中央银行 经济危机 金融危机 能源危机 石油出口 私有化计划 生活成本 创造就业 公共部门 私人投资 经济特区 国际贸易 自由贸易区 贸易协定 贸易逆差 经济复苏 国际制裁 税收制度 基础设施建设 资本主义 私人资本 放任政策 市场资本主义 新自由主义经济改革 绿色协议 投资入籍 公民投资计划 政府债务 财政法案 财政预算 农产品出口 资本市场 新兴市场 紧缩措施 公有企业 加入欧元区 投资移民 经济制裁法案 财政政策 政府开支 财政收入 改革税制 经济一体化 预算案 贸易政策 碳税 土地所有制 国有石油公司 海关联盟 金融改革',
      'capitalism|national debt|state oil company|public investment|monetary policy|tax revenues|land rights|central bank|economic crisis|economic growth|cost of living|public debt|public sector|foreign investment|trade agreement|economic sanctions|tax policy|economic policy|public spending|defence spending|defense spending|infrastructure projects|austerity measures|Banco Central|land reform|land redistribution|oil revenues|resource curse|sovereign debt|debt relief|debt restructuring|hyperinflation|foreign exchange reserves|reserve currency|supply chains|economic diversification|nationalisation|nationalization|food security|energy security'
    ]],
    civic: ['#71b6b3', [
      '一带一路 人类命运共同体 脱贫攻坚 乡村振兴 政治和解 民族和解 民族自决 过渡政府 全国对话 联邦自治 地方自治 多党制 和平移交权力 普选权 选举权 民族独立 公投独立 非暴力抵抗 土著土地权 集体土地权 医疗保障 人口外流 人口老龄化 劳动力短缺 城乡差距 地区差距 供水系统 公共电网 移动支付 地热发电 国民议会 国民代表大会 全国人民代表大会 最高人民会议 联邦议院 联邦议会 邦联议会 共和国议会 立法议会 国民大会制 国民代表会议 宪法法院 最高法院 国家杜马 欧洲议会议员 欧洲议会选举 众议院选举 国民议会选举 立法选举 议会选举 地方选举 总统选举 总统大选 联邦选举 市政选举 补选 初选 选举委员会 选举结果无效 第二轮投票 首轮投票 两轮投票 绝对多数 议会多数席位 过半数席位 法定人数 否决权 解散议会 看守政府 组建联合政府 执政联盟 政党轮替 过渡政府 过渡总统 民族团结政府 民主过渡 过渡总统委员会 过渡议会 独立候选人 无党籍人士 无党派人士 主要反对党 影子内阁 反对党领袖 议会反对派 党内初选 选举联盟 弹劾程序 弹劾案 弹劾动议 信任投票 修订宪法 修改宪法 宪政危机 总统制 总统任期限制 议会制 公民权利法案 国家安全委员会 人权委员会 民族和解对话 军事援助 军事合作 安全政策 外交政策 移民政策 非法移民 经济政策 领土争端 边境争端 国家安全 维持和平 联邦制改革 国家统一政府 外交承认 国际人道法 国际法庭 军事同盟 武装部队 边境谈判 海洋权益 巴勒斯坦民族权力机构 中华民国 中华人民共和国 克里米亚半岛 加沙地带 西撒哈拉 波罗的海三国 德国选择党 反对欧元 国民阵线联盟 种子运动 尼泊尔大会党 民主变革运动 工人社会党 桑地诺民族解放阵线 人民行动党 民主联盟 希望联盟 国民阵线联盟 团结联盟 政党联盟 广泛阵线 国民联盟 民主运动 学生运动 青年运动 全民投票 提前选举 多党制度 公民纲领 公民革命运动 公投表决 立法院 行政法院 高等法院 人权法院 特赦法案 民权法案 地方自治政府 南非宪法 地方议会 希腊议会 芬兰议会 冰岛议会 西班牙议会 斯里兰卡议会 匈牙利议会 克罗地亚议会 政治纲领 文职政府 少数政府 透明选举 间接选举 秘密投票 修宪公投 一轮投票 独立选举委员会 总统委员会 动员令 公民抗命 参议院 众议院 联邦参议院 联邦众议院 省议会 民主进步党 中国国民党 民进党 自民党 总统委员会主席 西撒哈拉人民解放阵线 巴勒斯坦解放运动 贝鲁特港爆炸案 政府首脑 国家元首 政治改革 议会席位 司法制度 抵抗运动 国会选举 多数政府 少数派政府 政治联盟 和平进程 行政权 司法权 立法权 普选权 修宪 组阁 竞选纲领 民意调查 公投运动 防务协议 总统否决权 全民表决 政府首脑会议 官僚机构 行政院 立法机构 问责制 创制权 省级自治 财政自治 反对党领导人 抗议活动 公民抗议 不服从运动 联合声明 国家独立 选举干预 人民民族党 繁荣党 秘鲁宪法 联邦最高法院 地方分权 文化自治 分裂主义 独立建国 司法审查 政策纲领 地缘政治 两党制 民族自决 倒阁',
      'Security Council|Transitional National Council|Council of Ministers|National Security Committee|People\'s National Party|unity government|electoral system|campaign platform|Green Morocco Plan|House of Commons|National Council|National Dialogue Conference|United National Congress|independence movement|independence referendum|governing coalition|presidential ticket|People\'s Democratic Party|Democratic Alliance|Constituent Assembly|ruling coalition|parliamentary opposition|autonomous region|statehood|reunification|National Convention|parliamentary group|centre-right coalition|municipal elections|snap election|civic rights|freedom of clothing|declaration of independence|election campaign|presidential candidate|Asamblea Legislativa|National Assembly|National Parliament|House of Representatives|Constitutional Court|Supreme Court|High Court|constitutional amendments|National Electoral Commission|electoral commission|presidential election|presidential elections|general election|general elections|parliamentary elections|legislative election|legislative elections|local elections|independent candidate|opposition leader|leader of the opposition|parliamentary majority|absolute majority|vote of no confidence|presidential term limits|interim government|coalition agreement|coalition government|military assistance|foreign policy|border dispute|immigration policy|Transitional Presidential Council|National Democratic Congress|United Democratic Alliance|Bhumjaithai Party|Nepali Congress|Croatian Democratic Union|Bangladesh Nationalist Party|Prosperity Party|Democratic Progressive Party|National Party|Polisario Front|Georgian Electoral Assembly|Hellenic Parliament|Gabonese Democratic Party|Pan-African Parliament|Lebanese Army|New Flemish Alliance|People\'s Action Movement|Botswana Democratic Party|Great Council of Chiefs|National Security Council|Asamblea Nacional|elecciones presidenciales|elecciones generales|Corte Suprema|Belt and Road Initiative|self-determination|national reconciliation|peaceful transfer of power|universal suffrage|multiparty democracy|nonviolent resistance|indigenous land rights|population ageing|mobile money|geothermal power'
    ]],
    alarm: ['#ff4944', [
      '血腥镇压 武力镇压 暴力镇压 开枪镇压 大规模屠杀 种族清洗 种族灭绝 群体灭绝 酷刑 强迫失踪 法外处决 死亡威胁 枪杀示威者 血流成河 夷为平地 焚毁村庄 血衣 错误的出路 政治谋杀 未遂政变 暗杀未遂 企图暗杀 针对平民 军事入侵 入侵乌克兰 移民危机 选后暴力 军事冲突 加沙战争 致命抗议 枪击事件 遇刺身亡 死刑判决 死亡威胁 武装叛乱 恐怖组织 恐怖主义 种族暴力 大规模逮捕 人道危机 武装组织袭击 反政府武装 无家可归 无法返乡 失去家园 被迫迁徙 暴力事件 边境冲突 军事行动 冲进议会 武装起义 政治暗杀 民众起义 五月暴动 军事干预 以暴力镇压 内战爆发 迫害犹太人 侵犯人权 侵略战争 暴力抗议 未遂刺杀 革命暴力 强制驱逐出境 武装推翻 公民战争 恐怖袭击事件 袭击平民 血腥屠杀',
      'border conflict|armed uprising|political persecution|wartime atrocities|killed by police|civil war|military invasion|assassination attempt|political assassination|armed conflict|violent protests|political unrest|death penalty|deadly protests|violence against civilians|extrajudicial executions|guerra civil|bloody crackdown|violent crackdown|ethnic cleansing|genocide|death threats|extrajudicial killings|enforced disappearances|opened fire on protesters|mass killings|massacre|torture|limpieza étnica|amenazas de muerte'
    ]]
  };
  // Material conditions get their own ink, distinct from doctrines espoused by an actor.
  const vocabulary = {
    left: '工农联盟 群众路线 革命运动 共产党员 共产党 劳动人民 劳工阶级 工人组织 工人阶层 劳工阶层 劳动阶级 阶级矛盾 被压迫民族 反帝斗争 马列主义 左翼政治 反殖民运动 非洲社会主义 土地再分配 生产资料国有化',
    social: '公共养老金 保护养老金 养老保障 全民医疗保健 全民医疗保险 公共医疗 公共卫生体系 可负担住房 保障性住房 社会住房 公营住宅 福利制度 社会保障 社会保险 工会运动 罢工运动 总罢工 贫富差距 社会正义 同工同酬 社会安全网 扩大社会福利 增加社会支出 税收抵免 育儿津贴 延迟退休 退休改革 养老金改革 累进税',
    liberal: '政治多元化 民主转型 结社自由 集会自由 公平选举 独立司法 司法机构的独立性 公民社会 民主制衡 性别平等 公民权 公民不服从 非暴力运动 民权法案 民主权利 废除死刑 市场经济 市场改革',
    conservative: '传统家庭观念 财政责任 减税计划 税收改革 宪政主义 保守主义者 财政可持续性',
    nationalRight: '特朗普主义 美国优先政策 边境管制 收紧移民 限制移民 更严格的移民政策 边境墙 家庭分离政策 反移民政策 移民禁令 保护主义 修建隔离墙',
    ultra: '种族隔离制度 种族隔离 白人民族主义 民族排外主义 民族优越论',
    faith: '教法学家监护 宗教保守派 政教不分 伊斯兰共和国 教法学者 神权政体 宗教法庭 伊斯兰法 伊斯兰教政治运动',
    authority: '集中权力 个人集权 军方接管 军事委员会 暂停宪法 一党专制 新闻审查 以法令施政 军人执政 军方干政 最高领袖 警察国家 政治犯 长期戒严 国家机器 专制统治 世袭君主 军事统治 军事政权',
    populist: '反建制势力 反建制候选人 反精英 反建制派 权贵阶层',
    material: '土地使用权 卖地收入 土地出让 卖地财政 公共债务 外债重组 债务利息 债务负担 偿债成本 偿还外债 碳排放权 气候融资 国际援助 碳信用 矿产权 属地财政 出口收入 旅游收入 外汇收入 旅游外汇 外汇短缺 国际收支 贸易壁垒 贸易制裁 经济制裁 收入分配 地租 资产价格 人造钻石 稀土资源 跨境贸易 深水港 中转贸易 本币贬值 货币贬值 恶性通货膨胀 汇率制度 货币联盟 主权财富基金 财政赤字 资源出口 非正规经济 非正规部门 平行市场 影子经济 劳动生产率 低生产率 附加值 产业升级 加工贸易 公共投资 资本外逃 银行保密 金融制裁 冻结资产 煤炭出口 原油出口 水电出口 石油财政 石油出口 石油产业 石油公司 天然气出口 水力发电 单一市场 国内市场 军工订单 国防开支',
    civic: '全国对话大会 联合政府 团结政府 联合执政 少数派政府 宪法公投 直接民主 全民公投 权力下放 宪法改革 选举改革 自由选举 选举舞弊 投票权 和平协议 不结盟 永久中立 欧洲一体化 加入欧盟 欧盟候选国 脱欧 独立运动 联邦制度 联邦制 国家主权 人道援助 和解进程 民族自治 自主权 海洋主权 原住民土地权 原住民权利 分权制度 权力分享 反腐败 反腐运动 反腐行动 全国和解 气候中和 能源转型 能源独立 可再生能源 气候适应 减少碳排放 土地改革 制度改革 经济改革 废除奴隶制 恢复民主 和平谈判 转型正义 真相委员会 两国方案 一国两制 脱贫攻坚战 中国特色大国外交',
    alarm: '屠杀 遭到枪击 驱逐出境 暴力清场 性暴力 死亡小队 强迫流离失所 暴力驱逐 强制驱逐 非法拘禁 以死相威胁 遭到暗杀 以叛国罪处决 激烈谴责 愤怒地谴责 威胁动武 拘捕抗议者 人道主义灾难 饥荒 迫在眉睫的威胁'
  };
  const foreign = {
    left: 'labour movement|labor movement|trade union movement|workers’ movement|Communist Party|national liberation movement|anti-colonial movement|land redistribution|proletarian revolution|tercer mundo',
    social: 'social security|public housing|affordable housing|public healthcare|social safety net|pension reform|social justice|general strike|trade union rights|child benefits|National Health Service|Medicare for All',
    liberal: 'civil rights|civil society|freedom of religion|freedom of association|political pluralism|market economy|deregulation|separation of church and state|free elections|commercial liberalisation',
    conservative: 'tax reform|balanced budgets|small government|fiscal austerity|tax cuts',
    nationalRight: 'immigration restrictions|trade protectionism|border wall|family separation policy|anti-immigration|border controls',
    authority: 'emergency powers|political prisoners|military rule|military coup|military government|one-party system|state censorship',
    faith: 'Islamic Republic|Islamic jurisprudence|religious conservatism',
    civic: 'coalition government|unity government|electoral reform|constitutional reform|referendum on independence|national sovereignty|European integration|anti-corruption campaign|peace agreement|civil disobedience|two-state solution|renewable energy',
    material: 'capital flight|sovereign wealth fund|fiscal deficit|foreign investment|import substitution|foreign debt|inflation targeting|financial sanctions|oil reserves|climate finance|public investment|currency devaluation',
    alarm: 'political violence|forced displacement|death squads|famine|brutal repression|threatened to kill'
  };
  const policyWords={
    left:'社会主义者 威权社会主义 威权共产主义 中国共产党 共产党人 马克思列宁主义政党 工人阶级家庭 劳工阶层家庭 农民起义 武装革命 资本与劳动 政治经济学批判 阶级利益 生产关系 社会化生产',
    social:'现代革命党 社会民主联盟 社会民主运动 劳动者权利 公共部门工资 保护养老金 工资谈判 劳动条件 工人权利 教师罢工 工会领袖 罢工权 农村贫困 工资保障 全民健康保险 住房保障 平价住房 工人家庭 社会福利支出 社会福利 社会不平等',
    liberal:'自由派改革 市场自由 民主化 经济自由 言论管制 言论自由权利 人权纪录 少数群体权利 女权主义者 民族平等 种族平等 妇女权利 性别歧视 LGBT+权利 司法机构独立 经济自由化政策 贸易开放 自由市场经济 保障人权 反歧视法 同性婚姻 公开选举',
    conservative:'减税政策 税制改革 低税收 税收优惠 削减公共开支 紧缩政策 私人财产权 财政平衡 债务上限 家庭价值观 预算平衡',
    nationalRight:'佛兰德民族主义 美国优先政策 国民优先 移民配额制 非法移民禁令 修建边境墙 保护性关税 提高关税 美墨边境墙 疑欧主义 收紧边境 反移民立场 边境安全',
    faith:'伊斯兰教政治 宗教法学家 伊斯兰法律 宗教少数派权利 神职人员统治 宗教领袖掌权',
    authority:'军队接管 暂停议会 暂停选举 军事法庭 不经审判 独裁者 独裁统治 以法令统治 军方统治 军方支持 一党执政 政治镇压 任期限制 取消任期限制 取缔反对党',
    civic:'法律豁免权 议员豁免权 司法豁免权 临时立法选举 战时大选 安全保证 共同防御 集体防御 军事中立 互不侵犯条约 停火协议 战俘交换 政治犯获释 和平移交 移交权力 和平交接 恢复独立 终止紧急状态 不信任投票 执政联盟 反对派联盟 宪法修正案 制宪 权力制衡 权力交接 权力分配 人民主权 独立公投 主权争端 民族统一 联合组阁 协商民主 国家统一 抗议投票 改革选举制度 选举公正性 竞选资金 政党融资 反腐 公共服务改革 教育改革 和平进程 两国关系正常化 政治对话 重新计票 公民投票 选举抵制 两轮投票制 社区治安计划 总统任期 直选总统 跨党派共识 比例代表制 制度信用 全民投票 两岸关系 两岸对话 战略伙伴关系',
    material:'稳定物价 货币主权 货币政策 紧缩财政 公共支出 私营部门 国有企业 产业政策 通货紧缩 贸易战 税收政策 税收负担 关税壁垒 外商投资 基础设施投资 公共投资 碳排放 经济增长模式 货币贬值 发展模式 技术壁垒 军费开支 国防预算 跨国公司 国家干预 市场干预 入世谈判 经济制裁 单边制裁 自由贸易协定',
    alarm:'战争迫在眉睫 全面入侵乌克兰 无差别轰炸 轰炸平民 撤离平民 濒临饥荒 致命的抗议活动 残酷镇压 暴力镇压示威者 击毙 平民伤亡 政治迫害 人道灾难 仇恨言论 恐怖袭击 政治暴力 暴力冲突 强奸和酷刑 处决政治犯 遭到枪杀 下令开火 撕裂社会'
  };
  for(const [key,list] of Object.entries(policyWords))groups[key][1][0]+=' '+list;
  for(const [key,list] of Object.entries(vocabulary))groups[key][1][0]+=' '+list;
  for(const [key,list] of Object.entries(foreign))groups[key][1][1]+='|'+list;
  // Institutions have their own editorial ink. Membership in an alliance does not
  // assign that alliance's members an ideology.
  groups.atlantic = ['#82a9da', [
    '北约 北大西洋公约组织 北大西洋条约组织 北大西洋理事会 跨大西洋联盟 北约东扩',
    'NATO|North Atlantic Treaty Organization|North Atlantic Treaty Organisation|North Atlantic Council|OTAN'
  ]];
  const institutions = {
    left: [
      '苏联 苏维埃联盟 苏维埃社会主义共和国联盟 苏维埃社会主义共和国联邦 苏联共产党 最高苏维埃 苏联最高苏维埃 华沙条约组织 华约组织 共产国际 共产党宣言 巴黎公社 十月革命 文化大革命 共产主义青年团 共青团 东德 德意志民主共和国 苏联解体 布尔什维克 孟什维克 古巴共产党 中国工农红军 南斯拉夫社会主义联邦共和国',
      'Soviet Union|USSR|U.S.S.R.|Union of Soviet Socialist Republics|Communist Party of the Soviet Union|CPSU|Supreme Soviet|Warsaw Pact|October Revolution|German Democratic Republic|Unión Soviética'
    ],
    civic: [
      '联合国 联合国大会 联合国安理会 联合国安全理事会 联合国维和部队 联合国难民署 国际刑事法院 国际法院 欧盟 欧洲联盟 欧盟委员会 欧洲委员会 欧洲议会 欧洲理事会 申根区 申根协定 欧安组织 欧洲安全与合作组织 欧共体 欧洲经济共同体 非盟 非洲联盟 非洲统一组织 东盟 东南亚国家联盟 东南亚国协 阿拉伯国家联盟 海湾合作委员会 西非国家经济共同体 东非共同体 上海合作组织 上合组织 独联体 独立国家联合体 不结盟运动 柏林墙 戴维营协议 奥斯陆协议 耶稣受难日协议 一中政策 台湾问题 冷战 铁幕 和平共处五项原则 万隆会议 安理会常任理事国 维和行动 独立公投 全民公决 阿拉伯之春 自治政府 临时政府 流亡政府 民族解放运动 非洲人国民大会 巴勒斯坦解放组织 巴解组织 中央军事委员会',
      'United Nations|UN Security Council|UN General Assembly|European Union|EU|European Parliament|European Commission|European Council|Schengen Area|OSCE|African Union|ASEAN|Arab League|Gulf Cooperation Council|ECOWAS|Commonwealth of Independent States|Non-Aligned Movement|Cold War|Berlin Wall|Palestine Liberation Organization|African National Congress|Unión Europea|Naciones Unidas|Unión Africana|Consejo de Seguridad'
    ],
    material: [
      '国际货币基金组织 国际货币基金 世界银行 世界贸易组织 世贸组织 欧洲央行 欧洲中央银行 欧元区 七国集团 二十国集团 金砖国家 金砖国家组织 欧佩克 石油输出国组织 亚洲开发银行 经济合作与发展组织 经合组织 北美自由贸易协定 关税同盟 货币联盟 粮食援助 国际贷款 汇率挂钩 石油出口国组织 石油危机 债务危机 供应链中断 经济特区 石油禁运 土地使用权 军工企业',
      'International Monetary Fund|IMF|World Bank|World Trade Organization|WTO|OPEC|BRICS|G7|G20|European Central Bank|eurozone|Organisation for Economic Co-operation and Development|OECD|Banco Mundial|Fondo Monetario Internacional'
    ],
    authority: [
      '军人集团 全国保卫祖国委员会 过渡军事委员会 革命指挥委员会 军事管制委员会 戒严时期 戒严统治 军事独裁政权',
      'Transitional Military Council|Revolutionary Command Council|military regime'
    ],
    faith: [
      '伊朗伊斯兰共和国 伊斯兰革命卫队 宗教法庭 穆斯林兄弟会 最高宗教领袖 伊朗最高领袖 梵蒂冈教廷',
      'Islamic Republic of Iran|Islamic Revolutionary Guard Corps|Muslim Brotherhood|Holy See'
    ],
    social: [
      '泛希腊社会主义运动 欧洲社会党 社会党国际',
      'Socialist International|Party of European Socialists|Panhellenic Socialist Movement'
    ]
  };
  // Include historical full names before looking for the ideological word inside them.
  const republics = '乌克兰 白俄罗斯 白罗斯 摩尔达维亚 摩尔多瓦 哈萨克 乌兹别克 吉尔吉斯 塔吉克 土库曼 拉脱维亚 立陶宛 爱沙尼亚 格鲁吉亚 亚美尼亚 阿塞拜疆 卡累利阿-芬兰 卡累利阿－芬兰 卡累利阿芬兰'.split(' ');
  institutions.left[0] += ' 俄罗斯苏维埃联邦社会主义共和国 俄罗斯社会主义联邦苏维埃共和国 外高加索社会主义联邦苏维埃共和国 ' +
    republics.map(name => name + '苏维埃社会主义共和国').join(' ');
  institutions.left[1] += '|Russian Soviet Federative Socialist Republic|' +
    ['Ukrainian','Byelorussian','Belorussian','Moldavian','Kazakh','Uzbek','Kirghiz','Tajik','Turkmen','Latvian','Lithuanian','Estonian','Georgian','Armenian','Azerbaijan','Karelo-Finnish'].flatMap(name => [name + ' Soviet Socialist Republic', name + ' SSR']).join('|');
  for (const [key, [chinese, foreignNames]] of Object.entries(institutions)) {
    groups[key][1][0] += ' ' + chinese;
    groups[key][1][1] += '|' + foreignNames;
  }
  // These are expressions or proper names in which a shorter match would change the meaning.
  const protectedTerms = '工业革命 技术革命 科技革命 信息革命 农业革命 绿色革命 革命卫队 革命制度党 阿拉伯欧洲联盟 七国集团联盟'.split(' ')
    .concat(['Industrial Revolution','Green Revolution','Institutional Revolutionary Party']);
  const expressions = [
    ['alarm', /不要镇压民众|不惜一切代价将之击倒|用尽一切力量击败这个政权|(?:造成|导致)(?:至少|超过|近)?[\d一二三四五六七八九十百千万]+(?:名|人)(?:平民|示威者|抗议者)?(?:死亡|丧生)(?:，多人受伤)?/gu],
    ['alarm', /这个国家将因这项移民政策而被摧毁|向(?:手无寸铁的|赤手空拳的)?(?:示威者|抗议者|人群|平民)开(?:枪|火)|(?:用|以)(?:坦克|实弹|武力)(?:镇压|驱散|清场)[^，。；！？\n]{0,8}|(?:整个国家|国家|城市|家园)(?:将|会)(?:被摧毁|化为废墟)|(?:威胁要|扬言要)(?:处决|消灭|屠杀)[^，。；！？\n]{1,10}/gu],
    ['alarm', /\b(?:opened fire on (?:unarmed |peaceful )?(?:protesters|demonstrators|civilians)|(?:this|the) country (?:will|would) be destroyed(?: by [^.,!?”]{1,35})?)\b/giu]
  ];
  const dictionary=new Map(), escapeRE=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  for(const [key,[,lists]] of Object.entries(groups)){
    for(const phrase of [...lists[0].split(' '),...lists[1].split('|')]) dictionary.set(phrase.toLowerCase(),key);
  }
  for(const phrase of protectedTerms) dictionary.set(phrase.toLowerCase(),null);
  const words=[...dictionary.keys()].sort((a,b)=>b.length-a.length);
  const isHan=s=>/^[\u3400-\u9fff]/.test(s);
  const hanTerms=new RegExp(words.filter(isHan).map(escapeRE).join('|'),'gu');
  const latinTerms=new RegExp('(?<![\\p{Script=Latin}\\p{N}_])(?:'+words.filter(s=>!isHan(s)).map(escapeRE).join('|')+')(?![\\p{Script=Latin}\\p{N}_])','giu');
  // In social narratives a concrete institution, commodity or livelihood can be the central concept.
  // Shorter motifs are eligible only when the title names them, they recur, or the opening introduces them.
  const motifs={
    material:'进口设备 运走产品 筹资工具 信誉成本 偏远社区 跨境运输 跨境规则 运输链 农业谋生 原料运走 制成品 与美国高度整合的市场 油井 国库 国外寄回的收入 供给不足 加工环节 原料出口 采购关系 旅游资源 风力发电 设备制造 海外劳动 国内收入 保护成本 风能与太阳能 产业投资 开发合同 海洋资源管理 气候融资 客户、人才与跨境规则 通关协作 中间走廊 出口统计 农户的钱袋 纺织与轻工业 外部订单 直接出口镍矿 跨国企业 牲畜消化产生的甲烷 捕捞 家庭所有 小企业 企业规模 产业构成 M-PESA 外国就业 输电设施 制糖业 巨额资本 地区电力网络 外汇和现金流 偿债 经济筹码 石油设施 高技能劳动 出口货物 全球镍市场 能源成本 独立货币政策 融资收紧 货物流量 贸易限制 供应中断 牧草变化 牲畜死去 全球经济 高技术产业 石油禁运 中产阶层 旅游接待能力 冶炼厂 财政资源 外包服务 技术升级 长期岗位 生活必需品 粮食获取 规模化生产 跨境招聘 能源收入 市场整合 住房拥有率 租赁与供给结构 货币尺度 军工产业 公共预算 工业和农业转型 矿区 矿山 天然钻石 政府收入 贸易成本 资产收入 财务管理 灾后生活 现金收入 市场信任 支付、行政与市场信任 国内消费 石油产量 资产冻结 贸易往来 对外贸易 国民财富 矿业收入 设备融资 国外就业 出口能力 长期贷款 工业资源 本地中小企业 股份公司 农户收入 对外援助 对外投资 供水系统 征税能力 投入成本 土地产权 生产、就业与国家决策 产业积累 资源出口型 能源设施 地区风险 结构转移 农业出口 技能当作核心资本 征用土地 永久冻土 借款到期 国家收入 货币发行 船运 电力、物流与水务瓶颈 治理和维护 香料岛 市场准入 世界市场 欧洲市场 外部市场 本地市场 国内市场 国际市场 市场规模 商品价格 国际价格 能源价格 原油价格 铜价 油价 运输成本 物流成本 生产成本 住房成本 贸易路线 贸易规则 国际航线 航运保险 贸易网络 生产网络 国际结算 能源供应 电力供应 进口燃料 化石燃料 资源收入 财政收入 国家收入 家庭收入 外汇收入 债务负担 国民收入 主要收入来源 能源财富 地下财富 石油财富 天然财富 天然钻石 国际贷款 债务融资 贷款利息 矿产资源 油气收入 收入来源 贸易收入 生产能力 生产基础 工业基础 产业能力 出口收入 外部需求 国内需求 人力资本 经济追赶 国有公司 进口商品 可支配收入 进口食品 粮食价格 原材料 外国资本 支柱产业 加工制造 生产环节 大宗商品 能源通道 水力发电 国际分工 国际订单 半导体产业 产业升级 外债 物价 能源转型 货币联盟 货币贬值 储蓄 食品价格 能源补贴 金矿 粮食产量 矿石 矿产 矿藏 港口城市 自给自足 出口市场 外资 饮用水 供水 排水 水利设施 有限耕地 粮食产出 农业生产 农业人口 电费 电价 煤矿 煤炭出口 国际分工 进口依赖 食品进口 产业工人 交通成本 旱地农业 原油 采掘业 中转站 领海 农产品 供电 海运 下游加工 加工能力 偿付能力 渔场 工业产能 供应线路 产业政策 国际汇款 欧元区 货币兑换 生产效率 贸易条件 加工厂 水电站 物流通道 首都圈 人口外流 能源进口国 转口港 升值 汇率 能源账单 通行费 过境费 生活费用 人口汇入 专业服务 水土流失 私有产权 工业化 农产品出口 私人投资 外币 兑付 内河航运 税基 关税收入 技术标准 商业信用 捕鱼权 专属经济区 经济规模 本国货币 财政开支 养老支出 技能短缺 劳动力迁移 季节工 粮价 水价 国民经济 公共债务 长期投资 贸易伙伴 外贸 经济走廊 商品出口 房租 减产 农业补贴 油轮 国际收支 工业生产 国家预算 技术转移 侨民收入 原油出口 经济结构 结构调整 经济增长 增长数字 中转港 公共资源 技术人员 港务 粮库 国家石油 国际油价 经济活动 投资入籍 洛比托走廊 苏伊士运河 巴拿马运河 霍尔木兹海峡 马六甲海峡 国际航运 货币发行局 固定汇率 贸易通道 运输走廊 铁路走廊 过境运输 转口贸易 海外汇款 外汇来源 外籍劳工 外来劳工 跨境劳动 房地产 楼市 住房成本 供应商 外国投资 制造业 成衣出口 汽车工业 半导体 集成电路 芯片 晶圆 港口 铁路 出海口 造船业 商船队 铜矿 铜价 磷酸盐 石油 天然气 油田 油气 黄金 钻石 钾肥 铝业 水电 地热 煤炭 核电 电网 棉花 可可 腰果 咖啡 香蕉 大豆 玉米 鲑鱼 渔业 矿业 旅游业 旅游收入 游客 侨民汇款 侨民 外汇 生产率 债务 偿债 军费 关税 贸易壁垒 通胀 失业率 淡水 地下水 水库 灌溉 耕地 农田 农牧业 泥炭地 红树林 热带雨林 森林覆盖 公共财政 货币政策 财政政策 粮食进口 能源进口 能源补贴 劳动密集型 进口替代 出口加工区 水力发电站 人均收入 财产税 增值税 私营部门 国家石油公司 土地使用权',
    civic:'布尔奇科特区 多族群共同机构 国库 国有资产 七名联邦委员 土族塞人社区 威斯敏斯特 格陵兰和法罗群岛 北爱尔兰 选民投出的不同立场 多个政党 议会多数 议事机构 岛级议会 权力、语言和安全 身份、审判与返乡 跨境遣返 区域关系 成员资格 获得国际承认 明确期限 自治地位 族群自治 国家建设 多党政治 德涅斯特河两岸 最终地位 毛利人 国家元首 捐献 权力集中 政治反对力量 表达异议 加拉帕戈斯群岛 环境管理 许可、监测和保护措施 岛屿的隔离 地方权力 社会网络 沿线企业 海洋生态 人口稀疏 人口却十分稀疏 森林保护 保留鲜明差异 政治筹码 殖民、迁入 公共制度 司法是否可靠 选民 政局屡次中断 国民服役 服役期限 流动限制 安全体系 核与导弹能力 宗教与外交使命 选举胜利 公民社会 政治分隔 制度和历史阻隔 工业遗产 独立诉求 经济封锁 联合执政 口岸 领土主张 过境通道 海洋管理 海外劳动者 留乡 权力竞争 机构信任 学龄人口 土地使用 昂贵住房 高密度城区 维持生计 陶罐 政治协议 公共服务 公共机构 公共设施 基础设施 基本服务 行政能力 执行能力 共同制度 国民身份 公民身份 国家认同 共同规则 国家机构 国家能力 中央政府 地方政府 自治区 半自治 法律地位 宗主国 国家边界 名义独立 政府权力 公共权力 部落首领 殖民地 殖民统治 殖民时期 独立战争 维和力量 共享主权 行政区划 国籍 居留权 公民权力 停火协议 主权国家 治理权 经济主权 执法能力 国土面积 公立学校 公共管理 社会秩序 宪法安排 国境线 永久居民 移民身份 土地登记 基础教育 教育机会 教育资源 医疗资源 城乡差距 收入分配 人口规模 年轻人口 劳动年龄人口 人口减少 人口老化 老年人口 稳定工作 地方自治 医疗服务 医疗机构 外交关系 两种语言 官方语言 共同语言 民族构成 语言权利 选举制度 海外领地 国际援助 海洋权益 海平面上升 土壤退化 生物多样性 保护区 沿海低地 土壤盐碱化 盐碱化 食用水 跨境通道 省级政府 灾后重建 防洪 堤坝 人口迁移 民族矛盾 疾病防治 气候变化 天然屏障 缓冲地带 人口分布 水管理机构 海岸侵蚀 流域管理 民兵组织 部族 回乡 国际通道 庇护 权力下放 区域自治 陆路通道 领土争议 专业人才 出口通道 官僚体系 福利体系 军事基地 驻军 代顿协议 国民幸福总值 两院制 非军事区 停战线 停火线 和平条约 缓冲区 种族和解 政治庇护 共同市场 国际承认 国籍公投 国家承认 联邦政府 联邦州 土地所有制 政治难民 寻求庇护 外来人口 老龄化 养老 照护 失学 儿童劳动 熟练工人 熟练劳动者 生育率 义务教育 社会流动 社会信任 蓝色经济 气候风险 气候冲击 清洁能源 战后重建 基础教育 环境保护 生物多样性 海洋保护 自由迁徙 收入差距 住房短缺 正式就业 正规就业 民营经济 联合国维和 制宪会议 制宪议会 内陆国 人口密度 气候难民 语言共同体 联邦议会 永久中立 全民公决 对外开放 外交承认 主权争议 自决公投 还乡 游牧 妇女教育 妇女就业 投资入籍计划 军事同盟 不结盟运动 人民之家 多党联盟 人口红利 工业化 城市化 乡村建设 台海现状',
    alarm:'飓风 火山喷发 地震 土地退化 安全危机 离开家园 安全威胁 战争破坏 冲突地区 收入下降、服务受损和援助不足 政治冲突 持续的暴力 武装暴力 拘押设施 失去房屋 失去牲畜 分离家庭 贫困和不安全 地缘冲突 边境摩擦 战争损坏 饮水短缺 山洪 地震灾害 洪灾 旱灾 干旱 洪水 灾荒 风暴潮 气旋 武装力量交战 逃难 居民流离 战乱 战火 地雷区 封锁 饮水危机 水荒 生态灾难 断电 饥饿威胁 失去生计 生命危险 饥饿 饥荒 流离失所 被迫逃离 内战 地雷 封锁线 断水断电 武装冲突 袭击平民 危及生命 粮食危机 强迫迁移 政治暗杀 集体屠杀 血腥冲突',
    social:'工人与债务 低薪岗位 长久贫困 就业与成家 家庭工资 现金工资 土地与社区 本地工作 农户与工人 正式岗位 退休生活 进口药品 社区生计 失去工资 离乡的工资 负担得起的住房 继承机会 收益怎样分配 取得文凭 学校、医疗、土地和工作 社会保险费 工作机会 缺少机会 住房市场 生计的选择 高质量岗位 住房供给 工业岗位 低技能工作 生活保障 稳定就业 正式工作 就业机会 低收入 劳动力 劳动人口 教育成本 工资收入 社会保险 养老保险 入学率 工作岗位 医疗费用 技能培训 农村人口 农村家庭 公共卫生 基本医疗 儿童教育 医疗开支 临时工作 失业青年 公共教育 社会福利 非正式就业 贫困人口 生活条件 稳定收入 失业救济 退休年龄 就业岗位 低薪工作 家庭负担 职业培训 外出务工 务工者 通勤时间 土地改革 弱势群体 工会 贫困线 照护劳动 无偿劳动 养老金 退休金 工作时间 土地分配 社会保障 劳动力短缺 最低收入',
    liberal:'跨境自由流动 互联网自由 媒体独立 选举监督 个人自由 人身自由 思想自由 自由选举 竞争性选举',
    authority:'王室统治 军事管制 户籍制度 国家监控 安全部门 家族统治 情报系统',
    faith:'宗教权威 教廷外交 政教关系 教宗选举 教派分权 什叶派政党 逊尼派政党'
  };
  const motifTypes=new Map();
  for(const [key,list] of Object.entries(motifs))for(const term of list.trim().split(/\s+/))motifTypes.set(term,key);
  const motifPattern=new RegExp([...motifTypes.keys()].sort((a,b)=>b.length-a.length).map(escapeRE).join('|'),'gu');
  function annotate(paragraphs, options={}) {
    const lastParagraph=new Map();
    const whole=paragraphs.join('\n');
    return paragraphs.map((text,index)=>{
      const candidates=[];
      for(const [key,pattern] of expressions) for(const m of text.matchAll(pattern))
        candidates.push({start:m.index,end:m.index+m[0].length,key,term:m[0],rank:6});
      for(const pattern of [hanTerms,latinTerms]) for(const m of text.matchAll(pattern)){
        const term=m[0].toLowerCase(),key=dictionary.get(term);
        if(!key || (['eu','g7','g20','imf','wto','asean','nato','ussr','oecd','osce','otan'].includes(term) && m[0] !== m[0].toUpperCase()))continue;
        const rank=key==='alarm'?3:['civic','material'].includes(key)?1:2;
        candidates.push({start:m.index,end:m.index+m[0].length,key,term,rank});
      }
      for(const [key,phrase] of root.NexusPassageAccents?.[options.id] || []){
        const start=text.toLowerCase().indexOf(phrase.toLowerCase());
        if(start>=0)candidates.push({start,end:start+phrase.length,key,term:phrase.toLowerCase(),rank:5});
      }
      // Named legislation, political platforms and quoted policy demands are often more specific
      // than a bare ideology word. Do not select a quotation just because it is quoted.
      for(const m of text.matchAll(/《[^《》。！？\n]{2,25}(?:法案|协定|协议|公约|宪章|条约|宣言)》/gu)){
        candidates.push({start:m.index,end:m.index+m[0].length,key:'civic',term:m[0],rank:1.6});
      }
      if(options.spirit){
        for(const m of text.matchAll(motifPattern)){
          const term=m[0],theme=options.title?.includes(term);
          if(!theme && term.length<3 && !(whole.indexOf(term)!==whole.lastIndexOf(term) || (index===0 && m.index<35)))continue;
          candidates.push({start:m.index,end:m.index+term.length,key:motifTypes.get(term),term,rank:theme?1.8:0.5});
        }
      }
      // Sparse by default. Let a charged clause take precedence over individual words inside it.
      const n=text.replace(/\s/g,'').length;
      const explicit=candidates.filter(c=>c.rank>=2).length;
      const limit=Math.min(8,Math.max(3,Math.ceil(n / (/[\u3400-\u9fff]/.test(text)?32:95)),Math.min(6,explicit)));
      const chosen=[];
      candidates.sort((a,b)=>b.rank-a.rank || (b.end-b.start)-(a.end-a.start) || a.start-b.start);
      for(const c of candidates){
        if(index - (lastParagraph.get(c.term) ?? -Infinity) <= 1 || chosen.some(s=>s.start<c.end&&c.start<s.end))continue;
        chosen.push(c);lastParagraph.set(c.term,index);if(chosen.length===limit)break;
      }
      return chosen.sort((a,b)=>a.start-b.start).map(c=>({start:c.start,end:c.end,color:groups[c.key][0]}));
    });
  }
  function render(node,text,ranges) {
    const doc=node.ownerDocument;let at=0;
    for(const r of ranges){
      node.append(doc.createTextNode(text.slice(at,r.start)));
      const mark=doc.createElement('span');mark.dataset.conceptInk=r.color;mark.style.color=r.color;
      mark.textContent=text.slice(r.start,r.end);node.append(mark);at=r.end;
    }
    node.append(doc.createTextNode(text.slice(at)));
  }
  root.NexusPoliticalLanguage={annotate,render};
})(typeof window==='undefined'?globalThis:window);
