import { http, HttpResponse } from "msw";

// === 타입 정의 ===

// 1. 로그인된 사용자 정보
interface UserInfo {
  id: number;
  email: string;
  name: string;
  company: {
    id: number;
    name: string;
  };
}

// 2. 캠페인 리스트 조회
interface Campaign {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective:
    | "WEBSITE_CONVERSIONS"
    | "WEBSITE_TRAFFIC"
    | "SALES"
    | "APP_INSTALLATION"
    | "LEAD"
    | "BRAND"
    | "VIDEO_VIEWS";
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
}

interface CampaignListResponse {
  content: Campaign[];
  size: number;
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  sort: object | null;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

// 3. 캠페인 상태 수정
interface CampaignUpdateResponse {
  result: boolean;
  id: number;
}

// 4. 사용자 리스트 조회
interface User {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
}

interface UserListResponse {
  content: User[];
  size: number;
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  sort: object | null;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

// 5. 사용자 생성
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface CreateUserResponse {
  result: boolean;
  id: number;
}

// 6. 사용자 수정
interface UpdateUserRequest {
  name: string;
}

interface UpdateUserResponse {
  result: boolean;
}

// === 테스트 데이터 ===

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "캠페인1",
    enabled: true,
    campaign_objective: "WEBSITE_TRAFFIC",
    impressions: 384057,
    clicks: 1974,
    ctr: 0.8752,
    video_views: 948,
    vtr: 0.95123,
  },
  {
    id: 2,
    name: "캠페인2",
    enabled: true,
    campaign_objective: "LEAD",
    impressions: 705575,
    clicks: 6726,
    ctr: 0.8733,
    video_views: 40,
    vtr: 0.135,
  },
];

const initialUsers: User[] = [
  {
    id: 1,
    email: "user1@wisebirds.ai",
    name: "사용자1",
    last_login_at: "2022-11-14T07:37:24.914Z",
  },
  {
    id: 2,
    email: "user2@wisebirds.ai",
    name: "사용자2",
    last_login_at: "2022-11-14T07:37:24.914Z",
  },
];

const campaigns = [...initialCampaigns];
const users = [...initialUsers];

// === MSW 핸들러 ===

export const handlers = [
  // 1. 로그인된 사용자 정보
  http.get("/api/auth/me", () => {
    const userInfo: UserInfo = {
      id: 1,
      email: "abc@abc.com",
      name: "홍길동",
      company: {
        id: 1,
        name: "와이즈버즈",
      },
    };
    return HttpResponse.json(userInfo);
  }),

  // 2. 캠페인 리스트 조회
  http.get("/api/campaigns", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 0);
    const size = Number(url.searchParams.get("size") || 25);
    const start = page * size;
    const end = start + size;
    const content = campaigns.slice(start, end);

    const response: CampaignListResponse = {
      content: content,
      size: size,
      total_elements: campaigns.length,
      total_pages: Math.ceil(campaigns.length / size),
      last: end >= campaigns.length,
      number: page,
      sort: null,
      number_of_elements: content.length,
      first: page === 0,
      empty: campaigns.length === 0,
    };

    return HttpResponse.json(response);
  }),

  // 3. 캠페인 상태 수정
  http.patch("/api/campaigns/:id", async ({ request, params }) => {
    const { id } = params;
    const { enabled } = (await request.json()) as { enabled: boolean };

    const campaign = campaigns.find((c) => c.id === Number(id));
    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    campaign.enabled = enabled;

    const response: CampaignUpdateResponse = {
      result: true,
      id: Number(id),
    };
    return HttpResponse.json(response);
  }),

  // 4. 사용자 리스트 조회
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 0);
    const size = Number(url.searchParams.get("size") || 25);
    const start = page * size;
    const end = start + size;
    const content = users.slice(start, end);

    const response: UserListResponse = {
      content: content,
      size: size,
      total_elements: users.length,
      total_pages: Math.ceil(users.length / size),
      last: end >= users.length,
      number: page,
      sort: null,
      number_of_elements: content.length,
      first: page === 0,
      empty: users.length === 0,
    };

    return HttpResponse.json(response);
  }),

  // 5. 사용자 생성
  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as CreateUserRequest;

    const newUser: User = {
      id: users.length + 1,
      email: body.email,
      name: body.name,
      last_login_at: new Date().toISOString(),
    };

    users.push(newUser);

    const response: CreateUserResponse = {
      result: true,
      id: newUser.id,
    };

    return HttpResponse.json(response);
  }),

  // 6. 사용자 수정
  http.patch("/api/users/:id", async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as UpdateUserRequest;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    user.name = body.name;

    const response: UpdateUserResponse = {
      result: true,
    };
    return HttpResponse.json(response);
  }),
];
