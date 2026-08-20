/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";


const BASE = "courses";

export type CourseStatus = "draft" | "published" | "archived";
export type CourseDifficulty = "beginner" | "intermediate" | "advanced";

export interface ICourse {
  _id: string;
  order: number;
  courseCode: string;
  slug: string;
  version: number;
  title: string;
  hook: string;
  topic: string;
  category?: string;
  difficulty: CourseDifficulty;
  heroImage?: { public_id: string; url: string; altText?: string };
  videoUrl: string;
  videoDurationSeconds: number;
  whatYouNeedToKnow: string;
  keyPoints: string[];
  durationMinutes: number;
  timeLimitSeconds: number;
  passingScore: number;
  status: CourseStatus;
  publishedAt?: string;
  archivedAt?: string;
  dueInDays: number;
  audienceFilter?: { departments?: string[]; roles?: string[]; employeeIds?: string[] };
  avgCourseRating: number;
  avgQuizRating: number;
  ratingCount: number;
  assignmentCount: number;
  completionCount: number;
  passCount: number;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type CourseQuestionType =
  | "multiple_choice"
  | "true_false"
  | "scenario"
  | "short_answer"
  | "bonus";

export interface IOption {
  _id?: string;
  text: string;
  value: string;
  isCorrect: boolean;
}

export interface ICourseQuestion {
  _id: string;
  courseId: string;
  type: CourseQuestionType;
  order: number;
  text: string;
  scenarioContext?: string;
  options: IOption[];
  expectedAnswer?: string;
  points: number;
  explanation?: string;
  isRequired: boolean;
  isActive: boolean;
}

export interface ICreateCourseInput extends Partial<ICourse> {
  questions: Array<Pick<ICourseQuestion, "type" | "text" | "options" | "points" | "explanation">>;
}

export interface IMyCourseEntry {
  course: ICourse;
  attemptId: string;
  status: string;
  dueAt: string;
  isLate: boolean;
  score?: number;
  percentage?: number;
  passed?: boolean;
}

export interface IAttempt {
  _id: string;
  status: "not_started" | "in_progress" | "completed" | "expired" | "abandoned";
  completionState: "not_started" | "content_in_progress" | "quiz_in_progress" | "completed";
  videoProgressSeconds: number;
  videoCompletedAt?: string;
  contentCompletedAt?: string;
  quizStartedAt?: string;
  quizExpiresAt?: string;
  timeLimitSeconds: number;
  score: number;
  totalPossibleScore: number;
  percentage: number;
  passed: boolean;
  hasRated: boolean;
  isLate: boolean;
  dueAt?: string;
}

export interface ICourseAnalytics {
  course: { id: string; title: string; courseCode: string };
  summary: {
    totalAssigned: number;
    totalCompleted: number;
    totalInProgress: number;
    totalNotStarted: number;
    totalExpired: number;
    totalLate: number;
    totalPassed: number;
    avgPercentage: number;
    avgTimeTakenSeconds: number;
  };
  questionStats: Array<{
    questionId: string;
    text: string;
    timesAnswered: number;
    timesCorrect: number;
    accuracyPercent: number;
    avgTimeSpentSeconds: number;
  }>;
}

export interface ICourseTrackerFilters {
  status?: string;
  isLate?: boolean;
  passed?: boolean;
  department?: string;
}

export interface ICommentAttachment {
  public_id: string;
  url: string;
  resourceType: "image" | "video";
}

export interface ICommentMessage {
  _id?: string;
  text: string;
  authorId: string;
  authorRole: "employee" | "admin" | "manager" | "system";
  attachment?: ICommentAttachment;
  createdAt: string;
  isEdited: boolean;
}

export interface ICourseComment {
  _id: string;
  courseId: string;
  userId: string | { _id: string; name: string; email: string; department?: string };
  attemptId?: string;
  subject?: string;
  messages: ICommentMessage[];
  status: "open" | "answered" | "resolved" | "hidden";
  lastMessageAt: string;
  lastMessageBy?: string;
}

export interface ICourseRating {
  _id: string;
  courseId: string;
  userId: string;
  attemptId: string;
  courseRating: number;
  courseFeedback?: string;
  quizRating: number;
  quizFeedback?: string;
}

export interface ISubmitRatingInput {
  courseRating: number;
  courseFeedback?: string;
  quizRating: number;
  quizFeedback?: string;
}

export interface IQuizAnswerInput {
  questionId: string;
  selectedOptionIndex?: number;
  timeSpentSeconds?: number;
}

/** Build multipart/form-data for the comment endpoints so an optional file can ride along. */
const commentFormData = (text: string, file?: File | null) => {
  const form = new FormData();
  form.append("text", text);
  if (file) form.append("attachment", file);
  return form;
};

/* ────────────────────────────────────────────────────────────────────────
 * API slice
 * ──────────────────────────────────────────────────────────────────────── */

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ── Admin — course management ─────────────────────────────────── */

    createCourse: builder.mutation<{ success: boolean; course: ICourse }, ICreateCourseInput>({
      query: (data) => ({
        url: `${BASE}/create-courses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    getAllCourses: builder.query<{ success: boolean; courses: ICourse[] }, void>({
      query: () => ({
        url: `${BASE}/get-all-courses`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.courses.map((c) => ({ type: "Dashboard" as const, id: c._id })),
              { type: "Dashboard" as const, id: "LIST" },
            ]
          : [{ type: "Dashboard" as const, id: "LIST" }],
    }),

    getCourseById: builder.query<
      { success: boolean; course: ICourse; questions: ICourseQuestion[] },
      string
    >({
      query: (id) => ({
        url: `${BASE}/get-course/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Dashboard", id },
        { type: "Question", id },
      ],
    }),

    updateCourse: builder.mutation<
      { success: boolean; course: ICourse },
      { id: string; data: Partial<ICourse> }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/update-course/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dashboard", id },
        { type: "Dashboard", id: "LIST" },
      ],
    }),

    // NEW — hero image upload, multipart/form-data
    uploadCourseHeroImage: builder.mutation<{ success: boolean; course: ICourse }, { id: string; file: File }>({
      query: ({ id, file }) => {
        const form = new FormData();
        form.append("image", file);
        return { url: `${BASE}/${id}/hero-image`, method: "POST", body: form };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Dashboard", id }],
    }),

    publishCourse: builder.mutation<{ success: boolean; message: string; course: ICourse }, string>({
      query: (id) => ({
        url: `${BASE}/publish-course/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Dashboard", id },
        { type: "Dashboard", id: "LIST" },
      ],
    }),

    archiveCourse: builder.mutation<{ success: boolean; course: ICourse }, string>({
      query: (id) => ({
        url: `${BASE}/archive-course/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Dashboard", id },
        { type: "Dashboard", id: "LIST" },
      ],
    }),

    getCourseAnalytics: builder.query<{ success: boolean } & ICourseAnalytics, string>({
      query: (id) => ({
        url: `${BASE}/analytics-course/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Analytics", id }],
    }),

    getCourseTracker: builder.query<{ success: boolean; tracker: any[] }, { id: string; filters?: ICourseTrackerFilters }>({
      query: ({ id, filters }) => {
        const params = new URLSearchParams();
        if (filters?.status) params.set("status", filters.status);
        if (filters?.isLate !== undefined) params.set("isLate", String(filters.isLate));
        if (filters?.passed !== undefined) params.set("passed", String(filters.passed));
        if (filters?.department) params.set("department", filters.department);
        const qs = params.toString();
        return {
          url: `${BASE}/tracker-course/${id}${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, { id }) => [{ type: "Dashboard", id: `tracker-${id}` }],
    }),

    /* ── Admin — quiz question management (draft courses only) ────────── */

    addQuestion: builder.mutation<
      { success: boolean; question: ICourseQuestion },
      { courseId: string; data: Partial<ICourseQuestion> }
    >({
      query: ({ courseId, data }) => ({
        url: `${BASE}/add-questions/${courseId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: "Question", id: courseId }],
    }),

    updateQuestion: builder.mutation<
      { success: boolean; question: ICourseQuestion },
      { id: string; courseId: string; data: Partial<ICourseQuestion> }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/update-questions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: "Question", id: courseId }],
    }),

    deleteQuestion: builder.mutation<{ success: boolean; message: string }, { id: string; courseId: string }>({
      query: ({ id }) => ({
        url: `${BASE}/delete-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: "Question", id: courseId }],
    }),

    /* ── Employee — taking a course ─────────────────────────────────── */

    getMyCourses: builder.query<{ success: boolean; courses: IMyCourseEntry[] }, void>({
      query: () => ({
        url: `${BASE}/my-courses`,
        method: "GET",
      }),
      providesTags: [{ type: "Dashboard", id: "MY_COURSES" }],
    }),

    openCourse: builder.query<{ success: boolean; course: ICourse; attempt: IAttempt; questions: ICourseQuestion[] }, string>({
      query: (id) => ({
        url: `${BASE}/open-course/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Dashboard", id: `open-${id}` }],
    }),

    updateVideoProgress: builder.mutation<
      { success: boolean; attempt: IAttempt },
      { id: string; progressSeconds: number; completed?: boolean }
    >({
      query: ({ id, progressSeconds, completed }) => ({
        url: `${BASE}/update-video-progress/${id}`,
        method: "PATCH",
        body: { progressSeconds, completed },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Dashboard", id: `open-${id}` }],
    }),

    markContentViewed: builder.mutation<{ success: boolean; attempt: IAttempt }, string>({
      query: (id) => ({
        url: `${BASE}/content-viewed/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Dashboard", id: `open-${id}` }],
    }),

    startQuiz: builder.mutation<
      { success: boolean; quizStartedAt: string; quizExpiresAt: string; timeLimitSeconds: number; questions: ICourseQuestion[] },
      string
    >({
      query: (id) => ({
        url: `${BASE}/start-quize/${id}`,
        method: "POST",
      }),
    }),

    autosaveQuizAnswers: builder.mutation<
      { success: boolean; savedAnswers: number; quizExpiresAt: string },
      { id: string; answers: IQuizAnswerInput[] }
    >({
      query: ({ id, answers }) => ({
        url: `${BASE}/autosave-quize/${id}`,
        method: "PATCH",
        body: { answers },
      }),
    }),

    submitQuiz: builder.mutation<
      {
        success: boolean;
        score: number;
        totalPossibleScore: number;
        percentage: number;
        passed: boolean;
        isLate: boolean;
        correctAnswersCount: number;
        totalQuestions: number;
      },
      { id: string; answers: IQuizAnswerInput[] }
    >({
      query: ({ id, answers }) => ({
        url: `${BASE}/submit-quize/${id}`,
        method: "POST",
        body: { answers },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dashboard", id: "MY_COURSES" },
        { type: "Dashboard", id: `open-${id}` },
      ],
    }),

    /* ── Comments ───────────────────────────────────────────────────── */

    addComment: builder.mutation<{ success: boolean; comment: ICourseComment }, { id: string; text: string; file?: File | null }>({
      query: ({ id, text, file }) => ({
        url: `${BASE}/add-comments/${id}`,
        method: "POST",
        body: commentFormData(text, file),
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Question", id: `comments-${id}` }],
    }),

    getMyCommentsForCourse: builder.query<{ success: boolean; comments: ICourseComment[] }, string>({
      query: (id) => ({
        url: `${BASE}/get-mycomment/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Question", id: `comments-${id}` }],
    }),

    getCourseComments: builder.query<{ success: boolean; comments: ICourseComment[] }, string>({
      query: (id) => ({
        url: `${BASE}/get-course-comment/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Question", id: `comments-${id}` }],
    }),

    getOpenComments: builder.query<{ success: boolean; comments: ICourseComment[] }, void>({
      query: () => ({
        url: `${BASE}/comments-open`,
        method: "GET",
      }),
      providesTags: [{ type: "Question", id: "OPEN_COMMENTS" }],
    }),

    replyToComment: builder.mutation<
      { success: boolean; comment: ICourseComment },
      { commentId: string; text: string; file?: File | null }
    >({
      query: ({ commentId, text, file }) => ({
        url: `${BASE}/comments-reply/${commentId}`,
        method: "PATCH",
        body: commentFormData(text, file),
      }),
      invalidatesTags: [{ type: "Question", id: "OPEN_COMMENTS" }],
    }),

    addThreadMessage: builder.mutation<
      { success: boolean; comment: ICourseComment },
      { commentId: string; courseId: string; text: string; file?: File | null }
    >({
      query: ({ commentId, text, file }) => ({
        url: `${BASE}/comments/${commentId}/messages`,
        method: "POST",
        body: commentFormData(text, file),
      }),
      invalidatesTags: (_result, _error, { courseId }) => [
        { type: "Question", id: `comments-${courseId}` },
        { type: "Question", id: "OPEN_COMMENTS" },
      ],
    }),

    /* ── Ratings ────────────────────────────────────────────────────── */

    submitRating: builder.mutation<
      { success: boolean; rating: ICourseRating },
      { id: string; data: ISubmitRatingInput }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/submit-rating/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Analytics", id: `rating-${id}` },
        { type: "Analytics", id: "LEADERBOARD" },
        { type: "Dashboard", id: `open-${id}` },
      ],
    }),

    getMyRating: builder.query<{ success: boolean; rating: ICourseRating | null }, string>({
      query: (id) => ({
        url: `${BASE}/my-rating/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Analytics", id: `rating-${id}` }],
    }),

    getCourseRatings: builder.query<
      { success: boolean; course: Partial<ICourse>; ratings: ICourseRating[] },
      string
    >({
      query: (id) => ({
        url: `${BASE}/get-course-rating/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Analytics", id: `rating-${id}` }],
    }),

    getRatingsLeaderboard: builder.query<{ success: boolean; courses: Partial<ICourse>[] }, void>({
      query: () => ({
        url: `${BASE}/ratings-leaderboard`,
        method: "GET",
      }),
      providesTags: [{ type: "Analytics", id: "LEADERBOARD" }],
    }),
  }),
});

export const {
  // admin — courses
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useUploadCourseHeroImageMutation, // NEW
  usePublishCourseMutation,
  useArchiveCourseMutation,
  useGetCourseAnalyticsQuery,
  useGetCourseTrackerQuery,

  // admin — questions
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,

  // employee — taking a course
  useGetMyCoursesQuery,
  useOpenCourseQuery,
  useUpdateVideoProgressMutation,
  useMarkContentViewedMutation,
  useStartQuizMutation,
  useAutosaveQuizAnswersMutation,
  useSubmitQuizMutation,

  // comments
  useAddCommentMutation,
  useGetMyCommentsForCourseQuery,
  useGetCourseCommentsQuery,
  useGetOpenCommentsQuery,
  useReplyToCommentMutation,
  useAddThreadMessageMutation,

  // ratings
  useSubmitRatingMutation,
  useGetMyRatingQuery,
  useGetCourseRatingsQuery,
  useGetRatingsLeaderboardQuery,
} = courseApi;
