/* Service-log workflow informed by LubeLogger service records.
 * This browser-local implementation is original. See THIRD_PARTY_NOTICES.md.
 */
(function(root){
 'use strict';
 const storageKey='ruta-preventiva-servicios-v1',el=id=>document.getElementById(id);
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dollars=new Intl.NumberFormat('es-EC',{style:'currency',currency:'USD'});
 let entries=[],vehicles=[],removedEntry=null,storageError=false;
 function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;}
 function valid(r){return !!r&&['id','vehicleId','plate','model','service','date','shop','notes'].every(k=>typeof r[k]==='string')&&r.id.length>0&&r.id.length<=100&&r.vehicleId.length>0&&r.vehicleId.length<=100&&r.plate.length>0&&r.plate.length<=30&&r.model.length<=200&&r.service.trim().length>0&&r.service.length<=160&&r.shop.length<=160&&r.notes.length<=1500&&validDate(r.date)&&Number.isInteger(r.km)&&r.km>=0&&Number.isFinite(r.cost)&&r.cost>=0;}
 function validRecords(rows){return Array.isArray(rows)&&rows.length<=10000&&rows.every(valid)&&new Set(rows.map(r=>r.id)).size===rows.length;}
 try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(!validRecords(saved))throw new Error();entries=saved}catch(e){storageError=true;}
 function message(text){el('history-message').textContent=text;el('history-message').hidden=!text;}
 function persist(next){if(storageError){message('No se pudo leer el historial anterior. Importa una copia válida antes de guardar nuevos servicios.');return false}try{localStorage.setItem(storageKey,JSON.stringify(next));entries=next;render();return true}catch(e){message('No se pudo guardar el servicio. Exporta una copia y revisa el almacenamiento del navegador.');return false}}
 function refresh(nextVehicles){const old=el('history-vehicle').value,oldFilter=el('history-filter').value;vehicles=nextVehicles;el('history-vehicle').replaceChildren(new Option('Selecciona un vehículo',''),...vehicles.map(v=>new Option(v.plate+' · '+v.model,v.id)));el('history-vehicle').value=vehicles.some(v=>v.id===old)?old:'';const snapshots=new Map(entries.map(r=>[r.vehicleId,{plate:r.plate,model:r.model}]));vehicles.forEach(v=>snapshots.set(v.id,v));el('history-filter').replaceChildren(new Option('Todos los vehículos',''),...[...snapshots].map(([id,v])=>new Option(v.plate+' · '+v.model,id)));if(snapshots.has(oldFilter))el('history-filter').value=oldFilter;el('save-service').disabled=vehicles.length===0;el('history-empty-vehicles').hidden=vehicles.length>0;render();}
 function render(){
  const rows=entries.filter(r=>!el('history-filter').value||r.vehicleId===el('history-filter').value).sort((a,b)=>b.date.localeCompare(a.date)||b.km-a.km);
  el('history-count').textContent=String(rows.length);el('history-total').textContent=dollars.format(rows.reduce((n,r)=>n+r.cost,0));
  el('history-table').innerHTML=rows.length?rows.map(r=>`<tr><td><strong>${esc(r.plate)}</strong><small>${esc(r.model)}</small></td><td>${r.date.split('-').reverse().join('/')}</td><td>${esc(r.service)}${r.notes?'<small>'+esc(r.notes)+'</small>':''}</td><td>${new Intl.NumberFormat('es-EC').format(r.km)} km</td><td>${dollars.format(r.cost)}</td><td>${esc(r.shop)||'—'}</td><td><button class="text-button" data-remove-service="${esc(r.id)}">Retirar</button></td></tr>`).join(''):'<tr><td colspan="7">Todavía no hay servicios registrados para esta selección.</td></tr>';
  if(storageError)message('No se pudo leer el historial guardado. Los datos anteriores no se sobrescribirán. Restaura una copia válida.');
 }
 el('history-filter').addEventListener('change',render);
 el('service-form').addEventListener('submit',event=>{
  event.preventDefault();message('');const vehicle=vehicles.find(v=>v.id===el('history-vehicle').value);if(!vehicle){message('Primero agrega o selecciona un vehículo.');return}
  const r={id:crypto.randomUUID(),vehicleId:vehicle.id,plate:vehicle.plate,model:vehicle.model,service:el('service-name').value.trim(),date:el('service-date').value,km:Number(el('service-km').value),cost:Number(el('service-cost').value),shop:el('service-shop').value.trim(),notes:el('service-notes').value.trim()};
  if(!valid(r)){message('Revisa la fecha, el kilometraje, el servicio y el costo.');return}
  const now=new Date(),today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  if(r.date>today){message('La fecha de un servicio realizado no puede ser futura.');return}
  if(storageError){message('Restaura una copia válida antes de guardar nuevos servicios.');return}
  if(el('service-done').checked){
   if(r.date<vehicle.lastDate||r.km<vehicle.lastKm){message('Para actualizar el próximo mantenimiento, la fecha y el kilometraje no pueden ser anteriores al último servicio registrado.');return}
   const next=vehicles.map(v=>v.id===vehicle.id?{...v,lastDate:r.date,lastKm:r.km,odometer:Math.max(v.odometer,r.km)}:v);
   if(!root.RutaRecords.commit(next,[...entries,r]))return;
  }else if(!persist([...entries,r]))return;
  el('service-form').reset();refresh(vehicles);message('Servicio guardado. El historial y los costos ya están actualizados.');
 });
 el('history-table').addEventListener('click',event=>{const button=event.target.closest('[data-remove-service]');if(!button)return;const entry=entries.find(r=>r.id===button.dataset.removeService);if(entry&&persist(entries.filter(r=>r.id!==entry.id))){removedEntry=entry;el('undo-service').hidden=false;message('Servicio retirado del historial. Los intervalos del vehículo no se modificaron.')}});
 el('undo-service-button').addEventListener('click',()=>{if(removedEntry&&persist([...entries.filter(r=>r.id!==removedEntry.id),removedEntry])){removedEntry=null;el('undo-service').hidden=true;message('Servicio restaurado.')}});
 el('export-history').addEventListener('click',()=>{const rows=entries.filter(r=>!el('history-filter').value||r.vehicleId===el('history-filter').value);const cell=v=>'"'+String(v??'').replace(/^[=+@\-]/,"'$&").replace(/"/g,'""')+'"';const csv=[['Placa','Modelo','Fecha','Servicio','Kilometraje','Costo USD','Taller','Notas'],...rows.map(r=>[r.plate,r.model,r.date,r.service,r.km,r.cost,r.shop,r.notes])].map(r=>r.map(cell).join(';')).join('\r\n');const a=document.createElement('a'),url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));a.href=url;a.download='historial-mantenimiento.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 root.ServiceLog={storageKey,validRecords,refresh,getRecords(){if(storageError)throw new Error('El historial guardado necesita recuperarse antes de exportar.');return entries.map(r=>({...r}))},accept(rows){entries=rows;storageError=false;refresh(vehicles)},showError:message};
})(window);
