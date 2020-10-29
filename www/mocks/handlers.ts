import { rest } from "msw";
import { getMockSpacecraft } from "../test/mocks";

const API_ENDPOINT = "http://localhost:5000";

export const handlers = [
  rest.get(`${API_ENDPOINT}/spacecraft`, (_req, res, ctx) => {
    return res(ctx.json([getMockSpacecraft()]));
  }),
  rest.put(`${API_ENDPOINT}/spacecraft/:uuid`, (req, res, ctx) => {
    return res(ctx.json(getMockSpacecraft(JSON.parse(req.body.toString()))));
  }),
  rest.delete(`${API_ENDPOINT}/spacecraft/:uuid`, (req, res, ctx) => {
    const { uuid } = req.params;
    return res(ctx.json({ uuid }));
  }),
];
