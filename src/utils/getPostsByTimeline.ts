import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

export interface TimelinePost {
  year: number;
  months: {
    month: number;
    monthName: string;
    posts: CollectionEntry<"blog">[];
  }[];
}

const getPostsByTimeline = (posts: CollectionEntry<"blog">[]): TimelinePost[] => {
  const filteredPosts = posts.filter(postFilter);

  // 按年份和月份分组
  const groupedByYear: { [year: number]: { [month: number]: CollectionEntry<"blog">[] } } = {};

  filteredPosts.forEach(post => {
    const date = new Date(post.data.modDatetime ?? post.data.pubDatetime);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (!groupedByYear[year]) {
      groupedByYear[year] = {};
    }

    if (!groupedByYear[year][month]) {
      groupedByYear[year][month] = [];
    }

    groupedByYear[year][month].push(post);
  });

  // 转换为TimelinePost[]格式并排序
  const timeline: TimelinePost[] = Object.keys(groupedByYear)
    .map(yearStr => {
      const year = parseInt(yearStr);
      const yearData = groupedByYear[year];

      const months = Object.keys(yearData)
        .map(monthStr => {
          const month = parseInt(monthStr);
          const posts = yearData[month].sort((a, b) => {
            const dateA = new Date(a.data.modDatetime ?? a.data.pubDatetime);
            const dateB = new Date(b.data.modDatetime ?? b.data.pubDatetime);
            return dateB.getTime() - dateA.getTime();
          });

          const monthNames = [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ];

          return {
            month,
            monthName: monthNames[month],
            posts,
          };
        })
        .sort((a, b) => b.month - a.month); // 月份倒序

      return {
        year,
        months,
      };
    })
    .sort((a, b) => b.year - a.year); // 年份倒序

  return timeline;
};

export default getPostsByTimeline;
