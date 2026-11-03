window.ECON_FISCAL_DATA={
  "asOf": "2026-10-05",
  "rules": {
    "self": 50,
    "liability": 50,
    "debt": 100,
    "interest": 8,
    "land": 40,
    "spread": 200,
    "unemployment": 6,
    "unemploymentChange": 1,
    "cpi": 3.5,
    "food": 6,
    "underemploymentChange": 1,
    "tax": 6
  },
  "provinces": {
    "广东": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 28.426740504897058,
        "land": 14.108048351897349,
        "spread": 59,
        "tax": 7.00134853869911,
        "interest": 1.4,
        "debt": 202.834731651568
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 41459.48,
          "denominator": 145846.76,
          "components": {
            "generalDebt": 8456.99,
            "specialDebt": 33002.49
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "广东省"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
          "numerator": 2415.81,
          "denominator": 17123.63,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "附件一第1、7页，全省执行数"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
          "numerator": 10211.24,
          "denominator": 145846.76,
          "sourceLocator": "附件一第1页，全省2025年执行数",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.4,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
          "numerator": 41459.48,
          "denominator": 20440.030000000002,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 17123.63,
            "generalTransfers": 2155.92,
            "specialTransfers": 505.04,
            "fundTransfers": 655.44
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://news.10jqka.com.cn/20260814/c678977288.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 17956.06,
          "expense": [
            {
              "name": "教育",
              "value": 4055.57
            },
            {
              "name": "科学技术",
              "value": 885.73
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 297.82
            },
            {
              "name": "社会保障和就业",
              "value": 2280.62
            },
            {
              "name": "卫生健康",
              "value": 1626.91
            },
            {
              "name": "节能环保",
              "value": 387.97
            },
            {
              "name": "城乡社区",
              "value": 1403.64
            },
            {
              "name": "农林水",
              "value": 1124.1
            },
            {
              "name": "交通运输",
              "value": 589.47
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 13533.98,
          "income": [
            {
              "name": "增值税",
              "value": 4100.25
            },
            {
              "name": "企业所得税",
              "value": 1781.45
            },
            {
              "name": "个人所得税",
              "value": 950.37
            },
            {
              "name": "其他税收",
              "value": 2985.67
            },
            {
              "name": "专项收入",
              "value": 997.48
            },
            {
              "name": "行政事业性收费",
              "value": 304.24
            },
            {
              "name": "罚没收入",
              "value": 387.09
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 1386.03
            },
            {
              "name": "其他非税收入",
              "value": 641.4
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 13938.94,
          "income": [
            {
              "name": "税收收入",
              "value": 10211.24
            },
            {
              "name": "非税收入",
              "value": 3727.7
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
            "sourceLocator": "附件一第1页，全省2025年执行数"
          },
          "expenditure": 18161.13,
          "expense": [
            {
              "name": "教育",
              "value": 4130.62
            },
            {
              "name": "科学技术",
              "value": 952.83
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 305.41
            },
            {
              "name": "社会保障和就业",
              "value": 2307.03
            },
            {
              "name": "卫生健康",
              "value": 1705.37
            },
            {
              "name": "节能环保",
              "value": 302.64
            },
            {
              "name": "城乡社区",
              "value": 1296.68
            },
            {
              "name": "农林水",
              "value": 1141.55
            },
            {
              "name": "交通运输",
              "value": 625.9
            }
          ],
          "expenseEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://czt.gd.gov.cn/attachment/0/607/607012/4857651.pdf",
            "sourceLocator": "附件一第1—2页，全省2025年执行数"
          }
        }
      ],
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "cpi": 1.2,
        "food": -0.6,
        "source": "https://gdzd.stats.gov.cn/sjfb/sjfbz/202607/t20260709_182755.html"
      }
    },
    "江苏": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 2119
        },
        {
          "name": "企业所得税",
          "value": 867
        },
        {
          "name": "个人所得税",
          "value": 317
        },
        {
          "name": "房产税",
          "value": 318
        },
        {
          "name": "其他税收",
          "value": 924
        },
        {
          "name": "非税收入",
          "value": 1396.0
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 1434
        },
        {
          "name": "社会保障和就业",
          "value": 1159
        },
        {
          "name": "卫生健康",
          "value": 653
        },
        {
          "name": "农林水",
          "value": 514
        },
        {
          "name": "科学技术",
          "value": 271
        }
      ],
      "metrics": {
        "liability": 23.83364418358781,
        "spread": 59,
        "interest": 1.6,
        "debt": 173.02479691194986,
        "land": 33.430353753679384
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 33927.55,
          "denominator": 142351.5,
          "components": {
            "generalDebt": 8538.11,
            "specialDebt": 25389.44
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "江苏省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.6,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.jsrd.gov.cn/qwfb/cwhgb/d_11277/202603/P020260327642131356419.pdf",
          "numerator": 33927.55,
          "denominator": 19608.49,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 16718.13,
            "generalTransfers": 1863.47,
            "specialTransfers": 277.37,
            "fundTransfers": 749.52
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.jsrd.gov.cn/qwfb/cwhgb/d_11277/202603/P020260327642131356419.pdf",
          "numerator": 5588.93,
          "denominator": 16718.13,
          "unit": "亿元",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "2025年全省预算执行：两本预算本级收入及国有土地使用权出让收入"
        }
      },
      "sources": [
        "https://www.jiangsu.gov.cn/art/2026/7/12/art_60085_11802548.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.jsrd.gov.cn/qwfb/cwhgb/d_11277/202603/P020260327642131356419.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 5941.0,
        "expenditure": 7248.0,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 4545,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://www.jiangsu.gov.cn/art/2026/7/12/art_60085_11802548.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.jiangsu.gov.cn/art/2026/7/12/art_60085_11802548.html"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.jiangsu.gov.cn/art/2026/7/12/art_60085_11802548.html"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "employment": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.jiangsu.gov.cn/art/2026/7/22/art_88350_11806886.html",
        "sourceLocator": "",
        "rate": 4.6,
        "change": -0.1,
        "measure": "城镇调查失业率上半年平均值"
      },
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "cpi": 0.9,
        "food": -2.2,
        "source": "https://jszd.stats.gov.cn/gjtjjjsdczd/dcxx/content/68f3ac28-feb2-4f67-aadf-081e0217eb8f.html"
      }
    },
    "山东": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 1120
        },
        {
          "name": "企业所得税",
          "value": 467
        },
        {
          "name": "个人所得税",
          "value": 121
        },
        {
          "name": "城市维护建设税",
          "value": 167
        },
        {
          "name": "房产税",
          "value": 175
        },
        {
          "name": "土地增值税",
          "value": 147
        },
        {
          "name": "城镇土地使用税",
          "value": 211
        },
        {
          "name": "其他税收",
          "value": 433
        },
        {
          "name": "非税收入",
          "value": 1672.0
        }
      ],
      "expense": [
        {
          "name": "一般公共服务",
          "value": 580
        },
        {
          "name": "社会保障和就业",
          "value": 1260
        },
        {
          "name": "卫生健康",
          "value": 665
        }
      ],
      "metrics": {
        "liability": 37.349509435790594,
        "spread": 104,
        "interest": 1.9,
        "debt": 234.69907073349395,
        "land": 26.88693140794224
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 38543.76,
          "denominator": 103197.5,
          "components": {
            "generalDebt": 8324.55,
            "specialDebt": 30219.21
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "山东省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.9,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.sd.gov.cn/module/download/downfile.jsp?classid=0&filename=375c15b2d1344f0ab41a7ed79b89aa74.pdf",
          "numerator": 38543.76,
          "denominator": 16422.63,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 12118.75,
            "generalTransfers": 3315.81,
            "specialTransfers": 388.55,
            "fundTransfers": 599.52
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.sd.gov.cn/module/download/downfile.jsp?classid=0&filename=375c15b2d1344f0ab41a7ed79b89aa74.pdf",
          "numerator": 3258.36,
          "denominator": 12118.75,
          "unit": "亿元",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "2025年全省预算执行：两本预算本级收入及国有土地使用权出让收入"
        }
      },
      "sources": [
        "https://www.sdxc.gov.cn/sy/jrywsy/202608/t20260814_18019686.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.sd.gov.cn/module/download/downfile.jsp?classid=0&filename=375c15b2d1344f0ab41a7ed79b89aa74.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 4513.0,
        "expenditure": 6301.0,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 2841,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://www.sdxc.gov.cn/sy/jrywsy/202608/t20260814_18019686.htm",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.sdxc.gov.cn/sy/jrywsy/202608/t20260814_18019686.htm"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.sdxc.gov.cn/sy/jrywsy/202608/t20260814_18019686.htm"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ]
    },
    "浙江": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 4452.33
        },
        {
          "name": "非税收入",
          "value": 1098.91
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 33.92365540218943,
        "spread": 52,
        "interest": 2.1,
        "debt": 188.3431234434723,
        "land": 29.494220937910796
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 32073.12,
          "denominator": 94545,
          "components": {
            "generalDebt": 8495.37,
            "specialDebt": 23577.75
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "浙江省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.1,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://zjrb.zjol.com.cn/html/2026-01/30/content_3884827.htm",
          "numerator": 32073.12,
          "denominator": 17029.09,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 14735.09,
            "generalTransfers": 1159.24,
            "specialTransfers": 291.41,
            "fundTransfers": 843.35
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 4346,
          "denominator": 14735.09,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://zjrb.zjol.com.cn/html/2026-01/30/content_3884827.htm"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://www.yicai.com/news/103313429.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://zjrb.zjol.com.cn/html/2026-01/30/content_3884827.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 5551.24,
        "expenditure": 6176.91,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 4452.33,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://www.yicai.com/news/103313429.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.yicai.com/news/103313429.html"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 12564.65,
          "expense": [
            {
              "name": "教育",
              "value": 2474.82
            },
            {
              "name": "科学技术",
              "value": 886.51
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 252.0
            },
            {
              "name": "社会保障和就业",
              "value": 1566.44
            },
            {
              "name": "卫生健康",
              "value": 988.46
            },
            {
              "name": "节能环保",
              "value": 192.22
            },
            {
              "name": "城乡社区",
              "value": 1117.12
            },
            {
              "name": "农林水",
              "value": 1035.38
            },
            {
              "name": "交通运输",
              "value": 515.5
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ]
    },
    "四川": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 41.401905318143676,
        "land": 32.63439522150323,
        "spread": 86,
        "tax": 5.515526856142302,
        "interest": 1.9,
        "debt": 164.09691384817424
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 28014.74,
          "denominator": 67665.34,
          "components": {
            "generalDebt": 8515.25,
            "specialDebt": 19499.49
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "四川省"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.scspc.gov.cn/czbg/202602/153402.html",
          "numerator": 3147,
          "denominator": 9643.2,
          "formula": "土地出让收入/(地方一般公共预算收入+政府性基金收入)*100"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.scspc.gov.cn/czbg/202602/153402.html",
          "numerator": 3732.1,
          "denominator": 67665.34,
          "sourceLocator": "财政厅预算报告，全省2025年执行数；分类与总额使用同一执行版，不与决算调整后总额混用",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.9,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.scspc.gov.cn/czbg/202602/153402.html",
          "numerator": 28014.74,
          "denominator": 17072.07,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 9643.2,
            "generalTransfers": 6303.44,
            "specialTransfers": 516.9,
            "fundTransfers": 608.53
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://www.scspc.gov.cn/czbg/202602/153402.html",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 13447.16,
          "expense": [
            {
              "name": "教育",
              "value": 1969.68
            },
            {
              "name": "科学技术",
              "value": 278.12
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 212.23
            },
            {
              "name": "社会保障和就业",
              "value": 2637.03
            },
            {
              "name": "卫生健康",
              "value": 1172.45
            },
            {
              "name": "节能环保",
              "value": 270.67
            },
            {
              "name": "城乡社区",
              "value": 969.21
            },
            {
              "name": "农林水",
              "value": 1677.1
            },
            {
              "name": "交通运输",
              "value": 692.11
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 5635.6,
          "income": [
            {
              "name": "增值税",
              "value": 1357.47
            },
            {
              "name": "企业所得税",
              "value": 617.46
            },
            {
              "name": "个人所得税",
              "value": 190.38
            },
            {
              "name": "其他税收",
              "value": 1435.73
            },
            {
              "name": "专项收入",
              "value": 258.58
            },
            {
              "name": "行政事业性收费",
              "value": 180.75
            },
            {
              "name": "罚没收入",
              "value": 203.82
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 1107.36
            },
            {
              "name": "其他非税收入",
              "value": 284.05
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 5853.9,
          "income": [
            {
              "name": "税收收入",
              "value": 3732.1
            },
            {
              "name": "非税收入",
              "value": 2121.8
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.scspc.gov.cn/czbg/202602/153402.html",
            "sourceLocator": "财政厅预算报告，全省2025年执行数；分类与总额使用同一执行版，不与决算调整后总额混用"
          }
        }
      ]
    },
    "河南": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 37.35112997669766,
        "spread": 88,
        "tax": 4.140559025068589,
        "interest": 1.7,
        "debt": 198.24157687764398,
        "land": 17.567789646672143
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 24888.1,
          "denominator": 66632.79,
          "components": {
            "generalDebt": 6877.8,
            "specialDebt": 18010.3
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "河南省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://dzb.henandaily.cn/html5/2026-04/16/content_15_1789157.htm",
          "numerator": 2758.97,
          "denominator": 66632.79,
          "sourceLocator": "河南省统计局2025年统计公报；非税为同表总额减税收",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.7,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.lhratings.com/reports/B025908-P86915-2026.pdf",
          "numerator": 24888.1,
          "denominator": 12554.43,
          "unit": "亿元",
          "components": {
            "generalRevenue": 4501.7,
            "fundRevenue": 1583.3,
            "generalTransfers": 5607.12,
            "specialTransfers": 337.01,
            "fundTransfers": 525.3
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（两本预算本级收入＋中央两本预算补助）×100",
          "sourceLocator": "2025年全省预算执行；中央补助来自财政部2025年分地区决算表"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 1069,
          "denominator": 6085.0,
          "unit": "亿元",
          "additionalSources": [
            "https://www.lhratings.com/reports/B025908-P86915-2026.pdf"
          ],
          "numeratorPrecision": 0,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "粤开证券第15页图10已披露数值标签"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://www.hnswjrb.gov.cn/2026/07-24/3653897.html",
        "https://dzb.henandaily.cn/html5/2026-04/16/content_15_1789157.htm",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.lhratings.com/reports/B025908-P86915-2026.pdf",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.hnswjrb.gov.cn/2026/07-24/3653897.html",
        "sourceLocator": "",
        "cpi": 1.1
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 11464.16,
          "expense": [
            {
              "name": "教育",
              "value": 2059.66
            },
            {
              "name": "科学技术",
              "value": 554.39
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 124.99
            },
            {
              "name": "社会保障和就业",
              "value": 2011.73
            },
            {
              "name": "卫生健康",
              "value": 1109.37
            },
            {
              "name": "节能环保",
              "value": 182.47
            },
            {
              "name": "城乡社区",
              "value": 995.25
            },
            {
              "name": "农林水",
              "value": 1204.6
            },
            {
              "name": "交通运输",
              "value": 350.55
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 4392.67,
          "income": [
            {
              "name": "增值税",
              "value": 1167.33
            },
            {
              "name": "企业所得税",
              "value": 357.86
            },
            {
              "name": "个人所得税",
              "value": 97.75
            },
            {
              "name": "其他税收",
              "value": 1113.34
            },
            {
              "name": "专项收入",
              "value": 319.94
            },
            {
              "name": "行政事业性收费",
              "value": 187.81
            },
            {
              "name": "罚没收入",
              "value": 226.01
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 652.58
            },
            {
              "name": "其他非税收入",
              "value": 270.05
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 4501.66,
          "income": [
            {
              "name": "税收收入",
              "value": 2758.97
            },
            {
              "name": "非税收入",
              "value": 1742.69
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://dzb.henandaily.cn/html5/2026-04/16/content_15_1789157.htm",
            "sourceLocator": "河南省统计局2025年统计公报；非税为同表总额减税收"
          }
        }
      ]
    },
    "湖北": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 34.50426023245756,
        "spread": 67,
        "tax": 4.420842150867312,
        "interest": 1.9,
        "debt": 173.62800446503857,
        "land": 32.7144507918368
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 21620.68,
          "denominator": 62660.9,
          "components": {
            "generalDebt": 6462.01,
            "specialDebt": 15158.67
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "湖北省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2024年",
          "denominatorPeriod": "2024年",
          "scope": "全省",
          "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
          "gdpSource": "https://www.stats.gov.cn/sj/ndsj/2025/html/C03-09.jpg",
          "numerator": 2653.08,
          "denominator": 60013,
          "formula": "地方税收收入／同年地区生产总值×100",
          "sourceLocator": "中国统计年鉴2025表7-5税收收入及表3-9地区生产总值",
          "geographicCoverage": "全省"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.9,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://static.cninfo.com.cn/finalpage/2026-05-29/1225339152.PDF",
          "numerator": 21620.68,
          "denominator": 12452.300000000001,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 7070.27,
            "generalTransfers": 4361.66,
            "specialTransfers": 367.29,
            "fundTransfers": 653.08
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 2313,
          "denominator": 7070.27,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://static.cninfo.com.cn/finalpage/2026-05-29/1225339152.PDF"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-04-10/0000_20260410_XVTA.pdf",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://static.cninfo.com.cn/finalpage/2026-05-29/1225339152.PDF",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 9976.31,
          "expense": [
            {
              "name": "教育",
              "value": 1390.05
            },
            {
              "name": "科学技术",
              "value": 434.97
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 131.53
            },
            {
              "name": "社会保障和就业",
              "value": 1870.49
            },
            {
              "name": "卫生健康",
              "value": 753.78
            },
            {
              "name": "节能环保",
              "value": 186.12
            },
            {
              "name": "城乡社区",
              "value": 1021.63
            },
            {
              "name": "农林水",
              "value": 1254.89
            },
            {
              "name": "交通运输",
              "value": 460.79
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 3937.88,
          "income": [
            {
              "name": "增值税",
              "value": 1105.66
            },
            {
              "name": "企业所得税",
              "value": 377.2
            },
            {
              "name": "个人所得税",
              "value": 121.51
            },
            {
              "name": "其他税收",
              "value": 1048.71
            },
            {
              "name": "专项收入",
              "value": 236.45
            },
            {
              "name": "行政事业性收费",
              "value": 126.23
            },
            {
              "name": "罚没收入",
              "value": 131.74
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 677.99
            },
            {
              "name": "其他非税收入",
              "value": 112.39
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        }
      ]
    },
    "福建": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 608.56
        },
        {
          "name": "企业所得税",
          "value": 319.79
        },
        {
          "name": "个人所得税",
          "value": 76.78
        },
        {
          "name": "其他税收",
          "value": 382.87
        },
        {
          "name": "专项收入",
          "value": 285.31
        },
        {
          "name": "行政事业性收费",
          "value": 35.7
        },
        {
          "name": "罚没收入",
          "value": 52.6
        },
        {
          "name": "国有资源（资产）有偿使用收入",
          "value": 474.31
        },
        {
          "name": "政府住房基金收入",
          "value": 25.51
        },
        {
          "name": "其他非税收入",
          "value": 87.78
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 670.51
        },
        {
          "name": "社会保障和就业",
          "value": 467.43
        },
        {
          "name": "卫生健康",
          "value": 324.36
        },
        {
          "name": "科学技术",
          "value": 93.57
        },
        {
          "name": "城乡社区",
          "value": 234.3
        },
        {
          "name": "农林水",
          "value": 186.61
        },
        {
          "name": "交通运输",
          "value": 148.24
        },
        {
          "name": "其他",
          "value": 948.99
        }
      ],
      "metrics": {
        "land": 12.19553837714917,
        "liability": 31.42684858416481,
        "spread": 52,
        "interest": 2,
        "debt": 250.19592440214296
      },
      "metricEvidence": {
        "land": {
          "period": "2026年上半年",
          "scope": "全省",
          "source": "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf",
          "numerator": 335.72,
          "denominator": 2752.81,
          "formula": "土地出让收入/(地方一般公共预算收入+政府性基金收入)*100"
        },
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 18918.79,
          "denominator": 60199.45,
          "components": {
            "generalDebt": 4155.16,
            "specialDebt": 14763.63
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "福建省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.fujian.gov.cn/szf/gzbg/czysjsbg/202602/t20260210_7091388.htm",
          "numerator": 18918.79,
          "denominator": 7561.59,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 5403.8,
            "generalTransfers": 1630.32,
            "specialTransfers": 212.29,
            "fundTransfers": 315.18
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://czt.fujian.gov.cn/zwgk/czxw/202607/t20260727_7192665.htm",
        "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://tjj.fujian.gov.cn/xxgk/tjxx/jjyxqk/202607/t20260722_7190752.htm",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.fujian.gov.cn/szf/gzbg/czysjsbg/202602/t20260210_7091388.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf",
        "revenue": 2349.21,
        "expenditure": 3074.02
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf"
      },
      "taxRevenue": 1388,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.fujian.gov.cn/zwgk/tjsj/sjyszx/202608/P020260805560062154749.pdf",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://tjj.fujian.gov.cn/xxgk/tjxx/jjyxqk/202607/t20260722_7190752.htm",
        "sourceLocator": "",
        "cpi": 0.9
      }
    },
    "上海": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 4358.7
        },
        {
          "name": "非税收入",
          "value": 584.6
        }
      ],
      "expense": [
        {
          "name": "城乡社区",
          "value": 705.4
        },
        {
          "name": "资源勘探工业信息",
          "value": 818.3
        },
        {
          "name": "科学技术",
          "value": 444
        },
        {
          "name": "住房保障",
          "value": 175.8
        },
        {
          "name": "社会保障和就业",
          "value": 779.8
        },
        {
          "name": "教育",
          "value": 597.9
        }
      ],
      "metrics": {
        "liability": 18.3747787597355,
        "interest": 1.2,
        "debt": 81.2582271215836,
        "land": 24.29704085611542
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 10420.1,
          "denominator": 56708.71,
          "components": {
            "generalDebt": 4211.01,
            "specialDebt": 6209.09
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "上海市"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.2,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.shanghai.gov.cn/nw12338/20260515/a97f758537314ce7b2c0e26614e179f6.html",
          "numerator": 10420.1,
          "denominator": 12823.44,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 11540.5,
            "generalTransfers": 717.54,
            "specialTransfers": 394.03,
            "fundTransfers": 171.37
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 2804,
          "denominator": 11540.5,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://www.shanghai.gov.cn/nw12338/20260515/a97f758537314ce7b2c0e26614e179f6.html"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://czj.sh.gov.cn/cmsres/90/900291a57acd4189873d16a35eb6ec86/8870f794a688f6f6e0a5e7877f6cdff6.pdf",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.shanghai.gov.cn/nw12338/20260515/a97f758537314ce7b2c0e26614e179f6.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.sh.gov.cn/cmsres/90/900291a57acd4189873d16a35eb6ec86/8870f794a688f6f6e0a5e7877f6cdff6.pdf"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.sh.gov.cn/cmsres/90/900291a57acd4189873d16a35eb6ec86/8870f794a688f6f6e0a5e7877f6cdff6.pdf"
      },
      "taxRevenue": 4358.7,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.sh.gov.cn/cmsres/90/900291a57acd4189873d16a35eb6ec86/8870f794a688f6f6e0a5e7877f6cdff6.pdf",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "湖南": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 1112.9
        },
        {
          "name": "非税收入",
          "value": 798.2
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 43.91542733369916,
        "interest": 2.707900535096002,
        "land": 21.898581346211895,
        "debt": 227.10428139989344,
        "spread": 76
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 24289.03,
          "denominator": 55308.65,
          "components": {
            "generalDebt": 8726.31,
            "specialDebt": 15562.72
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "湖南省"
        },
        "interest": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/ysjsbg/202608/34043809/files/7a56c316a2ed48e0953085a7d0afb536.pdf",
          "numerator": 258.09,
          "denominator": 9531,
          "formula": "全省一般债务付息／一般公共预算支出×100",
          "sourceLocator": "印刷页53与4"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/ysjsbg/202608/34043809/files/7a56c316a2ed48e0953085a7d0afb536.pdf",
          "numerator": 1160.8,
          "denominator": 5300.799999999999,
          "formula": "国有土地使用权出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "印刷页117、1"
        },
        "debt": {
          "period": "2025年",
          "scope": "全省",
          "budget": "地方一般公共预算",
          "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/ysjsbg/202608/t20260812_34043809.html",
          "sourceLocator": "全省决算收支；综合财力不含债务收入与跨预算调入",
          "numerator": 24289.03,
          "denominator": 10695.099999999999,
          "formula": "政府法定债务余额／（地方一般公共预算收入＋政府性基金收入＋两项预算中央补助）×100",
          "components": {
            "generalRevenue": 3507.7,
            "fundRevenue": 1793.1,
            "generalCentralTransfer": 4942.3,
            "fundCentralTransfer": 452
          },
          "definitionSource": "https://www.lhratings.com/reports/B024117-P80891-2025.pdf"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        }
      },
      "sources": [
        "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/yszxqk_79131/202607/t20260716_34027479.html",
        "https://czt.hunan.gov.cn/czt/xxgk/czyjsgk/czyjs/202602/t20260226_33922264.html",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/ysjsbg/202608/34043809/files/7a56c316a2ed48e0953085a7d0afb536.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 1911.1,
        "expenditure": 4724.4,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 1112.9,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/yszxqk_79131/202607/t20260716_34027479.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/yszxqk_79131/202607/t20260716_34027479.html"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 9536.26,
          "expense": [
            {
              "name": "教育",
              "value": 1601.41
            },
            {
              "name": "科学技术",
              "value": 314.83
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 143.43
            },
            {
              "name": "社会保障和就业",
              "value": 1665.33
            },
            {
              "name": "卫生健康",
              "value": 829.22
            },
            {
              "name": "节能环保",
              "value": 205.79
            },
            {
              "name": "城乡社区",
              "value": 1023.09
            },
            {
              "name": "农林水",
              "value": 1174.21
            },
            {
              "name": "交通运输",
              "value": 375.23
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        },
        {
          "period": "2025年",
          "expenditure": 9531,
          "expense": [
            {
              "name": "一般公共服务",
              "value": 802.8
            },
            {
              "name": "公共安全",
              "value": 432.8
            },
            {
              "name": "教育",
              "value": 1662.8
            },
            {
              "name": "科学技术",
              "value": 349.8
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 145.7
            },
            {
              "name": "社会保障和就业",
              "value": 1751.9
            },
            {
              "name": "卫生健康",
              "value": 872.9
            },
            {
              "name": "节能环保",
              "value": 191.6
            },
            {
              "name": "城乡社区",
              "value": 919.8
            },
            {
              "name": "农林水",
              "value": 1076.4
            },
            {
              "name": "交通运输",
              "value": 300.4
            }
          ],
          "expenseEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://czt.hunan.gov.cn/czt/ztzl/hnczysgk/ysjsbg/202608/34043809/files/7a56c316a2ed48e0953085a7d0afb536.pdf",
            "sourceLocator": "决算表3，印刷第4—5页"
          }
        }
      ]
    },
    "安徽": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [
        {
          "name": "资源勘探工业信息",
          "value": 85.3
        },
        {
          "name": "住房保障",
          "value": 135.8
        },
        {
          "name": "城乡社区",
          "value": 493.8
        },
        {
          "name": "卫生健康",
          "value": 402.9
        }
      ],
      "metrics": {
        "liability": 40.38649531034743,
        "spread": 60,
        "tax": 5.058219630489347,
        "interest": 1.7,
        "debt": 200.11445584846945,
        "land": 22.55280467024516
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 21400.4,
          "denominator": 52989,
          "components": {
            "generalDebt": 4953.63,
            "specialDebt": 16446.77
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "安徽省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://finance.sina.cn/2026-03-19/detail-inhrpnfu4690724.d.html",
          "numerator": 2680.3,
          "denominator": 52989,
          "sourceLocator": "2025年全省地方一般公共预算税收；黑龙江表1的2025年完成列",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.7,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-03-12/0000_20260312_O0AB.pdf",
          "numerator": 21400.4,
          "denominator": 10694.08,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 5786.42,
            "generalTransfers": 3932.81,
            "specialTransfers": 375.74,
            "fundTransfers": 599.11
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 1305,
          "denominator": 5786.42,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-03-12/0000_20260312_O0AB.pdf"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://czgz.wuhu.gov.cn/xwzx/btdtai/8945904.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.cn/2026-03-19/detail-inhrpnfu4690724.d.html",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-03-12/0000_20260312_O0AB.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czgz.wuhu.gov.cn/xwzx/btdtai/8945904.html"
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "revenue": 4041.64,
          "income": [
            {
              "name": "增值税",
              "value": 1248.81
            },
            {
              "name": "企业所得税",
              "value": 388.79
            },
            {
              "name": "个人所得税",
              "value": 106.52
            },
            {
              "name": "其他税收",
              "value": 857.56
            },
            {
              "name": "专项收入",
              "value": 322.46
            },
            {
              "name": "行政事业性收费",
              "value": 112.05
            },
            {
              "name": "罚没收入",
              "value": 121.21
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 739.45
            },
            {
              "name": "其他非税收入",
              "value": 144.79
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        }
      ]
    },
    "北京": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 1201.5
        },
        {
          "name": "企业所得税",
          "value": 1109.6
        },
        {
          "name": "个人所得税",
          "value": 457.4
        },
        {
          "name": "其他税收",
          "value": 611.6
        },
        {
          "name": "非税收入",
          "value": 404.6
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 664.9
        },
        {
          "name": "社会保障和就业",
          "value": 789.2
        },
        {
          "name": "卫生健康",
          "value": 418.5
        },
        {
          "name": "科学技术",
          "value": 458.7
        },
        {
          "name": "城乡社区",
          "value": 557.5
        },
        {
          "name": "农林水",
          "value": 261.8
        },
        {
          "name": "住房保障",
          "value": 147.6
        }
      ],
      "metrics": {
        "liability": 26.75882504311222,
        "interest": 0.9,
        "debt": 131.2246141444125,
        "land": 21.511071046256127
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 13934.23,
          "denominator": 52073.4,
          "components": {
            "generalDebt": 2927.78,
            "specialDebt": 11006.45
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "北京市"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 0.9,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3323459&mode=save&priority=0",
          "numerator": 13934.23,
          "denominator": 10618.61,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 8874.5,
            "generalTransfers": 1249.37,
            "specialTransfers": 275.95,
            "fundTransfers": 218.79
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 1909,
          "denominator": 8874.5,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3323459&mode=save&priority=0"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://www.beijing.gov.cn/gongkai/caizheng/czbg/ysbg/202608/t20260813_4821525.html",
        "https://czj.beijing.gov.cn/zwxx/czsj/czsz/202607/t20260729_4796653.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3323459&mode=save&priority=0",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 3784.7,
        "expenditure": 4661.0,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 3380.1,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://www.beijing.gov.cn/gongkai/caizheng/czbg/ysbg/202608/t20260813_4821525.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.beijing.gov.cn/gongkai/caizheng/czbg/ysbg/202608/t20260813_4821525.html"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.beijing.gov.cn/zwxx/czsj/czyjs/202608/t20260812_4819289.html"
      },
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "河北": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 47.983356725051316,
        "spread": 73,
        "tax": 5.351159715405272,
        "interest": 2.2,
        "debt": 205.67650814984697,
        "land": 23.896911512509416
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 23658.29,
          "denominator": 49305.2,
          "components": {
            "generalDebt": 8013.57,
            "specialDebt": 15644.72
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "河北省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.hbshgzb.gov.cn/2026-04/13/content_9499919.htm",
          "numerator": 2638.4,
          "denominator": 49305.2,
          "sourceLocator": "河北省统计局2025年统计公报，财政金融部分",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2023年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.2,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2023年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://finance.sina.cn/2026-02-04/detail-inhkrihn3023382.d.html",
          "numerator": 23658.29,
          "denominator": 11502.67,
          "unit": "亿元",
          "components": {
            "generalRevenue": 4398.6,
            "fundRevenue": 1840.7,
            "generalTransfers": 4175.2,
            "specialTransfers": 496.01,
            "fundTransfers": 592.16
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（两本预算本级收入＋中央两本预算补助）×100",
          "sourceLocator": "2025年全省预算执行；中央补助来自财政部2025年分地区决算表"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 1491,
          "denominator": 6239.3,
          "unit": "亿元",
          "additionalSources": [
            "https://finance.sina.cn/2026-02-04/detail-inhkrihn3023382.d.html"
          ],
          "numeratorPrecision": 0,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "粤开证券第15页图10已披露数值标签"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://net.hebccw.cn/system/2026/07/22/102206473.shtml",
        "https://www.hbshgzb.gov.cn/2026-04/13/content_9499919.htm",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://finance.sina.cn/2026-02-04/detail-inhkrihn3023382.d.html",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://net.hebccw.cn/system/2026/07/22/102206473.shtml",
        "sourceLocator": "",
        "cpi": 0.7
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 10326.72,
          "expense": [
            {
              "name": "教育",
              "value": 1828.84
            },
            {
              "name": "科学技术",
              "value": 147.24
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 118.52
            },
            {
              "name": "社会保障和就业",
              "value": 1796.19
            },
            {
              "name": "卫生健康",
              "value": 821.28
            },
            {
              "name": "节能环保",
              "value": 245.05
            },
            {
              "name": "城乡社区",
              "value": 971.39
            },
            {
              "name": "农林水",
              "value": 1085.0
            },
            {
              "name": "交通运输",
              "value": 297.61
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 4310.85,
          "income": [
            {
              "name": "增值税",
              "value": 982.78
            },
            {
              "name": "企业所得税",
              "value": 320.53
            },
            {
              "name": "个人所得税",
              "value": 83.65
            },
            {
              "name": "其他税收",
              "value": 1164.2
            },
            {
              "name": "专项收入",
              "value": 406.45
            },
            {
              "name": "行政事业性收费",
              "value": 130.17
            },
            {
              "name": "罚没收入",
              "value": 151.07
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 911.16
            },
            {
              "name": "其他非税收入",
              "value": 160.84
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 4398.6,
          "income": [
            {
              "name": "税收收入",
              "value": 2638.4
            },
            {
              "name": "非税收入",
              "value": 1760.2
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.hbshgzb.gov.cn/2026-04/13/content_9499919.htm",
            "sourceLocator": "河北省统计局2025年统计公报，财政金融部分"
          }
        }
      ]
    },
    "陕西": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 491.808
        },
        {
          "name": "企业所得税",
          "value": 211.0177
        },
        {
          "name": "个人所得税",
          "value": 70.5746
        },
        {
          "name": "资源税",
          "value": 215.9994
        },
        {
          "name": "其他税收",
          "value": 305.1654
        },
        {
          "name": "专项收入",
          "value": 96.0023
        },
        {
          "name": "行政事业性收费",
          "value": 76.9952
        },
        {
          "name": "罚没收入",
          "value": 43.9397
        },
        {
          "name": "国有资源（资产）有偿使用收入",
          "value": 200.5593
        },
        {
          "name": "政府住房基金收入",
          "value": 30.2297
        },
        {
          "name": "其他非税收入",
          "value": 10.2364
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 570.3897
        },
        {
          "name": "社会保障和就业",
          "value": 927.0061
        },
        {
          "name": "卫生健康",
          "value": 384.7733
        },
        {
          "name": "一般公共服务",
          "value": 307.0288
        },
        {
          "name": "国防和公共安全",
          "value": 147.2493
        },
        {
          "name": "城乡社区",
          "value": 266.8189
        },
        {
          "name": "农林水",
          "value": 306.3327
        },
        {
          "name": "交通运输",
          "value": 188.4908
        },
        {
          "name": "住房保障",
          "value": 116.9004
        }
      ],
      "metrics": {
        "liability": 39.25955716791013,
        "land": 8.838617117677565,
        "interest": 2.2855118112922757,
        "spread": 102,
        "debt": 180.3726664353842
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 14349.8,
          "denominator": 36551.1,
          "components": {
            "generalDebt": 5529.52,
            "specialDebt": 8820.28
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "陕西省"
        },
        "land": {
          "period": "2026年上半年",
          "scope": "全省",
          "budget": "地方一般公共预算",
          "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
          "sourceLocator": "第51、55页",
          "numerator": 176.6028,
          "denominator": 1998.0818,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        },
        "interest": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
          "sourceLocator": "第5页，付息与发行费用分列",
          "numerator": 162.1072,
          "denominator": 7092.8183,
          "formula": "一般公共预算债务付息／一般公共预算支出×100"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-04-22/0000_20260422_LDJ2.pdf",
          "numerator": 14349.8,
          "denominator": 7955.64,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 4361.5,
            "generalTransfers": 2999.78,
            "specialTransfers": 354.01,
            "fundTransfers": 240.35
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2025/202508/P020250813600972465427.pdf",
        "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-04-22/0000_20260422_2N1V.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-04-22/0000_20260422_LDJ2.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 1752.5277,
        "expenditure": 3807.7306
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "sourceLocator": "第51、52页，表二十五、二十六，全省累计执行数"
      },
      "taxRevenue": 1294.5651,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "sourceLocator": "第51、52页，表二十五、二十六，全省累计执行数"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "sourceLocator": "第51、52页，表二十五、二十六，全省累计执行数"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "sourceLocator": "第51、52页，表二十五、二十六，全省累计执行数"
      },
      "taxHistory": [
        {
          "year": 2023,
          "tax": 2693.8536,
          "nonTax": 743.7474,
          "revenue": 3437.601,
          "gdp": 33976.45,
          "taxRatio": 7.928590538446484,
          "nonTaxShare": 21.635652305197723
        },
        {
          "year": 2024,
          "tax": 2613.1677,
          "nonTax": 780.1155,
          "revenue": 3393.2832,
          "gdp": 35538.77,
          "taxRatio": 7.353005464173353,
          "nonTaxShare": 22.989990932675468
        },
        {
          "year": 2025,
          "tax": 2418.5304,
          "nonTax": 870.9123,
          "revenue": 3289.4427,
          "gdp": 36551.1,
          "taxRatio": 6.616847098992917,
          "nonTaxShare": 26.475983302581923
        }
      ],
      "taxHistoryEvidence": {
        "scope": "全省",
        "period": "2023—2025年",
        "source": "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2026/202608/P020260819387805831448.pdf",
        "additionalSources": [
          "https://czt.shaanxi.gov.cn/xxgk/zdgk/cjsj/2025/202508/P020250813600972465427.pdf",
          "https://static.sse.com.cn/disclosure/bond/announcement/local/c/new/2026-04-22/0000_20260422_2N1V.pdf",
          "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        ],
        "sourceLocator": "两份决算第4页；GDP使用经济普查修订后的2023值33976.45",
        "formula": "地方税收／GDP；非税收入／地方一般公共预算收入"
      }
    },
    "江西": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 949.7
        },
        {
          "name": "非税收入",
          "value": 735.9
        }
      ],
      "expense": [],
      "metrics": {
        "land": 10.664643696162884,
        "liability": 48.36815657967796,
        "interest": 2.0021812600142725,
        "spread": 72,
        "debt": 203.79952507398787
      },
      "metricEvidence": {
        "land": {
          "period": "2026年上半年",
          "scope": "全省",
          "source": "https://jxrd.jxnews.com.cn/system/2026/08/11/031215391.shtml",
          "numerator": 217.9,
          "denominator": 2043.1999999999998,
          "formula": "土地出让收入/(地方一般公共预算收入+政府性基金收入)*100"
        },
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 17422.21,
          "denominator": 36020,
          "components": {
            "generalDebt": 4904.15,
            "specialDebt": 12518.06
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "江西省"
        },
        "interest": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://jx.ifeng.com/c/8qazGCXY9fP",
          "numerator": 148.7,
          "denominator": 7426.9,
          "formula": "一般公共预算债务付息支出／一般公共预算支出×100",
          "sourceLocator": "省财政厅预算报告，一（一）1"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "debt": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://jx.ifeng.com/c/8qazGCXY9fP",
          "numerator": 17422.21,
          "denominator": 8548.699999999999,
          "sourceLocator": "财政厅预算报告：全省两本预算本级收入及中央补助",
          "formula": "地方政府债务余额／（一般公共预算收入＋政府性基金收入＋两本预算中央补助收入）×100",
          "components": {
            "generalRevenue": 3079.2,
            "fundRevenue": 1592.7,
            "generalTransfers": 3577.2,
            "fundTransfers": 299.6
          }
        }
      },
      "sources": [
        "https://jxrd.jxnews.com.cn/system/2026/08/11/031215391.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://jx.ifeng.com/c/8qazGCXY9fP",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 1685.6,
        "expenditure": 3700.0,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 949.7,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://jxrd.jxnews.com.cn/system/2026/08/11/031215391.shtml",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://jxrd.jxnews.com.cn/system/2026/08/11/031215391.shtml"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 7695.25,
          "expense": [
            {
              "name": "教育",
              "value": 1393.43
            },
            {
              "name": "科学技术",
              "value": 269.66
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 122.68
            },
            {
              "name": "社会保障和就业",
              "value": 1124.49
            },
            {
              "name": "卫生健康",
              "value": 681.71
            },
            {
              "name": "节能环保",
              "value": 254.16
            },
            {
              "name": "城乡社区",
              "value": 653.16
            },
            {
              "name": "农林水",
              "value": 966.27
            },
            {
              "name": "交通运输",
              "value": 283.96
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        },
        {
          "period": "2025年",
          "expenditure": 7426.9,
          "expense": [
            {
              "name": "一般公共服务",
              "value": 623.3
            },
            {
              "name": "教育",
              "value": 1412.8
            },
            {
              "name": "科学技术",
              "value": 287.3
            },
            {
              "name": "社会保障和就业",
              "value": 1203.9
            },
            {
              "name": "卫生健康",
              "value": 705.5
            },
            {
              "name": "节能环保",
              "value": 249.1
            },
            {
              "name": "农林水",
              "value": 776.2
            },
            {
              "name": "灾害防治及应急管理",
              "value": 61.5
            },
            {
              "name": "交通运输",
              "value": 301.2
            },
            {
              "name": "债务付息",
              "value": 148.7
            }
          ],
          "expenseEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://jx.ifeng.com/c/8qazGCXY9fP",
            "sourceLocator": "省财政厅预算报告，一（一）1；江西日报全文转载"
          }
        }
      ]
    },
    "重庆": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 312.8
        },
        {
          "name": "企业所得税",
          "value": 148.2
        },
        {
          "name": "个人所得税",
          "value": 43.6
        },
        {
          "name": "其他税收",
          "value": 303.5
        },
        {
          "name": "非税收入",
          "value": 601.4
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 457
        },
        {
          "name": "科学技术",
          "value": 31.3
        },
        {
          "name": "社会保障和就业",
          "value": 746.6
        },
        {
          "name": "卫生健康",
          "value": 296.1
        },
        {
          "name": "城乡社区",
          "value": 172.4
        },
        {
          "name": "农林水",
          "value": 156.3
        },
        {
          "name": "交通运输",
          "value": 150.5
        }
      ],
      "metrics": {
        "land": 10.666426296496605,
        "liability": 49.712408314135374,
        "spread": 88,
        "interest": 2.2,
        "debt": 233.41850253351714
      },
      "metricEvidence": {
        "land": {
          "period": "2026年上半年",
          "scope": "全省",
          "source": "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/yszx/202607/t20260722_15843033_wap.html",
          "numerator": 177.5,
          "denominator": 1664.1,
          "formula": "土地出让收入/(地方一般公共预算收入+政府性基金收入)*100"
        },
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 16781.88,
          "denominator": 33757.93,
          "components": {
            "generalDebt": 3956.88,
            "specialDebt": 12825.0
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "重庆市"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.2,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/zfys/202602/t20260211_15434623.html",
          "numerator": 16781.88,
          "denominator": 7189.61,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 4329,
            "generalTransfers": 2163.89,
            "specialTransfers": 265.87,
            "fundTransfers": 430.85
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/yszx/202607/t20260722_15843033_wap.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/zfys/202602/t20260211_15434623.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 1409.5,
        "expenditure": 2762.0,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 808.1,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/yszx/202607/t20260722_15843033_wap.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/yszx/202607/t20260722_15843033_wap.html"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czj.cq.gov.cn/zwgk_268/fdzdgknr/ysjs/yszx/202607/t20260722_15843033_wap.html"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ]
    },
    "辽宁": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 984.8
        },
        {
          "name": "非税收入",
          "value": 670.9
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 47.28432415491111,
        "spread": 147,
        "interest": 3.7,
        "debt": 216.62902081199067,
        "land": 11.933784358902862
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 15690.31,
          "denominator": 33182.9,
          "components": {
            "generalDebt": 7964.06,
            "specialDebt": 7726.25
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "辽宁省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 3.7,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://news.lnd.com.cn/system/2026/02/14/030546873.shtml",
          "numerator": 15690.31,
          "denominator": 7242.9400000000005,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 3357.2,
            "generalTransfers": 3278.03,
            "specialTransfers": 262.99,
            "fundTransfers": 344.72
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3260528&mode=save&priority=0",
          "numerator": 406.59,
          "denominator": 3407.05,
          "unit": "亿元",
          "additionalSources": [
            "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3260528&mode=save&priority=0"
          ],
          "numeratorPrecision": 2,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "同2024年；土地收入为粤开证券第14页图9数值标签，辽宁为评级报告表7"
        }
      },
      "sources": [
        "https://czt.ln.gov.cn/czt/zfxxgk/fdzdgknr/czyjs/czsz/2026090315271251255/index.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://news.lnd.com.cn/system/2026/02/14/030546873.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm",
        "https://www.chinamoney.com.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3260528&mode=save&priority=0"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 1655.7,
        "expenditure": 3420.4,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 984.8,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://czt.ln.gov.cn/czt/zfxxgk/fdzdgknr/czyjs/czsz/2026090315271251255/index.shtml",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.ln.gov.cn/czt/zfxxgk/fdzdgknr/czyjs/czsz/2026090315271251255/index.shtml"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6860.03,
          "expense": [
            {
              "name": "教育",
              "value": 740.91
            },
            {
              "name": "科学技术",
              "value": 79.86
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 88.2
            },
            {
              "name": "社会保障和就业",
              "value": 2095.1
            },
            {
              "name": "卫生健康",
              "value": 449.28
            },
            {
              "name": "节能环保",
              "value": 101.11
            },
            {
              "name": "城乡社区",
              "value": 639.95
            },
            {
              "name": "农林水",
              "value": 514.66
            },
            {
              "name": "交通运输",
              "value": 211.87
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ]
    },
    "云南": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 321.8
        },
        {
          "name": "企业所得税",
          "value": 135.9
        },
        {
          "name": "个人所得税",
          "value": 32.8
        },
        {
          "name": "资源税",
          "value": 37.4
        },
        {
          "name": "城市维护建设税",
          "value": 73.4
        },
        {
          "name": "其他税收",
          "value": 165.8
        },
        {
          "name": "非税收入",
          "value": 350.0
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 648.9
        },
        {
          "name": "社会保障和就业",
          "value": 702.8
        },
        {
          "name": "卫生健康",
          "value": 418
        },
        {
          "name": "农林水",
          "value": 398.2
        },
        {
          "name": "交通运输",
          "value": 240.3
        },
        {
          "name": "城乡社区",
          "value": 137.1
        }
      ],
      "metrics": {
        "liability": 55.91406644371049,
        "spread": 153,
        "interest": 3.1,
        "debt": 232.72807648237966,
        "land": 19.095711275395864
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 18320.68,
          "denominator": 32765.78,
          "components": {
            "generalDebt": 7400.36,
            "specialDebt": 10920.32
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "云南省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 3.1,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://yndaily.yunnan.cn/content/202602/07/content_300864.html",
          "numerator": 18320.68,
          "denominator": 7872.139999999999,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 3136.83,
            "generalTransfers": 4114.12,
            "specialTransfers": 320.41,
            "fundTransfers": 300.78
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 599,
          "denominator": 3136.83,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://yndaily.yunnan.cn/content/202602/07/content_300864.html"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://finance.sina.com.cn/jjxw/2026-07-17/doc-iniiahrn1282494.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://yndaily.yunnan.cn/content/202602/07/content_300864.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 1117.1,
        "expenditure": 3537.3,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 767.1,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://finance.sina.com.cn/jjxw/2026-07-17/doc-iniiahrn1282494.shtml",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://finance.sina.com.cn/jjxw/2026-07-17/doc-iniiahrn1282494.shtml"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://finance.sina.com.cn/jjxw/2026-07-17/doc-iniiahrn1282494.shtml"
      },
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ]
    },
    "广西": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 49.63244408787164,
        "spread": 124,
        "tax": 3.804429912421012,
        "interest": 2.5,
        "debt": 204.28240324094716,
        "land": 14.642162505457865
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 14754.46,
          "denominator": 29727.45,
          "components": {
            "generalDebt": 5843.23,
            "specialDebt": 8911.23
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "广西壮族自治区"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.gxzf.gov.cn/zzqzyxx/t27276601.shtml",
          "numerator": 1130.96,
          "denominator": 29727.45,
          "sourceLocator": "2025年全省地方一般公共预算税收；黑龙江表1的2025年完成列",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.5,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.gxnews.com.cn/staticpages/20260215/newgx699110d5-21908703.shtml",
          "numerator": 14754.46,
          "denominator": 7222.58,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 2519.3,
            "generalTransfers": 4144.73,
            "specialTransfers": 216.7,
            "fundTransfers": 341.85
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.gxnews.com.cn/staticpages/20260215/newgx699110d5-21908703.shtml",
          "numerator": 368.88,
          "denominator": 2519.3,
          "unit": "亿元",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "2025年全省预算执行：两本预算本级收入及国有土地使用权出让收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://www.gxzf.gov.cn/zzqzyxx/t27276601.shtml",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.gxnews.com.cn/staticpages/20260215/newgx699110d5-21908703.shtml",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6469.58,
          "expense": [
            {
              "name": "教育",
              "value": 1226.35
            },
            {
              "name": "科学技术",
              "value": 113.69
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 69.73
            },
            {
              "name": "社会保障和就业",
              "value": 1130.39
            },
            {
              "name": "卫生健康",
              "value": 626.15
            },
            {
              "name": "节能环保",
              "value": 61.69
            },
            {
              "name": "城乡社区",
              "value": 390.18
            },
            {
              "name": "农林水",
              "value": 888.88
            },
            {
              "name": "交通运输",
              "value": 361.26
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 1837.32,
          "income": [
            {
              "name": "增值税",
              "value": 489.79
            },
            {
              "name": "企业所得税",
              "value": 137.27
            },
            {
              "name": "个人所得税",
              "value": 43.66
            },
            {
              "name": "其他税收",
              "value": 418.26
            },
            {
              "name": "专项收入",
              "value": 97.45
            },
            {
              "name": "行政事业性收费",
              "value": 95.59
            },
            {
              "name": "罚没收入",
              "value": 183.82
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 300.88
            },
            {
              "name": "其他非税收入",
              "value": 70.6
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        }
      ]
    },
    "内蒙古": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 1225.3
        },
        {
          "name": "非税收入",
          "value": 427.7
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 49.65646262833045,
        "interest": 3.6,
        "debt": 178.84640019201493,
        "land": 11.225968479143173
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 13263.41,
          "denominator": 26710.34,
          "components": {
            "generalDebt": 8157.04,
            "specialDebt": 5106.37
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "内蒙古自治区"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 3.6,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202604/t20260402_2884190.html",
          "numerator": 13263.41,
          "denominator": 7416.09,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 3457.6,
            "generalTransfers": 3245.01,
            "specialTransfers": 241.81,
            "fundTransfers": 471.67
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://www.chinamoney.org.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3255178&mode=save&priority=0",
          "numerator": 412.13,
          "denominator": 3671.2200000000003,
          "unit": "亿元",
          "additionalSources": [
            "https://www.chinamoney.org.cn/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3255178&mode=save&priority=0"
          ],
          "numeratorPrecision": 2,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "内蒙古自治区政府债券评级报告，2024年政府性基金收入表，土地出让收入412.13亿元"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202607/t20260716_2929283.html",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202604/t20260402_2884190.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 1653,
        "expenditure": 2962.4
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202607/t20260716_2929283.html",
        "sourceLocator": ""
      },
      "taxRevenue": 1225.3,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202607/t20260716_2929283.html",
        "sourceLocator": ""
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.nmg.gov.cn/zwgk/zfxxgk/fdzdgknr/czsj/202607/t20260716_2929283.html",
        "sourceLocator": ""
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6916.71,
          "expense": [
            {
              "name": "教育",
              "value": 783.65
            },
            {
              "name": "科学技术",
              "value": 86.27
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 129.7
            },
            {
              "name": "社会保障和就业",
              "value": 1168.22
            },
            {
              "name": "卫生健康",
              "value": 426.79
            },
            {
              "name": "节能环保",
              "value": 196.66
            },
            {
              "name": "城乡社区",
              "value": 660.12
            },
            {
              "name": "农林水",
              "value": 1094.34
            },
            {
              "name": "交通运输",
              "value": 397.78
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "山西": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 1130.8
        },
        {
          "name": "非税收入",
          "value": 540.7
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 37.822760561789295,
        "spread": 62,
        "interest": 1.7,
        "debt": 151.04009548109408,
        "land": 9.55135700658502
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 9643.17,
          "denominator": 25495.68,
          "components": {
            "generalDebt": 3693.66,
            "specialDebt": 5949.51
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "山西省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.7,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-06-25/115739_20260625_RQ5L.pdf",
          "numerator": 9643.17,
          "denominator": 6384.509999999999,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 3680.5099999999998,
            "generalTransfers": 2277.1,
            "specialTransfers": 200.42,
            "fundTransfers": 226.48
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 388,
          "denominator": 4062.25,
          "unit": "亿元",
          "additionalSources": [
            "https://www.lhratings.com/reports/B024094-P86318-2026.pdf"
          ],
          "numeratorPrecision": 0,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "同2024年；土地收入为粤开证券第14页图9数值标签，辽宁为评级报告表7"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.shanxi.gov.cn/czdt/czsj_49468/202607/t20260720_10180575.shtml",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-06-25/115739_20260625_RQ5L.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 1671.5,
        "expenditure": 2769.1
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shanxi.gov.cn/czdt/czsj_49468/202607/t20260720_10180575.shtml",
        "sourceLocator": ""
      },
      "taxRevenue": 1130.8,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shanxi.gov.cn/czdt/czsj_49468/202607/t20260720_10180575.shtml",
        "sourceLocator": ""
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.shanxi.gov.cn/czdt/czsj_49468/202607/t20260720_10180575.shtml",
        "sourceLocator": ""
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6312.67,
          "expense": [
            {
              "name": "教育",
              "value": 922.1
            },
            {
              "name": "科学技术",
              "value": 79.0
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 115.17
            },
            {
              "name": "社会保障和就业",
              "value": 1209.33
            },
            {
              "name": "卫生健康",
              "value": 476.61
            },
            {
              "name": "节能环保",
              "value": 237.82
            },
            {
              "name": "城乡社区",
              "value": 619.44
            },
            {
              "name": "农林水",
              "value": 713.82
            },
            {
              "name": "交通运输",
              "value": 359.73
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ]
    },
    "贵州": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 672.51
        },
        {
          "name": "非税收入",
          "value": 464.02
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 82.20236081820987,
        "spread": 228,
        "interest": 4.155466330615785,
        "land": 21.00663834627329,
        "debt": 216.21148915712553
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 19368.66,
          "denominator": 23562.17,
          "components": {
            "generalDebt": 8827.22,
            "specialDebt": 10541.44
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "贵州省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445165345.pdf",
          "numerator": 2724485,
          "denominator": 65563881,
          "sourceLocator": "表2第4—6页，全省2025年一般公共预算支出完成数；排除债务发行费用",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "unit": "万元"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445283377.pdf",
          "numerator": 10080920,
          "denominator": 47989211,
          "sourceLocator": "表14第1页；一般公共预算收入来自表1",
          "additionalSources": [
            "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445165345.pdf"
          ],
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "unit": "万元"
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445283377.pdf",
          "numerator": 19368.66,
          "denominator": 8958.2011,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 4798.9211,
            "generalTransfers": 3651.07,
            "specialTransfers": 236.97,
            "fundTransfers": 271.24
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.guizhou.gov.cn/xwzx/czdt/202607/t20260716_90630321.html",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445165345.pdf",
        "https://czt.guizhou.gov.cn/zwgk/zdlyxx/czys/202602/P020260214542445283377.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 1136.53,
        "expenditure": 3170.06
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.guizhou.gov.cn/xwzx/czdt/202607/t20260716_90630321.html",
        "sourceLocator": ""
      },
      "taxRevenue": 672.51,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.guizhou.gov.cn/xwzx/czdt/202607/t20260716_90630321.html",
        "sourceLocator": ""
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.guizhou.gov.cn/xwzx/czdt/202607/t20260716_90630321.html",
        "sourceLocator": ""
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6524.74,
          "expense": [
            {
              "name": "教育",
              "value": 1209.83
            },
            {
              "name": "科学技术",
              "value": 89.23
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 120.53
            },
            {
              "name": "社会保障和就业",
              "value": 862.54
            },
            {
              "name": "卫生健康",
              "value": 597.0
            },
            {
              "name": "节能环保",
              "value": 131.79
            },
            {
              "name": "城乡社区",
              "value": 326.0
            },
            {
              "name": "农林水",
              "value": 943.59
            },
            {
              "name": "交通运输",
              "value": 422.84
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ]
    },
    "新疆": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 67.66366261705497,
        "spread": 80,
        "tax": 6.86901300763121
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 14522.07,
          "denominator": 21462.14,
          "components": {
            "generalDebt": 5293.45,
            "specialDebt": 9228.62
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "新疆维吾尔自治区（含新疆生产建设兵团）"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2024年",
          "denominatorPeriod": "2024年",
          "scope": "全省",
          "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
          "gdpSource": "https://www.stats.gov.cn/sj/ndsj/2025/html/C03-09.jpg",
          "numerator": 1410.49,
          "denominator": 20534.1,
          "formula": "地方税收收入／同年地区生产总值×100",
          "sourceLocator": "中国统计年鉴2025表7-5税收收入及表3-9地区生产总值",
          "geographicCoverage": "新疆维吾尔自治区，含新疆生产建设兵团，按统计年鉴注释"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "债务率",
        "债支比",
        "土地财政依赖度",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 7645.96,
          "expense": [
            {
              "name": "教育",
              "value": 1215.82
            },
            {
              "name": "科学技术",
              "value": 72.45
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 133.17
            },
            {
              "name": "社会保障和就业",
              "value": 1174.44
            },
            {
              "name": "卫生健康",
              "value": 518.79
            },
            {
              "name": "节能环保",
              "value": 124.75
            },
            {
              "name": "城乡社区",
              "value": 519.74
            },
            {
              "name": "农林水",
              "value": 1228.49
            },
            {
              "name": "交通运输",
              "value": 564.97
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类",
            "geographicCoverage": "新疆维吾尔自治区，含新疆生产建设兵团，按统计年鉴注释"
          },
          "revenue": 2409.69,
          "income": [
            {
              "name": "增值税",
              "value": 538.3
            },
            {
              "name": "企业所得税",
              "value": 199.18
            },
            {
              "name": "个人所得税",
              "value": 67.08
            },
            {
              "name": "其他税收",
              "value": 605.93
            },
            {
              "name": "专项收入",
              "value": 127.23
            },
            {
              "name": "行政事业性收费",
              "value": 101.89
            },
            {
              "name": "罚没收入",
              "value": 110.68
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 526.88
            },
            {
              "name": "其他非税收入",
              "value": 132.52
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入",
            "geographicCoverage": "新疆维吾尔自治区，含新疆生产建设兵团，按统计年鉴注释"
          }
        }
      ],
      "metricGaps": {
        "debt": "自治区预算报告不含兵团，当前全省GDP及政府债务余额含兵团；未取得同年兵团对应分子和分母，不能混算",
        "interest": "自治区预算报告不含兵团，当前全省GDP及政府债务余额含兵团；未取得同年兵团对应分子和分母，不能混算",
        "land": "自治区预算报告不含兵团，当前全省GDP及政府债务余额含兵团；未取得同年兵团对应分子和分母，不能混算"
      }
    },
    "天津": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 430.5391
        },
        {
          "name": "企业所得税",
          "value": 191.538
        },
        {
          "name": "个人所得税",
          "value": 59.3735
        },
        {
          "name": "其他税收",
          "value": 249.7318
        },
        {
          "name": "专项收入",
          "value": 85.3531
        },
        {
          "name": "行政事业性收费",
          "value": 16.0403
        },
        {
          "name": "罚没收入",
          "value": 33.7042
        },
        {
          "name": "国有资源（资产）有偿使用收入",
          "value": 146.7723
        },
        {
          "name": "政府住房基金收入",
          "value": 25.764
        },
        {
          "name": "其他非税收入",
          "value": 8.3776
        }
      ],
      "expense": [
        {
          "name": "教育",
          "value": 234.5025
        },
        {
          "name": "社会保障和就业",
          "value": 362.1119
        },
        {
          "name": "卫生健康",
          "value": 104.8511
        },
        {
          "name": "一般公共服务",
          "value": 143.4247
        },
        {
          "name": "公共安全",
          "value": 111.8237
        },
        {
          "name": "城乡社区",
          "value": 139.3048
        },
        {
          "name": "资源勘探工业信息",
          "value": 132.6681
        },
        {
          "name": "农林水",
          "value": 44.809
        },
        {
          "name": "交通运输",
          "value": 45.2738
        }
      ],
      "metrics": {
        "liability": 81.44561274057678,
        "land": 7.41746876916962,
        "interest": 1.828319504654475,
        "spread": 99,
        "debt": 401.36811886978023
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 15099.87,
          "denominator": 18539.82,
          "components": {
            "generalDebt": 3783.04,
            "specialDebt": 11316.83
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "天津市"
        },
        "land": {
          "period": "2026年上半年",
          "scope": "全省",
          "budget": "地方一般公共预算",
          "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
          "sourceLocator": "第1、3页",
          "numerator": 102.4904,
          "denominator": 1381.7436,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        },
        "interest": {
          "period": "2026年上半年",
          "scope": "全省",
          "budget": "地方一般公共预算",
          "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
          "sourceLocator": "第2页",
          "numerator": 27.5691,
          "denominator": 1507.8929,
          "formula": "一般公共预算债务付息支出／一般公共预算支出×100"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.lhratings.com/reports/B024126-P86637-2026.pdf",
          "numerator": 15099.87,
          "denominator": 3762.1,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 2827.2,
            "generalTransfers": 730.99,
            "specialTransfers": 79.84,
            "fundTransfers": 124.07
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://www.lhratings.com/reports/B024126-P86637-2026.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 1247.1939,
        "expenditure": 1507.8929
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
        "sourceLocator": "附表第1—3页，全市预算执行列，万元转亿元"
      },
      "taxRevenue": 931.1824,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
        "sourceLocator": "附表第1—3页，全市预算执行列，万元转亿元"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
        "sourceLocator": "附表第1—3页，全市预算执行列，万元转亿元"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://cz.tj.gov.cn/zwgk_53713/ysgk_59783/ysjs/202608/W020260817639051790449.pdf",
        "sourceLocator": "附表第1—3页，全市预算执行列，万元转亿元"
      }
    },
    "黑龙江": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 64.10439625548051,
        "tax": 5.093525891693329,
        "interest": 2.9,
        "debt": 164.27965168803763,
        "land": 6.294073081181886
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 10819.54,
          "denominator": 16878,
          "components": {
            "generalDebt": 5953.22,
            "specialDebt": 4866.32
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "黑龙江省"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.hlj.gov.cn/hlj/c110008/202602/31913858/files/附件5%202026年省本级预算公开表.pdf",
          "numerator": 859.6853,
          "denominator": 16878,
          "sourceLocator": "2025年全省地方一般公共预算税收；黑龙江表1的2025年完成列",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.9,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.hljnews.cn/ljxw/content/2026-03/25/content_885778.html",
          "numerator": 10819.54,
          "denominator": 6586.049999999999,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 1715.9,
            "generalTransfers": 4247.4,
            "specialTransfers": 244.17,
            "fundTransfers": 378.58
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 108,
          "denominator": 1715.9,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://www.hljnews.cn/ljxw/content/2026-03/25/content_885778.html"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.hlj.gov.cn/hlj/c110008/202602/31913858/files/附件5%202026年省本级预算公开表.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.hljnews.cn/ljxw/content/2026-03/25/content_885778.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 6454.54,
          "expense": [
            {
              "name": "教育",
              "value": 616.1
            },
            {
              "name": "科学技术",
              "value": 52.68
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 63.42
            },
            {
              "name": "社会保障和就业",
              "value": 1641.56
            },
            {
              "name": "卫生健康",
              "value": 425.24
            },
            {
              "name": "节能环保",
              "value": 203.97
            },
            {
              "name": "城乡社区",
              "value": 311.24
            },
            {
              "name": "农林水",
              "value": 1351.37
            },
            {
              "name": "交通运输",
              "value": 281.13
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 1452.34,
          "income": [
            {
              "name": "增值税",
              "value": 339.06
            },
            {
              "name": "企业所得税",
              "value": 102.88
            },
            {
              "name": "个人所得税",
              "value": 35.93
            },
            {
              "name": "其他税收",
              "value": 393.96
            },
            {
              "name": "专项收入",
              "value": 66.99
            },
            {
              "name": "行政事业性收费",
              "value": 62.76
            },
            {
              "name": "罚没收入",
              "value": 93.1
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 310.61
            },
            {
              "name": "其他非税收入",
              "value": 47.05
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        }
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "吉林": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "增值税",
          "value": 151.7
        },
        {
          "name": "企业所得税",
          "value": 63.8
        },
        {
          "name": "个人所得税",
          "value": 21.3
        },
        {
          "name": "涉房涉土税收",
          "value": 99.2
        },
        {
          "name": "其他税收",
          "value": 62.4
        },
        {
          "name": "行政事业性收费",
          "value": 29.9
        },
        {
          "name": "国有资源（资产）有偿使用收入",
          "value": 156.3
        },
        {
          "name": "政府住房基金收入",
          "value": 50.9
        },
        {
          "name": "其他非税收入",
          "value": 73.9
        }
      ],
      "expense": [
        {
          "name": "社会保障和就业",
          "value": 595.9
        },
        {
          "name": "卫生健康",
          "value": 184.7
        },
        {
          "name": "文化旅游体育与传媒",
          "value": 28
        },
        {
          "name": "其他",
          "value": 1297.1
        }
      ],
      "metrics": {
        "liability": 76.39302572212414,
        "spread": 99,
        "interest": 3.1,
        "debt": 220.64780451673136,
        "land": 19.22333314920179
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 11439.0,
          "denominator": 14973.88,
          "components": {
            "generalDebt": 4805.18,
            "specialDebt": 6633.82
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "吉林省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 3.1,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czt.jl.gov.cn/zwgk/czsj/202601/t20260120_3546888.html",
          "numerator": 11439.0,
          "denominator": 5184.28,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 1810.3,
            "generalTransfers": 2881.92,
            "specialTransfers": 175.42,
            "fundTransfers": 316.64
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 348,
          "denominator": 1810.3,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://czt.jl.gov.cn/zwgk/czsj/202601/t20260120_3546888.html"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://czt.jl.gov.cn/zwgk/czsj/202607/t20260702_3646829.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://czt.jl.gov.cn/zwgk/czsj/202601/t20260120_3546888.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.jl.gov.cn/zwgk/czsj/202607/t20260702_3646829.html"
      },
      "expenseEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.jl.gov.cn/zwgk/czsj/202607/t20260702_3646829.html"
      },
      "taxRevenue": 398.4,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.jl.gov.cn/zwgk/czsj/202607/t20260702_3646829.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "totalEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.jl.gov.cn/zwgk/czsj/202607/t20260702_3646829.html",
        "revenue": 709.4,
        "expenditure": 2105.7
      }
    },
    "甘肃": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 69.52976820587699,
        "spread": 135,
        "tax": 5.149844862201132,
        "interest": 1.8,
        "debt": 178.51520984886682,
        "land": 12.310939148786492
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 9523.84,
          "denominator": 13697.5,
          "components": {
            "generalDebt": 3047.76,
            "specialDebt": 6476.08
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "甘肃省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.hezuo.gov.cn/info/1149/63182.htm",
          "numerator": 705.4,
          "denominator": 13697.5,
          "sourceLocator": "2025年全省地方一般公共预算税收；黑龙江表1的2025年完成列",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2024年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 1.8,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2024年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-07-30/243808_20260730_KCLJ.pdf",
          "numerator": 9523.84,
          "denominator": 5335.030000000001,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 1478.3600000000001,
            "generalTransfers": 3264.9,
            "specialTransfers": 305.9,
            "fundTransfers": 285.87
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 182,
          "denominator": 1478.3600000000001,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-07-30/243808_20260730_KCLJ.pdf"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://fgw.pingliang.gov.cn/gsyw/art/2026/art_1ad3a2c7ff3d4a1d9a2215d672559828.html",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://www.hezuo.gov.cn/info/1149/63182.htm",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-07-30/243808_20260730_KCLJ.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "prices": {
        "period": "2026年6月",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://fgw.pingliang.gov.cn/gsyw/art/2026/art_1ad3a2c7ff3d4a1d9a2215d672559828.html",
        "sourceLocator": "",
        "cpi": 0.9
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 4784.67,
          "expense": [
            {
              "name": "教育",
              "value": 723.88
            },
            {
              "name": "科学技术",
              "value": 69.29
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 83.28
            },
            {
              "name": "社会保障和就业",
              "value": 796.92
            },
            {
              "name": "卫生健康",
              "value": 419.1
            },
            {
              "name": "节能环保",
              "value": 129.52
            },
            {
              "name": "城乡社区",
              "value": 234.27
            },
            {
              "name": "农林水",
              "value": 806.88
            },
            {
              "name": "交通运输",
              "value": 276.88
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 1051.89,
          "income": [
            {
              "name": "增值税",
              "value": 306.18
            },
            {
              "name": "企业所得税",
              "value": 84.58
            },
            {
              "name": "个人所得税",
              "value": 24.94
            },
            {
              "name": "其他税收",
              "value": 267.16
            },
            {
              "name": "专项收入",
              "value": 75.9
            },
            {
              "name": "行政事业性收费",
              "value": 46.36
            },
            {
              "name": "罚没收入",
              "value": 51.49
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 159.83
            },
            {
              "name": "其他非税收入",
              "value": 35.45
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        }
      ]
    },
    "海南": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 413
        },
        {
          "name": "非税收入",
          "value": 97.5
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 71.31874433489335,
        "interest": 2.5,
        "debt": 184.78607149472126,
        "land": 25.959020181790173
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 5783.13,
          "denominator": 8108.85,
          "components": {
            "generalDebt": 2048.57,
            "specialDebt": 3734.56
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "海南省"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 2.5,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://www.shibor.org/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3259359&mode=save&priority=0",
          "numerator": 4988.3,
          "denominator": 2699.5,
          "unit": "亿元",
          "formula": "地方政府债务余额／（两本预算本级收入＋中央两本预算补助）×100",
          "sourceLocator": "海南省政府债券2025年度跟踪评级报告，表4，2024年度；2025年基金349.02与362.3口径差异未确认，保留已确认2024年"
        },
        "land": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 337,
          "denominator": 1298.2,
          "unit": "亿元",
          "additionalSources": [
            "https://www.shibor.org/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3259359&mode=save&priority=0"
          ],
          "numeratorPrecision": 0,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "粤开证券第14页图9已披露数值标签；分母同2024年"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://mof.hainan.gov.cn/sczt/00108/202607/83badd57d69a4e24ab62049c238ccec9.shtml",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.shibor.org/dqs/cm-s-notice-query/fileDownLoad.do?contentId=3259359&mode=save&priority=0",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "taxRevenue": 413,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://mof.hainan.gov.cn/sczt/00108/202607/83badd57d69a4e24ab62049c238ccec9.shtml"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://mof.hainan.gov.cn/sczt/00108/202607/83badd57d69a4e24ab62049c238ccec9.shtml"
      },
      "totals": {
        "revenue": 510.5,
        "expenditure": 1174.2
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://mof.hainan.gov.cn/sczt/00108/202607/83badd57d69a4e24ab62049c238ccec9.shtml"
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 2293.21,
          "expense": [
            {
              "name": "教育",
              "value": 362.4
            },
            {
              "name": "科学技术",
              "value": 65.13
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 41.1
            },
            {
              "name": "社会保障和就业",
              "value": 370.42
            },
            {
              "name": "卫生健康",
              "value": 212.31
            },
            {
              "name": "节能环保",
              "value": 37.33
            },
            {
              "name": "城乡社区",
              "value": 168.46
            },
            {
              "name": "农林水",
              "value": 300.09
            },
            {
              "name": "交通运输",
              "value": 101.08
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "宁夏": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 52.40191767211038,
        "interest": 3.1801086920806645,
        "land": 13.318370132032713,
        "tax": 6.800729923163211,
        "debt": 149.80087990521767
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 2985.07,
          "denominator": 5696.49,
          "components": {
            "generalDebt": 1853.3,
            "specialDebt": 1131.77
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "宁夏回族自治区"
        },
        "interest": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
          "numerator": 56.5217,
          "denominator": 1777.3512,
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "sourceLocator": "第6、9页，全区2025年完成数；排除发行费用"
        },
        "land": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
          "numerator": 85.9397,
          "denominator": 645.2719,
          "formula": "国有土地使用权出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "第5、104、107页，全区2025年完成数；基金收入采用收入合计，包含专项债对应项目收入"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
          "numerator": 387.4029,
          "denominator": 5696.49,
          "sourceLocator": "第5页，2025年全区地方一般公共预算收入完成数",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
          "numerator": 2985.07,
          "denominator": 1992.6919,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 645.2719,
            "generalTransfers": 1149.19,
            "specialTransfers": 101.08,
            "fundTransfers": 97.15
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://czt.nx.gov.cn/zwgk/zfxxgkml/czsz/202607/t20260706_5281716.html",
        "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "totals": {
        "revenue": 289.34,
        "expenditure": 940.73
      },
      "budgetEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/czsz/202607/t20260706_5281716.html",
        "sourceLocator": ""
      },
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 1768.5,
          "expense": [
            {
              "name": "教育",
              "value": 225.39
            },
            {
              "name": "科学技术",
              "value": 29.06
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 25.04
            },
            {
              "name": "社会保障和就业",
              "value": 312.41
            },
            {
              "name": "卫生健康",
              "value": 126.88
            },
            {
              "name": "节能环保",
              "value": 72.56
            },
            {
              "name": "城乡社区",
              "value": 137.15
            },
            {
              "name": "农林水",
              "value": 312.14
            },
            {
              "name": "交通运输",
              "value": 108.39
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 516.59,
          "income": [
            {
              "name": "增值税",
              "value": 153.05
            },
            {
              "name": "企业所得税",
              "value": 36.24
            },
            {
              "name": "个人所得税",
              "value": 15.64
            },
            {
              "name": "其他税收",
              "value": 154.01
            },
            {
              "name": "专项收入",
              "value": 42.89
            },
            {
              "name": "行政事业性收费",
              "value": 20.33
            },
            {
              "name": "罚没收入",
              "value": 15.74
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 57.83
            },
            {
              "name": "其他非税收入",
              "value": 20.86
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 540.5747,
          "income": [
            {
              "name": "增值税",
              "value": 162.1424
            },
            {
              "name": "企业所得税",
              "value": 41.9738
            },
            {
              "name": "个人所得税",
              "value": 18.5174
            },
            {
              "name": "资源税",
              "value": 28.5092
            },
            {
              "name": "其他税收",
              "value": 136.2601
            },
            {
              "name": "专项收入",
              "value": 41.6353
            },
            {
              "name": "行政事业性收费",
              "value": 21.1024
            },
            {
              "name": "罚没收入",
              "value": 14.5273
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 52.9839
            },
            {
              "name": "政府住房基金收入",
              "value": 10.6636
            },
            {
              "name": "其他非税收入",
              "value": 12.2593
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
            "sourceLocator": "第5页，2025年全区地方一般公共预算收入完成数"
          },
          "expenditure": 1777.3512,
          "expense": [
            {
              "name": "一般公共服务",
              "value": 119.3835
            },
            {
              "name": "公共安全",
              "value": 76.7919
            },
            {
              "name": "教育",
              "value": 236.7744
            },
            {
              "name": "科学技术",
              "value": 30.8586
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 27.1107
            },
            {
              "name": "社会保障和就业",
              "value": 337.4741
            },
            {
              "name": "卫生健康",
              "value": 147.5952
            },
            {
              "name": "节能环保",
              "value": 64.0669
            },
            {
              "name": "城乡社区",
              "value": 105.6713
            },
            {
              "name": "农林水",
              "value": 259.2902
            },
            {
              "name": "交通运输",
              "value": 108.8144
            }
          ],
          "expenseEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://czt.nx.gov.cn/zwgk/zfxxgkml/zfyjs/202602/W020260317406146760572.pdf",
            "sourceLocator": "第6—9页，2025年全区完成数，其他为剩余功能分类"
          }
        }
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    },
    "青海": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [],
      "expense": [],
      "metrics": {
        "liability": 92.83645168177318,
        "spread": 142,
        "tax": 6.174426954952157,
        "interest": 3.8,
        "debt": 168.39110555660682,
        "land": 5.333979876348648
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 3826.57,
          "denominator": 4121.84,
          "components": {
            "generalDebt": 2835.51,
            "specialDebt": 991.06
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "青海省"
        },
        "spread": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
          "sourceLocator": "报告印刷第6页表3，不分等级／25年利差列；第5页注2",
          "unit": "BP",
          "methodology": "区域城投信用利差年度均值；以同期限国开债收益率为基准；中债资信城投分类"
        },
        "tax": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://finance.sina.com.cn/jjxw/2026-02-10/doc-inhmheyx8863180.shtml",
          "numerator": 254.5,
          "denominator": 4121.84,
          "sourceLocator": "青海日报全文刊载财政厅预算报告，全省2025年执行数",
          "formula": "地方税收收入／同年地区生产总值×100",
          "denominatorPeriod": "2025年",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 3.8,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.sfecr.com/upload/file/2026-03/col155/1773057678703.pdf",
          "numerator": 3826.57,
          "denominator": 2272.43,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 412.45,
            "generalTransfers": 1606.09,
            "specialTransfers": 142.14,
            "fundTransfers": 111.75
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 22,
          "denominator": 412.45,
          "unit": "亿元",
          "numeratorPrecision": 0,
          "additionalSources": [
            "https://www.sfecr.com/upload/file/2026-03/col155/1773057678703.pdf"
          ],
          "sourceLocator": "粤开证券2026-04-06报告，第15页图10数值标签；分母为同年两本预算本级收入",
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100"
        }
      },
      "sources": [
        "https://m.sohu.com/a/1059712869_114986",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://finance.sina.com.cn/jjxw/2026-02-10/doc-inhmheyx8863180.shtml",
        "https://www.chinaratings.com.cn/upload/docs/2026-02-12/doc_5371770859024.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.sfecr.com/upload/file/2026-03/col155/1773057678703.pdf",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "missing": [
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 2164.05,
          "expense": [
            {
              "name": "教育",
              "value": 232.08
            },
            {
              "name": "科学技术",
              "value": 10.22
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 36.01
            },
            {
              "name": "社会保障和就业",
              "value": 353.73
            },
            {
              "name": "卫生健康",
              "value": 180.47
            },
            {
              "name": "节能环保",
              "value": 95.26
            },
            {
              "name": "城乡社区",
              "value": 195.64
            },
            {
              "name": "农林水",
              "value": 282.93
            },
            {
              "name": "交通运输",
              "value": 187.58
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          },
          "revenue": 370.45,
          "income": [
            {
              "name": "增值税",
              "value": 99.49
            },
            {
              "name": "企业所得税",
              "value": 39.48
            },
            {
              "name": "个人所得税",
              "value": 10.64
            },
            {
              "name": "其他税收",
              "value": 113.97
            },
            {
              "name": "专项收入",
              "value": 18.27
            },
            {
              "name": "行政事业性收费",
              "value": 12.28
            },
            {
              "name": "罚没收入",
              "value": 18.05
            },
            {
              "name": "国有资源（资产）有偿使用收入",
              "value": 39.43
            },
            {
              "name": "其他非税收入",
              "value": 18.84
            }
          ],
          "incomeEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-05.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-5；其他非税包括国有资本经营与其他收入"
          }
        },
        {
          "period": "2025年",
          "revenue": 354.9,
          "income": [
            {
              "name": "税收收入",
              "value": 254.5
            },
            {
              "name": "非税收入",
              "value": 100.4
            }
          ],
          "incomeEvidence": {
            "period": "2025年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://finance.sina.com.cn/jjxw/2026-02-10/doc-inhmheyx8863180.shtml",
            "sourceLocator": "青海日报全文刊载财政厅预算报告，全省2025年执行数"
          }
        }
      ]
    },
    "西藏": {
      "period": "2026年上半年",
      "scope": "全省",
      "budget": "地方一般公共预算",
      "income": [
        {
          "name": "税收收入",
          "value": 126.81
        },
        {
          "name": "非税收入",
          "value": 81.78
        }
      ],
      "expense": [],
      "metrics": {
        "liability": 49.144922803927585,
        "interest": 0.5,
        "debt": 47.164621311158875,
        "land": 10.754388739522378
      },
      "metricEvidence": {
        "liability": {
          "period": "2025年",
          "scope": "全省",
          "source": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm"
          ],
          "numerator": 1490.02,
          "denominator": 3031.89,
          "components": {
            "generalDebt": 569.97,
            "specialDebt": 920.05
          },
          "formula": "年末一般债务与专项债务余额之和／全年地区生产总值×100",
          "gdpSource": "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
          "sourceLocator": "财政部2025年分地区决算；GDP见评级报告第9页",
          "geographicCoverage": "西藏自治区"
        },
        "interest": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
          "reportedValue": 0.5,
          "precision": 1,
          "sourceLocator": "天风证券《化债周期下，付息压力的再均衡》图2，2025年一般债券付息支出／一般公共预算支出，无虚线框的已披露单元格",
          "formula": "一般债务付息支出／一般公共预算支出×100",
          "estimated": false
        },
        "debt": {
          "scope": "全省",
          "period": "2025年",
          "source": "https://www.xizang.gov.cn/xwzx_406/bmkx/202602/t20260216_525450.html",
          "numerator": 1490.02,
          "denominator": 3159.19,
          "unit": "亿元",
          "components": {
            "localGeneralAndFundRevenue": 358.90000000000003,
            "generalTransfers": 2337.09,
            "specialTransfers": 409.43,
            "fundTransfers": 53.77
          },
          "additionalSources": [
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
            "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm"
          ],
          "debtSource": "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
          "formula": "地方政府债务余额／（地方一般公共预算收入＋政府性基金收入＋中央一般性转移支付＋中央专项转移支付＋中央政府性基金转移支付）×100",
          "sourceLocator": "2025年全省执行收入；中央转移支付采用财政部分地区2025年决算数，含计划单列市，不含省内重复转移",
          "methodology": "两本预算本级收入与中央补助口径；不计债务融资收入"
        },
        "land": {
          "period": "2024年",
          "scope": "全省",
          "source": "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf",
          "numerator": 34,
          "denominator": 316.15,
          "unit": "亿元",
          "additionalSources": [
            "https://www.xizang.gov.cn/zwgk/xxgk_424/zxxxgk/202604/W020260420776686123444.pdf"
          ],
          "numeratorPrecision": 0,
          "formula": "土地出让收入／（地方一般公共预算收入＋政府性基金收入）×100",
          "sourceLocator": "同2024年；土地收入为粤开证券第14页图9数值标签，辽宁为评级报告表7"
        }
      },
      "sources": [
        "https://www.xizang.gov.cn/xwzx_406/bmkx/202607/t20260721_550738.html",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997523.htm",
        "https://yss.mof.gov.cn/2025zyjs/202609/t20260916_3997518.htm",
        "https://static.sse.com.cn/disclosure/bond/announcement/company/c/new/2026-09-10/246049_20260910_63P4.pdf",
        "https://finance.sina.com.cn/wm/2026-07-15/doc-inihwezk1193764.shtml",
        "https://www.xizang.gov.cn/xwzx_406/bmkx/202602/t20260216_525450.html",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993593.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993592.htm",
        "https://yss.mof.gov.cn/2025zyjs/202607/t20260715_3993579.htm",
        "https://pdf.dfcfw.com/pdf/H3_AP202604061821031738_1.pdf"
      ],
      "enterprises": {
        "private": {
          "grade": null,
          "approved": false
        },
        "state": {
          "grade": null,
          "approved": false
        }
      },
      "researchStatus": "已按全省同期间补充指标；收支分类支持最近完整年度回退",
      "totalEvidence": {
        "revenue": 208.59,
        "expenditure": 1601.36,
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://m.sohu.com/a/1059712869_114986"
      },
      "taxRevenue": 126.81,
      "taxEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "source": "https://www.xizang.gov.cn/xwzx_406/bmkx/202607/t20260721_550738.html",
        "numerator": "地方税收收入",
        "denominator": "地区生产总值",
        "gdpSource": "https://gdp.gotohui.com/list/191619.html"
      },
      "incomeEvidence": {
        "period": "2026年上半年",
        "scope": "全省",
        "budget": "地方一般公共预算",
        "source": "https://www.xizang.gov.cn/xwzx_406/bmkx/202607/t20260721_550738.html"
      },
      "prices": {
        "cpi": 0.7,
        "period": "2026年6月",
        "scope": "全省",
        "source": "https://www.xizang.gov.cn/xwzx_406/bmkx/202607/t20260721_550738.html"
      },
      "missing": [
        "城投债信用利差",
        "三年税收与非税趋势",
        "分所有制企业评级确认"
      ],
      "annualBudgets": [
        {
          "period": "2024年",
          "expenditure": 2919.62,
          "expense": [
            {
              "name": "教育",
              "value": 333.63
            },
            {
              "name": "科学技术",
              "value": 11.99
            },
            {
              "name": "文化旅游体育与传媒",
              "value": 71.42
            },
            {
              "name": "社会保障和就业",
              "value": 269.62
            },
            {
              "name": "卫生健康",
              "value": 172.89
            },
            {
              "name": "节能环保",
              "value": 77.03
            },
            {
              "name": "城乡社区",
              "value": 181.67
            },
            {
              "name": "农林水",
              "value": 424.97
            },
            {
              "name": "交通运输",
              "value": 463.62
            }
          ],
          "expenseEvidence": {
            "period": "2024年",
            "scope": "全省",
            "budget": "地方一般公共预算",
            "source": "https://www.stats.gov.cn/sj/ndsj/2025/html/C07-06.jpg",
            "sourceLocator": "中国统计年鉴2025，表7-6，按地区全口径；其他为总额减已列分类"
          }
        }
      ],
      "metricGaps": {
        "spread": "未取得与已使用的全等级、同期限国开债基准、全年平均利差可比的省级统计值；不以某一等级或发行利差代替"
      }
    }
  }
};
