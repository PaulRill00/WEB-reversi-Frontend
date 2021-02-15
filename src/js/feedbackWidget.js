class FeedbackWidget{
  constructor(elementId) {
    this._elementId = elementId;
    this.$element = $(`#${this._elementId}`);
  }

  show(message, type){
    this.$element.text(message);
    this.$element.addClass(`alert`);
    this.$element.addClass(`alert-${type}`);
    this.$element.attr('role','alert');
    this.$element.css("display", "block");
  }

  hide(){
    this.$element.css("display", "none");
  }

  log(message) {
    let logs = JSON.parse(localStorage.getItem('feedback_widget')) ?? [];
    logs.push(message);

    if (logs.length > 10)
      logs.splice(0,1);

    localStorage.setItem('feedback_widget', JSON.stringify(logs));

    this.show(message.message, message.type);
  }

  removeLog() {
    localStorage.removeItem('feedback_widget');
  }

  history() {
    let logs = JSON.parse(localStorage.getItem('feedback_widget')) ?? [];

    let string = "";
    logs.forEach((log, index) => {
      string += `<type ${log.type}> - ${log.message}>`
      if (index !== logs.length - 1)
        string += '<\n>';
    });

    console.log()

    this.show(string, 'success');
  }
}