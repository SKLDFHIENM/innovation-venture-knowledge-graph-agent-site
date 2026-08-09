// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* 视觉回归截图对比配置 */
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,   // 允许 2% 像素差异
      threshold: 0.25,           // 单像素颜色差异阈值
      animations: 'disabled',   // 禁用动画避免闪烁
    },
  },

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    /* ── 桌面端 ── */
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    /* ── 平板 ── */
    {
      name: 'Tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        deviceScaleFactor: 2,
      },
    },
    /* ── 移动端 ── */
    {
      name: 'Mobile',
      use: { ...devices['iPhone 14'] },
    },
  ],

  /* 本地开发时自动启动 http-server */
  webServer: {
    command: 'npx http-server . -p 8080 -s',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
