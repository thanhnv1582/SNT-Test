const getSortList = (arr, time) => {
  const combinations = [];
  arr.map((item) => {
    for (let i = 0; i <= item.length; i++) {
      const tmp = [];
      item.forEach((element) => {
        tmp.push(element);
      });
      tmp.splice(i, 0, time);
      combinations.push(tmp);
    }
  });
  return combinations;
};

const getMatches = (hours, matchHour) => {
  const matches = [];
  for (let match = 0; match < hours; match++) {
    matches.push(matchHour);
  }
  return matches;
};

const removeDuplicateItem = (arr) => {
  const tmpArr = [];
  arr.map((item) => tmpArr.push(item));
  tmpArr.map((item, index) => (tmpArr[index] = item.join('-')));

  const matches = [];
  tmpArr.forEach((item) => {
    const tmp = matches.find((element) => element === item);
    if (!tmp) {
      matches.push(item);
    }
  });

  matches.map((item, index) => {
    const transArr = item.split('-');
    transArr.map((str, i) => (transArr[i] = Number(str)));
    matches[index] = transArr;
  });

  return matches;
};

((hours) => {
  const possibleCombinations = [];
  for (let i = hours; i >= 0; i -= 2) {
    possibleCombinations.push({
      oneHour: getMatches(i, 1),
      twoHour: getMatches((hours - i) / 2, 2),
    });
  }

  const schedules = [];
  possibleCombinations.forEach((item) => {
    const { oneHour, twoHour } = item;

    let combinations = [];
    twoHour.map((element, index) => {
      let tmpArr = combinations;
      if (index === 0) {
        tmpArr = [oneHour];
      }

      let sortList = getSortList(tmpArr, 2);
      sortList = removeDuplicateItem(sortList);

      if (twoHour.length === ++index && sortList.length !== 0) {
        schedules.push(...schedules.concat(sortList));
      } else {
        combinations = sortList;
      }
    });
  });

  const theFirstCombination = [];
  for (let i = 0; i < hours; i++) {
    theFirstCombination.push(1);
  }
  schedules.unshift(theFirstCombination);

  schedules.map((item) => console.log(item.join('-')));
})(7);
