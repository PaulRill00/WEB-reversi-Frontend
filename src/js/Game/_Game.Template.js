Game.Template = (() => {

  const _getTemplate = (templateName) => {
    if (typeof spa_reversi === 'undefined') {
      throw new Error('Templates have not been compiled yet. Run gulp build');
    }

    const templates = spa_reversi.src.templates;
    let template = templates;

    templateName.split('.').forEach(path => {
      template = template[path];
    })

    return template;
  }

  const _parseTemplate = (templateName, data) => {
    const template = _getTemplate(templateName);
    return template(data);
  }

  return {
    getTemplate: _getTemplate,
    parseTemplate: _parseTemplate,
  }

})();