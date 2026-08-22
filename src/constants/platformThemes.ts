/**
 * 各平台落地页主题配置（颜色 / 图标 / 展示名）
 * 供 PlatformHero、PlatformContent、PlatformSchema 使用
 */

export interface PlatformTheme {
  /** 平台展示名 */
  name: string;
  /** 平台图标（emoji，作为文本渲染，可被 color 着色） */
  icon: string;
  /** 主色，用于光晕、文字阴影、按钮渐变起始色 */
  primaryColor: string;
  /** 按钮渐变结束色 */
  gradientTo: string;
}

export const PLATFORM_THEMES = {
  youtube: {
    name: "YouTube",
    icon: "▶",
    primaryColor: "#FF0000",
    gradientTo: "#CC0000",
  },
  "youtube-shorts": {
    name: "YouTube Shorts",
    icon: "⚡",
    primaryColor: "#FF0033",
    gradientTo: "#B3001B",
  },
  tiktok: {
    name: "TikTok",
    icon: "♪",
    primaryColor: "#FF0050",
    gradientTo: "#00F2EA",
  },
  douyin: {
    name: "抖音",
    icon: "♪",
    primaryColor: "#FE2C55",
    gradientTo: "#25F4EE",
  },
  x: {
    name: "X",
    icon: "✕",
    primaryColor: "#1D9BF0",
    gradientTo: "#0F6FB8",
  },
  instagram: {
    name: "Instagram",
    icon: "◎",
    primaryColor: "#E1306C",
    gradientTo: "#F77737",
  },
  facebook: {
    name: "Facebook",
    icon: "f",
    primaryColor: "#1877F2",
    gradientTo: "#0B5FCE",
  },
  threads: {
    name: "Threads",
    icon: "@",
    primaryColor: "#E5E5E5",
    gradientTo: "#8A8A8A",
  },
  xiaohongshu: {
    name: "小红书",
    icon: "书",
    primaryColor: "#FF2442",
    gradientTo: "#C7182F",
  },
  bilibili: {
    name: "哔哩哔哩",
    icon: "▶",
    primaryColor: "#00A1D6",
    gradientTo: "#FB7299",
  },
  kuaishou: {
    name: "快手",
    icon: "K",
    primaryColor: "#FF6600",
    gradientTo: "#D14A00",
  },
  pinterest: {
    name: "Pinterest",
    icon: "P",
    primaryColor: "#E60023",
    gradientTo: "#AD001A",
  },
  vimeo: {
    name: "Vimeo",
    icon: "V",
    primaryColor: "#1AB7EA",
    gradientTo: "#0F87AF",
  },
  nicovideo: {
    name: "niconico",
    icon: "N",
    primaryColor: "#E5E5E5",
    gradientTo: "#8A8A8A",
  },
  pornhub: {
    name: "Pornhub",
    icon: "P",
    primaryColor: "#FF9900",
    gradientTo: "#CC7A00",
  },
  upscrolled: {
    name: "Upscrolled",
    icon: "↑",
    primaryColor: "#824AC8",
    gradientTo: "#6B3FA0",
  },
} as const satisfies Record<string, PlatformTheme>;

export type PlatformKey = keyof typeof PLATFORM_THEMES;

/** 未知平台的兜底主题，使用站点主色 */
export const DEFAULT_PLATFORM_THEME: PlatformTheme = {
  name: "Video",
  icon: "▶",
  primaryColor: "#824AC8",
  gradientTo: "#6B3FA0",
};

/**
 * 获取平台主题；未配置的平台返回兜底主题
 * 注意：调用方常把任意字符串断言成 PlatformKey，这里必须做运行时兜底
 */
export function getPlatformTheme(platform: PlatformKey): PlatformTheme {
  return PLATFORM_THEMES[platform] ?? DEFAULT_PLATFORM_THEME;
}
