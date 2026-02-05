'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';

import { SIDEBAR_NAV } from '@/constants';
import {
  sidebarVariants,
  textVariants,
  categoryVariants,
  arrowVariants,
} from '@/animations/sidebarAnimations';

import { ChevronLeft, Settings2 } from 'lucide-react';

const SideBar = () => {
  const { uiLanguage, setIsSettingModalOpen } = useUserStore();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR (>= md screens)*/}
      <motion.aside
        variants={sidebarVariants}
        initial="open"
        animate={isOpen ? 'open' : 'closed'}
        className="hidden md:flex h-screen sticky left-0 top-0 bg-white/70 backdrop-blur-xl border-r border-gray-200/60 flex-col z-40 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 shrink-0">
          <motion.div
            variants={textVariants}
            className="whitespace-nowrap overflow-hidden"
          >
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 tracking-tight">
              ReCode
            </h1>
          </motion.div>
        </div>

        {/* Switch Button */}
        <motion.button
          variants={arrowVariants}
          initial="open"
          animate={isOpen ? 'open' : 'closed'}
          className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1.5 hover:scale-110 hover:bg-gray-100 text-gray-500 z-50 cursor-pointer transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft size={14} />
        </motion.button>

        {/* Menu List */}
        <div className="flex flex-col overflow-y-auto p-4 gap-6 hide-scrollbar-y overflow-x-hidden flex-1">
          {SIDEBAR_NAV.map((section, idx) => (
            <div key={idx}>
              <motion.div
                variants={categoryVariants}
                className="text-xs font-bold text-gray-400/80 px-3 uppercase tracking-wider overflow-hidden whitespace-nowrap mb-2"
              >
                {section.category}
              </motion.div>

              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path !== '/' && pathname.startsWith(item.path));

                  return (
                    <Link
                      key={uiLanguage === 'en' ? item.en_name : item.zh_name}
                      href={item.path}
                      className={cn(
                        'relative flex items-center h-11 rounded-xl transition-all duration-300 group overflow-hidden',
                        isActive
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-white/50',
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-bg"
                          className="absolute inset-0 bg-linear-to-r from-orange-50 to-transparent opacity-100"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}

                      {/* Active Indicator Strip */}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#ffa116] rounded-r-full shadow-[0_0_10px_#ffa116]"
                        />
                      )}

                      <div className="flex items-center justify-center min-w-14 z-10">
                        <item.icon
                          size={22}
                          className={cn(
                            'transition-all duration-300',
                            isActive
                              ? 'text-[#ffa116] drop-shadow-[0_0_8px_rgba(255,161,22,0.4)]'
                              : 'group-hover:text-gray-700',
                          )}
                        />
                      </div>

                      <motion.div
                        variants={textVariants}
                        className="flex items-center overflow-hidden whitespace-nowrap z-10"
                      >
                        <span
                          className={cn(
                            'text-sm ml-1 transition-all',
                            isActive ? 'font-semibold' : 'font-medium',
                          )}
                        >
                          {uiLanguage === 'en' ? item.en_name : item.zh_name}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}

                {/* Settings */}
                {section.category === 'System' && (
                  <button
                    onClick={() => setIsSettingModalOpen(true)}
                    className="relative flex items-center h-11 rounded-xl transition-all duration-300 group overflow-hidden text-gray-500 hover:text-gray-900 hover:bg-white/50 w-full cursor-pointer"
                  >
                    <div className="flex items-center justify-center min-w-14 z-10">
                      <Settings2
                        size={22}
                        className="transition-all duration-300 group-hover:text-gray-700"
                      />
                    </div>
                    <motion.div
                      variants={textVariants}
                      className="flex items-center overflow-hidden whitespace-nowrap z-10"
                    >
                      <span className="text-sm ml-1 font-medium transition-all">
                        {uiLanguage === 'en' ? 'Settings' : '设置'}
                      </span>
                    </motion.div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* MOBILE BOTTOM NAV (< md screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/60 z-50 h-safe-bottom min-h-[64px] pb-safe flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {SIDEBAR_NAV.flatMap((section) => section.items).map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== '/' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.en_name}
              href={item.path}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full p-2 relative',
                isActive
                  ? 'text-[#ffa116]'
                  : 'text-gray-400 hover:text-gray-600',
              )}
            >
              {/* Mobile Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobile-active-top"
                  className="absolute top-0 w-8 h-1 bg-[#ffa116] rounded-b-full"
                />
              )}

              <item.icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={
                  isActive ? 'drop-shadow-[0_0_6px_rgba(255,161,22,0.5)]' : ''
                }
              />
            </Link>
          );
        })}

        <button
          onClick={() => setIsSettingModalOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full p-2 text-gray-400 hover:text-gray-600"
        >
          <Settings2 size={24} />
        </button>
      </nav>
    </>
  );
};

export default SideBar;
