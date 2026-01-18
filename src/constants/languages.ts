export const TRANSLATIONS = {
  zh: {
    common: {
      backHome: "返回首页",
      loading: "加载中...",
    },
    topbar: {},
    home: {
      title: "主页",
      welcomeBack: "欢迎回来！你今天有",
      questionsCount: "道题目",
      toReviewToday: "需要复习。",
      addNote: "新增笔记",
      mastered: "已掌握",
      masteredFooter: "等级 4 以上的题目",
      totalQuestion: "总题数",
      totalQuestionFooter: "本周新增",
      toReview: "待复习",
      toReviewFooter: "今日计划复习",
      masteryRate: "掌握率",
    },
    masterybar: {
      title: "掌握程度分布",
      questions: "题目数量",
    },
    todayFocus: {
      title: "今日焦点",
      suggestedReview: "推荐复习",
      done: "全部搞定！",
      notice: "今天没有复习任务。",
      start: "开始练习",
    },
    questionPage: {
      title: "题目列表",
      description: "管理及复习你的题目。",
      searchPlaceholder: "搜索题目...",
      filterBtn: "筛选",
      createBtn: "创建",
      // 筛选弹窗内容
      filterModalTitle: "筛选题目",
      filterModalDes: "通过难度、状态或标签精细化你的题目列表。",
      filterLabelDiff: "难度",
      filterLabelStatus: "状态",
      filterLabelMastery: "掌握程度",
      filterLabelTag: "标签",
      filterLabelTagDes: "暂无可用标签。",
      filterReset: "重置筛选",
      filterShow: "显示",
      filterResults: "条结果",
      // 删除确认
      deleteModalTitle: "你确定要删除吗？",
      deleteModalDes:
        "此操作无法撤销。这将永久移除该题目的练习进度、笔记和提交的代码。",
      deleteBtn: "删除",
      deletingBtn: "删除中...",
      cancelBtn: "取消",
    },
    questionsTable: {
      headId: "#",
      headQuestion: "题目名称",
      headMastery: "掌握程度",
      headTags: "标签",
      headDifficulty: "难度",
      headActions: "操作",
      empty: "未发现相关题目。",
      diffEasy: "简单",
      diffMedium: "中等",
      diffHard: "困难",
    },
    previewSheet: {
      editBtn: "编辑",
      masteryLevel: "掌握等级",
      updatedAt: "更新于",
      solutionCode: "解题代码",
      noCode: "// 暂无代码记录",
      myNotes: "我的笔记",
      noNotes: "暂无笔记内容。",
      notAvailable: "无",
    },
    editorHeader: {
      cancel: "取消",
      save: "保存",
      create: "创建",
      saving: "保存中...",
      creating: "创建中...",
      input: "题目名称 (e.g. Two Sum)",
      cancelTitle: "放弃修改？",
      cancelDescription: "你有尚未保存的内容，确定要离开吗？离开后内容将丢失。",
      continueEditing: "继续编辑",
      confirmExit: "确定离开",
    },
    codeSection: {
      title: "代码",
      languagePlaceholder: "选择语言",
    },
    metaSidebar: {
      difficulty: "难度级别",
      difficultyPlaceholder: "选择难度",
      tags: "标签分类",
      tagsAdded: "个已添加",
      tagInputPlaceholder: "输入标签...",
      tagAddMore: "继续添加...",
      mastery: "掌握程度",
      masteryNewbie: "新手",
      masteryMaster: "专家",
      problemLink: "题目链接",
    },
    markdownSection: {
      previewTitle: "实时预览",
      inputTitle: "Markdown 编辑",
      previewPlaceholder: "开始书写内容以查看预览...",
      inputPlaceholder: "# 笔记内容...",
    },
    reviewHeader: {
      title: "每日复习",
      descriptionWithCount: "你今天有 {{count}} 道题目需要复习。",
      descriptionEmpty: "你已完成所有复习任务！干得漂亮。",
      estimatedTime: "预计耗时：{{time}} 分钟",
    },
    reviewCard: {
      lastReview: "最近复习",
      currentMastery: "当前掌握度",
      solveBtn: "开始练习",
      alreadySolved: "已经做过了，去打分",
      rateTitle: "刚才的练习感觉如何？",
      cancelBtn: "取消",
      // 打分按钮
      rateFail: "忘光",
      rateHard: "太难",
      rateMedium: "有印象",
      rateGood: "一般",
      rateGreat: "不错",
      rateEasy: "秒杀",
      // 鼠标悬浮提示
      titleFail: "毫无头绪",
      titleHard: "自己写不出，看答案才能懂",
      titleMedium: "有印象但写不出，逻辑有卡顿",
      titleGood: "虽然独立写完，但中间查了资料或耗时极长",
      titleGreat: "思路清晰，可以顺利写出",
      titleEasy: "完全掌握，闭眼都能写出",
    },
    reviewEmptyState: {
      title: "全部搞定！",
      description:
        "你已经完成了今天的全部复习任务。去学习一点新知识，或者休息一下吧？",
      actionBtn: "探索题库",
    },
    sidebar: {
      home: "首页",
      questions: "题库",
      review: "复习",
      settings: "设置",
      help: "帮助",
    },
    help: {
      problem: "遇到问题？",
      description: "这是一个开源项目。您的反馈与贡献是成就它的关键！",
      reportbug: "反馈 Bug",
      bugDes: "发现程序漏洞或 UI 渲染异常？请随时告诉我！",
      contribute: "参与贡献",
      contributeDes: "有好的想法或想修复代码？非常欢迎提交 Pull Request。",
      github: "前往 GitHub 查看",
      back: "返回首页",
    },
    notFound: {
      title: "页面未找到",
      desc: "看起来你迷路了，该页面并不存在。",
      backHome: "返回主页面",
      errorCode: "错误代码",
    },
  },
  en: {
    common: {
      backHome: "Back to Homepage",
      loading: "Loading...",
    },
    topbar: {},
    home: {
      title: "Home",
      welcomeBack: "Welcome back! You have",
      questionsCount: "questions",
      toReviewToday: "to review today.",
      addNote: "Add Note",
      mastered: "Mastered",
      masteredFooter: "Level 4+ Questions",
      totalQuestion: "Total Questions",
      totalQuestionFooter: "new this week",
      toReview: "To Review",
      toReviewFooter: "Scheduled for today",
      masteryRate: "Mastery Rate",
    },
    masterybar: {
      title: "Mastery Level Distribution",
      questions: "Questions",
    },
    todayFocus: {
      title: "Today's Focus",
      suggestedReview: "Suggested Review",
      done: "All caught up!",
      notice: "No urgent reviews today.",
      start: "Start Session",
    },
    questionPage: {
      title: "Question List",
      description: "Manage and review your problems.",
      searchPlaceholder: "Search questions...",
      filterBtn: "Filter",
      createBtn: "Create",
      // Filter Modal
      filterModalTitle: "Filter Questions",
      filterModalDes:
        "Refine your question list by difficulty, status, or tags.",
      filterLabelDiff: "Difficulty",
      filterLabelStatus: "Status",
      filterLabelMastery: "Mastery Level",
      filterLabelTag: "Tags",
      filterLabelTagDes: "No tags available yet.",
      filterReset: "Reset Filters",
      filterShow: "Show",
      filterResults: "Results",
      // Delete Confirmation
      deleteModalTitle: "Are you absolutely sure?",
      deleteModalDes:
        "This action cannot be undone. This will permanently remove your progress, notes, and code submissions for this question.",
      deleteBtn: "Delete",
      deletingBtn: "Deleting...",
      cancelBtn: "Cancel",
    },
    questionsTable: {
      headId: "#",
      headQuestion: "Question",
      headMastery: "Mastery",
      headTags: "Tags",
      headDifficulty: "Difficulty",
      headActions: "Actions",
      empty: "No questions found.",
      diffEasy: "Easy",
      diffMedium: "Medium",
      diffHard: "Hard",
    },
    previewSheet: {
      editBtn: "Edit",
      masteryLevel: "Mastery Level",
      updatedAt: "Updated",
      solutionCode: "Solution Code",
      noCode: "// No code recorded.",
      myNotes: "My Notes",
      noNotes: "No notes added.",
      notAvailable: "N/A",
    },
    editorHeader: {
      cancel: "Cancel",
      save: "Save",
      create: "Create",
      saving: "Saving...",
      creating: "Creating...",
      input: "Problem Title (e.g. Two Sum)",
      cancelTitle: "Discard changes?",
      cancelDescription:
        "You have unsaved changes. Are you sure you want to leave this page?",
      continueEditing: "Keep editing",
      confirmExit: "Discard",
    },
    codeSection: {
      title: "Solution",
      languagePlaceholder: "Language",
    },
    metaSidebar: {
      difficulty: "Difficulty",
      difficultyPlaceholder: "Select Difficulty",
      tags: "Tags",
      tagsAdded: "added",
      tagInputPlaceholder: "Type tag...",
      tagAddMore: "Add...",
      mastery: "Mastery",
      masteryNewbie: "Newbie",
      masteryMaster: "Master",
      problemLink: "Problem Link",
    },
    markdownSection: {
      previewTitle: "Live Preview",
      inputTitle: "Markdown Input",
      previewPlaceholder: "Start writing to see preview...",
      inputPlaceholder: "# Notes...",
    },
    reviewHeader: {
      title: "Daily Review",
      descriptionWithCount:
        "You have {{count}} questions due for review today.",
      descriptionEmpty: "You're all caught up! Great job.",
      estimatedTime: "Estimated time: {{time}} mins",
    },
    reviewCard: {
      lastReview: "Last",
      currentMastery: "Current Mastery",
      solveBtn: "Solve Problem",
      alreadySolved: "Already solved, rate it",
      rateTitle: "How was it?",
      cancelBtn: "Cancel",
      rateFail: "Forgot",
      rateHard: "Understand",
      rateMedium: "Vague",
      rateGood: "Struggled",
      rateGreat: "Smooth",
      rateEasy: "Mastered",
      titleFail: "No idea at all or completely forgotten",
      titleHard: "Understood after seeing the answer",
      titleMedium: "Familiar but failed to derive logic",
      titleGood: "Solved with great effort and time",
      titleGreat: "Solved independently at normal speed",
      titleEasy: "Mastered, solved almost instantly",
    },
    reviewEmptyState: {
      title: "All Caught Up!",
      description:
        "You've completed all your reviews for today. Why not learn something new or take a well-deserved break?",
      actionBtn: "Explore Questions",
    },
    sidebar: {
      home: "Home",
      questions: "Questions",
      review: "Review",
      settings: "Settings",
      help: "Help",
    },
    help: {
      problem: "Have a problem?",
      description:
        "This is an open-source project. Your feedback and contributions are what make it great!",
      reportbug: "Report Bug",
      bugDes: "Found a bug or UI inconsistency? Please let me know!",
      contribute: "Contribute Code",
      contributeDes:
        "Have an idea or want to fix code? Pull Requests are always welcome.",
      github: "View on GitHub",
      back: "Back to Homepage",
    },
    notFound: {
      title: "Page Not Found",
      desc: "Oops! It seems this page doesn't exist.",
      backHome: "Back Home",
      errorCode: "Error Code",
    },
  },
};

// The newly added fields above also need to be added here.
export type TranslationKeys =
  | "common.backHome"
  | "common.loading"
  | "sidebar.home"
  | "sidebar.questions"
  | "sidebar.review"
  | "sidebar.settings"
  | "sidebar.help"
  | "home.title"
  | "home.welcomeBack"
  | "home.questionsCount"
  | "home.toReviewToday"
  | "home.addNote"
  | "home.mastered"
  | "home.masteredFooter"
  | "home.totalQuestion"
  | "home.totalQuestionFooter"
  | "home.toReview"
  | "home.toReviewFooter"
  | "home.masteryRate"
  | "masterybar.title"
  | "masterybar.questions"
  | "todayFocus.title"
  | "todayFocus.suggestedReview"
  | "todayFocus.done"
  | "todayFocus.notice"
  | "todayFocus.start"
  | "questionPage.title"
  | "questionPage.description"
  | "questionPage.searchPlaceholder"
  | "questionPage.filterBtn"
  | "questionPage.createBtn"
  | "questionPage.filterModalTitle"
  | "questionPage.filterModalDes"
  | "questionPage.filterLabelDiff"
  | "questionPage.filterLabelStatus"
  | "questionPage.filterLabelMastery"
  | "questionPage.filterLabelTag"
  | "questionPage.filterLabelTagDes"
  | "questionPage.filterReset"
  | "questionPage.filterShow"
  | "questionPage.filterResults"
  | "questionPage.deleteModalTitle"
  | "questionPage.deleteModalDes"
  | "questionPage.deleteBtn"
  | "questionPage.deletingBtn"
  | "questionPage.cancelBtn"
  | "help.problem"
  | "help.description"
  | "help.reportbug"
  | "help.bugDes"
  | "help.contribute"
  | "help.contributeDes"
  | "help.github"
  | "help.back"
  | "notFound.title"
  | "notFound.desc"
  | "notFound.errorCode"
  | "notFound.backHome"
  | "questionsTable.headId"
  | "questionsTable.headQuestion"
  | "questionsTable.headMastery"
  | "questionsTable.headTags"
  | "questionsTable.headDifficulty"
  | "questionsTable.headActions"
  | "questionsTable.empty"
  | "questionsTable.diffEasy"
  | "questionsTable.diffMedium"
  | "questionsTable.diffHard"
  | "previewSheet.editBtn"
  | "previewSheet.masteryLevel"
  | "previewSheet.updatedAt"
  | "previewSheet.solutionCode"
  | "previewSheet.noCode"
  | "previewSheet.myNotes"
  | "previewSheet.noNotes"
  | "previewSheet.notAvailable"
  | "editorHeader.cancel"
  | "editorHeader.save"
  | "editorHeader.create"
  | "editorHeader.saving"
  | "editorHeader.creating"
  | "editorHeader.input"
  | "editorHeader.cancelTitle"
  | "editorHeader.cancelDescription"
  | "editorHeader.continueEditing"
  | "editorHeader.confirmExit"
  | "codeSection.title"
  | "codeSection.languagePlaceholder"
  | "metaSidebar.difficulty"
  | "metaSidebar.difficultyPlaceholder"
  | "metaSidebar.tags"
  | "metaSidebar.tagsAdded"
  | "metaSidebar.tagInputPlaceholder"
  | "metaSidebar.tagAddMore"
  | "metaSidebar.mastery"
  | "metaSidebar.masteryNewbie"
  | "metaSidebar.masteryMaster"
  | "metaSidebar.problemLink"
  | "markdownSection.previewTitle"
  | "markdownSection.inputTitle"
  | "markdownSection.previewPlaceholder"
  | "markdownSection.inputPlaceholder"
  | "reviewHeader.title"
  | "reviewHeader.descriptionWithCount"
  | "reviewHeader.descriptionEmpty"
  | "reviewHeader.estimatedTime"
  | "reviewCard.lastReview"
  | "reviewCard.currentMastery"
  | "reviewCard.solveBtn"
  | "reviewCard.alreadySolved"
  | "reviewCard.rateTitle"
  | "reviewCard.cancelBtn"
  | "reviewCard.rateFail"
  | "reviewCard.rateHard"
  | "reviewCard.rateMedium"
  | "reviewCard.rateGood"
  | "reviewCard.rateGreat"
  | "reviewCard.rateEasy"
  | "reviewCard.titleFail"
  | "reviewCard.titleHard"
  | "reviewCard.titleMedium"
  | "reviewCard.titleGood"
  | "reviewCard.titleGreat"
  | "reviewCard.titleEasy"
  | "reviewEmptyState.title"
  | "reviewEmptyState.description"
  | "reviewEmptyState.actionBtn";

export type LanguageType = keyof typeof TRANSLATIONS;
