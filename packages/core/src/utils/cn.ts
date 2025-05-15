import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并和净化类名
 * 结合了 clsx 和 tailwind-merge 以正确处理 Tailwind 类名
 * @param inputs 类名输入
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 