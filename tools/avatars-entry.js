import {createAvatar} from '@dicebear/core';
import * as notionists from '@dicebear/notionists';
const P = notionists.schema.properties;
const list = k => (P[k].items && P[k].items.enum) || [];
window.Ava = {
  parts: {hair: list('hair'), beard: list('beard'), glasses: list('glasses'), body: list('body'), brows: list('brows'), eyes: list('eyes'), lips: list('lips'), nose: list('nose')},
  svg(o, size) { return createAvatar(notionists, Object.assign({size: size || 64, randomizeIds: true}, o)).toString(); }
};
