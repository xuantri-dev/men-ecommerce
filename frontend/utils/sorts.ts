// demo của utils/sorts.ts
// Hàm sắp xếp theo tên (alphabetical order)
export const sortByName = (a: { name: string }, b: { name: string }) => {
  return a.name.localeCompare(b.name);
};

// Hàm sắp xếp theo ngày (newest first)
export const sortByDate = (a: { date: string }, b: { date: string }) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

// Hàm sắp xếp theo giá trị (ascending order)
export const sortByValue = (a: { value: number }, b: { value: number }) => {
  return a.value - b.value;
};
