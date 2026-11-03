const fs=require('fs');
const path=require('path');
const R=require('resedit');
module.exports=async context=>{
  if(context.electronPlatformName!=='win32')return;
  const target=path.join(context.appOutDir,'The Nexus Order.exe');
  const exe=R.NtExecutable.from(fs.readFileSync(target),{ignoreCert:true});
  const resources=R.NtExecutableResource.from(exe);
  const icon=R.Data.IconFile.from(fs.readFileSync(path.join(context.packager.projectDir,'build/icon.ico')));
  const groups=resources.entries.filter(e=>e.type===14);
  for(const g of groups)R.Resource.IconGroupEntry.replaceIconsForResource(resources.entries,g.id,g.lang,icon.icons.map(i=>i.data));
  if(!groups.length)R.Resource.IconGroupEntry.replaceIconsForResource(resources.entries,1,1033,icon.icons.map(i=>i.data));
  resources.outputResource(exe);
  fs.writeFileSync(target,Buffer.from(exe.generate()));
};
