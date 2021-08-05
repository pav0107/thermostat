document.addEventListener('DOMContentLoaded', () => {
  const updateTemperature = () => {
    document.querySelector('#temperature').innerText = thermostat.temperature;
    document.querySelector('#temperature').className = thermostat.energyUsage();;
  };

  const thermostat = new Thermostat();
  updateTemperature();

  document.querySelector('#temperature-up', () => {
    thermostat.up();
    updateTemperature();
  });

  document.querySelector('#temperature-down', () => {
    thermostat.down();
    updateTemperature();
  });

  document.querySelector('#temperature-reset', () => {
    thermostat.resetTemperature();
    updateTemperature();
  });

  document.querySelector('#powerSavingModeOn', () => {
    thermostat.switchPowerSavingModeOn();
    updateTemperature();
  });

  document.querySelector('#powerSavingModeOff', () => {
    thermostat.switchPowerSavingModeOff();
    updateTemperature();
  });
});


api.openweathermap.org/data/2.5/weather?q={London}&appid={f5929c891d8537828818b3a10a7e3e0e};