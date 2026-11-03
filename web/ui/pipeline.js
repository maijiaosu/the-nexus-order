(function () {
  'use strict';
  function mount() {
    const remote = !!window.NexusData?.readStatus;
    const local = !remote && location.hostname === '127.0.0.1';
    const button = document.createElement('button');
    button.id = 'pipeline-toggle'; button.textContent = '数据管线';
    const panel = document.createElement('section');
    panel.id = 'pipeline-panel'; panel.hidden = true;
    panel.setAttribute('aria-label', '数据管线控制台');
    const stages = ['RSS 采集', '新闻归类', '正文抓取', '标题与摘要翻译', '正文翻译', '国家天气', '省州天气', '股指与汇率', '写入本地快照', '完成检查'];
    const shortStages = ['接收信源', '归类筛选', '提取正文', '标题汉化', '正文汉化', '国家气象', '省州气象', '市场行情', '写入档案', '发布检查'];
    panel.innerHTML = `<header><div><h2>全球情报接收站 <span>数据管线</span></h2></div><button id="pipeline-close" aria-label="关闭数据管线"></button></header>
      <div class="pipeline-station"><aside class="pipeline-receiver">
        <div class="pipeline-caption">接收设备</div><img class="pipeline-radio" src="ui/pipeline-assets/radio-station.png" alt="TNO 原版无线电接收设备档案图">
        <dl class="pipeline-readouts"><div><dt>信源接通</dt><dd id="pipeline-feeds">— / —</dd></div><div><dt>重试恢复</dt><dd id="pipeline-recovered">0</dd></div><div><dt>未接通信源</dt><dd id="pipeline-unavailable">—</dd></div></dl>
        <div class="pipeline-caption">接收异常</div><div id="pipeline-source-errors">尚未运行</div>
      </aside><div class="pipeline-console">
        <div class="pipeline-instruments"><div><div id="pipeline-status" role="status">正在连接本地服务…</div><div id="pipeline-stage">等待启动</div></div><div class="pipeline-clock"><small>运行时长</small><time id="pipeline-time">00:00</time></div></div>
        <ol class="pipeline-stages">${shortStages.map((name, i) => `<li data-stage="${i}"><b>${String(i+1).padStart(2,'0')}</b>${name}</li>`).join('')}</ol>
        <div class="pipeline-progress" aria-label="已进入的处理阶段"><i id="pipeline-progress-fill"></i></div>
        <p id="pipeline-summary"></p>
        <div class="pipeline-log-heading"><span>接收记录</span><label><input id="pipeline-raw" type="checkbox">完整事件</label></div>
        <pre id="pipeline-log" aria-label="运行日志">等待运行日志</pre>
      </div></div>
      <div class="pipeline-actions"><button id="pipeline-start" disabled>运行管线</button><label><input id="pipeline-publish" type="checkbox"> 同步远程 Gist</label><a id="pipeline-download" href="/api/pipeline/log" download>导出运行记录</a></div>
      `;
    document.body.append(button, panel);
    const get = id => document.getElementById('pipeline-' + id);
    button.onclick = () => { panel.hidden = !panel.hidden; if (!panel.hidden) { get('close').focus(); get('log').scrollTop = get('log').scrollHeight; } };
    get('close').onclick = () => { panel.hidden = true; button.focus(); };
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') get('close').click(); });
    let token, state, lastCompleted, pending = false;
    const labels = {idle: '待机', running: '运行中', succeeded: '成功', warning: '完成 · 有警告', failed: '失败', timeout: '超时', interrupted: '已中断'};
    function duration(seconds) {
      seconds = Math.max(0, Math.floor(seconds));
      return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
    }
    function render(data) {
      state = data; token = data.token;
      const feeds = Object.values((data.health || {}).feeds || {});
      const failed = feeds.filter(f => f.status !== 'ok');
      get('feeds').textContent = `${feeds.filter(f => f.status === 'ok').length} / ${data.result?.feed_total || 49}`;
      get('recovered').textContent = data.recovered || 0;
      get('unavailable').textContent = feeds.length ? failed.length : '—';
      get('source-errors').textContent = failed.map(f => `${f.key} · ${f.status === 'blocked' ? '访问受限' : f.status === 'empty' ? '无条目' : '连接失败'}`).join('\n') || (feeds.length ? '已返回的信源暂无异常' : '等待信源返回');
      const stageIndex = data.status === 'succeeded' || data.status === 'warning' || data.stage.includes('推送远程') ? stages.length - 1 : stages.findIndex(s => (data.last_stage || data.stage).includes(s));
      panel.querySelectorAll('[data-stage]').forEach((el, i) => {
        el.dataset.state = i === stageIndex ? 'current' : i < stageIndex ? 'done' : 'pending';
        if (i === stageIndex) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      });
      get('progress-fill').style.width = `${Math.max(0, stageIndex + 1) / stages.length * 100}%`;
      get('status').textContent = labels[data.status] || data.status;
      get('status').dataset.state = data.status;
      get('stage').textContent = data.stage;
      get('time').textContent = duration(data.elapsed);
      get('start').disabled = pending || data.status === 'running';
      get('publish').disabled = data.status === 'running';
      get('start').textContent = data.status === 'running' ? '运行中…' : '运行管线';
      get('download').hidden = !data.run_id;
      const log = get('log'), bottom = log.scrollHeight - log.scrollTop - log.clientHeight < 50;
      const text = (data.logs || []).filter(line => get('raw').checked || !line.includes('[event]')).join('\n') || '等待运行日志';
      if (log.textContent !== text) { log.textContent = text; if (bottom) log.scrollTop = log.scrollHeight; }
      const r = data.result;
      const weather = data.health?.summary?.weather;
      const full = data.health?.summary?.fulltext;
      const translation = data.health?.summary?.translation;
      get('summary').textContent = r ? `${r.countries} 个国家 · ${r.news} 条新闻 · ${r.temps} 个天气点 · ${r.markets} 个股指` : `${data.warnings || 0} 条未恢复告警 · ${data.recovered || 0} 次网络重试已恢复`;
      if (weather) get('summary').textContent += `\n气象：${weather.fresh}/${weather.total} 新采集，${weather.retained} 条沿用近期数据`;
      if (full) get('summary').textContent += `\n正文：${full.translated} 篇中文（${full.cached || 0} 篇缓存），${full.original} 篇原文`;
      if (translation?.status === 'rate_limited') get('summary').textContent += `\n翻译限流 · 冷却至 ${new Date(translation.retry_at * 1000).toLocaleTimeString('zh-CN')}，已有译文仍可使用`;
      if (r && data.status !== 'running' && lastCompleted !== data.run_id) {
        lastCompleted = data.run_id;
        fetch('live.js?_=' + Date.now()).then(r => r.text()).then(text => {
          const match = /GEO_LIVE\s*=\s*(\{[\s\S]*\})\s*;?\s*$/.exec(text);
          if (match && typeof window.applyData === 'function') {
            window.GEO_LIVE = JSON.parse(match[1]); window.applyData({main: window.GEO_LIVE});
          }
        }).catch(() => {});
      }
    }
    if (remote) {
      panel.querySelector('.pipeline-stages').style.display='none';
      panel.querySelector('.pipeline-progress').style.display='none';
      panel.querySelector('.pipeline-clock').style.display='none';
      const stateNames={pending:'排队',running:'运行中',done:'运行结束',retry:'等待重试',waiting:'等待新证据',held:'试跑已停止',interrupted:'运行中断'};
      const fieldNames={leader:'现任人物','leader.photo':'人物照片',party:'执政党',gov:'政治体制',econ:'经济描述',elec:'选举',parl:'议会',al:'参与联盟',rel:'国家关系',cls:'体制分类',pie:'意识形态估计',flag:'国旗'};
      function outcome(result) {
        if(!result)return '尚无结果';
        if(result.countries!==undefined && result.news!==undefined)return result.countries+' 个国家 · '+result.news+' 条新闻';
        if(result.stage==='dispatched')return '已分发 '+result.countries+' 个国家的检查任务，资料审核尚未完成';
        if(result.stage==='official_election_facts')return '脚本采集 '+result.lists+' 份参选名单 · '+(result.result_status==='preliminary'?'初步结果':'正式结果')+' · AI 调用 0 次\n'+(result.changed?'发现资料变化，已交给影响评估':'资料无变化，未重复申请评估');
        if(result.reviewed_fields){
          const lines=['采纳 '+(result.accepted||0)+' 项变更 · '+(result.verification_complete?'本项核实通过':'本项尚未全部核实')];
          lines.push(...result.reviewed_fields.map(x=>(fieldNames[x.field]||x.field)+'：'+({verified:'已核实',estimate:'有依据的估计',unresolved:'待证据'}[x.status]||x.status)));
          if(result.fallback_error)lines.push('后备处理：'+result.fallback_error);
          if(result.validation_error)lines.push('检查未通过：'+result.validation_error);
          return lines.join('\n');
        }
        if(result.pending_images?.length)return '图片仍待补取 '+result.pending_images.length+' 项';
        if(result.verification_complete===false)return '来源比对或任务分发结束；不代表资料已经核实';
        return JSON.stringify(result);
      }
      let exportUrl;
      get('start').style.display='none'; get('publish').closest('label').style.display='none'; get('download').hidden = false;
      async function remotePoll() {
        try {
          const report = await window.NexusData.readStatus();
          const issues = Object.entries(report.issues || {}), jobs = report.jobs || [];
          if(exportUrl)URL.revokeObjectURL(exportUrl);
          exportUrl=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));
          get('download').href=exportUrl;get('download').download='nexus-run-records.json';
          get('raw').onchange=()=>{get('log').textContent=get('raw').checked?JSON.stringify(report,null,2):formattedLog;};
          let formattedLog='';
          get('status').textContent = report.research_pause ? '采集运行 · 资料审核暂停' : issues.length ? '服务器运行 · 有待处理项' : '服务器自动运行';
          get('status').dataset.state = issues.length || report.research_pause ? 'warning' : 'succeeded';
          const last = report.last_success?.daily;
          get('stage').textContent = last ? '最近日更：' + new Date(last*1000).toLocaleString('zh-CN') : '等待首次日更';
          const feeds=Object.values(report.health || {});
          get('feeds').textContent=feeds.filter(x=>x.status==='ok').length+' / '+feeds.length;
          get('unavailable').textContent=feeds.filter(x=>x.status!=='ok').length;
          get('source-errors').textContent=issues.map(([key,item])=>key+' · '+item.message).join('\n') || '暂无持续故障';
          get('summary').textContent='用量计价估算 ¥'+(report.spend||[]).reduce((n,x)=>n+(x.cny||0),0).toFixed(2)+'（非官网账单） · 待处理 '+jobs.filter(x=>['pending','retry'].includes(x.state)).reduce((n,x)=>n+x.n,0)+' 项';
          const reserved=(report.spend||[]).reduce((n,x)=>n+(x.reserved_cny||0),0);
          if(reserved)get('summary').textContent+='\n请求预留上限 ¥'+reserved.toFixed(2)+'（尚未结算，未计入上面的费用）';
          get('summary').textContent+='\n周度审核 '+(report.weekly_review?.completed??'—')+' / '+(report.weekly_review?.queued??'—')+' 项通过 · '+(report.weekly_review?.waiting??0)+' 项待证据'+(report.research_pause?' · 付费审核已暂停':'');
          formattedLog=jobs.map(x=>x.kind+' · '+x.state+' · '+x.n).join('\n')+'\n\n'+(report.recent_jobs||[]).map(x=>'#'+x.id+' '+({weekly:'周更任务分发',check:'来源比对',research:'资料审核',daily:'日更',economy:'经济采集',politics:'政治资料采集'}[x.kind]||x.kind)+(x.country?' · '+x.country:'')+' · '+(stateNames[x.state]||x.state)+' · 尝试 '+x.attempts+'\n'+(x.started?new Date(x.started*1000).toLocaleString('zh-CN'):'无开始时间')+'\n'+(x.error||outcome(x.result))).join('\n\n');
          if(report.recent_attempts?.length)formattedLog+='\n\n逐次运行记录\n'+report.recent_attempts.map(x=>'#'+x.job_id+' · 第 '+x.number+' 次 · '+(stateNames[x.state]||x.state)+' · ¥'+(x.cost_cny||0).toFixed(4)+'\n'+new Date(x.started*1000).toLocaleString('zh-CN')+' → '+(x.ended?new Date(x.ended*1000).toLocaleString('zh-CN'):'运行中')+'\n'+(x.error||outcome(x.result))).join('\n\n');
          get('log').textContent=get('raw').checked?JSON.stringify(report,null,2):formattedLog;
          get('summary').textContent+='\n急报来源 '+(report.sniff?.ok??'—')+' / '+(report.sniff?.total??'—')+' · 状态时间 '+new Date(report.updated_at*1000).toLocaleString('zh-CN');
        } catch(e) { get('status').textContent='服务器暂时未连接';get('stage').textContent='继续使用本地缓存'; }
        setTimeout(()=>{if(!panel.hidden)remotePoll();else remoteWaiting=true;},15000);
      }
      let remoteWaiting=true;
      const original=button.onclick;button.onclick=()=>{original();if(!panel.hidden && remoteWaiting){remoteWaiting=false;remotePoll();}};
      get('status').textContent='等待连接服务器';get('stage').textContent='打开面板时读取服务器状态';
      return;
    }
    get('raw').onchange = () => { if (state) render(state); };
    async function poll() {
      try {
        const response = await fetch('/api/pipeline', {cache: 'no-store', signal: AbortSignal.timeout(4000)});
        if (!response.ok) throw new Error('服务未连接');
        render(await response.json());
      } catch (_) {
        get('status').textContent = '本地服务未连接'; get('status').dataset.state = 'failed';
        get('stage').textContent = '在 dist 文件夹双击「Open Data Console.command」后，从打开的页面运行。';
        get('start').disabled = true;
      }
      setTimeout(poll, 1000);
    }
    get('start').onclick = async () => {
      pending = true; get('start').disabled = true;
      try {
        const response = await fetch('/api/pipeline/start', {method: 'POST',
          headers: {'Content-Type': 'application/json', 'X-Pipeline-Token': token},
          body: JSON.stringify({publish: get('publish').checked}), signal: AbortSignal.timeout(5000)});
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || '启动失败');
      } catch (e) { get('status').textContent = e.message; }
      finally { pending = false; }
    };
    if (local) poll();
    else {
      get('status').textContent = '需要本地运行服务';
      get('stage').textContent = '在 dist 文件夹双击「Open Data Console.command」，随后在页面点击「运行管线」。';
      get('summary').textContent = '纯静态网页无法启动电脑上的 Python。请双击项目中的「Launch The Nexus Order.command」打开本地服务。';
      get('download').hidden = true;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
