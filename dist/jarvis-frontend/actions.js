// import Bus from './bus.js';
//
// Bus.when('hi').then( () => {
//
// });
//
// sam.action('learn', function(el, classification, sam) {
//   el.html(learner(sam));
// });
//
// sam.action('reply', function(el, classification) {
//   let reply = classification.action.reply;
//   let subject = classification.extracted.subject;
//
//   reply = reply ?
//     reply.replace('{{subject}}', subject ? subject.join(' ') : '')
//       .replace('my', sam.attr('configuration.name') + '\'s') :
//     '?';
//
//   el.html($('<h1>').type(reply));
// });
//
// sam.action('hi', function(el, classification) {
//   let subject = classification.extracted.subject;
//
//   if(subject && subject[0].trim() === 'the') {
//     subject.shift();
//   }
//
//   sam.actions.reply(el, classification);
// });
//
// sam.action('namer', function(el, classification) {
//   classification.action.reply = 'Hi {{subject}}!';
//   classification.extracted.subject = classification.extracted.name;
//
//   sam.actions.reply(el, classification);
// });
//
// sam.action('help', function(el, classification, sam) {
//   let text = `Hi ${sam.attr('configuration.name')}! Here is what I can do:`;
//   el.html(help(sam)).find('h1').type(text);
// });
//
// sam.learn({
//   description: 'Say hi',
//   tags: ['subject'],
//   form(el, save) {
//     el.html(`<input type="text" value="Hi {{subject}}!" class="reply" />`)
//       .on('submit', () => save({
//         type: 'hi',
//         reply: el.find('.reply').val()
//       }));
//   }
// });
//
// sam.learn({
//   description: 'Make a reply',
//   tags: ['subject'],
//   form(el, save) {
//     el.html(`<input type="text" class="reply" />`)
//       .on('submit', () => save({
//         type: 'reply',
//         reply: el.find('.reply').val()
//       }));
//   }
// });
//
// sam.learn({
//   description: 'Show the help',
//   form(el, save) {
//     el.on('submit', () => save({ type: 'help' }));
//   }
// });
//
// sam.learn({
//   description: 'Input JSON',
//   hidden: true,
//   form(el, save) {
//     el.html(`<textarea class="input-json">{\n  "type": ""\n}</textarea>`)
//       .on('submit', () => save(JSON.parse(el.find('.input-json').val())));
//   }
// });
// }
"use strict";