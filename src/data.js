const data = async () => {
  const _data = [];
  const startDate = new Date("August 1, 2023 01:00:00");
  const fixValue = 23000;
  for (let i = 0; i < 20; i++) {
    let item = [];
    startDate.setMinutes(startDate.getMinutes() + 5 * i);
    item.push(startDate);
    item.push(fixValue + Math.random());
    _data.push(item);
  }
  return _data;
};

export default data;
