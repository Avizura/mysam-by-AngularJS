class Learn {
    constructor($stateParams) {
      this.words = $stateParams["extracted"].split(' ');
      this.data = [];
      this.words.forEach((word)=>{
          this.data.push({word: word, selected: false});
      });
    }

    select(item) {
      console.log(item);
      item.selected = !item.selected;
    }
}

angular.module('Jarvis')
    .controller('learnCtrl', Learn);
