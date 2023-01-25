export const transformApps = (data) =>
  data.map((item) => {
    const newItem = { ...item };
    (newItem.value = item.id),
      (newItem.label = `${item.role} - ${item.company}`);
    return newItem;
  });

export const filterStories = (data, filter) => {
  const query = filter.toLowerCase();
  return data.filter((item) => item["title"].toLowerCase().includes(query));
};

export const filterQuestions = (data, filter) => {
  const query = filter.toLowerCase();
  return data.filter((item) => item["question"].toLowerCase().includes(query));
};
