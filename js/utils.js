export const getEnv = () => {
  return ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "development"
    : "production";
};

export const map = (arr, func) => arr.map((item) => func(item)).join("");

export const timeFormat = (timeString) => {
  const [year, month, day] = timeString.split("T")[0].split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};
