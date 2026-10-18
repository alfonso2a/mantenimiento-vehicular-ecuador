/*
 * Reminder filtering and aggregate-label flow adapted from LubeLogger:
 * hargata/lubelog, wwwroot/js/reminderrecord.js
 * filterReminderTable / updateReminderAggregateLabels
 * Source revision: 63fa5cd267497ba01c29f4888c65efbbdd4b94bf
 * Copyright (c) 2024 Hargata Softworks. MIT License.
 * See LICENSE-LUBELOGGER.txt and THIRD_PARTY_NOTICES.md.
 * Adaptations: native DOM, Spanish labels, explicit state attributes, local data.
 */
(function(root){
 'use strict';
 function classify(v,nextDate,today){
  const leftKm=v.lastKm+v.intervalKm-v.odometer;
  const days=Math.round((Date.parse(nextDate+'T12:00:00Z')-Date.parse(today+'T12:00:00Z'))/86400000);
  const leadKm=v.leadKm??1000,leadDays=v.leadDays??30;
  const status=leftKm<=0||days<=0?'Vencido':leftKm<=leadKm||days<=leadDays?'Próximo':'Programado';
  return {leftKm,days,status};
 }
 function updateReminderAggregateLabels(container){
  const rows=[...container.querySelectorAll('[data-reminder-status]')];
  const counts={Todos:rows.length,Vencido:0,Próximo:0,Programado:0};
  rows.forEach(row=>counts[row.dataset.reminderStatus]++);
  container.querySelectorAll('[data-aggregate-status]').forEach(label=>{
   label.textContent=counts[label.dataset.aggregateStatus]??0;
  });
  const visible=rows.filter(row=>!row.hidden).length;
  const label=container.querySelector('[data-aggregate-visible]');
  if(label)label.textContent=`${visible} de ${rows.length} vehículos`;
  return counts;
 }
 function filterReminderTable(state,container){
  container.querySelectorAll('[data-reminder-status]').forEach(row=>{
   row.hidden=state!=='Todos'&&row.dataset.reminderStatus!==state;
  });
  container.querySelectorAll('[data-reminder-filter]').forEach(button=>{
   const active=button.dataset.reminderFilter===state;
   button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));
  });
  return updateReminderAggregateLabels(container);
 }
 root.Maintenance={classify,updateReminderAggregateLabels,filterReminderTable};
})(window);
