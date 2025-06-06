import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://wxiao.site/",
  author: "Wang Xiao",
  desc: "A normal blogger - Wang Xiao",
  title: "Wang Xiao",
  ogImage: "pillars.webp",
  lightAndDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "zh",
  langTag: ["zh-CN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/0922WX",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "QQ",
    href: "tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2993819866",
    linkTitle: `联系 ${SITE.title} 的QQ`,
    active: true,
  },
  // {
  //   name: "Mail",
  //   href: "mailto:ogzhan11@gmail.com",
  //   linkTitle: `Send an email to ${SITE.title}`,
  //   active: true,
  // },
  // {
  //   name: "Twitter",
  //   href: "https://twitter.com/hezarfendd",
  //   linkTitle: `${SITE.title} on Twitter`,
  //   active: true,
  // },
];
