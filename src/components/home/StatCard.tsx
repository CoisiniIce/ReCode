'use client';

import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import type { StatCardProps } from '@/types';
import { STATCARD_COLOR_VARIANTS } from '@/constants';

export function StatCard({
  title,
  value,
  icon,
  trend,
  footerText,
  variant = 'orange',
  onClick,
  className,
}: StatCardProps) {
  const showPercent =
    title.toLowerCase().includes('rate') ||
    (typeof value === 'string' && value.includes('%'));

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative p-7 rounded-[2rem] flex flex-col justify-between h-52 cursor-pointer text-white shadow-2xl bg-linear-to-br overflow-hidden group border border-white/10',
        STATCARD_COLOR_VARIANTS[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 blur-3xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700 ease-in-out" />

      {/* background decoration icon */}
      {icon && (
        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-all duration-500 pointer-events-none rotate-12 group-hover:rotate-0 scale-110 group-hover:scale-125">
          {icon}
        </div>
      )}

      {/* title + jump button */}
      <div className="flex justify-between items-start z-10 relative">
        <span className="font-semibold text-lg text-white/90 tracking-wide">
          {title}
        </span>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          className="p-2.5 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors"
        >
          <ArrowUpRight size={20} />
        </motion.button>
      </div>

      {/* big number */}
      <div className="mt-4 z-10 relative">
        <h3 className="text-5xl font-extrabold tracking-tighter drop-shadow-sm">
          {value}
        </h3>
      </div>

      {/* rrend or text */}
      <div className="mt-auto pt-4 z-10 relative">
        {footerText ? (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-black/10 backdrop-blur-sm border border-white/10 text-xs text-white/90 font-medium tracking-wide">
            {footerText}
          </span>
        ) : trend ? (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-bold border backdrop-blur-md shadow-sm ${
                trend.value >= 0
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-red-500/20 border-red-500/30 text-red-50'
              }`}
            >
              {trend.value > 0 ? (
                <TrendingUp size={14} />
              ) : trend.value < 0 ? (
                <TrendingDown size={14} />
              ) : (
                <Minus size={14} />
              )}
              <span>
                {trend.value > 0 ? '+' : ''}
                {trend.value}
                {showPercent ? '%' : ''}
              </span>
            </div>
            <span className="text-xs text-white/80 font-medium">
              {trend.label}
            </span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
