/* eslint-disable array-callback-return */
/* eslint-disable no-throw-literal */
import axios from 'axios';
import * as utils from '@utils/string.util';
import { GitHubRepository } from '..';
import {
  ContributionBasic,
  ContributionCalendar,
  ContributionYear,
  GitHubApiJson,
  GitHubContributionCalendar,
  GitHubUser,
  GraphData,
} from '@core/models/github';

const DEFAULT_PER_PAGE = 30;
export const GITHUB_API_TOKEN =
  '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';

namespace GithubApiService {
  export async function fetchGitHubUser(username: string): Promise<ContributionBasic> {
    if (!GITHUB_API_TOKEN) {
      throw new Error('Require GITHUB ACCESS TOKEN.');
    }

    const res = await fetch('https://api.github.com/graphql', {
      method: 'post',
      body: JSON.stringify({
        query: `
        {
          user(login: "${username}") {
            name
            login
            avatarUrl
            contributionsCollection {
              years: contributionYears
            }
          }
        }
      `,
      }),
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`fetch error: ${res.statusText}.`);
    }

    const json: GitHubApiJson<{ user: GitHubUser | null }> = await res.json();

    if (!json.data?.user) {
      if (json.errors) {
        const error = json.errors.at(0);
        if (error) {
          throw new Error(error.message);
        }
      }
      throw new Error(json.message);
    }

    const { contributionsCollection, ...rest } = json.data.user;

    return { contributionYears: contributionsCollection.years, ...rest };
  }

  export async function fetchContributionsCollection(
    username: string,
    year: ContributionYear
  ): Promise<ContributionCalendar> {
    if (!GITHUB_API_TOKEN) {
      throw new Error('Require GITHUB ACCESS TOKEN.');
    }

    const res = await fetch('https://api.github.com/graphql', {
      method: 'post',
      body: JSON.stringify({
        query: `
        {
          user(login: "${username}") {
            contributionsCollection(from: "${new Date(
              `${year}-01-01`
            ).toISOString()}", to: "${new Date(`${year}-12-31`).toISOString()}") {
              contributionCalendar {
                total: totalContributions
                weeks {
                  days: contributionDays {
                    level: contributionLevel
                    weekday
                  }
                }
              }
            }
          }
        }
      `,
      }),
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`fetch error: ${res.statusText}.`);
    }

    const json: GitHubApiJson<{ user: GitHubContributionCalendar | null }> = await res.json();

    if (!json.data?.user) {
      throw new Error(json.message);
    }

    const contributionCalendar = json.data.user.contributionsCollection.contributionCalendar;

    return { ...contributionCalendar, year };
  }

  export async function getRepoStargazers(repo: string, token?: string, page?: number) {
    let url = `https://api.github.com/repos/${repo}/stargazers?per_page=${DEFAULT_PER_PAGE}`;

    if (page !== undefined) {
      url = `${url}&page=${page}`;
    }
    return axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: token ? `token ${token}` : '',
        'User-Agent': 'Axios 0.21.1',
      },
    });
  }

  export async function getRepoInfo(repo: string): Promise<GitHubRepository> {
    const { data } = await axios.get(`https://api.github.com/repos/${repo}`, {
      headers: {
        'User-Agent': 'Axios 0.21.1',
      },
    });

    return data;
  }

  export async function getRepoStargazersCount(repo: string, token?: string) {
    const { data } = await axios.get(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: token ? `token ${token}` : '',
        'User-Agent': 'Axios 0.21.1',
      },
    });

    return data.stargazers_count;
  }

  export async function getRepoStarRecords(repo: string, token: string, maxRequestAmount: number) {
    const patchRes = await getRepoStargazers(repo, token);

    const headerLink = patchRes.headers['link'] || '';

    let pageCount = 1;
    const regResult = /next.*&page=(\d*).*last/.exec(headerLink);

    if (regResult) {
      if (regResult[1] && Number.isInteger(Number(regResult[1]))) {
        pageCount = Number(regResult[1]);
      }
    }

    if (pageCount === 1 && patchRes?.data?.length === 0) {
      throw {
        status: patchRes.status,
        data: [],
      };
    }

    const requestPages: number[] = [];
    if (pageCount < maxRequestAmount) {
      requestPages.push(...utils.range(1, pageCount));
    } else {
      utils.range(1, maxRequestAmount).map(i => {
        requestPages.push(Math.round((i * pageCount) / maxRequestAmount) - 1);
      });
      if (!requestPages.includes(1)) {
        requestPages.unshift(1);
      }
    }

    const resArray = await Promise.all(
      requestPages.map(page => {
        return getRepoStargazers(repo, token, page);
      })
    );

    const starRecordsMap: Map<string, number> = new Map();

    if (requestPages.length < maxRequestAmount) {
      const starRecordsData: {
        starred_at: string;
      }[] = [];
      resArray.map(res => {
        const { data } = res;
        starRecordsData.push(...data);
      });
      for (let i = 0; i < starRecordsData.length; ) {
        starRecordsMap.set(utils.getDateString(starRecordsData[i].starred_at), i + 1);
        i += Math.floor(starRecordsData.length / maxRequestAmount) || 1;
      }
    } else {
      resArray.map(({ data }, index) => {
        if (data.length > 0) {
          const starRecord = data[0];
          starRecordsMap.set(
            utils.getDateString(starRecord.starred_at),
            DEFAULT_PER_PAGE * (requestPages[index] - 1)
          );
        }
      });
    }

    const starAmount = await getRepoStargazersCount(repo, token);
    starRecordsMap.set(utils.getDateString(Date.now()), starAmount);

    const starRecords: {
      date: string;
      count: number;
    }[] = [];

    starRecordsMap.forEach((v, k) => {
      starRecords.push({
        date: k,
        count: v,
      });
    });

    return starRecords;
  }

  export async function getRepoLogoUrl(repo: string, token?: string): Promise<string> {
    const owner = repo.split('/')[0];
    const { data } = await axios.get(`https://api.github.com/users/${owner}`, {
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: token ? `token ${token}` : '',
        'User-Agent': 'Axios 0.21.1',
      },
    });

    return data.avatar_url;
  }

  export async function fetchYearlyContributionByUsername(
    year: number,
    username: string
  ): Promise<ContributionCalendar> {
    try {
      const contributionCalendar = await fetchContributionsCollection(username, year);
      return contributionCalendar;
    } catch (err) {
      throw new Error('Error fetching contribution collection');
    }
  }

  export async function fetchContributionCollectionsByUsername(username: string) {
    try {
      const githubUser = await fetchGitHubUser(username);

      const contributionCalendars = await Promise.all(
        githubUser.contributionYears.map(year => fetchContributionsCollection(username, year))
      );

      const data: GraphData = { ...githubUser, contributionCalendars };
      return data;
    } catch (err) {
      throw new Error('Error fetching contribution collection');
    }
  }
}

export default GithubApiService;
