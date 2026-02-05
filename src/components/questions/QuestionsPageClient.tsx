'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteQuestionAction } from '@/actions/questions';
import { useTranslation } from '@/hooks/useTranslation';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Save, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { QuestionsTable } from './QuestionsTable';
// import { QuestionPreviewSheet } from "./QuestionPreviewSheet";
import { QuestionPreviewModal } from './QuestionPreviewModal';

import type { QuestionRowData, QuestionsPageClientProps } from '@/types';

import { DIFFICULTIES, STATUS_OPTIONS, MASTERY_COLORS } from '@/constants';

const MASTERY_OPTIONS = [0, 1, 2, 3, 4, 5];
// pagination
const ITEMS_PER_PAGE = 10;

export type SortConfig = {
  // updatedAt is default
  key: 'pid' | 'masteryLevel' | 'difficulty' | 'updatedAt';
  direction: 'asc' | 'desc';
};

export default function QuestionsPageClient({
  initialQuestions,
}: QuestionsPageClientProps) {
  const router = useRouter();

  const { t } = useTranslation();

  // base
  const [searchQuery, setSearchQuery] = useState('');
  const [previewData, setPreviewData] = useState<QuestionRowData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterMastery, setFilterMastery] = useState<number[]>([]);

  // Sorting & Pagination
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // get all tags
  const availableTags = useMemo(() => {
    if (!initialQuestions) return [];
    const tags = new Set<string>();
    initialQuestions.forEach((q) => {
      if (q.problem.tags) {
        q.problem.tags.split(',').forEach((tag) => tags.add(tag.trim()));
      }
    });
    return Array.from(tags).sort();
  }, [initialQuestions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterDifficulty, filterStatus, filterMastery, filterTags]);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((current) => {
      if (current.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        } else {
          return { key: 'updatedAt', direction: 'desc' };
        }
      }
      return { key, direction: 'asc' };
    });
  };

  const processedData = useMemo(() => {
    if (!initialQuestions) return [];

    // Filtering
    let data = initialQuestions.filter((item) => {
      // search filter
      const qTitle = item.problem.title.toLowerCase();
      const qPid = item.problem.pid;
      const query = searchQuery.toLowerCase();
      const matchesSearch = qTitle.includes(query) || qPid.includes(query);

      // difficulty filter
      const matchesDifficulty =
        filterDifficulty.length === 0 ||
        filterDifficulty.includes(item.problem.difficulty);

      // status filter
      const matchesStatus =
        filterStatus.length === 0 || filterStatus.includes(item.status);

      const matchesMastery =
        filterMastery.length === 0 || filterMastery.includes(item.masteryLevel);

      // tags filter
      const itemTags = item.problem.tags ? item.problem.tags.split(',') : [];
      const matchesTags =
        filterTags.length === 0 ||
        filterTags.some((tag) => itemTags.includes(tag));

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesStatus &&
        matchesMastery &&
        matchesTags
      );
    });

    // Sorting
    data.sort((a, b) => {
      const { key, direction } = sortConfig;
      const modifier = direction === 'asc' ? 1 : -1;

      switch (key) {
        case 'pid':
          const pidA = parseInt(a.problem.pid) || 0;
          const pidB = parseInt(b.problem.pid) || 0;
          if (pidA !== pidB) return (pidA - pidB) * modifier;
          return a.problem.pid.localeCompare(b.problem.pid) * modifier;

        case 'masteryLevel':
          return (a.masteryLevel - b.masteryLevel) * modifier;

        case 'difficulty':
          const difficultyRank: Record<string, number> = {
            Easy: 1,
            Medium: 2,
            Hard: 3,
          };
          const rankA = difficultyRank[a.problem.difficulty] || 99;
          const rankB = difficultyRank[b.problem.difficulty] || 99;
          return (rankA - rankB) * modifier;

        case 'updatedAt':
        default:
          return (
            (new Date(a.updatedAt).getTime() -
              new Date(b.updatedAt).getTime()) *
            modifier
          );
      }
    });

    return data;
  }, [
    initialQuestions,
    searchQuery,
    filterDifficulty,
    filterStatus,
    filterMastery,
    filterTags,
    sortConfig,
  ]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const paginatedData = processedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // interaction function
  const handlePreview = (item: QuestionRowData) => {
    setPreviewData(item);
    setIsPreviewOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const executeDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const result = await deleteQuestionAction(deleteId);

      if (result.success) {
        toast.success('Question deleted successfully');
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  // Switch the selected state in the array
  const toggleSelection = (
    currentList: string[],
    setList: (val: string[]) => void,
    item: string,
  ) => {
    if (currentList.includes(item)) {
      setList(currentList.filter((i) => i !== item));
    } else {
      setList([...currentList, item]);
    }
  };

  // Calculate the number of currently active filters
  const activeFilterCount =
    filterDifficulty.length +
    filterStatus.length +
    filterMastery.length +
    filterTags.length;

  // Specifically designed for switching Mastery
  const toggleMastery = (level: number) => {
    if (filterMastery.includes(level)) {
      setFilterMastery(filterMastery.filter((l) => l !== level));
    } else {
      setFilterMastery([...filterMastery, level]);
    }
  };

  const clearFilters = () => {
    setFilterDifficulty([]);
    setFilterStatus([]);
    setFilterTags([]);
    setFilterMastery([]);
    // setIsFilterOpen(false);
  };

  return (
    <div className="relative min-h-full w-full">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.7]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 space-y-8 p-6 md:p-10">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {t('questionPage.title')}
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              {t('questionPage.description')}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#ffa116] transition-colors" />
              <Input
                type="text"
                placeholder={t('questionPage.searchPlaceholder')}
                className="pl-10 h-12 bg-white/80 backdrop-blur-md border-gray-200/60 shadow-sm rounded-2xl focus:ring-2 focus:ring-[#ffa116]/20 focus:border-[#ffa116]/50 transition-all text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Modal */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'h-12 px-5 gap-2 bg-white/80 backdrop-blur-md border-gray-200/60 shadow-sm rounded-2xl cursor-pointer hover:bg-white hover:shadow-md transition-all relative',
                    activeFilterCount > 0 &&
                      'border-[#ffa116]/30 text-[#ffa116] bg-orange-50/50',
                  )}
                >
                  <Filter size={18} />
                  <span className="font-medium">
                    {t('questionPage.filterBtn')}
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ffa116] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-[1rem] border-white/40 bg-white/90 backdrop-blur-2xl shadow-2xl p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {t('questionPage.filterModalTitle')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('questionPage.filterModalDes')}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 py-4">
                  {/* Difficulty Filter */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                      {t('questionPage.filterLabelDiff')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {DIFFICULTIES.map((diff) => {
                        const isSelected = filterDifficulty.includes(diff);
                        return (
                          <Badge
                            key={diff}
                            variant={isSelected ? 'default' : 'outline'}
                            className={cn(
                              'cursor-pointer px-4 py-2 text-sm rounded-xl transition-all select-none border',
                              isSelected
                                ? diff === 'Easy'
                                  ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 shadow-emerald-200 shadow-md text-white'
                                  : diff === 'Medium'
                                    ? 'bg-amber-500 hover:bg-amber-600 border-amber-500 shadow-amber-200 shadow-md text-white'
                                    : 'bg-rose-500 hover:bg-rose-600 border-rose-500 shadow-rose-200 shadow-md text-white'
                                : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200',
                            )}
                            onClick={() =>
                              toggleSelection(
                                filterDifficulty,
                                setFilterDifficulty,
                                diff,
                              )
                            }
                          >
                            {diff}
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 ml-2" />
                            )}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Filter */}
                  {/* <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                      {t('questionPage.filterLabelStatus')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {STATUS_OPTIONS.map((status) => {
                        const isSelected = filterStatus.includes(status);
                        return (
                          <Badge
                            key={status}
                            variant={isSelected ? 'secondary' : 'outline'}
                            className={cn(
                              'cursor-pointer px-4 py-2 text-sm rounded-xl transition-all select-none border',
                              isSelected
                                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200 border-transparent'
                                : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200',
                            )}
                            onClick={() =>
                              toggleSelection(
                                filterStatus,
                                setFilterStatus,
                                status,
                              )
                            }
                          >
                            {status}
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 ml-2" />
                            )}
                          </Badge>
                        );
                      })}
                    </div>
                  </div> */}

                  {/* Mastery Filter */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                      {t('questionPage.filterLabelMastery')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {MASTERY_OPTIONS.map((level) => {
                        const isSelected = filterMastery.includes(level);
                        const color = MASTERY_COLORS[level] || '#ccc';

                        return (
                          <Badge
                            key={level}
                            variant="outline"
                            className={cn(
                              'cursor-pointer px-3 py-1.5 rounded-lg transition-all select-none border font-mono',
                              isSelected
                                ? 'text-white border-transparent shadow-md'
                                : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200',
                            )}
                            style={{
                              backgroundColor: isSelected ? color : undefined,
                              borderColor: isSelected ? color : undefined,
                              boxShadow: isSelected
                                ? `0 4px 12px -2px ${color}66`
                                : undefined,
                            }}
                            onClick={() => toggleMastery(level)}
                          >
                            Lv.{level}
                            {isSelected && <Check className="w-3 h-3 ml-1.5" />}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                      {t('questionPage.filterLabelTag')} ({availableTags.length}
                      )
                    </h4>
                    {availableTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto p-2 bg-gray-50/50 rounded-xl border border-gray-100 inner-shadow">
                        {availableTags.map((tag) => {
                          const isSelected = filterTags.includes(tag);
                          return (
                            <Badge
                              key={tag}
                              variant="outline"
                              className={cn(
                                'cursor-pointer transition-all select-none rounded-md px-2 py-1',
                                isSelected
                                  ? 'bg-blue-100/50 text-blue-700 border-blue-200'
                                  : 'bg-white text-gray-500 hover:bg-gray-100 border-gray-200',
                              )}
                              onClick={() =>
                                toggleSelection(filterTags, setFilterTags, tag)
                              }
                            >
                              {tag}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic px-2">
                        {t('questionPage.filterLabelTagDes')}
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex sm:justify-between gap-3 mt-4">
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    disabled={activeFilterCount === 0}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    {t('questionPage.filterReset')}
                  </Button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-6 shadow-lg shadow-gray-200 cursor-pointer"
                  >
                    {t('questionPage.filterShow')} {processedData.length}{' '}
                    {t('questionPage.filterResults')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link href={'/questions/add'}>
              <Button className="h-12 px-6 bg-[#ffa116] hover:bg-[#e69318] text-white flex-1 md:flex-none cursor-pointer rounded-2xl transition-all">
                <Save className="w-5 h-5 mr-2" />
                <span className="font-semibold text-base">
                  {t('questionPage.createBtn')}
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Table */}
        <QuestionsTable
          data={paginatedData}
          onPreview={handlePreview}
          onDelete={confirmDelete}
          sortConfig={sortConfig}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Detail Preview */}
        {previewData && (
          <QuestionPreviewModal
            isOpen={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
            data={previewData}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
        >
          <AlertDialogContent className="rounded-[2rem] bg-white/90 backdrop-blur-xl border-white/40 shadow-2xl p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-gray-900">
                {t('questionPage.deleteModalTitle')}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-500 mt-2">
                {t('questionPage.deleteModalDes')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 gap-3">
              <AlertDialogCancel
                disabled={isDeleting}
                className="rounded-xl border-gray-200 bg-white hover:bg-gray-50 h-11"
              >
                {t('questionPage.cancelBtn')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  executeDelete();
                }}
                className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl h-11 px-6 shadow-lg shadow-red-200"
                disabled={isDeleting}
              >
                {isDeleting
                  ? t('questionPage.deletingBtn')
                  : t('questionPage.deleteBtn')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
