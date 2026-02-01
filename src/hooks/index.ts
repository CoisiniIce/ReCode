// export const getDifficultyColor = (diff: string) => {
//   switch (diff) {
//     case "Easy":
//       return "text-emerald-600 bg-emerald-50 border-emerald-200";
//     case "Medium":
//       return "text-amber-600 bg-amber-50 border-amber-200";
//     case "Hard":
//       return "text-rose-600 bg-rose-50 border-rose-200";
//     default:
//       return "text-gray-600 bg-gray-50 border-gray-200";
//   }
// };

export const getDifficultyColor = (diff: string) => {
  switch (diff) {
    case "Easy":
      // 绿：半透明背景 + 模糊 + 绿色阴影
      return "bg-emerald-50/60 text-emerald-700 border-emerald-200/60 shadow-sm shadow-emerald-500/10 backdrop-blur-md";
    case "Medium":
      // 黄：半透明背景 + 模糊 + 黄色阴影
      return "bg-amber-50/60 text-amber-700 border-amber-200/60 shadow-sm shadow-amber-500/10 backdrop-blur-md";
    case "Hard":
      // 红：半透明背景 + 模糊 + 红色阴影
      return "bg-rose-50/60 text-rose-700 border-rose-200/60 shadow-sm shadow-rose-500/10 backdrop-blur-md";
    default:
      return "bg-gray-50/60 text-gray-700 border-gray-200/60 shadow-sm backdrop-blur-md";
  }
};