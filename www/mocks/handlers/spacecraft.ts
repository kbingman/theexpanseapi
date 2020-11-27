import { rest } from 'msw';
import { getMockSpacecraft, getMockSpacecraftClass } from '../models';

const API_ENDPOINT = 'http://localhost:5000';

const mockSpacecraft = getMockSpacecraft();
const mockSpacecraftClass = getMockSpacecraftClass();

export const spacecraftHandlers = [
  rest.get(`${API_ENDPOINT}/spacecraft`, (_req, res, ctx) => {
    return res(ctx.json([mockSpacecraft]));
  }),

  rest.get(
    `${API_ENDPOINT}/spacecraft/${mockSpacecraft.uuid}`,
    (_req, res, ctx) => {
      return res(
        ctx.delay(1500),
        ctx.json({ ...mockSpacecraft, class: mockSpacecraftClass, crew: [] })
      );
    }
  ),

  rest.put(
    `${API_ENDPOINT}/spacecraft/${mockSpacecraft.uuid}`,
    (req, res, ctx) => {
      return res(ctx.json(getMockSpacecraft(JSON.parse(req.body.toString()))));
    }
  ),

  rest.delete(`${API_ENDPOINT}/spacecraft/:uuid`, (req, res, ctx) => {
    const { uuid } = req.params;
    return res(ctx.json({ uuid }));
  }),
];
