/* The map and the China society editor share the eight authored records. */
(function (root) {
  const ids = new Map([
    ['威权社会主义-右派', 'right'], ['威权社会主义-左派', 'left'],
    ['威权社会主义-中间派', 'center'], ['毛泽东思想-新左派', 'mao'],
    ['民主社会主义-泛左派', 'dem'], ['自由主义-反对派', 'lib'],
    ['民粹主义', 'pop'], ['极端民族主义', 'nation']
  ]);
  // Read only the society section, with the same defaults and validation as the editor.
  const base = {thoughts:[], countries:{}, provinces:{}, regions:[], orgs:[]};
  let previous, config;
  function society() {
    let saved = null;
    try { saved = root.localStorage.getItem('tno-china-v2-editor'); } catch {}
    if (!config || previous !== saved) {
      try { config = root.readChinaConfig(JSON.parse(saved), base); }
      catch { config = root.readChinaConfig(null, base); }
      previous = saved;
    }
    return config;
  }
  function has(iso, label) { return iso === 'CHN' && ids.has(label); }
  function get(iso, label) {
    if (!has(iso, label)) return null;
    const data = society();
    const thought = data.thoughts.find(item => item.id === ids.get(label));
    if (!thought) return null;
    const render = root.ChinaText.render;
    const field = key => render(thought[key], thought.textColors?.[key]);
    const section = key => render(data.societyUI[key], data.societyUI.textColors?.[key]);
    return {
      name: thought.name,
      titleHTML: field('name'),
      bodyHTML: '<div class="thought-passages"><h4>'+section('roots')+'</h4><p>'+field('roots')+
        '</p><h4>'+section('positions')+'</h4><p>'+field('positions')+'</p>'+
        (thought.quote ? '<blockquote><p>'+field('quote')+'</p>'+
          (thought.quoteSource ? '<cite>——'+field('quoteSource')+'</cite>' : '')+'</blockquote>' : '')+'</div>'
    };
  }
  root.NexusChinaThoughts = {has, get};
})(window);
