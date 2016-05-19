
интерфейс для модулей
несколько примеров модулей (погода)


jarvis.learn
jarvis.classify
jarvis.action
jarvis.database
jarvis.recognizer.toggle
разные ОС? меню?

сделать выделение тегов из фразы  


//показывать хелп

// and learners (which will also show up in the help) like this
  sam.learn({
    description: 'Call myplugin',
    tags: ['name'],
    form: function(el, save) {
      el.html('<input type="text" class="param" />')
        .on('submit', function(save) {
          save({
            type: 'myplugin',
            ping: el.find('.param').val()
          });
        });
    }


multilanguage
лоадер

learn -> select with multiple tags
при каждом экшене сделать кнопку "Неверно!"
серверное приложение
