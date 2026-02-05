'use server';

import { TAG_MAPPING } from '@/constants/tagMapping';

interface LeetCodeGraphQLResponse {
  data: {
    question: {
      questionFrontendId: string;
      title: string;
      translatedTitle?: string;
      difficulty: string;
      topicTags: {
        name: string;
        translatedName?: string;
      }[];
    };
  };
}

export async function fetchLeetCodeQuestionAction(url: string) {
  try {
    // get titleSlug
    // Matches titleSlug after problems until - or ?
    const match = url.match(/problems\/([^/?]+)/);
    if (!match || !match[1]) {
      return { success: false, error: 'Invalid LeetCode URL format' };
    }
    const titleSlug = match[1];

    const isCn = url.includes('leetcode.cn');
    const endpoint = isCn
      ? 'https://leetcode.cn/graphql'
      : 'https://leetcode.com/graphql';

    const query = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionFrontendId
          title
          translatedTitle
          difficulty
          topicTags {
            name
            translatedName 
          }
        }
      }
    `;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; ReCode/1.0)',
      },
      body: JSON.stringify({
        query,
        variables: { titleSlug },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to fetch data from LeetCode' };
    }

    const json = (await response.json()) as LeetCodeGraphQLResponse;
    const question = json.data.question;

    if (!question) {
      return { success: false, error: 'Question not found' };
    }

    const processedTags = question.topicTags.map((tag) => {
      // if the official gave a Chinese name
      if (tag.translatedName) return tag.translatedName;

      // if the official didn't give a Chinese name, check the mapping
      if (TAG_MAPPING[tag.name]) return TAG_MAPPING[tag.name];

      // If we still can't find a name, use the English name
      return tag.name;
    });

    return {
      success: true,
      data: {
        pid: question.questionFrontendId,
        title:
          isCn && question.translatedTitle
            ? question.translatedTitle
            : question.title,
        difficulty: question.difficulty,
        tags: processedTags,
        link: url,
      },
    };
  } catch (error) {
    console.error('LeetCode fetch error:', error);
    return { success: false, error: 'Network error occurred' };
  }
}
