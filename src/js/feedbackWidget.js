class FeedbackWidget{
  constructor(elementId) {
    this._elementId = elementId;
    this.$element = $(`#${this._elementId}`);
    this.$element.empty();

    this.$element.append(`
      <div class="feedbackWidget">
        <div class="feedbackWidget__icon">
          <i class="fas fa-check"></i>
        </div>

        <p class="feedbackWidget__message">
          message
        </p>

        <div class="feedbackWidget__close">
          <i class="fas fa-times"></i>
        </div>
    
        <div class="feedbackWidget__buttons">
          <button class="feedbackWidget__button button__success">
            Agree
          </button>

          <button class="feedbackWidget__button button__cancel">
            Disapprove
          </button>
        </div>
      <div>
    `);
  }

  show(message, type){
    this.$element.addClass(`type-${type}`);

    this.$element.find('.feedbackWidget').addClass("active");

    this.$element.find('.feedbackWidget__message').html(message);
  }

  hide(){
    this.$element.find('.feedbackWidget').removeClass("active");
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