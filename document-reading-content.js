/* Practical tables reorganise details already taught in the connected sources. */
(()=>{'use strict';
const forms=window.WordamiFormContent;if(!forms)return;
const units={};
for(const [id,form] of Object.entries(forms.units)){
 const rows=form.variants.map(v=>({label:v.id==='original'?'Original details':'Changed / requested details',values:[...v.values],source:v.source,sourceKind:v.sourceKind}));
 const different=form.fields.map((f,i)=>i).filter(i=>rows[0].values[i]!==rows[1].values[i]);
 const same=form.fields.map((f,i)=>i).filter(i=>!different.includes(i));
 const choices=(value,i)=>[...new Set([value,...rows.map(r=>r.values[i]),...rows[0].values])];
 const question=(row,i)=>({prompt:'In the '+(row===0?'original':'changed / requested')+' details, what belongs under '+form.fields[i].label+'?',choices:choices(rows[row].values[i],i),answer:rows[row].values[i],explanation:form.fields[i].label+' means '+form.fields[i].meaning.toLowerCase()+'. Follow that column to the '+rows[row].label.toLowerCase()+' row.'});
 const changeLabel=different.map(i=>form.fields[i].meaning).join(' + ');
 const otherLabels=form.fields.map(f=>f.meaning);
 const comparison={prompt:'Compare the two rows. Which details change?',choices:[...new Set([changeLabel,...otherLabels,'None of the details'])],answer:changeLabel,explanation:'Changed fields: '+changeLabel+'. '+(same.length?'Unchanged: '+same.map(i=>form.fields[i].meaning).join(', ')+'.':'All three requested details differ.')};
 units[id]={id,title:form.title.replace(/ form$/,'')+' · read a table',note:form.note,fields:form.fields,rows,
  teaching:['A table gives meaning through both its headings and the position of each cell. Find the requested column before following its row.','The row labels distinguish original details from the changed or requested details. A proposed replacement is not proof that a real booking has been confirmed.','The second task turns the table: field labels run down the side. Compare the table with the displayed message before selecting an answer.'],
  variants:[{id:'rows',title:'Read across the rows',layout:'rows',sourceIndex:0,questions:[question(0,0),question(1,2),comparison]},
   {id:'columns',title:'Compare a message with the table',layout:'columns',sourceIndex:1,questions:[question(1,0),question(0,1),{prompt:'Which table column matches the displayed changed / requested message?',choices:rows.map(r=>r.label),answer:rows[1].label,explanation:'Use the changed / requested details column. The other column records the original source.'}]}]};
 const target=window.WordamiLearningDesign?.units[id]?.outcomes.reading;
 if(target){target.relatedPracticeIds=[...(target.relatedPracticeIds||[]),...units[id].variants.map(v=>'documents.'+id+'.'+v.id)];}
}
window.WordamiDocumentContent=Object.freeze({version:1,scope:'Prepared practical tables and source comparison; selected A1–A2 examples',units});
})();
