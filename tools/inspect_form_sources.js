// Read-only source extraction for authoring practical form tasks from prepared language.
global.LANG={code:process.argv[2]||'lt'};require('./course_content_loader.js');
console.log(JSON.stringify(WordamiSkillsContent.units.filter(u=>['A1','A1-travel','A2-services','A2-travel'].includes(u.id)).map(u=>({id:u.id,reading:u.reading,listen:u.listen,phrases:u.writing.phrases,project:u.project})),null,2));
