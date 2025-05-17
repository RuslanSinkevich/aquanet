vi.mock("utils/cookie-utils", () => ({
  getCookie: vi.fn(),
  setCookie: vi.fn(),
}));

// Мокируем axios
vi.mock("axios", () => ({
  get: vi.fn().mockResolvedValue({ data: "Mocked GET response" }),
  post: vi.fn().mockResolvedValue({ data: "Mocked POST response" }),
  put: vi.fn().mockResolvedValue({ data: "Mocked PUT response" }),
  delete: vi.fn().mockResolvedValue({ data: "Mocked DELETE response" }),
  isAxiosError: vi.fn().mockResolvedValue({ data: "Mocked isAxiosError" }),
}));
