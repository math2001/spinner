var Settings;

Settings = (function() {
  function Settings() {}

  Settings.init = function() {
    var $checkboxes, $resetBtns;
    this.bg = Cookies.get('setting-bg', false) === "true";
    this.point = Cookies.get('setting-point', false) === "true";
    this.wall = Cookies.get('setting-wall', false) === "true";
    $checkboxes = Game.$settings.find('input[type=checkbox]');
    $resetBtns = Game.$settings.find('img.reset-btn');
    $resetBtns.filter('#setting-reset-point').bind('click', {
      setting: 'point'
    }, this.reset);
    $resetBtns.filter('#setting-reset-wall').bind('click', {
      setting: 'wall'
    }, this.reset);
    $resetBtns.filter('#setting-reset-bg').bind('click', {
      setting: 'bg'
    }, this.reset);
    $checkboxes.filter('#setting-bg').prop('checked', this.bg);
    $checkboxes.filter('#setting-point').prop('checked', this.point);
    $checkboxes.filter('#setting-wall').prop('checked', this.wall);
    return $checkboxes.bind('change', this.updateSettings.bind(this));
  };

  Settings.reset = function(e) {
    return Game.resetSetting(e.data.setting);
  };

  Settings.updateSettings = function(e) {
    this[e.target.id.replace('setting-', '')] = e.target.checked;
    if (e.target.checked) {
      return Cookies.set(e.target.id, e.target.checked);
    } else {
      return Cookies.remove(e.target.id);
    }
  };

  return Settings;

})();
